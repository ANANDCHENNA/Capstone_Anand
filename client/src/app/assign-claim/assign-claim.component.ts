import { Underwriter } from '../model/Underwriter';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Investigator } from '../model/Investigator';

@Component({
  selector: 'app-assign-claim',
  templateUrl: './assign-claim.component.html',
  styleUrls: ['./assign-claim.component.scss']
})
export class AssignClaimComponent implements OnInit {

  itemForm: FormGroup;

  underwriters: Underwriter[] = []
  investigators: Investigator[] = []
  id: number | undefined

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    @Optional() private route: ActivatedRoute
  ) {
    this.itemForm = this.formBuilder.group({
      claimId: [this.id],
      description: [{ value: "", disabled: true }, Validators.required],
      status: [{ value: "Started", disabled: true }, Validators.required],
      underwriterId: [null, Validators.required],
      investigatorId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.httpService.GetAllUnderwriter().subscribe((data) => {
      this.underwriters = data
    })
    this.httpService.GetAllInvestigator().subscribe((data) => {
      this.investigators = data
    })
    this.id = this.route?.snapshot?.params?.['id'] ?? null;
    if (this.id) {
      this.httpService.getClaimById(this.id).subscribe((data) => {
        console.log(data);
        this.itemForm.patchValue(data);
      })
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      console.log(this.itemForm.value)
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