import { Component } from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {UsersService} from "../services/users.service";
import {FriendshipService} from "../services/friendship.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500})
  ],
})
export class NotificationsComponent {

  //@ts-ignore
  notificationsList$ : Observable<any>;

  constructor(
    private usersService: UsersService,
    private friendshipService: FriendshipService,
  ) {}
  ngOnInit(){
    this.notificationsList$ = this.friendshipService.getPendingFriendRequests(this.usersService.loggedUser.username);
  }
}
