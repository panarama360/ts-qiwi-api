export interface CardPaymentResponce {
    id: string;
    sum: Sum;
    paymentMethod: PaymentMethod;
    fields: Fields;
}
interface Sum {
    amount: number;
    currency: string;
}
interface PaymentMethod {
    type: string;
    accountId: string;
}
interface Fields {
    account: string;
    rec_address: string;
    rec_city: string;
    rec_country: string;
    reg_name: string;
    reg_name_f: string;
    rem_name: string;
    rem_name_f: string;
}
