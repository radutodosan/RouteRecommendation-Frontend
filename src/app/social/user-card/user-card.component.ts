import {Component, Input} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {RemoveConfirmationComponent} from "../remove-confirmation/remove-confirmation.component";
import {UsersService} from "../../services/users.service";
import {FriendshipService} from "../../services/friendship.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

 @Input() username:string = '';
 @Input() full_name:string = '';
 @Input() email?:string;
 @Input() picture_url?:string;
 @Input() type:string = '';

 clicked=false;

  modalRef: MdbModalRef<RemoveConfirmationComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private friendshipService:FriendshipService,
    private router:Router,
  ) {}

  open_remove_confirmation() {
    this.modalRef = this.modalService.open(RemoveConfirmationComponent);
    this.modalRef.component.username = this.username;
    this.modalRef.component.full_name = this.full_name;
  }

  sendFriendRequest(){
    this.friendshipService.sendFriendRequest(this.usersService.loggedUser.username, this.username).subscribe(response=>{
      console.log(response);
      this.notificationsService.showSuccessNotification("Sent friend request to: " + this.full_name);
      this.reloadPage();

      this.clicked = true;

    }, error => {
      this.notificationsService.showErrorNotification("Failed sending friend request to: " + this.full_name);
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
