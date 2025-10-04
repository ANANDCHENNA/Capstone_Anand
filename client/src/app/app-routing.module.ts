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
import { ViewUnderwritersComponent } from './view-underwriters/view-underwriters.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'create-claim', component: CreateClaimComponent },  
  { path: 'view-underwriters', component: ViewUnderwritersComponent },  
  { path: 'update-claim/:id', component: UpdateClaimComponent },  
  { path: 'assign-claim', component: AssignClaimComponent },  
  { path: 'assign-claim/:id', component: AssignClaimComponent },  
  { path: 'create-investigator', component: CreateInvestigatorComponent },  
  { path: 'update-claim-investigation', component: UpdateInvestigationComponent },  
  { path: 'update-claim-underwriter/:id', component: UpdateClaimComponent },  

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
