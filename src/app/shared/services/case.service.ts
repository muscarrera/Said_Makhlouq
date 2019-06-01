import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Case } from '../models/case.model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

      cases: Observable<Case[]>;
      collection: AngularFirestoreCollection<Case>;
      doc: AngularFirestoreDocument<Case>;

     constructor(private afs: AngularFirestore) {
           //this.friends =this.db.collection('friends').valueChanges();
           this.collection = this.afs.collection('cases');
           this.cases = this.collection.snapshotChanges().pipe(map(changes => {
             return changes.map(a => {
               const data = a.payload.doc.data() as Case;
               //data.CId = a.payload.doc.id;
               return data;
             });
           }));
     }

    //select all *
      sellectAll() {
           return this.cases;
         }

    // Insert
      add(newElement: Case) {
      this.collection.add(newElement);
      }

    //Delete
    remove(element: Case) {
    this.doc = this.afs.doc('cases/'+ element);
    this.doc.delete();
    }

    //update
    update(element: Case){
      this.doc = this.afs.doc('cases/'+ element);
      this.doc.update(element);
    }
}
