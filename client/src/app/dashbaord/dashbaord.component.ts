import { Claim } from '../model/Claim';
import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
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
      this.httpService.getAllClaims().subscribe((data) => {
        this.claimList = data
        this.filteredClaimList = this.claimList.filter((claim) =>
          claim.status !== 'Approved By Underwriter')
      })
    }


    if (this.role === 'UNDERWRITER') {
      this.httpService.getClaimsByUnderwriter(this.underWriterId).subscribe((data) => {
        this.claimByUnderwriter = data
        this.filteredClaimsByUnderwriter = this.claimByUnderwriter.filter((claim) =>
          claim.status !== 'Approved By Underwriter' && claim.status !== 'Rejected By Underwriter')
      })

    }


    if (this.role === 'INVESTIGATOR') {
      this.httpService.getInvestigations().subscribe((data) => {
        this.investigations = data
      })
    }

    if (this.role === 'POLICYHOLDER') {
      this.httpService.getClaimsByPolicyholder(this.policyholderId).subscribe((data) => {
        this.claimByPolicyholder = data
      })
    }
  }

  onAdjusterAssignClaim(id: number) {
    this.router.navigate([`/assign-claim/${id}`])
  }

  onUnderwriterUpdateClaim(id: number) {
    this.router.navigate([`/update-claim-underwriter/${id}`])
  }

  onInvestigatorUpdateInvestigation(id: number) {
    this.router.navigate([`/update-investigation/${id}`])
  }

}