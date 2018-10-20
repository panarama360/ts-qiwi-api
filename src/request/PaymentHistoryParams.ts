import {TransactionType} from "../enum/TransactionType";
import {SourcesType} from "../enum/SourcesType";

interface Common {
    operation?: TransactionType,
    sources?: SourcesType[],
    startDate?: string,
    endDate?: string,
}
export interface PaymentHistoryParams extends Common{
    rows: number,
    nextTxnDate?: string,
    nextTxnId?: number
}

export interface PaymentsTotalParams extends Common{
    startDate: string,
    endDate: string,
}