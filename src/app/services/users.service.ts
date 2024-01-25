import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private loggedIn = false;
  // @ts-ignore
  private _loggedUser: any = JSON.parse(localStorage.getItem("loggedUser"));
  constructor(
  ) { }

  isLoggedIn() {
    this.loggedIn = localStorage.getItem("loggedUser") != null;
    return this.loggedIn;
  }

  get loggedUser(): any {
    return this._loggedUser;
  }

  set loggedUser(value: any) {
    this._loggedUser = value;
  }

  loginUser(){
  }
  logoutUser(): void {
    this.loggedIn = false;
    localStorage.removeItem("loggedUser");
    // this.notificationService.showDefaultNotification("Logged out successfully")
  }
}
