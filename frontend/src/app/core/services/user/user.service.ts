import { LoginForm, RegisterForm } from '@/core/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface user {
        "token": string,
        "id": number,
        "name": string,
        "email": string,
        "female_player_id": number,
        "male_player_id": number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8080'

  constructor( private httpClient: HttpClient ) { }

  registerUser(userData:RegisterForm): Observable<{ok:boolean}> {
    return this.httpClient.post<{ok:boolean}>(`${this.apiUrl}/user/register`, userData)
  }
  loginUser(userData:LoginForm): Observable<{ok:boolean, user:user}> {
    return this.httpClient.post<{ok:boolean, user:user}>(`${this.apiUrl}/user/login`, userData)
  }
}
