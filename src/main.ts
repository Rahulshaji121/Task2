import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // your routes file

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),     // ✅ provides HttpClient globally
    provideRouter(routes)    // ✅ provides Router for navigation
  ]
})
.catch(err => console.error(err));
