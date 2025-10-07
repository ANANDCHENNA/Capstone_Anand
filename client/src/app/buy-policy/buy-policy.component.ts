import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-policy',
  templateUrl: './buy-policy.component.html',
  styleUrls: ['./buy-policy.component.scss']
})
export class BuyPolicyComponent implements OnInit {

  policies: any[] = [];
  buyForm!: FormGroup;
  policyholderId!: string | null;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.buyForm = this.fb.group({
      policy_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get logged-in user id
    this.policyholderId = this.authService.getUserId();

    // Fetch all available policies
    this.httpService.getAllPolicies().subscribe((data: any) => {
      this.policies = data;
    });
  }

  buyPolicy() {
    if (this.buyForm.invalid) {
      alert('Please select a policy to buy.');
      return;
    }

    const selectedPolicyId = this.buyForm.value.policyId;

    this.httpService.purchasePolicy(selectedPolicyId, this.policyholderId).subscribe({
      next: () => {
        alert('Policy purchased successfully!');
        this.router.navigate(['/create-claim']); // Redirect to view all claims
      },
      error: (err) => {
        console.error(err);
        alert('Error purchasing policy: ' + err.error);
      }
    });
  }
}
