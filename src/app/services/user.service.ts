import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private createJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private AuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  loginUser(user: { email: string; password: string }): Observable<any> {
    let headers = this.createJsonHeaders();
    return this.http.post<any>(this.apiUrl + 'Login', user, { headers });
  }

  getAllUser(): Observable<User[]> {
    const token = this.getToken();
    if (token) {
      const headers = this.AuthHeaders(token);
      return this.http.get<User[]>(this.apiUrl + 'User/Get', { headers });
    } else {
      return new Observable<User[]>((observer) => {
        observer.error('Token is not available');
      });
    }
  }

  AddUser(user: User): Observable<User[]> {
    const headers = this.createJsonHeaders();
    return this.http.post<User[]>(this.apiUrl + 'User/Add', user, { headers });
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}User/Get/${userId}`;
    return this.http.get<User>(url);
  }

  UpdateUser(user: User): Observable<User[]> {
    const headers = this.createJsonHeaders();
    return this.http.put<User[]>(this.apiUrl + 'User/Update', user, {
      headers,
    });
  }

  deleteUser(userid: number): Observable<User[]> {
    const headers = this.createJsonHeaders();
    const url = this.apiUrl + 'User/Delete';

    return this.http.delete<User[]>(url, {
      params: { userid: userid.toString() },
      headers,
    });
  }


isAuthenticated(): boolean {
  const token = this.getToken();
  return !!token; 
}

}
