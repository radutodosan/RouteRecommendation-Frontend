import { Component } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}
  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }

  openNotificationsPage(){
    this.router.navigate(['/notifications',this.usersService.loggedUser.username]);
  }
}
