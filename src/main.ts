import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { environment } from './environments/environment';
import { register } from 'swiper/element/bundle';

// initialize swiper
register();

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(AppRoutes),
    )
  ]
}).catch(err => console.error(err));