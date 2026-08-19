---
title: Webhooks
sidebar_position: 4
---

# Webhooks

Webhooks are the primary integration surface — every state transition of every money movement emits one, and no polling is required.

## Envelope & delivery

```json
{ "eventId": "evt_…", "type": "deposit.completed", "createdAt": "…",
  "data": { "object": { …the full object… } }, "ledgerSeq": 48211 }
```

- **Signed**: `X-TBook-Signature: t=<unix>,v1=<hmac-sha256>`; verify within a ±300 s replay window. Two secrets stay valid during rotation so a rotation never drops an event.
- **Ordered enough to reason about**: `ledgerSeq` is a per-account monotonic sequence — apply events idempotently and discard anything at or below your high-water mark.
- **Retried** with backoff until your endpoint answers 2xx.

## Subscribing

Subscriptions match **by exact event-type string** (wildcards are designed but not yet served). Subscribe to precisely what your switch consumes.

## Event catalog (by object)

| Object | Events you will see |
|---|---|
| Deposit | `deposit.completed` (both declared and per-address flows — distinguish by `data.object.source`), `deposit.unmatched` (an arrival nobody can attribute entered the supervised queue) |
| Transfer | `transfer.completed`, `transfer.failed` |
| Withdrawal | `withdrawal.settling`, `withdrawal.completed`, `withdrawal.failed` (with `failureCode`; `failed_refunded` when value had already moved and was made whole) |
| Payment | `payment.captured`, `payment.voided`, `payment.expired` |
| Subscription / Redemption | `subscription.completed` (settled shares + execution price), `redemption.completed` |
| Statement | `statement.sealed` — the daily reconciliation anchor; fetch and tie it to your core ledger |

The catalog above is the stable core; the authoritative list ships with the OpenAPI contract, and the emitted set is CI-checked against the code so documentation cannot drift from behavior.

## The two rules that make consumption safe

1. **Trust terminal states, not chain observation.** A `completed` withdrawal is complete because the ledger says so, with `chainEvidence` attached for audit — never infer finality yourself.
2. **Consume idempotently.** Delivery is at-least-once. `eventId` is unique; `ledgerSeq` is your per-account ordering key. A consumer that upserts by `eventId` and applies by `ledgerSeq` is immune to retries and reordering.
