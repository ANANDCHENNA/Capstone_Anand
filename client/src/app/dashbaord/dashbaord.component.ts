import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { Claim } from '../model/Claim';
import { Investigation } from '../model/Investigation';
@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  role: string | null = ''

  claimList: Claim[] = []
  filteredClaimList: Claim[] = []   //Role = Adjuster 

  underWriterId: string | null = ''
  claimByUnderwriter: Claim[] = []
  filteredClaimsByUnderwriter: Claim[] = []  //Role = Underwriter


  investigations: Investigation[] = [] //Role = Investigator

  policyholderId: string | null = ''
  claimByPolicyholder: Claim[] = [] //Role = Policyholder

  underWriter: string = 'Assign Underwriter';

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {

    this.role = this.authService.getRole;

  }
  ngOnInit(): void {

    this.underWriterId = this.authService.getUserId()
    this.policyholderId = this.authService.getUserId()

if (this.role === 'ADJUSTER') {
  this.httpService.getAllPolicies().subscribe((policies: any) => {
    this.httpService.getAllClaims().subscribe((data: any) => {
      // Merge policy details into each claim
      const mergedClaims = data.map((claim: any) => {
        const selectedPolicy = policies.find((p: any) => p.id == claim.policy_id);
        return { ...claim, selectedPolicy };
      });

      // Filter only pending claims
      this.filteredClaimList = mergedClaims.filter((claim: any) =>
        claim.status !== 'Approved By Underwriter'
      );
    });
  });
}

    if (this.role === 'UNDERWRITER') {
      this.httpService.getAllPolicies().subscribe((policies: any) => {
        this.httpService.getClaimsByUnderwriter(this.underWriterId).subscribe((data: any) => {
          
          // Merge related policy info into each claim
          const mergedClaims = data.map((claim: any) => {
            const selectedPolicy = policies.find((p: any) => p.id == claim.policy_id);
            return { ...claim, selectedPolicy };
          });
    
          // Filter out claims already approved or rejected
          this.filteredClaimsByUnderwriter = mergedClaims.filter((claim: any) =>
            claim.status !== 'Approved By Underwriter' && claim.status !== 'Rejected By Underwriter'
          );
    
        });
      });
    }
    if (this.role === 'INVESTIGATOR') {
      this.httpService.getInvestigations().subscribe((data) => {
        this.investigations = data

      })
    }
    if (this.role === 'POLICYHOLDER') {
      this.httpService.getAllPolicies().subscribe((policies: any) => {
        this.httpService.getClaimsByPolicyholder(this.policyholderId).subscribe((claims: Claim[]) => {
          this.claimByPolicyholder = claims.map(claim => {
            const selectedPolicy = policies.find((p: any) => p.id == claim.policy_id);
            return { ...claim, selectedPolicy };
          });
        });
      });
    }
  }

  onAdjusterAssignClaim(id: number): Boolean {
    this.router.navigate([`/assign-claim/${id}`])
    return true;
  }
  onUpdateClaimAdjuster(id: number) {
    this.router.navigate([`/update-claim/${id}`])
  }
  onUnderwriterUpdateClaim(id: number) {
    this.router.navigate([`/update-claim-underwriter/${id}`])
  }

  onInvestigatorUpdateInvestigation(id: number) {
    this.router.navigate([`/update-claim-investigation/${id}`])
  }

}