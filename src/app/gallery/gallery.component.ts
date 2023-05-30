import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { BehaviorSubject, map, merge, Observable, switchMap, tap } from "rxjs";
import { fadeInAnimation } from "../animations/animation";
import { MediaService } from "../services/media.service";

@Component({
    standalone: true,
    templateUrl: './gallery.component.html',
    imports: [
        CommonModule
    ],
    animations: [
        fadeInAnimation
    ]
})

export class GalleryComponent {
    private loadingPending = false;

    @HostListener('window:scroll')
    onscroll() {
        if ((window.scrollY + window.innerHeight) >= this.imageContainer.nativeElement.offsetHeight) {
            if (!this.loadingPending) {
                this.loadingPending = true;
                this.loadMore();
                // timeout for load other images
                setTimeout(() => this.loadingPending = false, 300);
            }
        }
    }

    // need for trigger load on scroll
    @ViewChild('imageContainer', { read: ElementRef<HTMLDivElement>, static: false }) imageContainer!: ElementRef<HTMLDivElement>;

    images = new BehaviorSubject<any[]>([]);

    private page = 1;
    private maxPage!: number;

    constructor(private readonly mediaService: MediaService) { }

    ngOnInit(): void {
        this.getMedia().subscribe(res => this.images.next(res));
    }

    getMedia(): Observable<any[]> {
        return this.mediaService.getMedia(this.page).pipe(
            tap(res => this.maxPage = res.totalPages),
            map(res => res.images)
        );
    }

    loadMore(): void {
        if (this.page < this.maxPage) {
            // increment page
            this.page++;
            // update images array
            this.getMedia().subscribe(res => this.images.next([...this.images.value, ...res]));
        }
    }
}