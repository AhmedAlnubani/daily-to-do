import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiUrl = request.url;
    if (
      apiUrl.toLowerCase().indexOf('https://jsonplaceholder.typicode') < 0 &&
      apiUrl.toLowerCase().indexOf('.json') < 0 && !apiUrl.includes('maps.googleapis.com')) {
      if (apiUrl.indexOf('Hubs') == -1 && apiUrl.indexOf('https') == -1)
        apiUrl = `${environment.apiUrl}${request.url}`;

    }
    else {
      return next.handle(request);
    }

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


    return next.handle(request)
      .pipe(
      //   catchError((err:any | null) => {
      //   if ([401, 403].includes(err.status)) {//400
      //     sessionStorage.removeItem('token');
      //     sessionStorage.removeItem('permissions');
      //     sessionStorage.removeItem('adminLogin');
      //     window.location.href = ('auth/login');
      //   }
      //   else {
      //     const error = err.error;
      //     alert('Unknown Error')
      //     return throwError(error);
      //   }
      // })
    );
  }

}