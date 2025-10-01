import { Underwriter } from '../model/Underwriter';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-claim',
  templateUrl: './assign-claim.component.html',
  styleUrls: ['./assign-claim.component.scss']
})
export class AssignClaimComponent implements OnInit {

  itemForm: FormGroup;

  underwriters: Underwriter[] = []
  id: number | undefined

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    @Optional() private route: ActivatedRoute
  ) {
    this.itemForm = this.formBuilder.group({
      claimId: [null, Validators.required],
      underwriterId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.httpService.GetAllUnderwriter().subscribe((data) => {
      this.underwriters = data
    })
    this.id = this.route?.snapshot?.params?.['id'] ?? null;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.assignClaim({ ...this.itemForm.value, claimId: this.id }).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error('Error assigning claim:', error);
        }
      });
    }
  }
}