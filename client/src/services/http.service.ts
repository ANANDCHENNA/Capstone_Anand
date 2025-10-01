 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InteropObservable, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName = environment.apiUrl;
 
    constructor(private http: HttpClient, private authService: AuthService ){
    
     }
    
    
    getInvestigations():Observable<any>{
         const authToken = this.authService.getToken();
         let headers = new HttpHeaders();
         headers = headers.set('Content-Type', 'application/json');
         headers = headers.set('Authorization', `Bearer ${authToken}`)
         return this.http.get(this.serverName + `/api/investigator/investigations`, {headers:headers})
       }

   getAllClaims():Observable<any>{
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName + `/api/adjuster/claims`, {headers:headers});
     
    }

   
    getAllUnderwriter():Observable<any>{
 
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName + `/api/adjuster/underwriters`, {headers:headers})
     
    }
   
    getClaimsByUnderwriter(id:any):Observable<any>{
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName + `/api/underwriter/claims?underwriterId=` + id, {headers:headers});
    }
   
    getClaimsByPolicyholder(policyholderId: any):Observable<any>{
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
          return this.http.get(this.serverName + `/api/policyholder/claims?policyholderId=` +policyholderId, {headers:headers});
    }
   
    updateInvestigation(details:any,investigationId:any):Observable<any>{
 
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.put(this.serverName + '/api/investigator/investigation/' +investigationId, details, {headers:headers});
 
    }
   
    createInvestigation(details: any):Observable<any>{
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.post(this.serverName + '/api/investigator/investigation', details, {headers:headers});
     
    }
   
    createClaims(details:any, policyholderId :any):Observable<any>{
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      return this.http.post(this.serverName + '/api/policyholder/claim?policyholderId=' +policyholderId, details, {headers:headers});
     
    }

    getClaimById(claimId:any) : Observable<any> {
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      return this.http.get(this.serverName + '/api/adjuster/claim/' +claimId, {headers:headers})
    }


    getInvestigationById(id:any) : Observable<any>{
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      return this.http.get(this.serverName + '/api/investigator/investigations/' +id , {headers:headers})
    }

       
  
  updateClaims(details:any, claimId:any):Observable<any>{
    const authToken=this.authService.getToken();
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type','application/json');
    headers=headers.set('Authorization',`Bearer ${authToken}`);
    return this.http.put(this.serverName+'/api/adjuster/claim/'+claimId,details,{headers:headers});
  }


  updateClaimsStatus(status:any, claimId:any):Observable<any>{
    const authToken=this.authService.getToken();
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type','application/json');
    headers=headers.set('Authorization',`Bearer ${authToken}`);
    return this.http.put(this.serverName+'/api/underwriter/claim/'+claimId+'/review?status='+status,{},{
      headers:headers
    });
  }
  
  assignClaim(details:any):Observable<any>{
    const authToken=this.authService.getToken();
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type','application/json');
    headers=headers.set('Authorization',`Bearer ${authToken}`);
    return this.http.put(this.serverName+'/api/adjuster/claim/'+details.claimId+' /assign?underwriterId='+
    details.underwriterId,details,{headers:headers});

  }

   Login(details: any): Observable<any> {
   
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName+'/api/user/login',details,{headers:headers});
  }
 
  registerUser(details: any): Observable<any> {
   
    let headers=new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName+'/api/user/register',details,{headers:headers});
  }
  
}