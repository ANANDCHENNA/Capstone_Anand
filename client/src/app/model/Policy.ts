export interface Policy{
    id:number
    policyNumber:number
    name:string
    termMonths:number
    premium: number
    policyType: string
    policyHolderIds?:number[]   
}