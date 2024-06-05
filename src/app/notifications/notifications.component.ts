import { Component } from '@angular/core';
import {UsersService} from "../services/users.service";
import {FriendshipService} from "../services/friendship.service";
import {Observable} from "rxjs";
import {RoutesService} from "../services/routes.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {

  //@ts-ignore
  notificationsList$ : Observable<any>;
  //@ts-ignore
  pendingRoutesList$ : Observable<any>;

  constructor(
    private usersService: UsersService,
    private friendshipService: FriendshipService,
    private routesService:RoutesService,
  ) {}
  ngOnInit(){
    this.notificationsList$ = this.friendshipService.getPendingFriendRequests(this.usersService.loggedUser.username);
    this.pendingRoutesList$ = this.routesService.getPendingRoutes(this.usersService.loggedUser.id);
  }
}
