import {Component} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../../authenticator/authenticator.component";
import {FriendshipService} from "../../services/friendship.service";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-remove-confirmation',
  templateUrl: './remove-confirmation.component.html',
  styleUrls: ['./remove-confirmation.component.css']
})
export class RemoveConfirmationComponent {
  public username = '';
  public full_name = '';
  constructor(
    public modalRef: MdbModalRef<AuthenticatorComponent>,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    private friendshipService: FriendshipService,
    private router:Router
    ) {}

  confirm_remove_friend(){
    this.friendshipService.deleteFriendship(this.usersService.loggedUser.username, this.username).subscribe(response=>{
      console.log(response);
      this.notificationsService.showDefaultNotification(this.full_name + " has been removed from your friend list!");
      this.reloadPage();

    }, error => {
      this.notificationsService.showErrorNotification("ERROR removing friend!");
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
