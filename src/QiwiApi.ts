import * as request from "request-promise";
import {AccountInfoResponce} from "./responces/AccountInfoResponce";
import {BalanceResponce} from "./responces/BalanceResponce";
import {Identification} from "./request/Identification";
import {IdentificationResponce} from "./responces/IdentificationResponce";
import {PaymentHistoryParams, PaymentsTotalParams} from "./request/PaymentHistoryParams";
import {HistoryPaymentResponce, TransactionItem} from "./responces/HistoryPaymentResponce";
import {TransactionType} from "./enum/TransactionType";
import {PaymentsTotal} from "./responces/PaymentsTotal";
import {GetAccountsResponce} from "./responces/GetAccountsResponce";
import {QiwiPaymentResponce} from "./responces/QiwiPaymentResponce";
import {DetectOperatorResponce} from "./responces/DetectOperatorResponce";
import {CardPaymentResponce} from "./responces/CardPaymentResponce";
import {PhonePaymentResponce} from "./responces/PhonePaymentResponce";
import {Bank} from "./enum/Bank";
import {SetHookResponce} from "./responces/SetHookResponce";
import {WebHookPayload} from "./web-hook/WebHookPayload";
import * as crypto from "crypto";

export class QiwiApi {

    reqestDefault: any
    hookKey: string;
    activeHookId: string;

    constructor(public token: string, public personId: string) {
        this.reqestDefault = request.defaults({
            baseUrl: 'https://edge.qiwi.com',
            json: true,
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }
        })
    }

    getAccountInfo(): Promise<AccountInfoResponce>{
        return this.reqestDefault.get('/person-profile/v1/profile/current')
    }
    getBalance(): Promise<BalanceResponce>{
        return this.reqestDefault.get(`/funding-sources/v2/persons/${this.personId}/accounts`)
    }

    identification(identification:Identification): Promise<IdentificationResponce>{
        return this.reqestDefault.post(`/identification/v1/persons/${this.personId}/identification`, {
            json: identification
        })
    }

    getIdentificationInfo(): Promise<IdentificationResponce>{
        return this.reqestDefault.get(`/identification/v1/persons/${this.personId}/identification`)
    }

    async getPaymentHistory(params: PaymentHistoryParams): Promise<HistoryPaymentResponce>{
        if(params.sources && params.sources.length)
            params.sources.forEach((value, index) => params[`sources[${index}]`] = value)
        return this.reqestDefault.get(`/payment-history/v2/persons/${this.personId}/payments`, {
            qs: params
        })
    }

    getPaymentsTotal(params: PaymentsTotalParams): Promise<PaymentsTotal>{
        if(params.sources && params.sources.length)
            params.sources.forEach((value, index) => params[`sources[${index}]`] = value)
        return this.reqestDefault.get(`/payment-history/v2/persons/${this.personId}/payments/total`, {
            qs: params
        })
    }

    getTransactionInfo(id: number, type?:TransactionType): Promise<TransactionItem>{
        return this.reqestDefault.get(`/payment-history/v2/transactions/${id}`, {
            qs: {type}
        })
    }
    getCheque(id: number, type:TransactionType, format: 'JPEG' | 'PDF'): Promise<TransactionItem>{
        return this.reqestDefault.get(`/payment-history/v1/transactions/${id}/cheque/file`, {
            encoding: 'binary',
            qs: {type, format}
        })
    }
    sendCheque(id: number, type:TransactionType, email: string): Promise<TransactionItem>{
        return this.reqestDefault.post(`/payment-history/v1/transactions/${id}/cheque/send`, {
            json: {email},
            qs: {type}
        })
    }

    getAccounts(): Promise<GetAccountsResponce>{
        return this.reqestDefault.get(`/funding-sources/v2/persons/${this.personId}/accounts`)
    }

    createAccount(alias: string): Promise<{ "alias": string }>{
        return this.reqestDefault.post(`/funding-sources/v2/persons/${this.personId}/accounts`, {
            json: {alias}
        })
    }

    getAccountsOffer(): Promise<{ alias: string;currency: number;}[]>{
        return this.reqestDefault.get(`/funding-sources/v2/persons/${this.personId}/accounts/offer`)
    }

    setDefaoutlAccount(alias: string): Promise<{ "defaultAccount": boolean}>{
        return this.reqestDefault.patch(`/funding-sources/v2/persons/${this.personId}/accounts/${alias}`)
    }

    paymentToQiwi(amount: number, toAccount: string, comment?: string): Promise<QiwiPaymentResponce>{
        return this.reqestDefault.post(`/sinap/api/v2/terms/99/payments`, {
            json: {
                "id": (1000 * Date.now()).toString(),
                "sum": {
                    "amount": amount,
                    "currency":"643"
                },
                "paymentMethod": {
                    "type":"Account",
                    "accountId":"643"
                },
                "comment":comment,
                "fields": {
                    "account":toAccount
                }
            }
        })
    }

    async paymentToPhone(amount: number, phone: string, operatorId?: number): Promise<PhonePaymentResponce>{
        operatorId = operatorId || await this.detectPhoneOperator('7'+phone)
        return this.reqestDefault.post(`/sinap/api/v2/terms/${operatorId}/payments`, {
            json: {
                "id":(1000 * Date.now()).toString(),
                "sum": {
                    "amount":amount,
                    "currency":"643"
                },
                "paymentMethod": {
                    "type":"Account",
                    "accountId":"643"
                },
                "fields": {
                    "account":phone
                }
            }
        })
    }

    async paymentToCard(amount: number, card: string, cardId?: '1963'|'21013'|'22351'|'1960'| '21012'| '31652'): Promise<CardPaymentResponce>{
        (cardId as any) = cardId || await this.detectCardProvider(card);
        return this.reqestDefault.post(`/sinap/api/v2/terms/${cardId}/payments`, {
            json: {
                "id":(1000 * Date.now()).toString(),
                "sum": {
                    "amount":amount,
                    "currency":"643"
                },
                "paymentMethod": {
                    "type":"Account",
                    "accountId":"643"
                },
                "fields": {
                    "account":card
                }
            }
        })
    }


    detectPhoneOperator(phone: string): Promise<number>{
        return request({
            url: 'https://qiwi.com/mobile/detect.action',
            json: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
            },
            form: {
                phone: phone.trim().replace(/\+/, '')
            }

        }).then((value: DetectOperatorResponce) => {
            if(value.code.value === '0')
                return value.message
            else
                throw new Error(value.message)
        })
    }

    detectCardProvider(card: string): Promise<number>{
        return request({
            url: 'https://qiwi.com/card/detect.action',
            json: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
            },
            form: {
                cardNumber: card.trim()
            }

        }).then((value: DetectOperatorResponce) => {
            if(value.code.value === '0')
                return value.message
            else
                throw new Error(value.message)
        })
    }

    async validatePayload(payload: WebHookPayload){
        if(!this.hookKey || !this.activeHookId) {
            this.activeHookId = (await this.getActiveHookInfo()).hookId
            this.hookKey = (await this.getSecretKeyHook(this.activeHookId)).key;
        }
        const secret = Buffer.from(this.hookKey, 'base64');
        const fields = payload.payment.signFields.split(',').map(value => this.getRecursiveParam(payload.payment, value)).join('|');
        return crypto.createHmac('SHA256', secret).update(fields).digest("hex") ===  payload.hash;
    }

    setHook(param: string, txnType: 0|1|2, hookType: number = 1): Promise<SetHookResponce>{
        return this.reqestDefault.put(`/payment-notifier/v1/hooks`, {
            json:{
                param, txnType, hookType
            }
        })
    }

    deleteHook(id: string): Promise<{response:string}>{
        return this.reqestDefault.delete(`/payment-notifier/v1/hooks/${id}`)
    }

    getSecretKeyHook(id: string): Promise<{key:string}>{
        return this.reqestDefault.delete(`/payment-notifier/v1/hooks/${id}/key`)
    }

    changeSecretKeyHook(id: string): Promise<{key:string}>{
        return this.reqestDefault.post(`/payment-notifier/v1/hooks/${id}/newkey`)
    }

    getActiveHookInfo(): Promise<SetHookResponce>{
        return this.reqestDefault.get(`/payment-notifier/v1/hooks/active`)
    }

    testHook(){
        return this.reqestDefault.get(`/payment-notifier/v1/hooks/test`)
    }

    private getRecursiveParam(data: any, keys:string){
        if(keys.split('.').length == 1)
            return data[keys];
        else
            return this.getRecursiveParam(data[keys.split('.')[0]], keys.split('.').slice(1).join('.'))
    }
}