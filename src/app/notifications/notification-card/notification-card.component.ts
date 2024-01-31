import {Component, Input} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {FriendshipService} from "../../services/friendship.service";
import {AlertTypes} from "../../enums/alert-types";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";

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

  clicked = false;
  constructor(
    private usersService:UsersService,
    private friendshipService:FriendshipService,
    private alertService: AlertService,
    private router:Router
  ) {}

  acceptFriendRequest(){
    this.friendshipService.acceptFriendRequest(this.usersService.loggedUser.username, this.username).subscribe(response=>{
      console.log(response);
      this.alertService.showAlert(AlertTypes.INFO, "You and " + this.full_name + " became friends!");
      this.reloadPage();
      this.clicked = true;

    }, error => {
      throw error;
    })
  }

  declineFriendRequest(){
    this.friendshipService.deleteFriendship(this.usersService.loggedUser.username, this.username).subscribe(response=>{
      console.log(response);
      this.alertService.showAlert(AlertTypes.INFO, "Friend request from " + this.full_name + " declined!");
      this.reloadPage();
      this.clicked = true;

    }, error => {
      this.alertService.showAlert(AlertTypes.ERROR, "ERROR declining friend request!");
      throw error;
    })

  }

  reloadPage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
