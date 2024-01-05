import {enableProdMode, importProvidersFrom} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import {HomeComponent} from "./app/pages/home/home.component";
import {LoginComponent} from "./app/pages/login/login.component";
import {FirebaseModule} from "./app/firebase.module";
import {provideAuth} from "@angular/fire/auth";
import {RegistrationComponent} from "./app/pages/registration/registration.component";
import {HttpClientModule} from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

const routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'registration', component: RegistrationComponent, title: 'registration' }
  // ... other routes
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    importProvidersFrom(FirebaseModule)
  ]
}).catch(err => console.error(err));
