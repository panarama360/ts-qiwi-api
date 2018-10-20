export interface PhonePaymentResponce {
    id: string;
    terms: string;
    fields: Fields;
    sum: Sum;
    source: string;
    transaction: Transaction;
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
