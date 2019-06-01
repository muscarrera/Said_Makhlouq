import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Cost } from '../models/cost.model';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  costs: Observable<Cost[]>;
  collection: AngularFirestoreCollection<Cost>;
  doc: AngularFirestoreDocument<Cost>;

 constructor(private afs: AngularFirestore) {
       //this.friends =this.db.collection('friends').valueChanges();
       this.collection = this.afs.collection('costs');
       this.costs = this.collection.snapshotChanges().pipe(map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Cost;
           //data.CId = a.payload.doc.id;
           return data;
         });
       }));
 }

//select all *
  sellectAll() {
       return this.costs;
     }

// Insert
  add(newElement: Cost) {
  this.collection.add(newElement);
  }

//Delete
remove(element: Cost) {
this.doc = this.afs.doc('costs/'+ element);
this.doc.delete();
}

//update
update(element: Cost){
  this.doc = this.afs.doc('costs/'+ element);
  this.doc.update(element);
}
}
