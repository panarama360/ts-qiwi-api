export interface BalanceResponce {
    accounts: AccountsItem[];
}
interface AccountsItem {
    alias: string;
    fsAlias: string;
    bankAlias: string;
    title: string;
    type: Type;
    hasBalance: boolean;
    balance: Balance | null;
    currency: number;
    defaultAccount: boolean;
}
interface Type {
    id: string;
    title: string;
}
interface Balance {
    amount: number;
    currency: number;
}
