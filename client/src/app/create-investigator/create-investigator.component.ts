import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { Claim } from '../model/Claim';

@Component({
  selector: 'app-create-investigation',
  templateUrl: './create-investigator.component.html',
  styleUrls: ['./create-investigator.component.scss']
})

export class CreateInvestigatorComponent implements OnInit {
  itemForm: FormGroup;
  claimList: Claim[] = [];
  filteredClaimList: Claim[] = [];
  statusDisable: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      report: ['', Validators.required],
      status: [{value: 'Started', disabled: true}, Validators.required],
      claimId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.httpService.getAllClaimsForInvestigation().subscribe((data) => {
      this.claimList = data;
    })
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const formvalue = this.itemForm.getRawValue();

      const payload = {
        report : formvalue.report,
        status: formvalue.status,
        claim: {id: formvalue.claimId}
      }
      
      this.httpService.createInvestigation(payload).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating investigation:', error);
        }
      });
    }
  }
}

