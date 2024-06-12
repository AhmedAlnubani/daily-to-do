import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoginService {
   //#region  Properties
    baseUrl = environment.apiUrl;
    //#endregion  Properties
    
  //#region  constructor
    constructor(private http : HttpClient) { }
 //#endregion  constructor
 
   //#region  Properties
    login(data: any) :Observable<any>{
        return this.http.post<any>('Accounts/Login', data);
    }
     //#endregion  Properties
}