import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],  
      role: [null, Validators.required],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
 
  }

  onSubmit() {
    
    this.itemForm.markAllAsTouched();

    if (this.itemForm.valid) {
      this.httpService.registerUser(this.itemForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          if (error.status === 409) {  
            this.errorMessage = "Username or Email Already Exists.";
          } else {
            this.errorMessage = "An unexpected error occurred. Please try again.";
          }
        }
      });
    } else {
      this.errorMessage = "Please correct the errors in the form.";
    }
  }
}
 
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const errors: any = {};

  if (value.length < 8) {
    errors.minLength = true;
  }
  if (!/[A-Z]/.test(value)) {
    errors.uppercase = true;
  }
  if (!/[a-z]/.test(value)) {
    errors.lowercase = true;
  }
  if (!/[0-9]/.test(value)) {
    errors.number = true;
  }
  if (!/[@\-$.]/.test(value)) { 
    errors.specialChar = true;
  }

  return Object.keys(errors).length ? errors : null;
}