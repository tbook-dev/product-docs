# TBook: The Embedded RWA Liquidity Layer

## **Introduction**

TBook is the first embedded RWA liquidity layer that brings institutional-grade tokenized yield into user-facing apps. Through a single integration, apps can generate RWA-backed yield on idle customer balances, while RWA issuers unlock liquidity they could not access on their own.

#### **The future of finance is tokenized.**

Money is moving on-chain via stablecoins. They settle value instantly across jurisdictions, while offering protection from inflation, especially in emerging markets. In 2024 alone, stablecoin transaction volume exceeded Visa and Mastercard combined. At the same time, the market capitalization of RWAs are projected to reach $30 trillion by 2030[^1], representing the next phase of on-chain finance.&#x20;

#### **The future of tokenized finance is embedded.**

Today, the total market cap of RWAs is $30B. Scaling to $30T by 2030 will require tapping into liquidity that currently does not exist on-chain. A large part of this liquidity currently sits in user-facing apps, especially fintechs, e-commerce platforms and games. To access this liquidity, TBook proposes an embedded finance approach, whereby pathways to move capital on-chain and into yield-bearing RWAs are abstracted into the apps that people use every day, without any disruptions to UI/UX.

## **Product Introduction**

#### **TBook’s Tokenized Asset Coordination Layer**

TBook’s infrastructure connects verifiable identity, data analytics, and programmable asset distribution into one unified system to power tokenized finance.

At the core of TBook’s design is a vast data intelligence network that orchestrates capital flows across crypto native and non-native communities, to millions of people and an emerging digital workforce of AI agents. Every tokenized asset claim or payout is verified through proofs of contribution and credentials. Every transaction can earn compliant yield. Every participant operates through a verifiable on-chain identity.

![](/img/mVqmB1dM4aqR0Bwstgxo.png)

Capital orchestration takes many forms. Within blockchain ecosystems, TBook powers loyalty and asset distribution networks that allow projects to direct tokenized rewards to verified, high-value contributors. Beyond Web3, TBook partners with licensed financial institutions to bring institutional-grade RWAs on-chain, and user-facing apps—especially fintechs—to bring these yield-earning RWAs to everyday users.

Our architecture enables RWA distributions to flow directly to verified participants. Transactions are executed on TBook native platforms or embedded within the UI/UX of user-facing apps, with compliance, verification, and yield management occur automatically behind the scenes.

![](/img/t5BjdAJHsqiI5RZKGINz.png)

#### **Key Differentiators**

* **Embedded on-chain finance:** User-facing apps integrate TBook’s client SDK to move capital into yield-earning tokenized assets and other tokenized finance and DeFi primitives.
* **Attribution-native settlement:** Payouts and distributions map to verifiable Soulbound Tokens (vSBTs) and reputation (WISE Credit score), enabling proof-based eligibility and Sybil resistance at scale.
* **Composability with compliance:** Compliance Passports apply ZK-attested eligibility and jurisdiction rules without exposing raw personal data on-chain.
* **Enterprise rails:** Treasury management for traditional companies through licensed partners with institutional-grade tokenized yield, programmable treasury flows, and instant payouts.
* **Chain-agnostic design:** Operates across MoveVM, EVM, and TVM ecosystems, ensuring portability and integration flexibility.
* **Operational maturity:** Millions of credentials and assets issued, 200+ active partners, and production-level deployments across multiple ecosystems.

## **Technical Infrastructure**

TBook’s architecture transforms blockchains into active coordination engines for value attribution and capital flow.

#### **Identity Layer (Incentive Passport)**

Incentive Passports aggregate a user’s verified contributions and credentials across ecosystems. Each proof is represented as a verifiable Soulbound Token (vSBT)—a signed, non-transferable credential that can represent on-chain activity, off-chain achievements, or verified participation. Partners use the Nexus console to define credential logic, with full role separation, signature authorization, and pause controls. For users, the Engagement Basecamp provides a unified portal to discover contribution opportunities and claim incentive assets tied to verified actions.

#### **Intelligence Layer (WISE Credit Score)**

The WISE Credit Score translates fragmented data into a unified reputation system, combining Wealth, Identity, Social, and Engagement dimensions. This framework enables fairer and more transparent resource allocation, ensuring incentives reach real contributors rather than bots or opportunistic farmers. WISE supports partner-programmable scoring logic and produces verifiable segments for governance weighting, distribution, or access control. Anti-Sybil modules and refresh cadences maintain score accuracy over time. Dimensions tracked by the WISE score break down as follows:

* **Wealth (W)**: Measures on-chain assets, staking, and liquidity activity.
* **Identity (I)**: Verifies connected wallets, social profiles, and credentials through the Incentive Passport.
* **Social (S)**: Captures community reach and verified influence across networks.
* **Engagement (E)**: Tracks verifiable participation—claims, votes, and other on-chain actions.

#### **Smart Settlement Layer (TBook Vault)**

The Smart Settlement Layer serves as the operational core of TBook’s infrastructure. It transforms verified identity and reputation data into programmable capital flows, coordinating the release of stablecoins, real-world assets (RWAs), and project tokens through a unified vault and policy framework.

Each Vault references verifiable credentials—vSBTs, WISE scores, and Compliance Passports—before executing transactions through the Policy Engine. This ensures that every distribution, payout, or redemption is authenticated, compliant, and fully auditable. BOOK serves as the optimized claim channel for vSBT-validated settlements, reducing network gas consumption and enabling cross-chain execution.

All settlements—whether user payouts, RWA distributions, or enterprise transfers—follow the same canonical flow: Identity → Attestation → Policy Execution → Settlement → Verification Log.

**RWA Distribution Vaults (Yield & Compliance Infrastructure)**

RWA Distribution Vaults extend TBook’s settlement architecture to manage on-chain issuance, distribution, and yield routing for tokenized real-world assets.

Each vault mints composable mirror tokens representing off-chain assets, paired with programmable vesting and redemption logic. Through the Issuer Console, asset providers define tokenization parameters, transfer restrictions, and jurisdictional policies enforced automatically by the Policy Engine.

Compliance Passports (Incentive Passports enriched with compliance attestations represented as vSBTs) add a zero-knowledge attestation layer that enforces eligibility while preserving user privacy, enabling permissionless participation where lawful and ensuring compliance where required. On top of this, a Yield Enhancement Layer integrates DeFi strategies for optimized returns—leveraging verified lenders, structured yield splits, and temporary $BOOK incentives to compound or bootstrap liquidity.

These vaults make it possible for RWAs—such as tokenized T-bills, SME credit, or fund units—to circulate programmatically within TBook’s ecosystem, all under a single compliance and reporting standard.

**Embedded RWA Rails for Enterprises**

Built on the same vault and policy infrastructure, TBook’s on-chain rails extend programmable settlement to enterprise-grade capital flows.

User-facing apps, and especially licensed financial partners on-ramp fiat into TBook-linked stablecoin vaults, sweep idle balances into yield-bearing RWAs, and automate payouts to users, employees or suppliers under jurisdiction-specific compliance rules. The same attestation logic that governs on-chain settlements ensures full traceability, KYC/KYB enforcement, and real-time reconciliation.

These rails bridge Web2 financial operations and DeFi primitives with Web3 capital efficiency, turning corporate treasuries into programmable, yield-generating settlement systems.

**Agentic Integration (x402-Compatible Flows)**

TBook is x402-compatible, enabling autonomous AI agents to participate directly in on-chain capital flows using the same vault and policy infrastructure that governs human transactions.

At a system level, x402 acts as a machine-to-machine (M2M) payment protocol, standardizing how agents initiate and fulfill payment requests through the HTTP 402 response code. Agents transmit signed transaction payloads containing proof of work or service completion; TBook’s attestation layer validates these proofs and checks them against the originating project’s payment logic and jurisdictional policies before triggering settlement.

Each AI agent exposes a verifiable on-chain identity credential linked to a TBook Incentive Passport, allowing all transactions to be attributed and scored within the same reputation graph as human users. Upon verification, the Policy Engine executes payouts in stablecoin, token, or RWA format—under identical compliance, logging, and yield rules.

This unified framework allows humans, enterprises, and AI agents to operate on shared capital rails governed by the same compliance and trust infrastructure. x402 defines the communication layer; TBook defines how capital moves and settles across it.

## **Business Model**

TBook monetizes the orchestration of tokenized capital flows. Every verified contribution, distribution, and settlement passes through TBook’s rails, creating multiple points of value capture.

![](/img/DbFKz43nloVPB7jicMpq.png)

#### **Incentive Infrastructure**

TBook’s legacy business model is built around helping blockchain ecosystems (L1s, Web3 projects, RWA issuers) distribute tokenized incentives and coordinate capital efficiently. Revenue drivers include:

* **Issuance Fees**: partners pay for vSBT issuance and verification of on/off-chain actions;
* **Distribution Fees**: claim fees charged to users or sponsored by partners during incentive asset claims (e.g. airdrops);
* **Orchestration Fees:** A percentage fee on the capital flows TBook directs to RWA issuers and token distributions (e.g., through fair-launch auctions).
* **Data Access:** partners pay protocol fees in BOOK to query or target high-value cohorts indexed by their WISE Credit Score;

#### **Embedded Finance**

TBook scales through embedded finance partnerships with licensed fintechs, especially those that operate in emerging markets and serve large populations of young, underbanked users. TBook operates as the on-chain orchestration layer for tokenized balances, payments, and yield vaults inside regulated apps, giving users access to stablecoin accounts and RWA-backed yield without touching crypto directly. Once embedded, TBook positions itself as a retail distribution platform for RWAs, unlocking much-needed liquidity for asset issuers and transforming fintech user bases into passive RWA investors.&#x20;

* **RWA / Treasury Placement:** referral or management fees on tokenized yield instruments;
* **Card Interchange**: fee per transaction on crypto-linked card spending (regional variation);
* **Credit Margins:** reputation-based lending spread, enabling yield-generating credit lines for verified users and SMEs.

## **Tokenomics (BOOK)**

#### **Token Utility**

$BOOK is the native token that powers core functions of the TBook ecosystem. Its utility is engineered into the system’s infrastructure so that value capture happens at the point of use. Token utility includes:

1. **Incentive Asset Claims**\
   All SBTs and incentive assets distributed through TBook can be claimed in $BOOK. By integrating vSBT technology at the protocol layer, claim transactions consume about half the network gas compared to native chain execution. $BOOK acts as the optimized settlement channel.
2. **RWA Redemption**\
   TBook scales on-chain distribution of RWAs, through partnerships with token issuers like Ant Digital. At redemption, users who pay in $BOOK receive a protocol-level fee reduction. This creates native demand for $BOOK whenever RWA yields are settled.
3. **Reputation-Based Asset Distribution**\
   The WISE Credit Score is a composable identity layer adopted by 200+ projects. It aggregates Web2 and Web3 signals to filter for high-quality, verified users. Asset issuers pay protocol fees in $BOOK to query and target this dataset, which reduces Sybil risk, enforces compliance filters, and improves distribution efficiency.
4. **Token Gated Premium Features**\
   $BOOK functions as the gating key for advanced features across TBook products. For example, the Nexus Portal exposes higher-order APIs—verifying social contribution, measuring on-chain activity, or accessing analytics modules—that require $BOOK to unlock. Payments in $BOOK also carry built-in cost advantages.
5. **Governance**\
   Protocol-level parameters—such as upgrade paths, RWA onboarding, and grant allocation—are managed by BookDAO. $BOOK holders provide governance input directly tied to these system-critical functions.

#### **Distribution**

![](/img/AxI8GT6rBsTpW1uka6zl.png)

## **Notable Partners**

#### **Business Partnerships**

* **Paga** – One of the largest mobile payment platforms in Africa, with over 50K on-the-ground agents and 20M+ users. Paga is integrating TBook’s RWA vaults to generate yield on idle AUM.
* **Omnipay** – The Philippines’ largest payments infrastructure provider. First non-bank financial institution in the Philippines granted an electronic money issuer (EMI) license. Omnipay is integrating TBook to drive stablecoin flows for remittances and payroll.
* **Social Shopping Network (SSN)** – A fast-growing live-shopping platform within the TikTok ecosystem. SSN is embedding TBook’s RWA liquidity layer into creator-driven commerce, linking verified creator actions directly to payouts and rewards.

#### **RWA Partnerships**

* **R25** – Leading RWA protocol onboarding a broad range of institutional-grade RWAs on chain, including RWA assets with technology services provided by Ant Digital Technologies.
* **DigiFT** – Leading RWA tokenization platform licensed by regulatory bodies in Singapore and Hong Kong

#### **Strategic Partnerships with L1 Ecosystems**

* **Sui** – TBook is integrated directly at the L1 level, anchoring identity and reputation to RWA and stablecoin distributions into the Sui ecosystem. Mysten Labs, the core developer of Sui, is also leading our latest investment round
* **TON** – TBook is the largest issuer of token assets on TON, the L1 attached to Telegram. TBook has received a grant from TON Foundation and has partnered with over 100+ projects building on TON.

## **Roadmap (2025–2026)**

<table data-header-hidden><tbody><tr><td><strong>Q1 2026</strong></td><td><p><strong>Connecting settlement (stablecoins + RWAs)</strong> to identity and intelligence (see above) to form a unified incentive and payout system. In progress.</p><p><strong>RWA Distribution Vaults — Phase 1</strong>: Enable distribution of programmable, RWA yield-backed tokens with custom vesting. In progress.</p><p><strong>Embedded RWA Vaults</strong> — Launch treasury management product, sweeping stablecoin AUM into yield-bearing RWA and RWA-backed tokens. In progress.</p><p><strong>Token generation event (TGE) on Sui.</strong> In progress.</p></td></tr><tr><td><strong>2026</strong></td><td><p><strong>$BOOK Integration — Phase 1</strong>: Introduce core token utility for ecosystem incentives and credential-based distribution using $BOOK. In progress.</p><p><strong>Wallet Financial Products — Phase 1:</strong> Introduce features such as automated vault deposits on stablecoin balances. In progress.</p><p><strong>Multi-Chain Expansion (BSC, Solana, Base):</strong> Extend identity and settlement infrastructure beyond Sui and TON to BSC, Solana and Base, enabling cross-ecosystem distribution and RWA yield settlement. Not started.</p><p><strong>DAO Governance (Phase 1)</strong>: Launch Nexus + Engagement Basecamp governance for community voting. Not started.</p></td></tr><tr><td><strong>2027</strong></td><td><p><strong>$BOOK Integration — Phase 2</strong>: Expand token utility with fee reductions and partner reward mechanics. Not started.</p><p><strong>RWA Distribution Vaults — Phase 2</strong>: Expand available vault strategies and automate yield routing directly to user wallets. Not started.</p><p><strong>DAO Governance — Phase 2</strong>: Broaden the scope of DAO governance to additional scenarios. Not started.</p></td></tr></tbody></table>

## Appendices & References

[Website](https://www.tbook.com/)

[Deck](https://docsend.com/v/kxk96/tbook-rwa-liquidity-layer)

[X](https://x.com/realtbook)

[Discord](https://discord.com/invite/TBook)

[Telegram](https://t.me/tbookincentive)

[^1]: [Coindesk](https://www.coindesk.com/opinion/2025/02/07/rwa-tokenization-is-going-to-trillions-much-faster-than-you-think)
