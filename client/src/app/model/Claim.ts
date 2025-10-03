import { Investigation } from "./Investigation"
import { Underwriter } from "./Underwriter"

export interface Claim {
    id : number
    description : string
    date : Date
    status: string
    investigation : Investigation   
    underwriter: Underwriter
}
export { Investigation }

