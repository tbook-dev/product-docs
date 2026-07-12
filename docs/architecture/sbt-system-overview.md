# SBT System — Overview & Status

A plain-language map of how TBook's SBT system works and what state each part is in.
Written for product and business readers — **no code required**. Engineers should also
see the developer guides under *Developers*.

## What an SBT is here

An **SBT** (Soulbound Token) is a non-transferable badge that lives in a user's wallet.
On TBook it proves someone completed a campaign's tasks. It cannot be sold or moved,
which is what makes it a credible reputation signal. SBT holdings feed a user's
**WISE Score**, which drives leaderboards, invite tiers, and airdrop eligibility.

## How it works, end to end

1. **An issuer creates an SBT** for a campaign, choosing the tasks (credentials) users
   must complete and paying a one-time issuance fee.
2. **A user does the tasks** — follow on X, join a Discord, hold an asset, etc. Each task
   is verified when the user clicks "verify".
3. **The user claims the SBT.** TBook's backend confirms the tasks are done and signs an
   authorization; the user's wallet submits the mint and pays a small gas/mint fee.
4. **The SBT lands in the wallet** and counts toward the user's WISE Score.

```
Issuer creates SBT ──▶ User completes tasks (credentials) ──▶ User claims ──▶ Badge + score
```

## The pieces

| Piece | Plain-language role |
|---|---|
| **Sui contract** (primary) | The on-chain program that mints and holds SBTs. Sui is the main chain. |
| **Backend** ("signing oracle") | Checks task completion and signs a permission slip. It never spends users' funds and never pays gas for them. |
| **Consumer app** (`engage.tbook.com`) | Where users see campaigns, do tasks, and claim. |
| **Issuer app** | Where creators deploy an SBT and its tasks. |
| **Ops app** | Internal dashboards: review queue, holder counts, mint analytics. |
| **TON / EVM (BSC)** | Supported for compatibility, but **not the focus** — Sui is primary. |

## Multi-chain, at a glance

- **Sui** — primary; all new SBT work targets Sui.
- **TON, EVM/BSC** — kept working and secure, but not being extended.

## A couple of deliberate design choices (so they're not mistaken for bugs)

- **Claiming trusts the task result recorded at verify time.** If a user later undoes a
  task (unfollows, leaves a group), they can still claim. This is intentional — it keeps
  claiming reliable and avoids failing users on third-party outages.
- **Some tasks are "click to verify"** (visit a page, share a post). They confirm the
  user engaged, not an on-chain fact — by design.

## Implementation status board

Kept up to date as the optimization program lands. Legend: ✅ live · 🟡 in progress ·
⬜ planned · 🔒 waiting on a go/no-go decision.

_Last updated: 2026-07-12_

| Capability | Sui | TON | EVM/BSC | Notes |
|---|---|---|---|---|
| Issue SBT | ✅ | ✅ | ✅ | Sui is primary. |
| Claim SBT | ✅ | ✅ | ✅ | |
| WISE Score from SBT holdings | ✅ | ✅ | ✅ | |
| Single deployed-package registry | ✅ | — | — | New: one source of truth + automated drift check. |
| Automated package-drift guard (CI) | 🟡 | — | — | Script done & tested; wiring into CI. |
| Backend PR test gate | 🟡 | — | — | Core-logic suite green; gate being enabled. |
| Frontend CI + safe deploy | ⬜ | — | — | Planned. |
| Contract publish runbook | 🟡 | — | — | Replacing ad-hoc manual steps. |
| Credential system docs | ✅ | ✅ | ✅ | See *Developers → Credentials & Verification*. |
| Product/architecture docs (this page) | ✅ | — | — | |

## Glossary

- **SBT** — non-transferable badge proving task completion.
- **WISE Score** — user reputation score; SBT holdings contribute to it.
- **Credential** — one verifiable task within a campaign.
- **Collection** — an issuer's SBT, which users mint from.
- **Issuance fee** — one-time fee an issuer pays to create an SBT.
- **Claim/mint fee** — small fee a user pays to mint the SBT to their wallet.
