import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MediaService {
    constructor(private readonly http: HttpClient) { }

    getMedia(page = 1, per_page = 12): Observable<{ total: number, totalPages: number, images: any[] }> {
        return this.http.get<any[]>(`${environment.urlServer}/images?page=${page}&per_page=${per_page}`, { withCredentials: true, observe: 'response' }).pipe(
            map(res => ({
                total: Number(res.headers.get('total')),
                totalPages: Number(res.headers.get('total_pages')),
                images: res.body || []
            }))
        );
    }

    uploadMedia(formData: FormData) {
        return this.http.post('http://127.0.0.1:5000/media/upload', formData);
    }

    deleteMedia(imageIds: string[]) {
        return this.http.delete('http://127.0.0.1:5000/media/delete', {
            body: imageIds
        });
    }
}