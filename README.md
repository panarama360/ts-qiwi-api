# ts-qiwi-api
### Installation

```
$ npm install ts-qiwi-api --save
```

### Methods
* **getAccountInfo()**: `Promise<AccountInfoResponce>`
* **getBalance()**: `Promise<BalanceResponce>`
* **identification(identification:Identification)**: `Promise<IdentificationResponce>`
* **getIdentificationInfo()**: `Promise<IdentificationResponce>`
* **getPaymentHistory(params: PaymentHistoryParams)**: `Promise<HistoryPaymentResponce>`
* **getPaymentsTotal(params: PaymentsTotalParams)**: `Promise<PaymentsTotal>`
* **getTransactionInfo(id: number, type?:TransactionType)**: `Promise<TransactionItem>`
* **getCheque(id: number, type:TransactionType, format: 'JPEG' | 'PDF')**: `Promise<TransactionItem>`
* **sendCheque(id: number, type:TransactionType, email: string)**: `Promise<TransactionItem>`
* **getAccounts()**: `Promise<GetAccountsResponce>`
* **createAccount(alias: string)**: `Promise<{ "alias": string }>`
* **getAccountsOffer()**: `Promise<{ alias: string;currency: number;}[]>`
* **setDefaoutlAccount(alias: string)**: `Promise<{ "defaultAccount": boolean}>`
* **paymentToQiwi(amount: number, toAccount: string, comment?: string)**: `Promise<QiwiPaymentResponce>`
* **paymentToPhone(amount: number, phone: string, operatorId?: number)**: `Promise<PhonePaymentResponce>`
* **paymentToCard(amount: number, card: string, cardId?: CardType)**: `Promise<CardPaymentResponce>`
* **detectPhoneOperator(phone: string)**: `Promise<number>`
* **detectCardProvider(card: string)**: `Promise<number>`
* **validatePayload(payload: WebHookPayload)**: `Promise<boolean>`
* **setHook(param: string, txnType: TxnType, hookType: number = 1)**: `Promise<SetHookResponce>`
* **deleteHook(id: string)**: `Promise<{response:string}>`
* **getSecretKeyHook(id: string)**: `Promise<{key:string}>`
* **changeSecretKeyHook(id: string)**: `Promise<{key:string}>`
* **getActiveHookInfo()**: `Promise<SetHookResponce>`
* **testHook()**: `Promise<{response:string}>`

### Usage
```typescript
const qiwiApi: QiwiApi = new QiwiApi('<token>', '<personId>');
```