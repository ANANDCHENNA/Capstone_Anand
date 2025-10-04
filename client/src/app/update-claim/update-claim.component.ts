import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-update-claim',
  templateUrl: './update-claim.component.html',
  styleUrls: ['./update-claim.component.scss']
})
export class UpdateClaimComponent implements OnInit {
  itemForm: FormGroup;
  claimId: number | undefined;
  userRole:string | null | undefined
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    
    @Optional() private route: ActivatedRoute
  ) {
    this.itemForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.claimId = this.route?.snapshot?.params?.['id'] ?? null;
    this.httpService.getClaimById?.(this.claimId).subscribe((data) => {
      this.itemForm.patchValue(data);
    })
  }

  onSubmit() {
    this.userRole=this.authService.getRole;
    if (this.itemForm.valid) {
      if(this.userRole=='UNDERWRITER')
      {
      console.log(this.itemForm.status)
      this.httpService.updateClaimsStatus(this.itemForm.value, this.claimId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error updating claim:', error);
        }
      });
    }
    else if(this.userRole=='ADJUSTER')
    {
       this.httpService.updateClaims(this.itemForm.value, this.claimId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error updating claim:', error);
        }
      });
    }
  }
  }
}