---
title: Getting started
sidebar_position: 2
---

# Getting started

Server-to-server only: your back end calls the API with a secret key; end users never touch TBook.

## Authentication & transport

```
Authorization: Bearer <secret API key>     # sbk_secret_… (production) / sbk_test_… (sandbox)
```

Keys are hashed at rest and carry per-key rate limits. Per-organization IP allowlisting and mTLS are available on request — no chain-native authentication protocol is ever required on your side. Webhooks are signed (`X-TBook-Signature: t=<unix>,v1=<hmac-sha256>`, ±300 s replay window, dual-secret rotation grace).

Get a sandbox key yourself at [sandbox.stable.tbook.com/signup](https://sandbox.stable.tbook.com/signup) — email, confirm, key shown once.

## Conventions that keep integrations boring

- **Amounts are decimal strings** (`"800.00"`); USDC/USDT up to 6 dp, vault shares up to 9 dp. Rounding is documented and residues are carried so statements always tie.
- **Asset codes are plain** (`"USDC"`, `"USDT"`) — no chain suffix in any balance or movement field.
- **Idempotency is two-layered and required**: send `Idempotency-Key` on every POST (retries return the original; same key + different body → `409`), and a `clientReference` on every money-movement create (unique per organization, forever — reuse returns `409` with the existing object's id).
- **Errors are routable**: one envelope, `{ "error": { "code", "message", "details" } }`, with a published taxonomy (`insufficient_available`, `quote_expired`, `screening_rejected`, `account_frozen`, …). Every `failed` state carries one of these as `failureCode`.

## First calls

**1. Create an account for your user** (your wallet ID is the join key):

```json
POST /v1/accounts
{ "externalId": "omni-wallet-83721", "type": "individual",
  "compliance": { "kyc": { "attested": true, "provider": "…", "ref": "…" } } }
```

**2a. Fund it — declared deposit** (you know the amount in advance):

```json
POST /v1/deposits
{ "accountId": "acct_…", "asset": "USDC", "expectedAmount": "800.00",
  "clientReference": "DEP-20260819-0001" }
// → 201 with fundingInstructions { network, address, memoRef } and an advisory expiry.
// The arrival is matched, finality confirmed, `available` credited; you get deposit.completed.
```

**2b. Or fund it — per-user deposit address** (top-ups from exchanges and user wallets, no declaration):

```json
POST /v1/accounts/{accountId}/deposit-addresses
{ "asset": "USDT", "network": "tron" }
// → 201 { address: "T…", status: "active" } — idempotent per (account, asset, network):
// every later call answers the SAME address. Arrivals credit automatically at finality,
// arriving as deposits with source: "deposit_address" and a system-assigned
// clientReference derived from the chain evidence (one on-chain transfer credits exactly once).
```

Lit pairs today: `sui`/USDC and `tron`/USDT. An unlit pair is refused by name with `400` — never silently ignored. Addresses, once issued, are watched forever (late arrivals at a retired address still credit); wrong-asset arrivals park in a supervised queue rather than crediting silently.

**3. Move it**: `POST /v1/holds` → `POST /v1/transfers` (capture), or straight `POST /v1/transfers` — synchronous `completed` for ledger-internal moves. **Spend it**: `POST /v1/payments/authorize` / `…/capture`. **Send it out**: register a destination on the allowlist, quote the withdrawal, `POST /v1/withdrawals`.

## Sandbox scenarios

The sandbox can force every unhappy path on demand — expired quotes, screening rejections, frozen accounts, simulated arrivals at your deposit addresses — so your switch's error handling is exercised before any real value moves. The scenario catalog ships with your sandbox key.
