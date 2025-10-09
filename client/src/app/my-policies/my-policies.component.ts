import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { Policy } from '../model/Policy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-policies',
  templateUrl: './my-policies.component.html',
  styleUrls: ['./my-policies.component.scss']
})
export class MyPoliciesComponent implements OnInit {
  myPolicies: Policy[] = [];
  userId = localStorage.getItem('userId');
  claimForm: FormGroup;
  selectedPolicy: Policy | null = null;
  showClaimForm: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.claimForm = this.formBuilder.group({
      description: [`Reason for Claim:\n\nRemarks\n\nAdjuster:\n\nInvestigator:\n\nUnderwriter:`, Validators.required],
      // For disabled fields, their values are not included in form.value by default.
      // If you need them for submission, you'll have to get them from getRawValue()
      // or set their initial value here and remove `disabled: true` if you want user interaction.
      date: [{value: this.getTodayDate(), disabled: true }, Validators.required],
      status: [{ value: 'Started', disabled: true}, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMyPolicies();
  }

  loadMyPolicies() {
    this.httpService.getPoliciesByOwnedUser(this.userId).subscribe({
      next: (data: Policy[]) => {
        console.log(data)
        this.myPolicies = data;
      },
      error: (err) => {
        console.error('Error fetching my policies', err);
      }
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Month is 0-indexed
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // UNCOMMENT THIS METHOD
  initiateClaim(policy: Policy) {
    this.selectedPolicy = policy;
    this.showClaimForm = true;
    // Reset the form and set default values,
    // ensuring disabled fields also get their values correctly for the form display.
    this.claimForm.reset({
      description: `Reason for Claim:\n\nRemarks\n\nAdjuster:\n\nInvestigator:\n\nUnderwriter:`,
      date: this.getTodayDate(), // This will set the value in the disabled field
      status: 'Started'         // This will set the value in the disabled field
    });
  }

  submitClaim() {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      alert('User not identified. Please login again.');
      return;
    }

    // Use getRawValue() to include disabled fields if their values are needed
    // Otherwise, this.claimForm.value will not include 'date' and 'status'
    const formValues = this.claimForm.getRawValue();
    const description = formValues.description;
    const date = formValues.date;
    const status = formValues.status;


    if (this.claimForm.valid && this.selectedPolicy) { // Check validity against non-disabled controls
      const payload: any = {
        description: description,
        date: new Date(date).toISOString(), // backend expects Date; ISO string is safe
        status: status,
        policy_id: this.selectedPolicy.id
      };

      this.httpService.createClaims(payload, this.userId).subscribe({
        next: (res) => {
          this.showClaimForm = false; // Hide the form
          this.selectedPolicy = null; // Clear selected policy
          this.router.navigate(['/dashboard']); // Route to dashboard
        },
        error: (err) => {
          console.error('Error creating claim', err);
          alert('Error creating claim. Try again.');
        }
      });
    }
  }

  cancelClaim() {
    this.showClaimForm = false;
    this.selectedPolicy = null;
    this.claimForm.reset();
  }
}