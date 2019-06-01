import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

    clients: Observable<Client[]>;
    collection: AngularFirestoreCollection<Client>;
    doc: AngularFirestoreDocument<Client>;

   constructor(private afs: AngularFirestore) {
         //this.friends =this.db.collection('friends').valueChanges();
         this.collection = this.afs.collection('clients');
         this.clients = this.collection.snapshotChanges().pipe(map(changes => {
           return changes.map(a => {
             const data = a.payload.doc.data() as Client;
             data.CId = a.payload.doc.id;
             return data;
           });
         }));
   }

  //select all *
    sellectAll() {
         return this.clients;
       }

  // Insert
    add(newElement: Client) {
    this.collection.add(newElement);
    }

  //Delete
  remove(enemy: Client) {
  this.doc = this.afs.doc('clients/'+ enemy.CId);
  this.doc.delete();
  }

  //update
  update(enemy: Client){
    this.doc = this.afs.doc('clients/'+ enemy.CId);
    this.doc.update(enemy);
  }
}
