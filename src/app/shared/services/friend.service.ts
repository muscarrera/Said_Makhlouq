import { Injectable } from '@angular/core';
import { Friend } from '../models/friend.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  friends: Observable<Friend[]>;
  friendsCollection: AngularFirestoreCollection<Friend>;
  friendDoc: AngularFirestoreDocument<Friend>;

 constructor(private db: AngularFirestore) {
       //this.friends =this.db.collection('friends').valueChanges();
       this.friendsCollection = this.db.collection('friends');
       this.friends = this.friendsCollection.snapshotChanges().pipe(map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Friend;
           data.FId = a.payload.doc.id;
           return data;
         });
       }));
 }

//select all *
  sellectAll() {
       return this.friends;
     }

// Insert
  add(newFriend: Friend) {
  this.friendsCollection.add(newFriend);
  }

//Delete
remove(friend: Friend) {
this.friendDoc = this.db.doc('friends/'+ friend.FId);
this.friendDoc.delete();
}

//update
update(friend: Friend){
  this.friendDoc = this.db.doc('friends/'+ friend.FId);
  this.friendDoc.update(friend);
}

//select one
getSingleFriend(id: number) {

}

}
