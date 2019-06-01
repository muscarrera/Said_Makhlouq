import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessions: Observable<Session[]>;
  collection: AngularFirestoreCollection<Session>;
  doc: AngularFirestoreDocument<Session>;

 constructor(private afs: AngularFirestore) {
       //this.friends =this.db.collection('friends').valueChanges();
       this.collection = this.afs.collection('sessions');
       this.sessions = this.collection.snapshotChanges().pipe(map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Session;
           //data.CId = a.payload.doc.id;
           return data;
         });
       }));
 }

//select all *
  sellectAll() {
       return this.sessions;
     }

// Insert
  add(newElement: Session) {
  this.collection.add(newElement);
  }

//Delete
remove(element: Session) {
this.doc = this.afs.doc('sessions/'+ element); //id
this.doc.delete();
}

//update
update(element: Session){
  this.doc = this.afs.doc('sessions/'+ element); //id
  this.doc.update(element);
}
}
