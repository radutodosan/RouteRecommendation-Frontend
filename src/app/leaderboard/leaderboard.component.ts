import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {RankingService} from "../services/ranking.service";
import {FriendshipService} from "../services/friendship.service";
import {UsersService} from "../services/users.service";
import {User} from "../entities/user";
import {NotificationsService} from "../services/notifications.service";

@Component({
  selector: 'app-leaderboard',
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit{
  displayedColumns: string[] = ['position', 'photo', 'name', 'points'];
  // @ts-ignore
  dataSource: User[];

  constructor(
    private rankingService: RankingService,
    private friendshipService: FriendshipService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.friendshipService.getFriendsRanking(this.usersService.loggedUser.username).subscribe(response=>{
      this.dataSource = response;
      this.dataSource.sort((a, b) => b.points - a.points)
    }, error => {
      this.notificationsService.showErrorNotification("Ranking table failed to load");
      throw error;
    });
  }

  getFriendsRanking(){
    this.friendshipService.getFriendsRanking(this.usersService.loggedUser.username).subscribe(response=>{
      this.dataSource = response;
      this.dataSource.sort((a, b) => b.points - a.points)
    }, error => {
      this.notificationsService.showErrorNotification("Ranking table failed to load");
      throw error;
    });
  }
  getOverallRanking(){
    this.rankingService.getAllUsers().subscribe(response =>{
      this.dataSource = response;
    }, error => {
      this.notificationsService.showErrorNotification("Ranking table failed to load");
      throw error;
    })
  }
}
