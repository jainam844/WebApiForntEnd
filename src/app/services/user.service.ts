import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../Models/User.model';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { UserResource } from '../Models/UserResource.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return this.authService.createJsonHeaders();
    } else {
      throw new Error('Token is not available');
    }
  }

  loginUser(user: { email: string; password: string }): Observable<any> {
    let headers = this.authService.createJsonHeaders();
    return this.http.post<any>(this.apiUrl + 'login', user, { headers });
    `  `;
  }

  getAllUser(): Observable<User[]> {
    const token = this.authService.getToken();
    if (token) {
      const headers = this.authService.createJsonHeaders();
      return this.http.get<User[]>(this.apiUrl + 'user/get', { headers });
    } else {
      return new Observable<User[]>((observer) => {
        observer.error('Error');
      });
    }
  }

  addUser(user: User): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.post<User[]>(this.apiUrl + 'user/add', user, { headers });
  }

  getUserById(userId: number): Observable<User> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}User/Get/${userId}`;
    return this.http.get<User>(url, { headers });
  }

  updateUser(user: User): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.put<User[]>(this.apiUrl + 'user/update', user, {
      headers,
    });
  }

  deleteUser(userid: number): Observable<User[]> {
    const headers = this.getAuthHeaders();
    const url = this.apiUrl + 'user/delete';

    return this.http.delete<User[]>(url, {
      params: { userid: userid.toString() },
      headers,
    });
  }

  getUserResourses(): Observable<UserResource[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}userresource/get`;
    return this.http.get<UserResource[]>(url, { headers });
  }

  getUserResourceList(): Observable<UserResource[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}userresource/userresourcesList`;
    return this.http.get<UserResource[]>(url, { headers });
  }

  addUpdateResource(
    userId: number,
    resourceId: number
  ): Observable<UserResource[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}userresource/addresourse?UserId=${userId}&ResourceId=${resourceId}`;
    return this.http.post<UserResource[]>(url, {}, { headers });
  }

  getResourceByUserId(userId: number): Observable<UserResource[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}userresource/get/${userId}`;
    return this.http.get<UserResource[]>(url, { headers });
  }

  updateResource(
    userId: number,
    oldResourceId: number,
    newResourceId: number
  ): Observable<string> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}userresource/updateresource?userId=${userId}&oldResourceId=${oldResourceId}&newResourceId=${newResourceId}`;

    return this.http.post(url, null, { headers, responseType: 'text' });
  }

  deleteResource(
    userId: number,
    resourceId: number
  ): Observable<UserResource[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}userresource/deleteresource?UserId=${userId}&ResourceId=${resourceId}`;
    return this.http.delete<UserResource[]>(url, { headers });
  }
}
