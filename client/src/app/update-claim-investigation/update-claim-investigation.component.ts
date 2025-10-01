import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpService } from '../../../services/http.service';
import { Investigation } from '../../model/Investigation';

@Component({
  selector: 'app-update-investigation',
  templateUrl: './update-investigation.component.html',
  styleUrls: ['./update-investigation.component.scss']
})
export class UpdateInvestigationComponent implements OnInit {


  itemForm: FormGroup
  investigationId : number | undefined

  constructor(private httpService: HttpService, private router: Router, private route :  ActivatedRoute, private formBuilder: FormBuilder) { 
    this.itemForm = this.formBuilder.group({
      report: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit(): void {
      this.investigationId = this.route.snapshot.params['id']
      this.httpService.getInvestigationById(this.investigationId).subscribe((data) => {
        this.itemForm.patchValue(data)
      })
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.updateInvestigation(this.itemForm.value, this.investigationId).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']); 
        },
        error: (error) => {
          console.error('Error Updating investigation:', error);
        }
      });
    }
  }

}