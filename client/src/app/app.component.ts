import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  IsLoggin: any = false;
  roleName: string | null;

  constructor(private authService: AuthService, private router: Router) {
    this.IsLoggin = authService.getLoginStatus;
    this.roleName = authService.getRole;
  
    // if (!this.IsLoggin && this.router.url === '/') {
    //   this.router.navigateByUrl('/home');
    // }
    this.checkAuthStatus();
  }
  checkAuthStatus(): void {
      this.IsLoggin = this.authService.getLoginStatus;
      this.roleName = this.authService.getRole;
    
      // Don't redirect to login if user is on landing page, login page, or registration page
      const publicRoutes = ['/', '/login', '/registration'];
      const currentRoute = this.router.url;
    
      if (!this.IsLoggin && !publicRoutes.includes(currentRoute)) {
        this.router.navigateByUrl('/login');
      }
    }
  
  
  navigateToHome(){
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
