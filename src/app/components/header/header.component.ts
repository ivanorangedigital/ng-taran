import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { NavigationStart, Router, RouterModule } from "@angular/router";
import { filter } from "rxjs";

@Component({
    standalone: true,
    templateUrl: './header.component.html',
    selector: 'app-header',
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class HeaderComponent implements AfterViewInit, OnInit {
    @ViewChild('header', { read: ElementRef<HTMLElement> }) header!: ElementRef<HTMLElement>;

    private lastScroll = 0;
    isScrollBottom = false;

    @HostListener('window:scroll')
    onScroll() {
        if (window.scrollY > 150) {
            const currentScroll = window.scrollY;
            if (currentScroll > this.lastScroll) {
                this.isScrollBottom = true;

            } else {
                this.isScrollBottom = false;

            }
            this.lastScroll = window.scrollY;
        }
    }

    constructor(private readonly router: Router) { }

    ngAfterViewInit(): void {
        const headerHeight = this.header.nativeElement.offsetHeight;
        localStorage.setItem('HEADER_HEIGHT', headerHeight.toString());
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(e => e instanceof NavigationStart)
        ).subscribe(() => this.isScrollBottom = false)
    }

}