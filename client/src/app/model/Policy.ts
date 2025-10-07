export interface Policy{
    id:number
    name:string
    termMonths:number
    premium: number
    policyType: string
    owners?:number[]   
}