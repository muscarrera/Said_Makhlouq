import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Enemy } from '../models/enemy.model';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  enemys: Observable<Enemy[]>;
  collection: AngularFirestoreCollection<Enemy>;
  doc: AngularFirestoreDocument<Enemy>;

 constructor(private afs: AngularFirestore) {
       //this.friends =this.db.collection('friends').valueChanges();
       this.collection = this.afs.collection('enemys');
       this.enemys = this.collection.snapshotChanges().pipe(map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Enemy;
           data.EId = a.payload.doc.id;
           return data;
         });
       }));
 }

//select all *
  sellectAll() {
       return this.enemys;
     }

// Insert
  add(newElement: Enemy) {
  this.collection.add(newElement);
  }

//Delete
remove(enemy: Enemy) {
this.doc = this.afs.doc('enemys/'+ enemy.EId);
this.doc.delete();
}

//update
update(enemy: Enemy){
  this.doc = this.afs.doc('enemys/'+ enemy.EId);
  this.doc.update(enemy);
}
}
