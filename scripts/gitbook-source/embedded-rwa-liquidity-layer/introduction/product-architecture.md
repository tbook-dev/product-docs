> For the complete documentation index, see [llms.txt](https://docs.tbook.com/tbook/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://docs.tbook.com/tbook/embedded-rwa-liquidity-layer/introduction/product-architecture.md).

# Product Architecture

Our architecture enables RWA distributions to flow directly to verified participants. Transactions are executed on TBook native platforms or embedded within the UI/UX of user-facing apps, with compliance, verification, and yield management occur automatically behind the scenes.

<figure><img src="/files/CWZTLipjfIy2nQzy26X2" alt=""><figcaption></figcaption></figure>

## TBook Asset Distribution Stack

### Identity Layer

The Identity Layer powers engagement across L1 ecosystems by incentivizing user actions and capturing each user’s verifiable digital footprint.

* **Incentive Passports** are decentralized IDs (DIDs) that record user contributions and credentials.
* **TBook Nexus** is TBook’s incentive campaigns and incentive assets management platform. It consists of three components:
  * [Verifiable soulbound tokens (vSBTs)](https://docs.google.com/document/d/12QE8pv6H0jPOoHwdW-cXZIlugLSh1V9o2uF0WT2vdos/edit?pli=1\&tab=t.851f6oox9bv2) that serve as Proof of Contribution or Credentials. vSBTs are a unique standard to TBook, enabling portable, tamper-proof contribution credentials and reputation across ecosystems;&#x20;
  * Partner-facing portal that allows projects to issue vSBTs tied to a programmable range of user actions (e.g. staking, swapping or even joining a Discord AMA);
  * TBook’s attestation network cross-checks the validity of user contributions and credentials, enabling users to mint vSBTs once their actions are verified. Click here to see a sample user vSBT claim flow.
* **Engagement Basecamp** is the front page for users to discover ways to engage with projects across an L1 ecosystem, earning vSBTs that unlock exclusive benefits.

### Intelligence Layer

This layer attributes value to user behavior, allowing TBook to program capital flows—stablecoin payments and RWA distributions—tied directly to value created.

* The [**WISE Credit Score**](https://docs.google.com/document/d/12QE8pv6H0jPOoHwdW-cXZIlugLSh1V9o2uF0WT2vdos/edit?pli=1\&tab=t.k8p044epr2v8) translates user actions into a single, verifiable measure of reputation. It attributes value across four dimensions—Wealth, Identity, Social, and Engagement—capturing both on-chain and off-chain activity.&#x20;
* **Built-in partner logic** lets partners design custom vesting and distribution flows that link tokenized assets—stablecoins, RWAs, or project tokens—to verified user contributions. Access to RWA products or First Dibs, TBook’s fair launch platform, can be token-gated to ensure compliance and align distribution with verified identities.

### Smart Settlement Layer

The Smart Settlement Layer integrates data from the Intelligence Layer to execute programmable distribution and vesting for RWAs and tokens across networks.

* **TBook Vaults** let users claim tokenized assets (stablecoins, RWAs, airdropped tokens, etc…) through TBook’s web app, Telegram Mini App, or embedded claim flows within partner platforms.&#x20;
* **RWA Distribution Vaults** enable the distribution of RWAs at scale through composable mirror tokens with custom vesting and yield optimization. Core features include tokenization, compliance, distribution, and yield enhancement.
* **Crypto cards** let users off-ramp their crypto at point of purchase. TBook has launched a crypto-card on TON, equipped with Visa and Mastercard.
