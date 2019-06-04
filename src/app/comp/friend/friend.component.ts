import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/shared/models/friend.model';
import { FriendService } from 'src/app/shared/services/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styles: []
})
export class FriendComponent implements OnInit {
friends :Friend[];
friend: Friend;


  constructor(private service: FriendService) { }

  ngOnInit() {

    this.service.sellectAll().subscribe(friends => {
      this.friends = friends;
    console.log(this.friends); });
    this.initForm();
  }



initForm() {
  this.friend = {
    FId: '0',
    Mission: '',
    LastName: '',
    FerstName: '',
    Address: '',
    City: '',
    Tel: '',
    Fax: '',
    Email: ''
  };
}

addNewFriend() {
  this.service.add(this.friend);
  this.initForm();
}

deleteFriend(f: Friend) {
  this.service.remove(f);
  this.initForm();
}

}
