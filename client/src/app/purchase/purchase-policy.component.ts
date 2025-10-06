import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { PurchaseRequest } from '../model/PurchaseRequest';

@Component({
  selector: 'app-purchase-policy',
  templateUrl: './purchase-policy.component.html'
})
export class PurchasePolicyComponent {
  form: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.form = this.fb.group({
      policyType: ['Health', Validators.required],
      premium: [1000, [Validators.required, Validators.min(1)]],
      termMonths: [12, [Validators.required, Validators.min(1)]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    const payload: PurchaseRequest = this.form.value;
    this.httpService.purchase(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMsg = `Policy purchased: ${res.policyNumber}`;
        this.form.reset({ policyType: 'Health', premium: 1000, termMonths: 12 });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error || 'Purchase failed';
      }
    });
  }
}
