import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MediaService {
    constructor(private readonly http: HttpClient) { }

    getMedia(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.urlServer}/images`);
    }
}