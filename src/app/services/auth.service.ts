import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
  }
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  createJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });
  }

  // authHeaders(token: string): HttpHeaders {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // Authorization: `Bearer ${token}`,
  //   });
  // }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
