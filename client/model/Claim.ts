import { Investigation } from "./Investigation"

export interface Claim {
    id : number
    description : string
    date : Date
    status: string
    investigation : Investigation   
}
export { Investigation }

