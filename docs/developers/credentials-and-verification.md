# Credentials & Verification

How TBook decides whether a user has completed the tasks required to claim an SBT.
This page documents the **as-built** behavior, including several deliberate design
choices that can look like bugs if you only read the code.

## The model

A **credential** is one verifiable task (follow an X account, join a Discord, hold an
on-chain asset, …). Credentials are grouped into a **credential group**, and a group is
attached to a campaign and to its rewards.

An SBT is coupled to its tasks purely by **group id**:

```
Campaign ─1:N─ CredentialGroup (groupId) ─1:N─ Credential (labelType decides how it's verified)
                     └── SuiSbtReward.groupId  ← the join to the SBT
```

To claim the SBT, every credential in that group must be satisfied.

- Per-credential results live in `tb_user_credential_new` (`userId, credentialId, status`).
- The claim ledger lives in `tb_user_reward` (`claimType`: `2 eligible / 3 minting / 4 claimed / 5 missed`). `claimType == 4` is the authoritative "user holds this SBT" flag.

## Credential types (`labelType`)

Every credential's behavior is driven by a single integer, `Credential.labelType`. There
are ~90 in use (up to 113 on `main`). The registry currently lives in three places that
must be kept in sync by hand — backend `Credential.kt` (`object CredentialLabelType`),
backend `CredentialForms.kt` (legacy, being retired), and frontend
`packages/credential/credential.js`. **Single-source-of-truth for this registry is a
tracked optimization (plan item P2-7).**

Broad categories: X/Twitter, Discord, Telegram, on-chain (TON / Sui / BSC), SBT-holding,
invite/referral, points/score/streak, wallet-connect, and issuer custom API.

### Verification engine

`CredentialGroupService.verifyCredential(user, utInfo, credential)` dispatches on
`labelType` and calls the appropriate backend (X API, Discord/Telegram bots, chain RPCs,
etc.). It runs **synchronously and on demand** when the frontend calls
`POST /campaignNew/credential/{id}/verify`. There is **no scheduled re-verification**:
once a credential is verified, a `status = 1` row exists and persists until explicitly
deleted.

## By-design behaviors (read this before "fixing" anything)

These are intentional. They are documented here so they are not mistaken for defects.

### 1. Claim gating trusts the stored result — it does not re-verify at claim time

The fee-signing claim endpoints authorize on the **stored** credential result:

- `POST /sui/sbt/claim` and `POST /evm-sbt/sbt/claim` check that every credential in the
  group has a `status == 1` row (`participantRepository.getResult`). They do **not**
  re-run live verification.
- `POST /sui/sbt/claim/check` (the post-mint confirmation step) **does** re-verify live.

**Consequence, and it is accepted:** a user who completed the tasks (and so has
`status = 1`) can still claim even if they later undo a task (unfollow, leave a group,
sell a token). This keeps claiming fast and avoids failing users on transient
third-party API blips. Do not add live re-verification to `/claim` without a product
decision — the gate is intended to stay consistent with this behavior.

### 2. Some credential types are "click-to-verify" and do not check anything on chain

These verify only that the user *interacted*, by design (they exist for engagement, not
for enforceable proof):

| `labelType` | Task | What it actually checks |
|---|---|---|
| 8 | Visit page | a click/participation row exists |
| 12 | Snapshot vote | a click row exists — **not** an on-chain/Snapshot vote |
| 72 | Share to story | a click row exists |
| 20 | Storm open-trade | always returns verified ("not necessary to check") |
| 23 / 24 / 86 / 102 | Connect TON / EVM / Sui / BSC | wallet is bound |
| 73 / 94 | Connect X / Discord | account name is non-empty |

If a campaign needs enforceable proof for one of these, use an on-chain `labelType` or a
custom Verify API instead.

## For integrators

Issuer-supplied custom tasks use `labelType 40` with a Verify API — see
[Custom Off-chain API on Sui](custom-off-chain-api-on-sui.md) /
[on TON](custom-off-chain-api-on-ton.md).

## Known limitations tracked for improvement

These are logged in the SBT optimization program (not user-facing bugs):

- The `labelType` registry is duplicated across three files (P2-7).
- `tb_user_credential_new` has no `UNIQUE(user_id, credential_id)` constraint, so
  duplicate result rows are possible (P1-9).
- `verifyCredential` is one large dispatcher; it is being migrated to a per-type verifier
  registry, Sui types first (P2-8).
