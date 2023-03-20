import { Component } from '@angular/core';
import { MediaService } from './services/media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private readonly mediaService: MediaService) {
    this.mediaService.getMedia().subscribe(res => console.log(res));
  }
}
