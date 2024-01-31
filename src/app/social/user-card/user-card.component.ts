import {Component, Input} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {RemoveConfirmationComponent} from "../remove-confirmation/remove-confirmation.component";
import {AlertService} from "../../services/alert.service";
import {AlertTypes} from "../../enums/alert-types";
import {UsersService} from "../../services/users.service";
import {FriendshipService} from "../../services/friendship.service";
import {Router} from "@angular/router";

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
    private alertService: AlertService,
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
      this.alertService.showAlert(AlertTypes.SUCCESS, "Sent friend request to: " + this.full_name);
      this.reloadPage();

      this.clicked = true;

    }, error => {
      this.alertService.showAlert(AlertTypes.ERROR, "Failed sending friend request to: " + this.full_name);
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
