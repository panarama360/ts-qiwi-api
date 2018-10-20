export interface PaymentsTotal {
    incomingTotal: TotalItem[];
    outgoingTotal: TotalItem[];
}
interface TotalItem {
    amount: number;
    currency: number;
}
