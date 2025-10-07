import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Policy } from '../model/Policy';

@Component({
  selector: 'app-update-policy',
  templateUrl: './update-policy.component.html',
  styleUrls: ['./update-policy.component.scss']
})
export class UpdatePolicyComponent implements OnInit {
  policyForm: FormGroup;
  policyId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.policyForm = this.formBuilder.group({
      policyNumber: ['', Validators.required],
      policyType: ['', Validators.required],
      premium: ['', [Validators.required, Validators.min(1)]],
      termMonths: ['', [Validators.required, Validators.min(1)]],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get policy ID from route parameter
    this.route.params.subscribe(params => {
      this.policyId = +params['id']; // Convert string to number using +
      this.loadPolicyData();
    });
  }

  loadPolicyData() {
    // Fetch the policy data using the ID
    this.httpService.getAllPolicies().subscribe({
      next: (policies) => {
        const policy = policies.find((p: Policy) => p.id === this.policyId);
        if (policy) {
          this.policyForm.patchValue({
            policyNumber: policy.policyNumber,
            policyType: policy.policyType,
            premium: policy.premium,
            termMonths: policy.termMonths,
            name: policy.name
          });
        }
      },
      error: (error) => {
        console.error('Error loading policy:', error);
        this.showToast('Error loading policy data', 'error');
      }
    });
  }

  onSubmit() {
    if (this.policyForm.valid) {
      const payload = this.policyForm.value;

      this.httpService.updatePolicy(this.policyId, payload).subscribe({
        next: () => {
          this.showToast('Policy updated successfully!', 'success');
          this.router.navigate(['/policies']);
        },
        error: (error) => {
          console.error('Error updating policy:', error);
          this.showToast('Error updating policy', 'error');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/policies'])
  }

  private showToast(message: string, type: 'success' | 'error') {
    const toast = document.getElementById('snackbarToast');
    if (toast) {
      toast.classList.remove('text-bg-success', 'text-bg-danger');
      toast.classList.add(type === 'success' ? 'text-bg-success' : 'text-bg-danger');
      const toastBody = toast.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = message;
      }
      // @ts-ignore
      const bsToast = new bootstrap.Toast(toast);
      bsToast.show();
    }
  }
}