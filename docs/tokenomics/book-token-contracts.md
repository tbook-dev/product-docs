---
slug: /tokenomics/book-token-contracts
---

# $BOOK Contract Addresses

The canonical on-chain addresses for the $BOOK token. $BOOK is live on **Sui mainnet** and **BSC (BNB Smart Chain) mainnet**, connected by [Wormhole NTT (Native Token Transfers)](https://wormhole.com/products/native-token-transfers), so the token moves between the two chains natively rather than as a wrapped asset.

> **Always check addresses against this page (or the source repositories below) before interacting with the token.** Anyone can deploy a token that calls itself "BOOK" — the addresses here are the only official deployments.

## Sui mainnet

| What | Address / ID |
|---|---|
| BOOK coin type | [`0x440aa32fe6290224b7b5fc37d20e093c6841263302d5bd693a64a8a24bc0c589::BOOK::BOOK`](https://suivision.xyz/coin/0x440aa32fe6290224b7b5fc37d20e093c6841263302d5bd693a64a8a24bc0c589::BOOK::BOOK) |
| Wormhole NTT manager (shared `state::State<BOOK>` object) | [`0x1682ebadc58acbb397ae24372f3f7ec07cf83d036dc27105ad7cb5a49eaf48a9`](https://suivision.xyz/object/0x1682ebadc58acbb397ae24372f3f7ec07cf83d036dc27105ad7cb5a49eaf48a9) |
| NTT package | [`0x3638edb0db74cbeed90f9bd9545492df8c12396c4efa2240619e653980255868`](https://suivision.xyz/package/0x3638edb0db74cbeed90f9bd9545492df8c12396c4efa2240619e653980255868) |
| NTT manager owner (holds the `AdminCap` and `UpgradeCap`) | [`0xf5ffe919d2afed78a5b8c8e9a6a8c7bd704a68a015356b31d63daf59071ace05`](https://suivision.xyz/account/0xf5ffe919d2afed78a5b8c8e9a6a8c7bd704a68a015356b31d63daf59071ace05) |

A standard Sui coin with **9 decimals**, TreasuryCap-controlled minting, a 10B max supply, and frozen metadata. Source code: [tbook-dev/tbook-token-sui](https://github.com/tbook-dev/tbook-token-sui), audited by [Beosin](https://beosin.com/audits/TBook_202512181800.pdf) and [MoveBit](https://movebit.xyz/reports/20251224-TBook-Token-Final-Audit-Report.pdf) (copies in the repo's `audit_report/`).

## BSC mainnet

| What | Address |
|---|---|
| BOOK token (ERC-20) | [`0xeD50CA53711Ce8788CBf922637E1C3e3c9b1C362`](https://bscscan.com/token/0xeD50CA53711Ce8788CBf922637E1C3e3c9b1C362) |
| Wormhole NTT manager | [`0x7860a61aAe7b563127C38f381127b67dCc25DC45`](https://bscscan.com/address/0x7860a61aAe7b563127C38f381127b67dCc25DC45) |
| NTT manager owner | [`0x445488c12AC444EF749cf22588238853618ed86E`](https://bscscan.com/address/0x445488c12AC444EF749cf22588238853618ed86E) |

A standard ERC-20 with **18 decimals**. Source code: [tbook-dev/tbook-token-bsc](https://github.com/tbook-dev/tbook-token-bsc), audited by [Beosin](https://beosin.com/audits/BOOK_202601061930.pdf) (copy in the repo's `audit_report/`).

Note that the decimals differ per chain (9 on Sui, 18 on BSC); Wormhole NTT normalizes amounts when transferring between chains, so a bridged balance is the same number of $BOOK on both sides.

## Supply

Total supply is fixed at **10,000,000,000 $BOOK** across all chains — see [Tokenomics](/tokenomics/tokenomics) for distribution and vesting. Live figures:

- Total supply: [https://tokenomics.tbook.com/api/total-supply](https://tokenomics.tbook.com/api/total-supply)
- Circulating supply: [https://tokenomics.tbook.com/api/circulating-supply](https://tokenomics.tbook.com/api/circulating-supply)

## On-chain verification

Every relationship on this page was last re-verified against public mainnet RPCs on 2026-09-01:

- The BSC NTT manager's `token()` returns the BOOK ERC-20 address, and its `owner()` returns the owner address listed above. The token reports name `TBook Token`, symbol `BOOK`, 18 decimals.
- The Sui NTT manager ID is the shared `state::State<…::BOOK::BOOK>` object of the NTT package listed above, and the owner address holds that package's `state::AdminCap` and `upgrades::UpgradeCap`. The coin metadata reports name `TBook Token`, symbol `BOOK`, 9 decimals.

## Testnet

For development, the Sui **testnet** coin type is [`0xa40d55604f395cbb025ac6a3e5c98b05079fb32e0d7d4d63a80ddac7229e2aec::BOOK::BOOK`](https://testnet.suivision.xyz/coin/0xa40d55604f395cbb025ac6a3e5c98b05079fb32e0d7d4d63a80ddac7229e2aec::BOOK::BOOK). Testnet deployments carry no value and may be reset at any time.
