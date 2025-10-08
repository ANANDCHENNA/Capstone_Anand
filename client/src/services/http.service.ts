import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { InteropObservable, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';
import { PurchaseRequest } from '../app/model/PurchaseRequest';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public serverName = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  testConnection(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    
    // Try both HTTP/1.1 and HTTP/2
    return this.http.get(this.serverName + '/api/policyholder/claims/test', {
      headers: headers,
      observe: 'response'  // Get full response including headers
    });
  }

  getInvestigations(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/investigator/investigations`, { headers: headers })
  }

  getAllClaims(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/adjuster/claims`, { headers: headers });

  }

  getAllClaimsForInvestigation(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/investigator/claims`, { headers: headers });
  }

  GetAllUnderwriter(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/adjuster/underwriters`, { headers: headers })
  }

  createPolicy(policy: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.post(this.serverName + `/api/policy`, policy, { headers: headers });
  }

  GetAllInvestigator(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/investigators`, { headers: headers })

  }

  getClaimsByUnderwriter(id: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/underwriter/claims?underwriterId=` + id, { headers: headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Unable to fetch claims. Please try again later.'));
  }

  getClaimsByPolicyholder(policyholderId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    headers = headers.set('Accept', 'application/json');
    
    return this.http.get(
      this.serverName + `/api/policyholder/claims?policyholderId=` + policyholderId,
      { 
        headers: headers,
        withCredentials: false // Disable credentials to avoid CORS preflight
      }
    ).pipe(
      retry(3), // Retry failed requests up to 3 times
      catchError(this.handleError)
    );
  }

  updateInvestigation(details: any, investigationId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.put(this.serverName + '/api/investigator/investigation/' + investigationId, details, { headers: headers });
  }

  createInvestigation(details: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.post(this.serverName + '/api/investigator/investigation', details, { headers: headers });
  }

  createClaims(details: any, policyholderId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post(this.serverName + '/api/policyholder/claim?policyholderId=' + policyholderId, details, { headers: headers });
  }

  getClaimById(claimId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.get(this.serverName + '/api/adjuster/claim/' + claimId, { headers: headers })
  }

  getClaimByIdUnderwriter(claimId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.get(this.serverName + '/api/underwriter/claim/' + claimId, { headers: headers })
  }

  getInvestigationById(id: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.get(this.serverName + '/api/investigator/investigations/' + id, { headers: headers })
  }

  updateClaims(details: any, claimId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put(this.serverName + '/api/adjuster/claim/' + claimId, details, { headers: headers });
  }

  updateClaimsStatus(details: any, claimId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put(this.serverName + '/api/underwriter/claim/' + claimId + '/review?status=' + details.status, {}, { headers: headers });
  }

  assignClaim(details: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put(this.serverName + '/api/adjuster/claim/' + details.claimId + ' /assign?underwriterId=' +
      details.underwriterId + '&investigatorId=' + details.investigatorId, details, { headers: headers });
  }

  purchase(details: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post(this.serverName + '/api/policy/purchase' + userId, details, { headers: headers });
  }

  getMyPolicies(): Observable<any[]> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any[]>(this.serverName + '/api/policy/me', { headers: headers });
  }

  getAllPolicies() {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any[]>(`${this.serverName}/api/policy/policies`, { headers: headers });
  }

  getPoliciesByHolder(holderId: string) {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any[]>(`${this.serverName}/api/policy/policyholder/${holderId}`, { headers: headers });
  }

  updatePolicy(policyId: number, payload: any) {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put<any>(`${this.serverName}/api/policy/${policyId}`, payload, { headers: headers });
  }

  deletePolicy(policyId: number) {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.delete(`${this.serverName}/api/policy/${policyId}`, { headers: headers });
  }


  Login(details: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName + '/api/user/login', details, { headers: headers });
  }

  registerUser(details: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName + '/api/user/register', details, { headers: headers });
  }


  // Fetch all policies
  // getAllPolicies(): Observable<any> {
  //   const authToken = this.authService.getToken();
  //   let headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('Authorization', `Bearer ${authToken}`);
  //   return this.http.get(this.serverName + `/api/policies`, { headers: headers });
  // }

  // Fetch policies owned by a specific policyholder
  getPoliciesByOwnedUser(policyholderId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.get(this.serverName + `/api/policy/policyholder/${policyholderId}`, { headers: headers });
  }

  // Purchase a policy for the logged-in policyholder
  purchasePolicy(policyId: any, policyholderId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);
    return this.http.post(
      this.serverName + `/api/policyholder/purchase?policyId=${policyId}&policyholderId=${policyholderId}`,
      {},
      { headers: headers, responseType: 'text'}
    );
  }
}