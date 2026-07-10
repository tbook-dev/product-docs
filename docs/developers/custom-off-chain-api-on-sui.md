# Custom Off-chain API on Sui

### Overview {#overview}

For off-chain task integration, you need to implement two APIs following our standard format.You may customize parameters as needed, but the response format must strictly follow this standard.

### **1 CTA Link**

You can provide any link for users to complete the related task.

### **2 Verify Task API**

Based on the user’s Sui Address, you should return the isVerified status of the user’s current task.

**Method:** `GET`

**Endpoint:** `baseUrl + /verify`

**Parameters**

| Parameters | Type   | Is required | Description        | E.g                                                                |
| ---------- | ------ | ----------- | ------------------ | ------------------------------------------------------------------ |
| suiAddress | string | Yes         | User's Sui Address | 0x39acdf0e2be5a4bf0d0445c7a6f59f523fa9553cbc07498059da01279525e4dd |

**Example Request**

`GET {baseUrl}/verify?suiAddress=0x39acdf0e2be5a4bf0d0445c7a6f59f523fa9553cbc07498059da01279525e4dd`

**Response Format**

Verification Passed

`{"code": 200,"status": "success","message": "Task verification succeeded","isVerified": true}`

Verification Failed

`{"code": 400,"status": "error","message": "Task verification failed","isVerified": false}`

### Implementation Notes {#implementation-notes}

* You can define your own internal verification logic.
* Your verification API must accept `suiAddress` as the required parameter.
* The response JSON format must strictly follow the above specification (fields: `code, status, message, isVerified`).
* `isVerified` must return a boolean.
* The `message` field is for internal use only and will not be exposed to end users.
