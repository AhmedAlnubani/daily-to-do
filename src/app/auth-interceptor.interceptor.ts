import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
  //#region  constructor
  constructor() { }
  //#endregion  constructor

  //#region  Functions
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiUrl = request.url;
    if (apiUrl.toLowerCase().indexOf('.json') < 0)
      apiUrl = `${environment.apiUrl}${request.url}`
    else
      return next.handle(request);

    request = request.clone({
      url: apiUrl,
    });

    const token = sessionStorage.getItem('token');

    if (token != null) {
      request = request.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          Authorization: 'Bearer ' + token.replace(/\"/g, ""),
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          "Expires": "0"
        },
      });
    }
    else {
      request = request.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          "Expires": "0"
        },
      });
    }


    return next.handle(request).pipe(
        catchError((err) => {
          if ([401, 403].includes(err.status)) {
            sessionStorage.removeItem('token');
            window.location.href = ('login');
            return throwError(err);
          }
          else {
            const error = err.error;
            alert('Unknown Error')
            return throwError(error);
          }
        })
      );
  }
  //#endregion  Functions
}