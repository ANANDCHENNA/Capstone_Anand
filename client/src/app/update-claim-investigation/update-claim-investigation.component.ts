import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Claim } from '../model/Claim';


@Component({
  selector: 'app-update-investigation',
  templateUrl: './update-claim-investigation.component.html',
  styleUrls: ['./update-claim-investigation.component.scss']
})

export class UpdateInvestigationComponent implements OnInit {

  itemForm: FormGroup
  investigationId: number | undefined
  claimList: Claim[] = []

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      report: ['', Validators.required],
      status: ['', Validators.required],
      claimId: [{value: '', disabled: true}, Validators.required]
    })
  }

  ngOnInit(): void {
    this.httpService.getAllClaimsForInvestigation().subscribe((data)=>{
      this.claimList = data;
    })
    this.investigationId = this.route.snapshot.params['id']
    this.httpService.getInvestigationById(this.investigationId).subscribe((data: any) => {
      if(data.claim){
        data.claimId = data.claim.id;
      }
      this.itemForm.patchValue(data)
    })
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.getRawValue();
      console.log(formValue);
      const payload = {
        report : formValue.report,
        status: formValue.status,
        claim: {
          id: formValue.claimId
        }
      }
      this.httpService.updateInvestigation(payload, this.investigationId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error('Error Updating investigation:', error);
        }
      });
    }
  }
}