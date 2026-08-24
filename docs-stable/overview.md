---
title: What is TBook Settlement & Save
sidebar_position: 1
slug: /
---

# What is TBook Settlement & Save

TBook Settlement & Save lets payment companies, fintechs and digital banks move and hold **stablecoin value (USDC, USDT)** for their users through **one REST API plus signed webhooks** — deposits, transfers, withdrawals, point-of-sale spending, and an optional yield product — without touching a blockchain node, a private key, or a chain concept anywhere in the integration.

You integrate once, server-to-server. Your back end stays the only caller and your core ledger stays the arbiter of what your users see; the TBook ledger is the source of truth for the on-chain side, and a sealed daily statement is where the two tie, line by line, every day.

## Core concepts

| Concept | Meaning |
|---|---|
| **Organization** | The legal entity that contracts with TBook and owns API keys. Everything — accounts, balances, webhooks, statements — is scoped to your organization through your key. The key *is* the identity. |
| **Account** | One of your users (or your own float), identified by *your* wallet ID (`externalId`, the join key). Balances are per account × asset. |
| **Deposit — declared** | You declare an expected amount, receive funding instructions (address + memo reference), and TBook matches the arrival, confirms chain finality, and credits `available`. |
| **Deposit — per-user address** | You issue an account its **own deposit address** (USDC on Sui, USDT on Tron). Anything that arrives there credits the account automatically at finality — no declaration, no memo. This is the path for top-ups from exchanges and user wallets. |
| **Transfer / Hold** | Ledger-internal movement between your accounts, synchronous, with a two-phase hold/capture model that mirrors an authorization/capture switch. |
| **Withdrawal** | Send to a pre-registered, sanctions-screened external address, with deterministic terminal states declared from the ledger — never inferred from chain data. |
| **Payment** | A synchronous point-of-sale authorization (p99 ≤ 300 ms, hard 500 ms budget, **fail-closed**: a decline is a clean `201 declined`, never a 5xx your switch has to interpret). |
| **Earning (Save)** | Non-rebasing vault shares at a daily price: subscribe, redeem (queued or instant with a quoted fee), auto-invest above a spend buffer, per-day accrual records. |

## The universal state machine

Every money movement — deposit, transfer, withdrawal, subscription, redemption, payment — ends in a **terminal state that TBook declares from its ledger**:

```
created → pending → settling → completed
                     └─────────→ failed (failureCode; failed_refunded if value already moved)
```

`settling` means an external leg is in flight; those funds show in `inFlight` and are excluded from `available`. Terminal states are immutable — corrections are compensating entries, because there is no chain-level undo. Every transition emits a signed webhook carrying a per-account monotonic `ledgerSeq`.

## Key properties

| Property | Description |
|---|---|
| **Payment semantics, not chain semantics** | Chain concepts appear in exactly two places: funding instructions and the optional `chainEvidence` attached to completed operations. Everywhere else the API speaks your lifecycle vocabulary. |
| **Two-layer idempotency** | HTTP `Idempotency-Key` (24 h, retry-safe) plus business-level `clientReference` (unique per organization, forever) — duplicate submissions are structurally impossible, even across days. |
| **A real ledger underneath** | Double-entry, Σ=0 per asset, six independently reconciled custody locations. The platform's own money and your users' money are never mixed in the books. |
| **Attested-enclave key custody** | Per-user deposit addresses are minted inside AWS Nitro Enclaves; private keys are envelope-encrypted under a KMS key whose policy only answers the *measured* enclave image (PCR-bound). Whoever steals the database holds inert ciphertext. |
| **Dual-chain settlement** | USDC settles on Sui, USDT on TRC-20 (Tron) — one contract, logical network names (`sui`, `tron`); the testnet/mainnet distinction never appears in the API. |
| **Deterministic, observable operations** | Sealed daily statements with an internal-consistency flag, replayable signed webhooks, and published error taxonomy your switch can route on. |

## Environments

| Environment | Base URL | Notes |
|---|---|---|
| **Sandbox** | `https://sandbox.stable.tbook.com/v1` | Self-serve signup; forced-failure scenarios for every unhappy path (expired quotes, screening rejections, simulated arrivals at deposit addresses). |
| **Production** | `https://api.stable.tbook.com/v1` | Live since 2026-08-19. |

Continue with [Getting started](./getting-started.md), the [API surface](./api-reference.md), or [Webhooks](./webhooks.md).
