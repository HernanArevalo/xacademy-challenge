import { Toast } from '@/core/utils';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null)

  constructor(private router: Router) {
    const token = localStorage.getItem('playme-token');
    const userData = localStorage.getItem('user-data');
    
    this.loggedIn.next(!!token);

    if (userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserData(): Observable<any> {
    return this.userSubject.asObservable();
  }

  login(token: string, user: any): void {
    localStorage.setItem('playme-token', token);
    localStorage.setItem('user-data', JSON.stringify(user));
    this.loggedIn.next(true);
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('playme-token');
    localStorage.removeItem('user-data');
    this.loggedIn.next(false);
    this.userSubject.next(null);
    Toast({title:'You logged out!'})
    this.router.navigate(['/login']);
  }
}
