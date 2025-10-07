import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/http.service';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    DashbaordComponent,
    CreateClaimComponent,
    UpdateClaimComponent,
    AssignClaimComponent,
    CreateInvestigatorComponent,
    UpdateInvestigationComponent,
    ViewUnderwritersComponent,
    UpdateClaimUnderwriterComponent,
    PurchasePolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
