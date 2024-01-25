import { Component } from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {slideInUpOnEnterAnimation} from "angular-animations";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
})
export class ProfileComponent {

  constructor(
    private usersService: UsersService,
    private router: Router

  ) {}
  logoutUser(){
    this.usersService.logoutUser();
    this.router.navigate(['/']);
    // this.showAlert(AlertType.INFO,'Logout Successful!');
  }

}
