> For the complete documentation index, see [llms.txt](https://docs.tbook.com/tbook/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://docs.tbook.com/tbook/embedded-rwa-liquidity-layer/introduction/rwa-distribution-vaults-yield-and-compliance-infrastructure.md).

# RWA Distribution Vaults (Yield & Compliance Infrastructure)

RWA Distribution Vaults extend TBook’s settlement architecture to manage on-chain issuance, distribution, and yield routing for tokenized real-world assets.

Each vault mints composable mirror tokens representing off-chain assets, paired with programmable vesting and redemption logic. Through the Issuer Console, asset providers define tokenization parameters, transfer restrictions, and jurisdictional policies enforced automatically by the Policy Engine.

Compliance Passports (Incentive Passports enriched with compliance attestations represented as vSBTs) add a zero-knowledge attestation layer that enforces eligibility while preserving user privacy, enabling permissionless participation where lawful and ensuring compliance where required. On top of this, a Yield Enhancement Layer integrates DeFi strategies for optimized returns—leveraging verified lenders, structured yield splits, and temporary $BOOK incentives to compound or bootstrap liquidity.

These vaults make it possible for RWAs—such as tokenized T-bills, SME credit, or fund units—to circulate programmatically within TBook’s ecosystem, all under a single compliance and reporting standard.
