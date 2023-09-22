import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { environment } from './environments/environment';
import { LoaderService } from './services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.show();
    console.log('Interceptor: Request intercepted:', req);
    if (req.url.startsWith(environment.apiBaseUrl)) {
      const token = this.authService.getToken();
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(req).pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        console.error('Interceptor: Error occurred:', error);
        if (error.status === 401 || error.status === 403) {
          console.log('Interceptor: Authentication error occurred');
        }
        return throwError(error);
      }),

      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
