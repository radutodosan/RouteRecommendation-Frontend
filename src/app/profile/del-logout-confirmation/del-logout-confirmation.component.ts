import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../../authenticator/authenticator.component";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-del-logout-confirmation',
  templateUrl: './del-logout-confirmation.component.html',
  styleUrls: ['./del-logout-confirmation.component.css']
})
export class DelLogoutConfirmationComponent implements OnInit{
  //@ts-ignore
  loggedUser: User;
  public action:string = '';
  constructor(
    public modalRef: MdbModalRef<AuthenticatorComponent>,
    private usersService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.usersService.loggedUser;
  }

  confirmDeleteUser(){
    console.log("User Deleted: " + this.loggedUser.username);
    this.usersService.deleteUser(this.loggedUser.id).subscribe((response) =>{
      console.log(response);
    })

    this.usersService.logoutUser();
    this.router.navigate(['/']);
    this.notificationsService.showErrorNotification("Account deleted!");
  }

  confirmLogout(){
    console.log("User logged out: " + this.loggedUser.username);
    this.usersService.logoutUser();
    this.router.navigate(['/']);
    this.notificationsService.showDefaultNotification("Logout Successful!");
  }


}
