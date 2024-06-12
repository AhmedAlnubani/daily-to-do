import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  //#region  constructor
  constructor(private router: Router) { }
  //#endregion  constructor

  //#region  Functions
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = sessionStorage.getItem('token');
    if (currentUser) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
  //#endregion  Functions
}
