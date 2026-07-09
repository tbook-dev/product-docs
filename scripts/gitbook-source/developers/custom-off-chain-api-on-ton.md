> For the complete documentation index, see [llms.txt](https://docs.tbook.com/tbook/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://docs.tbook.com/tbook/developers/custom-off-chain-api-on-ton.md).

# Custom Off-chain API on TON

### Overview <a href="#overview" id="overview"></a>

For off-chain tasks integration, partners need to implement two APIs following our standard format. You can customize the parameters based on your needs while maintaining the specified response format.

### 1 CTA Link <a href="#id-1.-cta-link" id="id-1.-cta-link"></a>

You can provide us with any link for users to complete the related task.

### 2 Verify Task API <a href="#id-2.-verify-task-api" id="id-2.-verify-task-api"></a>

Return the isVerified status of the user's current task based on the user's ton address.The API should handle both **bounceable** (EQ...) and **non-bounceable** (UQ...) ton address formats.

**Method:** GET

**URL:** baseUrl + /verify

**Parameters**

You can pass in either one of the following 2 parameters(depends on whether this application is onchain):

| Parameters   | Type    | Is required | Description        | E.g                                               |
| ------------ | ------- | ----------- | ------------------ | ------------------------------------------------- |
| tonAddress   | string  | required    | User’s ton address | EQBaR9uc0lL6meZi8ssCAqIg4B97EMXaj9-beRqiJe\_GPAop |
| telegram\_id | integer | required    | User's telegram id | 7049598999                                        |

e.g:

1. ​<https://rd-admin-api-staging.tbook.com/campaignNew/privateCredential/verify?tonAddress=asd>​
2. baseUrl/verify?type=task1\&tonAddress=EQBaR9uc0lL6meZi8ssCAqIg4B97EMXaj9-beRqiJe\_GPAopbaseUrl/verify?type=task2\&telegram\_id=7049598999

**Responses**

Success:

`{"code":200,"status":"success","message":"msg","isVerified": true}`

​Error:

`{"code":400,"status":"error","message":"error msg","isVerified": false}`

### **Implementation Notes**

* Partners can define custom parameters or paths to handle different tasks
* Internal verification logic is implemented by partners
* Must follow the specified response format
* Response format details to be documented (please provide the expected response format)

<br>
