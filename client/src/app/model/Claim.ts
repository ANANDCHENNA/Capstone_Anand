import { Investigation } from "./Investigation"
import { Policy } from "./Policy"
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
    selectedPolicy?:Policy
    
}
export { Investigation, Underwriter }

