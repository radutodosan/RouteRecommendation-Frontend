import { Injectable } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {NotificationType} from "../enums/notification-type";
import {FriendshipService} from "./friendship.service";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  //@ts-ignore
  public notificationsNumber :number;

  constructor(
    private notifier: NotifierService,
    private friendshipService: FriendshipService,
    private usersService: UsersService
  ) {
    if(this.usersService.isLoggedIn()){
      this.friendshipService.getPendingFriendRequests(this.usersService.loggedUser.username).subscribe(response =>{
        this.notificationsNumber = response.length;
      }, error => {
        throw error;
      });
    }

  }

  public showSuccessNotification(message: string): void {
    this.notify(NotificationType.SUCCESS, message);
  }

  public showDefaultNotification(message: string): void {
    this.notify(NotificationType.DEFAULT, message);
  }

  public showErrorNotification(message: string): void {
    this.notify(NotificationType.ERROR, message);
  }

  public showWarningNotification(message: string): void {
    this.notify(NotificationType.WARNING, message);
  }

  private notify(type: NotificationType, message: string): void {
    this.notifier.notify(type, message);
  }
}
