import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { AppComponent } from './app.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

import { CreateClaimComponent } from './create-claim/create-claim.component';

import { UpdateClaimComponent } from './update-claim/update-claim.component';
import { AssignClaimComponent } from './assign-claim/assign-claim.component';
import { CreateInvestigatorComponent } from './create-investigator/create-investigator.component';
import { UpdateInvestigationComponent } from './update-claim-investigation/update-claim-investigation.component';
import { HomeComponent } from './home/home.component';
import { ViewUnderwritersComponent } from './view-underwriters/view-underwriters.component';
import { UpdateClaimUnderwriterComponent } from './update-claim-underwriter/update-claim-underwriter.component';
import { PurchasePolicyComponent } from './purchase/purchase-policy.component';

const routes: Routes = [
  { path: '**', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'buy-policy', component: PurchasePolicyComponent },
  { path: 'create-claim', component: CreateClaimComponent },  
  { path: 'view-underwriters', component: ViewUnderwritersComponent },  
  { path: 'update-claim/:id', component: UpdateClaimComponent },  
  { path: 'assign-claim', component: AssignClaimComponent },  
  { path: 'assign-claim/:id', component: AssignClaimComponent },  
  { path: 'create-investigator', component: CreateInvestigatorComponent },  
  { path: 'update-claim-investigation/:id', component: UpdateInvestigationComponent },  
  { path: 'update-claim-underwriter/:id', component: UpdateClaimUnderwriterComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
