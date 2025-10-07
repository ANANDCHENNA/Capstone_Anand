
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  errorMessage: any
  showError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }


  onSubmit() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.httpService.Login(this.itemForm.value).subscribe((data: any) => {
        if (data.userId != 0) {
          this.authService.SetRole(data.role)
          this.authService.saveToken(data.token)
          this.authService.saveUserId(data.userId);
          // this.router.navigate(['/dashboard'])
          if(data.role==='POLICYHOLDER')
          {
          this.router.navigate(['/buy-policy'])
          }
          else{
            this.router.navigate(['/dashboard'])
          }
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.showError = true;
          this.errorMessage = "Wrong Username or Password";
        }
      }, error => {
        this.showError = true;
        this.errorMessage = "An error Occured While login. Please try again"
      })
    }
    else {
      this.itemForm.markAllAsTouched()
    }
  }

  onSignUp() {
    this.router.navigate(['/registration'])
  }
}