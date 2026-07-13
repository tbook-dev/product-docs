# Deployed Package Registry

The single reference for every deployed TBook SBT package, per network. This page is the
human-readable mirror of the machine-readable source of truth,
`tbook-sui-sbt/registry/sbt-registry.json`, which the backend, frontends, and the
drift-check CI all read from.

> **Do not copy package ids into new code.** Read them from the registry (or the backend
> `GET /sui/sbt/contract-config` endpoint). Hard-coded ids are what drift is made of.

## Model: fresh re-publish, no UpgradeCap

The `sui_sbt::sbt_nft` module has no on-chain `UpgradeCap`. Each "version" is a brand-new
`sui client publish` (every package is `version = 1` on chain). A new version does not
replace the old one — SBTs minted under an older package stay valid, and the backend
counts holdings across all live versions. See
`tbook-sui-sbt/DEPLOYMENTS.md` and the publish runbook for the full procedure.

## Sui SBT packages

| Network | Version | Status | Package ID |
|---|---|---|---|
| mainnet | v2 | **active** (new issuance) | `0x3c485f57f8a1187c548dd89d1253f7eb37142e3bb2437fd43a3a57a5e12c6c04` |
| mainnet | v1 | frozen (holdings/score only) | `0xb325b431b8e19a142a8ecef1242fccbbd0d5156bed5180b583c294f435960f5b` |
| testnet | v2 | active | `0x74f868eec89f00d147c6374c3288877bf56cd5f5f990beaf29304e44094f46b5` |
| testnet | v1 | legacy | `0x00122bc2a8fdda4689f2ba01d34c94dcc499e86e80411aa3b1d39a3458198ef2` |

The registry also carries each package's `moduleStateId`, `adminCapId`, fee `receiverAddress`,
the signing `publicKey` (mainnet v2), and the fee constants.

> **Signer key note.** The mainnet signing key was rotated on-chain (via `update_public_key`)
> after publish, so the live key is **not** the literal baked into the Move source `init`.
> The registry records the live on-chain `ModuleState.public_key`, and the drift-check CI
> verifies the two agree — see `tbook-sui-sbt/DEPLOYMENTS.md`.

## Who reads it

| Consumer | Where |
|---|---|
| Backend holdings/score | `rewardoor-service` `SuiService.kt` (matches v1 **and** v2 types) |
| Backend issuance fee | `rewardoor-service` `IssuanceFeeVerifier.kt` |
| Frontend claim/issue | `tbook-fe` S3 config + `sbt-observability/lib/config.js` |
| NFT frontend ownership gate | `tbook-nft-fe` `useSbtCheck.js` |
| Bookie (separate asset) | `bookie-nft/Published.toml` — this one **does** have an UpgradeCap |

## The drift guard

`tbook-sui-sbt/.github/workflows/drift-check.yml` runs `scripts/check-drift.mjs` on PRs
that touch package config, daily, and on demand. It verifies the registry agrees with the
config JSONs, `Move.lock`, the Move-source signing key, and the cross-repo consumers, and
that every package exists on chain. This is the automated guard against the class of
incident where committed ids silently disagree with what is live.

To run it locally:

```bash
cd tbook-sui-sbt
node scripts/check-drift.mjs            # full: static + on-chain
node scripts/check-drift.mjs --offline  # static checks only
```
