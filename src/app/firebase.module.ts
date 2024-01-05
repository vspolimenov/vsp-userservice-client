// Create a new file, e.g., firebase.module.ts
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule
  ]
})
export class FirebaseModule { }
