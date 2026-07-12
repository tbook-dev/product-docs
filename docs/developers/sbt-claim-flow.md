# SBT Claim Flow (Sui)

How a user claims a Sui SBT, end to end. TBook's backend is a **signing oracle**: it
verifies eligibility and signs an authorization, but it never submits the transaction and
never pays gas — the user's wallet does that and pays the mint fee.

## Sequence

```
User app ──1. get claim info──▶ Backend  (verifies credentials, returns signature)
User app ──2. build & submit mint tx (moveCall sbt_nft::mint) ──▶ Sui   (user pays gas + mint fee)
User app ──3. confirm──▶ Backend  (validates the tx, records claim_type = 4)
```

### 1. Get claim authorization

`POST /sui/sbt/claim` with the target SBT. The backend:

- checks the user has a bound Sui wallet,
- checks every credential in the SBT's group has a stored `status == 1` result
  (see [Credentials & Verification](credentials-and-verification.md) — this step trusts
  the recorded result and does not re-verify live),
- double-checks the user has not already minted on chain,
- returns a signed payload: `{ objectId (collection), timestamp, signature, sbtInfo.version }`.

### 2. Build and submit the mint transaction

The frontend picks the contract config by `sbtInfo.version` (v1 or v2 — from the
[deployed package registry](deployed-package-registry.md)), then builds:

```
tx.moveCall({
  target: `${packageId}::sbt_nft::mint`,
  arguments: [ moduleStateId, collectionId, timestamp, signature, coinPayment ],
});
```

The user signs and submits; the mint fee coin is transferred to the collection's fee
receiver. Gas budget is set client-side; the mint fee is kept out of the gas budget.

### 3. Confirm and record

`POST /sui/sbt/claim/check` with the transaction digest. The backend fetches the tx,
confirms the sender and the minted `sbt_nft::SBT` object, guards against tx reuse, and
records the claim (`claim_type = 4`) — the authoritative "user holds this SBT" flag that
feeds WISE Score.

## Error handling worth knowing

- **`MoveAbort(..., 5)` = already claimed.** The frontend recovers by locating the user's
  existing SBT for that collection, finding its original mint transaction, and calling
  `/sui/sbt/claim/check` with it — so a double-claim attempt still reconciles to success.
- **Config mismatch.** If the contract config the frontend loaded disagrees with the
  deployed package, the mint aborts. An integrity guard (plan item P1-2) surfaces this as
  a "config unavailable, retry" state instead of an opaque on-chain abort.

## EVM / BSC

The BSC path is analogous but uses EIP-712 signatures and a `claim(...)` contract call
instead of a Sui `moveCall`. It is supported for compatibility; Sui is the primary chain.
