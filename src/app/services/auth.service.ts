import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserModel} from "../models/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = `${environment.backendUrl}`;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(userData: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/login`, userData)
  }

  register(userData: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/register`, userData)
  }

  logout(): void {
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe(() => {
      this.clearLocalStorage();
      this.router.navigate(['/login']);
    });
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('currentUser');
    // Add any other local storage items you may have
  }

  getUserProfileData(): UserModel | null {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return {
        id: parseInt(userId),
        fullName: localStorage.getItem('userFullName') || '',
        email: localStorage.getItem('userEmail') || '',
        gender: localStorage.getItem('userGender') || '',
        age: parseInt(localStorage.getItem('userAge') || '0'),
        password: localStorage.getItem('userPassword') || ''
      };
    } else {
      return null;
    }
  }
}
