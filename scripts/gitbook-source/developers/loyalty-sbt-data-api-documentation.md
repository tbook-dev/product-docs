> For the complete documentation index, see [llms.txt](https://docs.tbook.com/tbook/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://docs.tbook.com/tbook/developers/loyalty-sbt-data-api-documentation.md).

# Loyalty SBT Data API Documentation

## **Host**

[https://rd-api-staging.tbook.com](https://rd-api-staging.tbook.com/) (staging)\
[https://rd-api.tbook.com](https://rd-api.tbook.com/)(prod)

## Authentication

All API requests require the following header:

`Authorization: tbk_authorization_djoi39ide2`

## Base URL

### Staging

`https://rd-api-staging.tbook.com/sbt-data`

### Production

`https://rd-api.tbook.com/sbt-data`&#x20;

### Get Single User SBT Data

<details>

<summary><strong>Endpoint</strong></summary>

GET /gonative/user

</details>

<details>

<summary><strong>Request Parameters</strong></summary>

| Parameter | Type   | Required | Description               |
| --------- | ------ | -------- | ------------------------- |
| address   | string | Yes      | User’s Sui wallet address |

</details>

<details>

<summary><strong>Example Request</strong></summary>

```
curl -X GET "https://rd-api-staging.tbook.com/sbt-data/gonative/user?address=0x2dd4b2c1510a470ecad9235dfa8417de8bfa07e900df8308e448a2314849f656" \
  -H "Authorization: tbk_authorization_djoi39ide2"
```

</details>

<details>

<summary><strong>Example Response</strong></summary>

```
{
 "code": 0,
 "message": "Success",
 "data": {
   "suiAddress": "0x2dd4b2c1510a470ecad9235dfa8417de8bfa07e900df8308e448a2314849f656",
    "claimedSocialSbts": [
     {
       "level": 1,
       "sbtId": 924797288332,
       "title": "Verified Visitor",
       "taskName": "Connect Discord (OAuth)",
       "points": 20
     },
     {
       "level": 2,
       "sbtId": 924799978339,
       "title": "Linked Broadcaster",
       "taskName": "Connect X (OAuth)",
       "points": 80
     },
     {
       "level": 3,
       "sbtId": 924802108346,
       "title": "Native Follower",
       "taskName": "Follow @goNativeCC (verified via OAuth)",
       "points": 180
     }
   ],
   "claimedReferralSbts": [
     {
       "level": 1,
       "sbtId": 923094208259,
       "title": "First Invite",
       "taskName": "Invite 1 friend to claim",
       "points": 20,
       "invitesRequired": 1,
       "claimed": false
     }
   ],
   "claimedLockdropSbts": [
      {
        "level": 1,
        "sbtId": 971285598686,
        "title": "Seed Locker",
        "taskName": "Commit $21 equivalent",
        "points": 21,
        "usdRequired": 21
      }
    ],
   "totalRawPoints": 280,
   "referralLink": "https://campaign-staging.tbook.com/native/incentive/1?code=VDERFQ"
   "sbtCount": 3,
   "invitees": [
     {
       "suiAddress": "0x3623ea33a9f84044b9d4c2691845339c07471bbcf440098e6aeef103f5c872df",
       "inviteDate": "2025-11-05T20:30:49Z"
     }
   ],
   "inviteeCount": 1
 }
}
```

</details>

<details>

<summary><strong>Response Fields</strong></summary>

**suiAddress** — User wallet address

**referralLink** — "$baseUrl/native/incentive/$nativeCampaignId?code=$inviteCode"

**claimedSocialSbts** — Array of claimed social SBTs

* level: SBT tier (1–10)
* sbtId: Unique SBT ID
* title: SBT title
* taskName: Task description
* points: Raw points for this referral SBT

**claimedReferralSbts** — Array of claimed referral SBTs

* level: Referral tier (1–10)
* sbtId: Unique referral SBT ID
* title: Referral title (e.g., "First Invite", "Network Starter")
* taskName: Referral task description (e.g., "Invite 3 friends to claim")
* invitesRequired: Number of invites required for this level
* points: Raw points for this referral SBT

**claimedLockdropSbts** - Array of claimed Lockdrop SBTs

* level: Lockdrop tier (1–10)
* sbtId: Unique SBT ID
* title: SBT title
* taskName: Task description (e.g., "Invite 3 friends to claim")
* points: Raw points for this lockdrop SBT
* usdRequired: Minimum USD value required in USDC for verification

**invitees - An array containing information about users invited by this user**&#x20;

**totalRawPoints** — Sum of all raw SBT points

**sbtCount** — Total claimed SBT count

</details>

### Get All Users SBT Data (Paginated)

<details>

<summary><strong>Endpoint</strong></summary>

GET /gonative/all-users

</details>

<details>

<summary><strong>Request Parameters</strong></summary>

| Parameter | Type    | Required | Default | Description                   |
| --------- | ------- | -------- | ------- | ----------------------------- |
| page      | integer | No       | 1       | Page number (starting from 1) |
| pageSize  | integer | No       | 10      | Items per page (range 5–20)   |

</details>

<details>

<summary><strong>Example Request</strong></summary>

```
curl -X GET "https://rd-api-staging.tbook.com/sbt-data/gonative/all-users?page=1&pageSize=10" \
  -H "Authorization: tbk_authorization_djoi39ide2" 
```

</details>

<details>

<summary><strong>Example Response</strong></summary>

```
{
  "code": 0,
  "message": "Success",
  "data": {
    "users": [
      {
        "suiAddress": "0x39acdf0e2be5a4bf0d0445c7a6f59f523fa9553cbc07498059da01279525e4dd",
        "sbtCount": 3,
        "totalRawPoints": 280,
        "claimedSocialSbts": [
          {
            "level": 1,
            "sbtId": 924797288332,
            "title": "Verified Visitor",
            "taskName": "Connect Discord (OAuth)",
            "points": 20
          },
          {
            "level": 2,
            "sbtId": 924799978339,
            "title": "Linked Broadcaster",
            "taskName": "Connect X (OAuth)",
            "points": 80
          },
          {
            "level": 3,
            "sbtId": 924802108346,
            "title": "Native Follower",
            "taskName": "Follow @goNativeCC (verified via OAuth)",
            "points": 180
          }
        ],
"claimedReferralSbts": [
     {
       "level": 1,
       "sbtId": 923094208259,
       "title": "First Invite",
       "taskName": "Invite 1 friend to claim",
       "points": 20,
       "invitesRequired": 1,
       "claimed": false
     }
   ],

      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalUsers": 45000,
      "totalPages": 4500
    }
  }
}
```

</details>

<details>

<summary><strong>Response Fields</strong></summary>

*users*

List of users, each containing:

* suiAddress
* sbtCount
* totalRawPoints
* claimedSocialSbts (same structure as the single-user API)
* claimedReferralSbts (same structure as the single-user API)<br>

*pagination*<br>

* currentPage — Current page number
* pageSize — Items per page
* totalUsers — Total number of users
* totalPages — Total pages

</details>
