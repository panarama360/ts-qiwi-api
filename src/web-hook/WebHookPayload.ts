export interface WebHookPayload {
    messageId: string;
    hookId: string;
    payment: Payment;
    hash: string;
    version: string;
    test: boolean;
}
interface Payment {
    txnId: string;
    date: string;
    type: string;
    status: string;
    errorCode: string;
    personId: number;
    account: string;
    comment: string;
    provider: number;
    sum: Sum;
    commission: Commission;
    total: Total;
    signFields: string;
}
interface Sum {
    amount: number;
    currency: number;
}
interface Commission {
    amount: number;
    currency: number;
}
interface Total {
    amount: number;
    currency: number;
}
