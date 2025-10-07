import { Component, OnInit, Optional } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpService } from '../../services/http.service'; 
import { AuthService } from '../../services/auth.service'; 
import { DashbaordComponent } from '../dashbaord/dashbaord.component'; 
import { Claim } from '../model/Claim';
 @Component({ 
selector: 'app-create-claim',
 templateUrl: './create-claim.component.html', 
styleUrls: ['./create-claim.component.scss'] }) 
export class CreateClaimComponent implements OnInit {
  itemForm: FormGroup;
  policyholderId: string | null = ''
  currentDate: string = ''

  statusDisable: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    @Optional() private route: ActivatedRoute
  ) {

    this.currentDate = new Date().toLocaleDateString('en-CA')
    this.itemForm = this.formBuilder.group({
      description: ["", Validators.required],
      date: [this.currentDate, Validators.required],
      status: [{ value: "Started", disabled: true }, Validators.required]
    });
  }

  ngOnInit() {
    this.policyholderId = this.authService.getUserId?.();
    this.statusDisable = true;
  }
  onSubmit() {
    if (this.itemForm.valid) {
      const payload = this.itemForm.getRawValue();
      console.log(this.itemForm.value)
      this.httpService.createClaims(payload, this.policyholderId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard'])
        },
        error: (error) => {
          console.error('Error creating claim:', error);
        }
      });
    }
  }
}
