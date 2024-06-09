import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class DailyTasksService {
    constructor(private http : HttpClient) { }

    getAll() :Observable<any>{
        return this.http.get<any>('Task/GetAllTaskes', {});
    }
    update(data:any) :Observable<any>{
        return this.http.put<any>('Task/UpdateTask', data);
    }
    add(data:any) :Observable<any>{
        return this.http.post<any>('Task/AddTask', data);
    }

    delete(id:any) :Observable<any>{
        return this.http.delete<any>('Task/'+id);
    }
}