import {Component} from '@angular/core';
import {AlertTypes} from "../../enums/alert-types";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../../authenticator/authenticator.component";
import {AlertService} from "../../services/alert.service";
import {FriendshipService} from "../../services/friendship.service";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

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
    private alertService: AlertService,
    private friendshipService: FriendshipService,
    private router:Router
    ) {}

  confirm_remove_friend(){
    this.friendshipService.deleteFriendship(this.usersService.loggedUser.username, this.username).subscribe(response=>{
      console.log(response);
      this.alertService.showAlert(AlertTypes.INFO, this.full_name + " has been removed from your friend list!");
      this.reloadPage();

    }, error => {
      this.alertService.showAlert(AlertTypes.ERROR, "ERROR removing friend!");
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
