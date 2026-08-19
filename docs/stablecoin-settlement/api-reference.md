---
title: API surface
sidebar_position: 3
---

# API surface

The complete machine-readable OpenAPI 3.1 contract is available on request; this page is the map. Statuses are literal: **Live** endpoints are served today in sandbox and production.

## Set 1 — On-ramp

| Endpoint | Status | What it does |
|---|---|---|
| `POST /v1/accounts` · `GET /v1/accounts` | Live | Mint/read accounts keyed by your `externalId`; KYC is a signed attestation — no PII documents cross. |
| `POST /v1/deposits` · `GET /v1/deposits[?accountId=]` · `GET /v1/deposits/{id}` | Live | Declared deposits: funding instructions out, matched arrival in, `available` credited at finality. Under/over-delivery completes with `amountMatch` and the received amount authoritative; unmatched arrivals never credit silently. |
| `POST /v1/accounts/{id}/deposit-addresses` · `GET` same path | Live | Per-user deposit addresses (USDC on Sui, USDT on Tron). Idempotent per (account, asset, network); arrivals credit automatically with `source: deposit_address`; retired addresses stay watched forever. |
| `POST /v1/quotes` | Live (`withdrawal` kind) | An all-in, itemized, executable-once commitment with an expiry. |
| `POST /v1/holds` · capture/release | Live | Two-phase reserve/capture matching an authorization switch. |

## Set 2 — Movement

| Endpoint | Status | What it does |
|---|---|---|
| `POST /v1/transfers` · `GET /v1/transfers/{id}` | Live | Ledger-internal account-to-account movement, usually synchronous `completed`, optional `holdId`, inclusive/additive fee models. |
| `GET /v1/accounts/{id}/balances` | Live | `total = available + held + inFlight + Σ allocated.value` — the invariant is part of the contract. |

## Set 3 — Off-ramp

| Endpoint | Status | What it does |
|---|---|---|
| Allowlist endpoints | Live | Destinations are pre-registered and screened; a withdrawal can only name an allowlisted destination. |
| `POST /v1/withdrawals` · `GET /v1/withdrawals/{id}` | Live | Quote-referenced, screened, chain-settled with deterministic terminal states and `chainEvidence` on completion. |
| Conversions & fiat payout handoff | Phase 2 | Contract designed; activates with the licensed payout partner. |

## Set 4 — Spend

| Endpoint | Status | What it does |
|---|---|---|
| `POST /v1/payments/authorize` | Live | Synchronous, p99 ≤ 300 ms, hard 500 ms budget, fail-closed: inside-budget decline is `201 {state: "declined", failureCode}` — never a 5xx to interpret; your cascade falls back to fiat and the POS never stalls. |
| `POST /v1/payments/{id}/capture` · `…/void` | Live | Single capture ≤ authorized (remainder returns in the same commit); uncaptured authorizations lapse after 24 h with `payment.expired`. |

## Set 5 — Earning (Save)

| Endpoint | Status | What it does |
|---|---|---|
| `GET /v1/vaults` · `/{id}` · `/{id}/price` | Live | Catalog, terms (minimums, cycles, instant-redemption fee), daily share price. |
| `POST /v1/subscriptions` | Live | Subscribe at the settlement-time execution price (quoted values advisory); shares accrue once settled. |
| `POST /v1/redemptions` | Live | `queued` (standard cycle) or `instant` (buffer-backed, fee explicit via an `instant_redeem` quote — never silently deducted). |
| `PUT /v1/accounts/{id}/save-policy` | Live | Auto-invest daily above a configurable spend buffer, so day-to-day liquidity never touches redemption latency. |
| `GET /v1/accounts/{id}/accruals` · `GET /v1/yield-reports` | Live | Per account × vault × day: time-weighted shares, share price open/close, gross yield, platform fee, net yield. |

> Earning runs against the yield venue's sandbox today; production activation follows the venue's own production readiness — the API contract does not change when it does.

## Statements & events

| Endpoint | Status | What it does |
|---|---|---|
| Statements | Live | Sealed, immutable daily statements — opening, ordered lines with `balanceAfter`, closing, `invariantOk` — at the agreed business-date cut-off. |
| Webhook subscriptions | Live | Exact-string event matching; see [Webhooks](./webhooks.md). |

## Error taxonomy

`invalid_request` · `unauthorized` · `permission_denied` · `not_found` · `conflict` · `idempotency_conflict` · `idempotency_in_progress` · `rate_limited` · `insufficient_available` · `min_amount` · `limit_exceeded` · `hold_not_active` · `hold_expired` · `quote_expired` · `quote_consumed` · `account_frozen` · `screening_rejected` · `unsupported_asset` · `stale_price` · `partner_unavailable` · `internal`
