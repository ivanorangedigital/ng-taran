import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent
  ]
})
export class AppComponent implements OnInit {
  constructor(private readonly cookieService: CookieService) { }

  ngOnInit(): void {
    this.cookieService.check('API_KEY') || this.cookieService.set('API_KEY', environment.apikey);
  }
}
