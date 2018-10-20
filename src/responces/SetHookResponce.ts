export interface SetHookResponce {
    hookId: string;
    hookParameters: HookParameters;
    hookType: string;
    txnType: string;
}
interface HookParameters {
    url: string;
}
