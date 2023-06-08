import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
    constructor(private readonly http: HttpClient) { }

    comparePassword(password: string): Observable<boolean> {
        return this.http.get<boolean>(`${environment.urlServer}/auth/${password}`);
    }
}