export interface HistoryPaymentResponce {
    data: TransactionItem[];
    nextTxnId: number;
    nextTxnDate: string;
}
export interface TransactionItem {
    txnId: number;
    personId: number;
    date: string;
    errorCode: number;
    error: null | string;
    status: string;
    type: string;
    statusText: string;
    trmTxnId: string;
    account: string;
    sum: Sum;
    commission: Commission;
    total: Total;
    provider: Provider;
    source: Source;
    comment: null | string;
    currencyRate: number;
    paymentExtras: any[];
    features: Features;
    serviceExtras: any;
    view: View;
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
interface Provider {
    id: number;
    shortName: string;
    longName: string;
    logoUrl: string | null;
    description: null;
    keys: string;
    siteUrl: string | null;
    extras: ExtrasItem[];
}
interface ExtrasItem {
    key: string;
    value: string;
}
interface Source {
    id: number;
    shortName: string;
    longName: string;
    logoUrl: null | string;
    description: null;
    keys: string;
    siteUrl: null | string;
    extras: ExtrasItem[];
}
interface Features {
    chequeReady: boolean;
    bankDocumentReady: boolean;
    regularPaymentEnabled: boolean;
    bankDocumentAvailable: boolean;
    repeatPaymentEnabled: boolean;
    favoritePaymentEnabled: boolean;
    chatAvailable: boolean;
    greetingCardAttached: boolean;
}
interface View {
    title: string;
    account: string;
}
