
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {}
    
      ngOnInit(): void {
        // init({
        //   duration: 1000,
        //   once: true,
        //   offset: 100
        // });
      }
    
      onLogin(): void {
        this.router.navigate(['/login']);
      }
    
      onSignUp(): void {
        this.router.navigate(['/registration']);
      }
    
      learnMore(insuranceId: number): void {
        this.router.navigate(['/insurance-details', insuranceId]);
      }
    
      claimNow(): void {
        this.router.navigate(['/claim-registration']);
      }
    
      getFloatingElements(): string[] {
        return ['shield', 'heart', 'home'];
      }
    
      getBannerContent(): { title: string; subtitle: string } {
        return {
          title: 'Protecting What Matters Most',
          subtitle: 'Secure your future with our comprehensive insurance solutions'
        };
      }
    
      getLogoDetails(): { src: string; alt: string; title: string } {
        return {
          src: 'assets/images/shield-logo.png',
          alt: 'InsureClaims Elite',
          title: 'InsureClaims Elite'
        };
      } 
    }
  