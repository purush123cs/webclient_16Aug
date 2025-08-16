const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 9001

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/employees', (req, res) => {
	console.log("entered /1 endpoint");
	const mockResponse = {
							"employeeId": "1",                  
							"employeeName": "purush"
                         }
	console.log("res body:"+JSON.stringify(mockResponse));
	res.status(200).json(mockResponse);
})

app.get('/employees/1', (req, res) => {
	console.log("entered /1 endpoint");
	const mockResponse = {
							"employeeId": "1",                  
							"employeeName": "purush"
                         }
	console.log("res body:"+JSON.stringify(mockResponse));					 
	res.status(200).json(mockResponse);
})

//RPVS
app.post('/validate', (req, res) => {
	//const mockResponse = {};
	/*
	const mockResponse = 
	{
	   "httpStatusCode": 403,
	   "errorCode": "RP-001",
	   "errorMessage": "PRODUCT VALIDATION FAILED",
	   "errorDetail": "Items in the basket failed RPVS validation",
	   "basketValidationErrors": [
		  {
			 "paymentInstrumentId": "187733",
			 "paymentInstrumentType": "GIFT_CARD",
			 "items": [
				{
				   "itemId": "1234",
				   "validationErrors": [
					  {
						 "type": "NOT_ALLOWED",
						 "reasonCode": "RCNA1000",
						 "reasonDescription": "Some description for RCNA1000"
					  }
				   ]
				}
			 ]
		  }
	   ]
	};
	*/
	const mockResponse = {
  "httpStatusCode": 403,
  "errorCode": "RP-001",
  "errorMessage": "PRODUCT VALIDATION FAILED",
  "errorDetail": "Items in the basket failed RPVS validation",
  "basketValidationErrors": [
    {
      "paymentInstrumentId": "2510009",
      "paymentInstrumentType": "CREDIT_CARD",
      "items": [
        {
          "itemId": "900934",
          "category": "",
          "subcategory": "",
          "validationErrors": [
            {
              "type": "NOT_ALLOWED",
              "reasonCode": "1",
              "reasonDescription": "Bin & ItemId restriction on your selected payment method"
            }
          ]
        }
      ]
    }
  ]
};

//setTimeout(() => {res.status(403).json(mockResponse)}, 40000);	
	res.status(403).json(mockResponse);
	
	//res.status(500).json(mockResponse);

})

//DP mock for wallet orchestration service-apple pay tokenization-registered user
app.post('/container-ws/tokens/applepay', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"2lYOiq0EdNdv8","messageId":null,"txnTime":1644551489455,"error":null,"esResponse":null},"item":{"itemID":"270878","paymentToken":"e15289a6-59fb-4269-829a-0432fd8d060d","type":"APPLE_PAY","itemFields":[],"sequence":0,"primary":true,"createdOn":1644551489780,"lastUpdated":1644551489780,"lastUsed":null,"requiresCvv":null,"expired":false,"allowed":true,"status":"VERIFIED","action":null,"updateUrl":null,"stepUpToken":"ecceeedd-0065-4a17-96c0-85f95a5a80ed"}}
	
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service-apple pay update token
app.post('/container-ws/nativetokens/refresh', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"RQLdIEyRengLM","messageId":null,"txnTime":1644552397061,"error":null,"esResponse":null},"item":{"itemID":"270879","paymentToken":"dfeb9958-4edb-4ddc-a2bc-6d2d81bebbca","type":"APPLE_PAY","itemFields":[],"sequence":0,"primary":true,"createdOn":1644552360107,"lastUpdated":1644552397269,"lastUsed":null,"requiresCvv":null,"expired":false,"allowed":true,"status":"VERIFIED","action":null,"updateUrl":null,"stepUpToken":"824e7a62-7155-4f8d-b131-ce04ee48866a"}}
	
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service-apple pay tokenization-guest
app.post('/container-ws/guest/tokens/applepay', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"l4bNHQ32LA6kW","messageId":"5ea9dee43d18b7e5bafee3bcdbbea251","txnTime":1644552930603,"error":null,"esResponse":{"code":null,"text":null}},"item":{"itemID":"f7ce1ae7-dd38-4081-87d0-433fc3283f6b","paymentToken":"f7ce1ae7-dd38-4081-87d0-433fc3283f6b","type":"APPLE_PAY","itemFields":[],"sequence":0,"primary":false,"createdOn":1644552930620,"lastUpdated":null,"lastUsed":null,"requiresCvv":null,"expired":false,"allowed":true,"status":"UNVERIFIED_TRANSIENT","action":null,"updateUrl":null,"stepUpToken":null},"fraudResponse":null}
	
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service-google pay tokenization-registered user-Container auth
app.post('/container-ws/session/tokenise', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"ydqsR9O5x456","messageId":"855187523c1311aa0551afba732a5ba9","txnTime":1645774155696,"error":null,"esResponse":null},"sessionID":"296060c5-da1b-48d8-8afb-e37f07235f6b","containerRef":null,"iframeurl":null}
		
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service-google pay tokenization-registered user
app.post('/tokenisation/googlepay', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"4427477f-8667-4930-b330-18f2fbeca43f","txnTime":1645684601093,"error":null,"esResponse":null},"paymentToken":"82e428b2-cbbc-436e-9504-2705d565b70b","createdOn":1645684601093}
	
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service-google pay update token-reg user-Container auth
//not needed, as the Container auth endpoint is same for tokenize and update token
/*
app.post('/container-ws/session/tokenise', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"o1DIRmgyNyR2","messageId":"ef58a5cacdb954e678f86f557a3c8403","txnTime":1645775022375,"error":null,"esResponse":null},"sessionID":"364102b7-18de-4226-b719-9a7f9701b062","containerRef":null,"iframeurl":null}
		
	res.status(200).json(mockResponse);
})
*/

//DP mock for wallet orchestration service-google pay update token - reg user
app.post('/tokenisation/googlepay/refresh', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"5bf225f6-7287-418b-a966-9922996d449d","txnTime":1645685050352,"error":null,"esResponse":null},"paymentToken":"82e428b2-cbbc-436e-9504-2705d565b70b","createdOn":1645685050352}
	
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service-google pay tokenization-guest-Container auth
app.post('/container-ws/guest/session/tokenise', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"LM0seWRlGE3y","messageId":"54324157c11ddbad59589d26bf98e61a","txnTime":1645685516053,"error":null,"esResponse":null},"sessionID":"a3ad9a27-12be-44f5-b3b9-2225e2ba9761","containerRef":null,"iframeurl":null}
	
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service-google pay tokenization-guest
app.post('/tokenisation/googlepay', (req, res) => {
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"59541ffa-38b1-4354-87c8-2f05c0dd9949","txnTime":1645685516251,"error":null,"esResponse":null},"paymentToken":"e27bac62-1ac6-44dd-b90d-9b775ae6878f","createdOn":1645685516251}
	
	res.status(200).json(mockResponse);
})

//DP mock for wallet orchestration service
app.post('/container-ws/paymentagreement/update', (req, res) => {
	//console.log("body:"+JSON.stringify(req.body));
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"KyL82f0k3y1p9K","messageId":"cc562650cbea926448eeeeb9d915da12","txnTime":1643694185869,"error":null,"esResponse":null},"transactionReceipt":"1000000007957544","paymentAgreement":{"type":"RECURRING","startDate":1643689597297,"endDate":1667393999999,"frequency":"WEEKLY","charge":101.9899999999999948840923025272786617279052734375,"paymentToken":"16b92f0e-5e3b-4de1-9bc7-cdbccbceda74","chargeCycleNumber":"0","fundingInstrument":{"id":223481,"type":"PAYPAL","itemFields":[{"name":"customerEmail","data":"buyer3-1@test.digitalpay.com.au"},{"name":"applicationId","data":"10001"},{"name":"customerId","data":"579845290"}]}},"action":null,"fraudResponse":{"fraudClientId":"6436941870986422403012","fraudReasonCd":"100","fraudDecision":"ACCEPT","riskInformation":[{"name":"Accept rule1","decision":"ACCEPT"}]}}
	
	res.status(200).json(mockResponse);

})

//DP mock for wallet orchestration service
app.post('/container-ws/paymentagreement/create', (req, res) => {
	//console.log("body:"+JSON.stringify(req.body));
	
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"rbQ1oH0pEGGrvq","messageId":"190ab6da9925a00067a48cc091999d30","txnTime":1642742023405,"error":null,"esResponse":{"code":"00","text":"APPROVED"}},"transactionReceipt":"1000000007947712","paymentAgreement":{"type":"RECURRING","startDate":1642742023398,"endDate":1667393999999,"frequency":"WEEKLY","charge":99.9899999999999948840923025272786617279052734375,"paymentToken":"d3222817-3c0e-4798-bbad-3f0d982c185f","chargeCycleNumber":"0","fundingInstrument":{"id":222871,"type":"CREDIT_CARD","itemFields":[{"name":"cardSuffix","data":"0608"},{"name":"scheme","data":"VISA"},{"name":"expiryMonth","data":"02"},{"name":"nickName","data":"My Card"},{"name":"cvvValidated","data":"0"},{"name":"bin","data":"456004"},{"name":"expiryYear","data":"23"}]},"extendedInformation":[]},"action":null,"fraudResponse":{"fraudClientId":"6427420254866364803008","fraudReasonCd":"100","fraudDecision":"ACCEPT","riskInformation":[{"name":"Accept rule1","decision":"ACCEPT"}]}}
	
	res.status(200).set({
		  'X-testheader1': '123',
		  'X-testheader2': '234',
		  'X-testheader3': '345',
		}).json(mockResponse);

})

//DP mock for payment orchestration service
app.post('/container-ws/merchant/payments/charge', (req, res) => {
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"db6bFvrOMgB8v","messageId":"9c615014-1559-4414-9d82-1c77c189ed5d","txnTime":1640147851545,"error":null,"esResponse":{"code":"00","text":"APPROVED"}},"transactionReceipt":"1000000007921673","paymentAgreement":{"type":"RECURRING","startDate":1640147511290,"endDate":1667393999999,"frequency":"WEEKLY","charge":99.9899999999999948840923025272786617279052734375,"paymentToken":"e3523a56-4eb7-4e71-8bfb-e6144a633d08","chargeCycleNumber":"1","fundingInstrument":{"id":221039,"type":"CREDIT_CARD","itemFields":[{"name":"expiryYear","data":"23"},{"name":"cvvValidated","data":"0"},{"name":"scheme","data":"VISA"},{"name":"bin","data":"456004"},{"name":"nickName","data":"My Card"},{"name":"cardSuffix","data":"0608"},{"name":"expiryMonth","data":"02"}]},"extendedInformation":[{"field":"bin","value":"456004"},{"field":"stan","value":"164238"},{"field":"rrn","value":"000000164238"},{"field":"token","value":"45600480000045001330"},{"field":"mid","value":"611000602008843"},{"field":"terminalId","value":"W8843100"}]},"fraudResponse":{"fraudClientId":null,"fraudReasonCd":null,"fraudDecision":null,"riskInformation":null}}
	
	res.status(200).json(mockResponse);

})

//DP mock for payments in payment orchestration service
app.post('/container-ws/payments', (req, res) => {
	/*
	const mockResponse = 
	{"status":{"responseText":"PAYMENT TRANSACTION FAILED","responseCode":"ES52","auditID":"QxqQudd7xb35o","messageId":"a020cfa48fc60e5ddbf759ea24e85a72","txnTime":1638501005514,"error":{"context":"processing payment","description":"PAYMENT TRANSACTION FAILED","correction":"Please try later or contact support for further investigation."},"esResponse":null},"transactionReceipt":"1000000007897077","responses":[{"status":{"responseText":"PAYMENT TRANSACTION FAILED","responseCode":"ES52","auditID":"QxqQudd7xb35o","messageId":"a020cfa48fc60e5ddbf759ea24e85a72","txnTime":1638501005514,"error":{"context":"processing payment","description":"PAYMENT TRANSACTION FAILED","correction":"Please try later or contact support for further investigation."},"esResponse":{"code":"10010","text":"Balance is insufficient."}},"transaction":{"transactionRef":"1000000007897077","extendedInformation":[],"handlingInstructions":null,"amount":"5.00"},"paymentInstrument":{"itemID":"39760717-2bf5-4c82-8de0-a04e94af24e7","paymentToken":"39760717-2bf5-4c82-8de0-a04e94af24e7","type":"GIFT_CARD","itemFields":[{"name":"currentBalance","data":"4.62"},{"name":"programName","data":"Wish eGift Card"},{"name":"expiryDay","data":"31"},{"name":"expiryMonth","data":"12"},{"name":"bin","data":"628000"},{"name":"expiryYear","data":"2120"},{"name":"cardSuffix","data":"4720"}],"sequence":0,"primary":false,"createdOn":1638500985000,"lastUpdated":1638500985000,"lastUsed":null,"requiresCvv":false,"expired":false,"allowed":true,"status":"DELETED","action":null,"updateUrl":null,"stepUpToken":null,"threeDS":{"sli":null,"car":null,"dsTransID":null}},"action":null}],"fraudResponse":{"fraudClientId":null,"fraudReasonCd":null,"fraudDecision":null,"riskInformation":null},"totalAmount":"5.00"}
	*/
	const mockResponse = {"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"6AyZCbbO4p80P","messageId":"4e0220acff2ca07279c953dcb7fc5dc2","txnTime":1635916873413,"error":null,"esResponse":null},"transactionReceipt":"1000000007863555","responses":[{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"6AyZCbbO4p80P","messageId":"4e0220acff2ca07279c953dcb7fc5dc2","txnTime":1635916873413,"error":null,"esResponse":{"code":"00","text":"ACCEPTED"}},"transaction":{"transactionRef":"1000000007863555","extendedInformation":[],"handlingInstructions":null,"amount":"0.99"},"paymentInstrument":{"itemID":"217727","paymentToken":"ed50d340-fccb-4464-80df-b304151b8b1c","type":"GIFT_CARD","itemFields":[{"name":"bin","data":"628000"},{"name":"programName","data":"Wish eGift Card"},{"name":"cardSuffix","data":"4720"}],"sequence":0,"primary":false,"createdOn":1635916480098,"lastUpdated":1635916584545,"lastUsed":1635916873413,"requiresCvv":false,"expired":false,"allowed":true,"status":"VERIFIED","action":null,"updateUrl":null,"stepUpToken":null,"threeDS":{"sli":null,"car":null,"dsTransID":null}},"action":null}],"fraudResponse":{"fraudClientId":"6359168749606178403012","fraudReasonCd":"100","fraudDecision":"ACCEPT","riskInformation":null},"totalAmount":"0.99"}
	
	res.status(200).json(mockResponse);

})

//DP mock for guest payments in payment orchestration service
app.post('/container-ws/guest/payments', (req, res) => {	
	const mockResponse = {"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"eJqYULRaeQO2e","messageId":"47e88cf9f759ac49411ed5bac693342f","txnTime":1649243136133,"error":null,"esResponse":null},"transactionReceipt":"1000000008011085","responses":[{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"eJqYULRaeQO2e","messageId":"47e88cf9f759ac49411ed5bac693342f","txnTime":1649243136133,"error":null,"esResponse":{"code":"00","text":"APPROVED"}},"transaction":{"transactionRef":"1000000008011085","extendedInformation":[{"field":"bin","value":"512899"},{"field":"stan","value":"405157"},{"field":"rrn","value":"000000405157"},{"field":"token","value":"51289980000045001390"},{"field":"mid","value":"611000602008843"},{"field":"terminalId","value":"W8843100"}],"handlingInstructions":null,"amount":"5.00"},"paymentInstrument":{"itemID":"d2ea129c-d583-4d7a-b4d0-c7c73f4294be","paymentToken":"d2ea129c-d583-4d7a-b4d0-c7c73f4294be","type":"CREDIT_CARD","itemFields":[{"name":"bin","data":"512899"},{"name":"expiryYear","data":"23"},{"name":"scheme","data":"MASTERCARD"},{"name":"cardSuffix","data":"1707"},{"name":"cvvValidated","data":"0"},{"name":"expiryMonth","data":"03"}],"sequence":0,"primary":false,"createdOn":1649243107000,"lastUpdated":1649243107000,"lastUsed":null,"requiresCvv":null,"expired":false,"allowed":true,"status":"DELETED","action":null,"updateUrl":null,"stepUpToken":null,"threeDS":{"sli":null,"car":null,"dsTransID":null}},"action":null}],"fraudResponse":{"fraudClientId":"6492431375206616303007","fraudReasonCd":"100","fraudDecision":"ACCEPT","riskInformation":null},"totalAmount":"5.00"}
	
	res.status(200).json(mockResponse);

})

/*
//Zip mock for registered payments in payment orchestration service
app.post('/payments', (req, res) => {
	const mockResponse = 
	{"data":{"orderNumber":"ZIP102431","instrumentId":"ZIP-5c486f11-603d-446a-90e1-1fd73d862526","instrumentType":"ZIPPAY","transactionRef":"au-ch_BP1W4GTUxq6UZKiCPasP71","receiptData":{"customerId":"336401","cutomerEmail":"zp_1624358299315@mailinator.com","firstName":"testFirst","lastName":"APPROVETEST"},"externalServiceCode":"00","externalServiceMessage":"APPROVED"},"meta":{}}
	
	res.status(200).json(mockResponse);

})
*/
/*
//Paypal mock for payments in payment orchestration service
app.post('/payments', (req, res) => {
	const mockResponse = 
	{"data":{"orderNumber":"PP-8d9710fc-4469-45fb-a041-4cf66d6348bb","instrumentId":"PP-8d9710fc-4469-45fb-a041-4cf66d6348bb","instrumentType":"PAYPAL","transactionRef":"1000000008007996","receiptData":{"payPalId":"001@pp.com"},"externalServiceCode":"00","externalServiceMessage":"ACCEPTED"},"meta":{"fraudResponse":{"fraudClientId":"6487706399366031603007","fraudReasonCd":"100","fraudDecision":"ACCEPT","riskInformation":null}}}
	
	res.status(200).json(mockResponse);

})
*/

app.post('/container-ws/merchant/payments/refund', (req, res) => {
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"P88Yu3GB7BzQr","messageId":"a11bd4d1-0edc-4f24-85e4-57f645372c24","txnTime":1652767028099,"error":null,"esResponse":null},"transactionReceipt":"1000000025520391","refundResponses":[{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"P88Yu3GB7BzQr","messageId":"a11bd4d1-0edc-4f24-85e4-57f645372c24","txnTime":1652767028099,"error":null,"esResponse":{"code":"00","text":"APPROVED"}},"paymentTransactionRef":"1000000025520376","refundTransactionRef":"1000000025520391","amount":10.5}]}
	
	res.status(200).json(mockResponse);

})

app.post('/container-ws/merchant/payments/void', (req, res) => {
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"pLEVf2LX4zKLX","messageId":"35d17c2753b6440a3112590a60c8ebfd","txnTime":1652941049046,"error":null,"esResponse":null},"transactionReceipt":"1000000025596742","voidResponses":[{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"pLEVf2LX4zKLX","messageId":"35d17c2753b6440a3112590a60c8ebfd","txnTime":1652941049046,"error":null,"esResponse":{"code":"00","text":"APPROVED"}},"paymentTransactionRef":"1000000025596741","voidTransactionRef":"1000000025596742"}]}
	
	res.status(200).json(mockResponse);
})

app.post('/container-ws/merchant/payments/completion', (req, res) => {
	const mockResponse = 
	{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"X3pyhz5k9Kx9e","messageId":"bd92a1e0-8900-4fe7-be98-d7a680ed5715","txnTime":1653269051413,"error":null,"esResponse":null},"transactionReceipt":"1000000008053110","completionResponses":[{"status":{"responseText":"ACCEPTED","responseCode":"00","auditID":"X3pyhz5k9Kx9e","messageId":"bd92a1e0-8900-4fe7-be98-d7a680ed5715","txnTime":1653269051413,"error":null,"esResponse":{"code":"00","text":"APPROVED"}},"paymentTransactionRef":"1000000008053109","completionTransactionRef":"1000000008053110","amount":2.0}]}
	
	res.status(200).json(mockResponse);
})

//QC
app.post('/QwikCilver/XnP/api/v3/authorize', (req, res) => {
	const mockResponse = {
		"AuthToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50QmF0Y2hOdW1iZXIiOiIyODgxMSIsInRlcm1pbmFsSWQiOiJNSUNST1NFUlZJQ0UiLCJ1c2VyTmFtZSI6Im1pY3JvIiwicGFzc3dvcmQiOiJHWXdJbTIvSVRKSzRyN1ZqaHpCcm9hK0ZjYzg9IiwiZW5jIjoidHJ1ZSIsImF1dGhUeXBlIjoiQkFTSUMiLCJuYmYiOjE2MjI1Mjg4NjIsImV4cCI6MTYyMjc4ODA2MiwiaWF0IjoxNjIyNTI4ODYyLCJpc3MiOiJodHRwczovL3F3aWtjaWx2ZXIuY29tLyJ9.1zKTO4fkLIyOnk_LxVZVGRaOvfTXXWsd4S6hJEdcgpeN3-Xq0LI7yAhaFMZJXkjGXZtVyhImdBmDzsFpySXQcQ",
		"BatchId": 28811,
		"DateAtServer": "2021-06-01T11:57:42.92404+05:30",
		"MerchantName": "Woolworths Group",
		"OutletAddress1": "123",
		"OutletAddress2": "",
		"OutletCity": "Sydney",
		"OutletState": "NSW",
		"OutletPinCode": "2153",
		"OutletTelephone": "1234567890",
		"MaskCardNumber": false,
		"PrintMerchantCopy": false,
		"InvoiceNumberMandatory": false,
		"NumericUserPwd": false,
		"IntegerAmounts": false,
		"CultureName": "54",
		"CurrencySymbol": "$",
		"CurrencyPosition": 2,
		"CurrencyDecimalDigits": 2,
		"DisplayUnitForPoints": null,
		"ReceiptFooterLine1": null,
		"ReceiptFooterLine2": null,
		"ReceiptFooterLine3": null,
		"ReceiptFooterLine4": null,
		"MerchantId": 4,
		"TransactionStatus": true,
		"TransactionId": 0,
		"TransactionType": "INITIALIZE",
		"Notes": null,
		"ApprovalCode": "1346492",
		"ResponseCode": 0,
		"ResponseMessage": "Transaction successful.",
		"ErrorCode": null,
		"ErrorDescription": null,
		"Result": true
	}
	
	res.status(200).json(mockResponse);

})

//for CDC - single instrument
app.get('/instrument-details/instruments/1975961', (req, res) => {
	console.log("req header received:"+JSON.stringify(req.headers));
	const mockResponse = {
	  "paymentInstrumentId": "1975961",
	  "paymentInstrumentType": "GIFT_CARD",
	  "status": "DELETED",
	  "createdOn": "2021-04-14T20:11:26.293Z",
	  "lastUpdated": "2021-04-14T20:11:37.498Z",
	  "lastUsed": "2021-04-14T20:11:26.759Z",
	  "paymentToken": "64a8d6cb-c260-4f27-9d7e-bf05edcd2051",
	  "attributes": {
		"programName": "WOW Liquor Divisional Gift Card",
		"bin": "628000",
		"subBin": "666",
		"cardSuffix": "9650"
	  },
	  "metaData": "{\"pinCode\":\"6451\",\"cardNumber\":\"6280005070006999650\"}"
	}
	
	res.status(200).json(mockResponse);
})

app.get('/instrument-details/instruments/64a8d6cb-c260-4f27-9d7e-bf05edcd2052', (req, res) => {
	console.log("req header received:"+JSON.stringify(req.headers));
	const mockResponse = {
	  "paymentInstrumentId": null,
	  "paymentInstrumentType": "GIFT_CARD",
	  "status": "DELETED",
	  "createdOn": "2021-04-14T20:11:26.293Z",
	  "lastUpdated": "2021-04-14T20:11:37.498Z",
	  "lastUsed": "2021-04-14T20:11:26.759Z",
	  "paymentToken": "64a8d6cb-c260-4f27-9d7e-bf05edcd2052",
	  "attributes": {
		"programName": "WOW Liquor Divisional Gift Card",
		"bin": "628000",
		"subBin": "666",
		"cardSuffix": "9650"
	  },
	  "metaData": "{\"pinCode\":\"6451\",\"cardNumber\":\"6280005070006999650\"}"
	}
	
	res.status(200).json(mockResponse);
})

//for CDC - multi instruments
app.get('/instrument-details/instruments', (req, res) => {
	/*
	res.set('Content-Type', 'text/html');
	const mockResponse = Buffer.from('<HTML><HEAD><TITLE>Internal Server Error</TITLE></HEAD><BODY><H1>Internal Server Error - Read</H1>The server encountered an internal error or misconfiguration and was unable to complete your request.<P>Reference #3.cff23717.1660354215.2c4eb084</BODY></HTML>');
	*/
	
	console.log("req header received:"+JSON.stringify(req.headers));
	console.log("req query params received:"+req.query.ids);
	
	const mockResponse = [
	  {
		"paymentInstrumentId": "197596",
		"paymentInstrumentType": "GIFT_CARD",
		"status": "UNVERIFIED_PERSISTENT",
		"createdOn": "2021-01-18T05:16:11.035Z",
		"lastUpdated": "2021-01-18T05:16:11.035Z",
		"lastUsed": null,
		"paymentToken": "7746acb7-171f-49cb-b59d-a5c6aab870a7",
		"attributes": {
		  "programName": "Woolworths Digital",
		  "bin": "628000",
		  "cardSuffix": "5429",
		  "subBin": "666"
		},
		"metaData": "{\"pinCode\":\"3824\",\"cardNumber\":\"6280005550038585429\"}"
	  }
	];
	
	/*
	const mockResponse = [
	  {
		"paymentInstrumentId": "197596999",
		"paymentInstrumentType": "GIFT_CARD",
		"status": "UNVERIFIED_PERSISTENT",
		"createdOn": "2021-01-18T05:16:11.035Z",
		"lastUpdated": "2021-01-18T05:16:11.035Z",
		"lastUsed": null,
		"paymentToken": "7746acb7-171f-49cb-b59d-a5c6aab870a7",
		"attributes": {
		  "programName": "Woolworths Digital",
		  "bin": "628000",
		  "cardSuffix": "5429",
		  "subBin": "666"
		},
		"metaData": "{\"pinCode\":\"3824\",\"cardNumber\":\"6280005550038585429\"}"
	  },
	  {
		"paymentInstrumentId": "193855999",
		"paymentInstrumentType": "GIFT_CARD",
		"status": "UNVERIFIED_PERSISTENT",
		"createdOn": "2021-01-20T03:57:47.825Z",
		"lastUpdated": "2021-01-20T03:58:14.797Z",
		"lastUsed": "2021-01-20T03:57:48.350Z",
		"paymentToken": "430f80a6-5797-46d5-bf76-a22408bba9e9",
		"attributes": {
		  "programName": "WOW Liquor Divisional Gift Card",
		  "bin": "628000",
		  "cardSuffix": "7441",
		  "subBin": "666"
		},
		"metaData": "{\"pinCode\":\"6602\",\"cardNumber\":\"6280005070001197441\"}"
	  }
	];
	*/
	res.status(200).json(mockResponse);
	//res.status(500).send(mockResponse);
})

app.post('/services/collector/event/1.0', (req, res) => {
	console.log("Splunk log body:"+JSON.stringify(req.body));
	
	const mockResponse = {};
	
	res.status(200).json(mockResponse);

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))