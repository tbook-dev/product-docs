> For the complete documentation index, see [llms.txt](https://docs.tbook.com/tbook/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://docs.tbook.com/tbook/embedded-rwa-liquidity-layer/verifiable-sbt-on-sui/tbook-sbt-contract-business-application-guide.md).

# TBook SBT Contract Business Application Guide

## What is the TBook SBT System?

TBook SBT (Soulbound Token) system is a decentralized identity credential platform built on the Sui blockchain. It enables projects to deploy their own SBT collections and issue non-transferable digital credentials to users, building trusted digital identity and achievement systems.

## Core Business Value

### **Decentralized Identity Verification**

**Trusted Credentials**: Unforgeable digital certificates based on blockchain technology

**Permanent Storage**: Credentials permanently bound to user wallets, cannot be lost or transferred

**Global Verification**: Anyone can verify the authenticity and validity of credentials

### Low-Cost Deployment

**No Development Required:** Projects can directly use existing contracts without redevelopment

**Quick Launch:** Complete process from deployment to credential issuance in hours

**Flexible Fees:** Adjustable creation and minting fees based on business needs

### Multi-Scenario Applications

**On-Chain Activities**: DeFi protocol interaction proof, NFT trading milestones, governance participation badges

**Social Media Activities**: Twitter engagement campaigns, Discord community roles, content creator achievements

**Membership Systems**: VIP membership status, community identity, permission proof

**Event Participation**: Conference attendance proof, competition records, community contribution certificates

**Compliance Proof:** KYC verification status, audit records, qualification certificates

## Business Operation Model

### Project Perspective: Deployment and Management

#### **Quick Deployment Process**

{% stepper %}
{% step %}
**Prepare Collection Information**

Collection Name: e.g., "TBook Certified Developer"

Description: Detailed explanation of SBT meaning and earning conditions

Badge Image: Design exclusive badge icon

Unique Identifier: Set unique collection ID
{% endstep %}

{% step %}
**Obtain Deployment Signature**

Request deployment signature from TBook authorization service

Provide collection details and project verification materials

Obtain time-limited signature (15-minute validity)
{% endstep %}

{% step %}
**On-Chain Deployment**

Call create\_collection() function

Pay collection creation fee

Receive CollectionAdminCap management permissions
{% endstep %}
{% endstepper %}

#### **Collection Management Permissions**

After obtaining a collection, projects can:

**Control Minting Rights**: Decide who can obtain the SBT

**Set Minting Conditions**: Define conditions users must meet

**Manage Collection Info**: Update descriptions and related information

**Monitor Minting Status**: View all minting records and holders

#### **Revenue Models**

**Brand Value Enhancement:** Increase brand credibility through blockchain technology

**User Stickiness:** Permanent credentials improve user loyalty

**Data Asset Accumulation:** On-chain data becomes valuable digital assets

**Ecosystem Expansion:** Create synergies with other DeFi/Web3 projects

### User Perspective: Acquiring and Using

#### **Credential Acquisition Process**

{% stepper %}
{% step %}
**Complete Project Requirements**

Complete course studies

Participate in activity tasks

Pass skill verification

Meet membership conditions
{% endstep %}

{% step %}
**Apply for Minting Eligibility**

Submit completion proof materials

Project reviews user eligibility

Receive minting permission confirmation
{% endstep %}

{% step %}
**Obtain Signature and Mint**

Request minting signature from authorization service

Signature contains user address, collection ID, etc.

Call mint() function to complete minting

Pay small minting fee
{% endstep %}
{% endstepper %}

#### **Credential Value Realization**

**Identity Proof**: Prove abilities and experiences in Web3 ecosystem

**Access Rights:** Gain access to exclusive services, communities, or platforms

**Reputation Building**: Build trusted reputation in digital world

**Opportunity Access**: Obtain more work or collaboration opportunities based on credentials

#### **User Verification Examples**

<details>

<summary><strong>Example A: On-Chain Task Verification</strong></summary>

**Scenario**: User wants to earn "DeFi Expert" SBT by completing on-chain activities

**Verification Flow:**

1. User connects wallet to TBook platform
2. System checks on-chain requirements:

* Has swapped tokens worth at least $1,000 on designated DEX
* Has provided liquidity for at least 30 days
* Has participated in at least 3 governance votes

3. System queries blockchain data via Sui RPC:

* Verifies transaction history
* Checks liquidity pool positions
* Validates governance participation records

4. All criteria met → TBook generates time-limited signature
5. User receives signature and calls mint() function
6. SBT successfully minted and bound to wallet

**Key Verification Points:**

* Transaction authenticity verified via blockchain explorer
* Minimum value requirements checked
* Time duration requirements validated
* All checks must pass before signature issuance

</details>

<details>

<summary><strong>Example B: Social Task Verification</strong></summary>

**Scenario**: User wants to earn "Community Builder" SBT by completing social media tasks

**Verification Flow:**

1. User connects Twitter/Discord accounts to TBook
2. System checks social task requirements:

* Follow project's official Twitter account
* Retweet and like the campaign post
* Join Discord server and verify role
* Invite at least 5 friends who complete tasks

3. TBook verification service checks each task:

* Twitter API verifies follow/retweet/like status
* Discord bot confirms server membership and role
* Referral system validates invited friends' completion

4. All tasks completed → Generate signature with user's wallet address
5. User calls mint() with signature on Sui blockchain
6. SBT minted after on-chain signature verification

**Key Verification Points:**

* OAuth authentication for social account binding
* Real-time API calls to verify task completion
* Anti-fraud checks (bot detection, fake accounts)
* Referral chain validation
* Only genuine completion triggers signature generation

</details>

### Verification and Signature Mechanism

#### Dual Verification System

<details>

<summary><strong>Business Layer Verification (Off-chain)</strong></summary>

**Purpose**: Ensure only qualified users can obtain minting permissions

**Process:**

User Application → Project Review → Business System Verification → Generate Minting Eligibility

**Verification Content:**

* User identity authenticity
* Proof materials for completed tasks
* Whether conditions are met
* Prevention of duplicate applications

</details>

<details>

<summary><strong>Technical Layer Verification (On-chain)</strong></summary>

**Purpose**: Ensure security and legitimacy of minting process

**Signature Mechanism:**

// Signature message format

const message = \`${contractAddress}|${collectionId}|${timestamp}|${userAddress}|${sbtId}\`;

// Sign using Ed25519 algorithm

const signature = ed25519.sign(message, privateKey);

**Verification Elements:**

* Contract Address: Ensure operation on correct contract
* Collection ID: Verify user is minting from correct collection
* Timestamp: Prevent signature replay attacks (15-minute expiration)
* User Address: Ensure only designated user can use the signature
* SBT ID: Guarantee uniqueness of each SBT

</details>

#### Security Guarantee Mechanisms

<details>

<summary><strong>Time-based Control</strong></summary>

* ignatures automatically expire after 15 minutes
* Prevent malicious use of old signatures
* Ensure real-time nature of minting process

</details>

<details>

<summary><strong>Duplicate Protection</strong></summary>

Same user can only mint once per collection

Prevent obtaining duplicate identical credentials

Maintain credential scarcity and meaning

</details>

<details>

<summary><strong>Permission Control</strong></summary>

Only users with valid signatures can mint

Administrators can pause entire system

Collection creators have independent management permissions

</details>

### Real Application Cases

<details>

<summary>Case 1: Social Media Engagement Campaign</summary>

**Application Scenario:**

* Issue "Community Ambassador" SBT to active social media participants
* Users must complete off-chain social tasks: follow Twitter account, retweet campaign posts, join Discord server, invite 5 friends
* TBook verification system checks task completion before issuing signature
* SBT grants access to exclusive NFT whitelists and community events

</details>

<details>

<summary>Case 2: DeFi Community Governance</summary>

Application Scenario:

* Issue "Governance Committee Member" SBT to active governance participants
* Users must participate in at least 10 proposal votes
* SBT holders gain advanced governance permissions

</details>

<details>

<summary>Case 3: Gaming Achievement System</summary>

Application Scenario:

* Issue "Hero" SBT to players who clear difficult dungeons
* Only top 100 players server-wide can obtain it
* SBT has special value in game ecosystem

</details>

## Deployment Guide

#### Technical Preparation

**Sui Wallet Configuration:** Prepare sufficient SUI tokens to pay fees

**Private Key Management:** Securely store private keys used for signing

**Server Setup**: Deploy signature generation and verification services

**Frontend Integration:** Integrate Sui wallet connection functionality

#### Fee Structure

**Collection Creation Fee:** One-time payment for collection management rights

**Minting Fee:** Network fee paid for each mint

**Maintenance Cost:** Signature service and business system operation costs

#### Operational Recommendations

**Clear Value Proposition:** Clearly define what the SBT represents and its significance

**Design Reasonable Thresholds:** Balance acquisition difficulty with user participation enthusiasm

**Establish Verification System:** Ensure fairness and transparency of issuance process

**Continuous Operations:** Regular system updates and user need responses

## Ecosystem Integration

#### Interoperability with Other Platforms

**Identity Aggregators**: Integration with Web3 identity platforms

**DeFi Protocols**: Used as credit assessment basis

**Social Networks:** Display personal achievements and credentials

**Recruitment Platforms:** Serve as skill and experience proof

#### Future Development Directions

**Cross-chain Interoperability:** Support multiple blockchain networks

**AI Integration:** Intelligent credential verification and recommendation

**Privacy Protection:** Application of zero-knowledge proof technology

**Metaverse Integration:** Display digital identity in virtual worlds

## Summary

The TBook SBT system provides a complete solution for digital identity and credential management in the Web3 era. Through simple deployment processes, projects can quickly build their own credential systems, providing users with trusted, permanent, and valuable digital identity proof.

This is not just technological innovation, but business model innovation—it returns control of digital identity to users while providing projects with new tools for user incentives and brand building. As the Web3 ecosystem continues to develop, SBT-based identity systems will become important infrastructure for the digital economy.

<br>
