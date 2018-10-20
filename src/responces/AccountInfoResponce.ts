export interface AccountInfoResponce {
    contractInfo: ContractInfo;
    authInfo: AuthInfo;
    userInfo: UserInfo;
}
interface ContractInfo {
    contractId: number;
    creationDate: string;
    features: FeaturesItem[];
    identificationInfo: IdentificationInfoItem[];
    blocked: boolean;
}
interface FeaturesItem {
    featureId: number;
    featureValue: string;
    startDate: string;
    endDate: string;
}
interface IdentificationInfoItem {
    bankAlias: string;
    identificationLevel: string;
    passportExpired: boolean;
}
interface AuthInfo {
    lastLoginDate: null;
    personId: number;
    registrationDate: string;
    boundEmail: null;
    emailSettings: EmailSettings;
    mobilePinInfo: MobilePinInfo;
    passInfo: PassInfo;
    pinInfo: PinInfo;
    ip: string;
}
interface EmailSettings {
}
interface MobilePinInfo {
    lastMobilePinChange: string;
    nextMobilePinChange: string;
    mobilePinUsed: boolean;
}
interface PassInfo {
    lastPassChange: string;
    nextPassChange: string;
    passwordUsed: boolean;
}
interface PinInfo {
    pinUsed: boolean;
}
interface UserInfo {
    defaultPayCurrency: number;
    defaultPayAccountAlias: string;
    operator: string;
    defaultPaySource: number;
    language: string;
    firstTxnId: number;
    phoneHash: string;
    integrationHashes: IntegrationHashes;
}
interface IntegrationHashes {
    rostelecom: string;
}
