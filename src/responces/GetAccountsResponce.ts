export interface GetAccountsResponce {
    accounts: AccountsItem[];
}
interface AccountsItem {
    alias: string;
    fsAlias: string;
    bankAlias: string;
    title: string;
    type: Type;
    hasBalance: boolean;
    balance: null | Balance;
    currency: number;
}
interface Type {
    id: string;
    title: string;
}
interface Balance {
    amount: number;
    currency: number;
}
