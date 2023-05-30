import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, map, switchMap } from "rxjs";
import { MediaService } from "src/app/services/media.service";

@Component({
    standalone: true,
    templateUrl: './images.component.html',
    selector: 'app-admin-images',
    imports: [
        CommonModule
    ]
})

export class AdminImagesComponent implements OnInit {
    refreshImages$ = new BehaviorSubject(true);
    images$!: Observable<any[]>;

    multipleSelection = false;
    imageIds: string[] = [];

    constructor(private readonly mediaService: MediaService) { }

    ngOnInit(): void {
        this.images$ = this.refreshImages$.pipe(
            switchMap(_ => this.mediaService.getMedia(1, 500).pipe(
                map(res => res.images)
            ))
        );
    }

    selectFiles(evt: any) {
        const files = evt.target.files;        
        const formData = new FormData();

        const length = files.length;
        
        if (length === 0) return;

        for (let i = 0; i < length; i++) {
            formData.append('files', files[i])
        }
        
        this.mediaService.uploadMedia(formData).subscribe(res => this.refreshImages$.next(true));
    }

    toggleMultipleSelection() {
        this.multipleSelection = !this.multipleSelection;
        if (this.multipleSelection) this.imageIds = [];
    }

    selectImage(evt: any, id: string) {        
        if (evt.target.checked) this.imageIds.push(id);
        else {
            const index = this.imageIds.findIndex(i => i === id);
            this.imageIds.splice(index, 1);
        };        
    }

    deleteImages() {        
        this.mediaService.deleteMedia(this.imageIds).subscribe(() => {
            this.multipleSelection = false;
            this.imageIds = [];
            this.refreshImages$.next(true);
        });
    }
}