export interface QiwiPaymentResponce {
    id: string;
    terms: string;
    fields: Fields;
    sum: Sum;
    transaction: Transaction;
    source: string;
    comment: string;
}
interface Fields {
    account: string;
}
interface Sum {
    amount: number;
    currency: string;
}
interface Transaction {
    id: string;
    state: State;
}
interface State {
    code: string;
}
