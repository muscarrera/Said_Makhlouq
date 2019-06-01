import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendComponent } from './comp/friend/friend.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const firebaseConfig = {
apiKey: "AIzaSyAhqYWvmTByv_qivTH25Ma9fGb9V8nih_Q",
authDomain: "said-makhlouq.firebaseapp.com",
databaseURL: "https://said-makhlouq.firebaseio.com",
projectId: "said-makhlouq",
storageBucket: "said-makhlouq.appspot.com",
messagingSenderId: "1058614087328",
appId: "1:1058614087328:web:7d3a7734898d758b"
};

@NgModule({
  declarations: [
    AppComponent,
    FriendComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    //AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FormsModule,
    CommonModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
