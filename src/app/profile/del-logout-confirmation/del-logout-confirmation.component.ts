import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../../authenticator/authenticator.component";
import {AlertService} from "../../services/alert.service";
import {AlertTypes} from "../../enums/alert-types";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

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
    private alertService: AlertService
  ) {}
  showAlert(type:AlertTypes, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

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
    this.showAlert(AlertTypes.ERROR,'Account deleted!')
  }

  confirmLogout(){
    console.log("User logged out: " + this.loggedUser.username);
    this.usersService.logoutUser();
    this.router.navigate(['/']);
    this.showAlert(AlertTypes.INFO,'Logout Successful!')
  }


}
