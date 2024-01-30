import {Component, Input} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {FriendshipService} from "../../services/friendship.service";

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent {
  @Input() id?:string;
  @Input() username:string = '';
  @Input() full_name?:string;
  @Input() email?:string;
  @Input() picture_url?:string;

  constructor(
    private usersService:UsersService,
    private friendshipService:FriendshipService
  ) {}

  acceptFriendRequest(){
    this.friendshipService.acceptFriendRequest(this.usersService.loggedUser.username, this.username).subscribe(response=>{
      console.log(response);
    }, error => {
      throw error;
    })
    window.location.reload();
  }
}
