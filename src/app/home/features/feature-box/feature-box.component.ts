import {Component, Input} from '@angular/core';
import {NotificationsService} from "../../../services/notifications.service";
import {UsersService} from "../../../services/users.service";
import {RankingService} from "../../../services/ranking.service";
import {FriendshipService} from "../../../services/friendship.service";
import {RoutesService} from "../../../services/routes.service";

@Component({
  selector: 'app-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.css']
})
export class FeatureBoxComponent {
  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  @Input() feature = '';

  displayedColumns: string[] = ['position', 'photo', 'points'];
  // @ts-ignore
  dataSource: User[];

  friendRequests:number = 0;
  routesPending:number = 0;

  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private rankingService: RankingService,
    private friendshipService: FriendshipService,
    private routesService: RoutesService
  ) {}

  ngOnInit(): void {
    this.getOverallRanking();
    this.getPendingFriendRequests();
    this.getPendingRoutes();
  }

  getOverallRanking(){
    this.rankingService.getAllUsers().subscribe(response =>{
      this.dataSource = response;
      if(this.dataSource.length > 5)
        this.dataSource.length = 5;
    }, error => {
      this.notificationsService.showErrorNotification("Table failed to load!");
      throw error;
    })
  }

  getPendingFriendRequests(){
    this.friendshipService.getPendingFriendRequests(this.usersService.loggedUser.username).subscribe(response =>{
      this.friendRequests = response.length;
    }, error => {
      throw error;
    })
  }

  getPendingRoutes(){
    this.routesService.getPendingRoutes(this.usersService.loggedUser.id).subscribe(response =>{
      this.routesPending = response.length;
    }, error => {
      throw error;
    })
  }
}
