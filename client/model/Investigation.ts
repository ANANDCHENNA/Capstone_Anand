import { Claim } from "./Claim";

export interface Investigation{
    id : number;
    report : string;
    status: string;
    claim: Claim
}