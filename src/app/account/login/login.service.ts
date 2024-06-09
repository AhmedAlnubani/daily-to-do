import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoginService {
    baseUrl = environment.apiUrl;
    constructor(private http : HttpClient) { }

    login(data: any) :Observable<any>{
        return this.http.post<any>('Accounts/Login', data);
    }
}