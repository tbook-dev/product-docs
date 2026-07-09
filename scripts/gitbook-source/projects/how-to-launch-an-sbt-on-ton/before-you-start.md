> For the complete documentation index, see [llms.txt](https://docs.tbook.com/tbook/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://docs.tbook.com/tbook/projects/how-to-launch-an-sbt-on-ton/before-you-start.md).

# Before You Start

Before deploying and launching SBTs via TBook, we recommend preparing the following materials and information to streamline the setup process and ensure a smooth user experience.

### Project Information

<details>

<summary><strong>Project Name</strong></summary>

Used for project creation and will be displayed on the SBT detail page and the project’s homepage on the user side.

</details>

<details>

<summary><strong>Project Logo</strong></summary>

Recommended size: 256x256 px, in PNG or JPG format. A transparent background is preferred for better presentation.

</details>

<details>

<summary><strong>Project Description in short sentences</strong></summary>

Helps users quickly identify your project. We suggest keeping it under 100 characters, highlighting your project’s core positioning.

</details>

<details>

<summary><strong>Official Website / Social Media Links</strong></summary>

TBook support to show your official website, Twitter, Telegram channel on your project profile page.

</details>

### SBT Information

<details>

<summary>SBT Name</summary>

Name your SBT a clear and meaningful name—e.g., Early Contributor, Beta Tester, Community Guardian—to reflect the role, contribution or milestone it represents.

</details>

<details>

<summary>SBT Description</summary>

Describe the significance and value of the SBT to help users understand what it represents.

</details>

<details>

<summary>SBT Design</summary>

* **Image (Required):** Recommended size: 256x256 px, PNG format. Consider a badge-style design with strong visual recognition
* **Video (Optional):** Required in .mp4 format

</details>

### SBT Verification Principles

TBook supports a variety of on-chain and off-chain tasks as SBT Verification criteria. Please review the following before setup:

<details>

<summary>Telegram Group / Channel Tasks</summary>

If you want to verify whether a user has joined a Telegram group or subscribed to a channel, please ensure the group/channel is **Public**.

> Due to Telegram limitations, TBook can only support automatic verification for Public groups/channels.
>
> For Private group/channel verification, this is a **Pro feature** and requires you to provide a **Verification API** and pay an additional fee.

</details>

<details>

<summary>On-chain Credential Verification (Pro)</summary>

To verify on-chain activities (e.g., contract interaction, asset staking, NFT claiming), custom logic will be developed by the TBook team.

> After deploying your SBT and launching the SBT Verification, our team will contact you during the review process. You’ll need to provide clear task definitions and pay for a fee to cover development costs (Pro feature).

</details>

<details>

<summary>Custom Off-chain Credential Verification (Pro)</summary>

If you require off-chain tasks such as in-game level contributions or topping a leaderboard in your app, you need provide the Verification API following our format.

> This integration also falls under Pro services and requires an development fee.

</details>

{% hint style="info" %}
Reminder

* For simpler use cases, we recommend starting with TBook’s **native verification types** (e.g., wallet binding, joining a public Telegram group). These are quick to set up and free to use.
* For any **Pro verification tasks**, please contact the TBook team in advance to discuss feasibility. We’re here to support your efficient implementation.
  {% endhint %}
