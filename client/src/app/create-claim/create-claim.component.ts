import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Claim } from '../model/Claim';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss']
})
export class CreateClaimComponent implements OnInit {
  itemForm: FormGroup;
  policyholderId: string | null = '';
  currentDate: string = '';
  statusDisable: boolean = false;

  // 🟢 New fields for photo
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    @Optional() private route: ActivatedRoute
  ) {
    this.currentDate = new Date().toLocaleDateString('en-CA');
    this.itemForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: [this.currentDate, Validators.required],
      status: [{ value: 'Started', disabled: true }, Validators.required],
    });
  }

  ngOnInit() {
    this.policyholderId = this.authService.getUserId?.();
    this.statusDisable = true;
  }

  // 🟢 File selection and preview
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  // 🟢 Form submission
  onSubmit(): void {
    if (this.itemForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = this.itemForm.getRawValue();

    // Use FormData to send text + file
    const formData = new FormData();
    formData.append('description', payload.description);
    // Convert date to dd-MM-yyyy format
    const rawDate = new Date(payload.date);
    const formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}-${(rawDate.getMonth() + 1).toString().padStart(2, '0')}-${rawDate.getFullYear()}`;
    
    formData.append('date', formattedDate);
    console.log('Formatted date:', formattedDate);
    // formData.append('date', payload.date);
    // console.log(payload.date)
    formData.append('status', payload.status);
    formData.append('policyholderId', this.policyholderId ?? '');

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    this.httpService.createClaims(formData).subscribe({
      next: () => {
        alert('Claim created successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error creating claim:', error);
        alert('Failed to create claim');
      },
    });
  }
}