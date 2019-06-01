import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JudicialAuthority } from '../models/judicial-authority.model';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class JudicialAuthorityService {

  judicialAuthorities: Observable<JudicialAuthority[]>;
  collection: AngularFirestoreCollection<JudicialAuthority>;
  doc: AngularFirestoreDocument<JudicialAuthority>;

 constructor(private afs: AngularFirestore) {
       //this.friends =this.db.collection('friends').valueChanges();
       this.collection = this.afs.collection('judicialAuthorities');
       this.judicialAuthorities = this.collection.snapshotChanges().pipe(map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as JudicialAuthority;
           data.JAId = a.payload.doc.id;
           return data;
         });
       }));
 }

//select all *
  sellectAll() {
       return this.judicialAuthorities;
     }

// Insert
  add(newElement: JudicialAuthority) {
  this.collection.add(newElement);
  }

//Delete
remove(element: JudicialAuthority) {
this.doc = this.afs.doc('judicialAuthorities/'+ element.JAId);
this.doc.delete();
}

//update
update(element: JudicialAuthority){
  this.doc = this.afs.doc('judicialAuthorities/'+ element.JAId);
  this.doc.update(element);
}
}
