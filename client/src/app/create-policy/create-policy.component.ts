import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnInit {
  policyForm: FormGroup;
  currentDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.policyForm = this.formBuilder.group({
      policyNumber: ['', Validators.required],
      policyType: ['', Validators.required],
      coverageAmount: ['', [Validators.required, Validators.min(1)]],
      premiumAmount: ['', [Validators.required, Validators.min(1)]],
      startDate: [this.currentDate, Validators.required],
      endDate: ['', [Validators.required, this.endDateValidator.bind(this)]]
    });
  }

  ngOnInit() {
    // Add any initialization logic if needed
  }

  endDateValidator(control: any) {
    if (!control.value) return null;
    
    const startDate = this.policyForm?.get('startDate')?.value;
    if (!startDate) return null;

    if (new Date(control.value) <= new Date(startDate)) {
      return { endDateInvalid: true };
    }
    return null;
  }

  onSubmit() {
    if (this.policyForm.valid) {
      const payload = {
        ...this.policyForm.value,
        coverageAmount: parseFloat(this.policyForm.value.coverageAmount),
        premiumAmount: parseFloat(this.policyForm.value.premiumAmount)
      };

      this.httpService.createPolicy(payload).subscribe({
        next: () => {
          // Show success message
          const toast = document.getElementById('snackbarToast');
          if (toast) {
            toast.classList.remove('text-bg-danger');
            toast.classList.add('text-bg-success');
            const toastBody = toast.querySelector('.toast-body');
            if (toastBody) {
              toastBody.textContent = 'Policy created successfully!';
            }
            // @ts-ignore
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
          }
          
          // Navigate to policies list
          this.router.navigate(['/policies']);
        },
        error: (error) => {
          console.error('Error creating policy:', error);
          // Show error message
          const toast = document.getElementById('snackbarToast');
          if (toast) {
            toast.classList.remove('text-bg-success');
            toast.classList.add('text-bg-danger');
            const toastBody = toast.querySelector('.toast-body');
            if (toastBody) {
              toastBody.textContent = 'Error creating policy. Please try again.';
            }
            // @ts-ignore
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
          }
        }
      });
    }
  }
}
