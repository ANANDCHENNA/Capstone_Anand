import { CreateInvestigatorComponent } from "../create-investigator/create-investigator.component"
import { Investigation } from "./Investigation"
import { Investigator } from "./Investigator"
import { Policy } from "./Policy"
import { Underwriter } from "./Underwriter"

export interface Claim {
    id : number
    description : string
    date : string
    status: string
    // claimType:string
    policy_id:number
    policyholderId:string
    investigation : Investigation   
    underwriter: Underwriter
    investigator:Investigator
    photoFilename:string;
}
export { Investigation, Underwriter }

