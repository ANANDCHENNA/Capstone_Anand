import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;
  private isLoggedIn: boolean = false;
  id: string | null | undefined;

  constructor() { }

  
  saveToken(token: string) {
    this.token = token;
    this.isLoggedIn = true;
 
    localStorage.setItem('token', token);
  }

  SetRole(role: any) {
    localStorage.setItem('role', role);
  }
  get getRole(): string | null {
    return localStorage.getItem('role');
  }
 
  get getLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }
  
  getToken(): string | null {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.token = null;
    this.isLoggedIn = false
  }

  getUserId(): string | null {
    return localStorage.getItem('userId') ?? null;
  }

  saveUserId(userid: string): void {
    localStorage.setItem('userId', userid);
  }
}
