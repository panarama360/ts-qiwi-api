import {IdentificationType} from "../enum/IdentificationType";

export interface IdentificationResponce {
    birthDate: string;
    firstName: string;
    id: number;
    inn: string;
    lastName: string;
    middleName: string;
    oms: string;
    passport: string;
    snils: string;
    type: IdentificationType;
}
