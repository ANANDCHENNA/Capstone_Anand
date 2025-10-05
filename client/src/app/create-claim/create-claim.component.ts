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
 policies:any[]=[]; 
selectedPolicy:any; 
selectedId!:number;
 statusDisable: boolean = false; 
constructor( private formBuilder: FormBuilder, private httpService: HttpService, private authService: AuthService, private router: Router, @Optional() private route: ActivatedRoute ) 
{ this.currentDate = new Date().toLocaleDateString('en-CA') 
this.itemForm = this.formBuilder.group({ 
description: ["", Validators.required], 
date: [this.currentDate, Validators.required],
 status: ["Started", Validators.required],
 policy_id:['',Validators.required],  
//claimType:["",Validators.required]
 }); this.httpService.getAllPolicies().subscribe((data:any)=> { this.policies=data; }); }
  onPolicySelect(event:any):void{ // console.log(event.target) 
    this.selectedId=event.target.value; // console.log(this.selectedId) 
    this.selectedPolicy=this.policies.find(p => p.id==this.selectedId) 
    console.log(this.selectedPolicy) } 
    ngOnInit() { 
        this.policyholderId = this.authService.getUserId?.(); 
this.statusDisable = true; 
}
 onSubmit() { if (this.itemForm.valid) { this.httpService.createClaims(this.itemForm.value, this.policyholderId).subscribe({ 
next: () => { this.router.navigate(['/dashboard']) },
 error: (error) => { console.error('Error creating claim:', error);
 }
 }); } } }