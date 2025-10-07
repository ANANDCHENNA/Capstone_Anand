import { CreateInvestigatorComponent } from "../create-investigator/create-investigator.component"
import { Investigation } from "./Investigation"
import { Investigator } from "./Investigator"
import { Underwriter } from "./Underwriter"

export interface Claim {
    id : number
    description : string
    date : Date
    status: string
    // claimType:string
    policy_id:number
    policyholderId:number
    investigation : Investigation   
    underwriter: Underwriter
    investigator:Investigator
}
export { Investigation, Underwriter }

