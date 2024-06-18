import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {RankingService} from "../services/ranking.service";
import {UsersService} from "../services/users.service";
import {User} from "../entities/user";
import {NotificationsService} from "../services/notifications.service";

@Component({
  selector: 'app-leaderboard',
  animations:[
    slideInUpOnEnterAnimation({duration:500})
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit{
  displayedColumns: string[] = ['position', 'photo', 'name', 'points'];

  // @ts-ignore
  dataSource: User[];

  selected = 'Overall';

  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private rankingService: RankingService,
  ) {
  }

  ngOnInit(): void {
    this.getOverallRanking();
  }


  getFriendsRanking(){
    this.rankingService.getFriendsRanking(this.usersService.loggedUser.username).subscribe(response=>{
      this.dataSource = response;
      this.dataSource.push(this.usersService.loggedUser)
      this.dataSource.sort((a, b) => b.points - a.points)
    }, error => {
      this.notificationsService.showErrorNotification("Table failed to load!");
      throw error;
    });
  }
  getOverallRanking(){
    this.rankingService.getAllUsers().subscribe(response =>{
      this.dataSource = response;
    }, error => {
      this.notificationsService.showErrorNotification("Table failed to load!");
      throw error;
    })
  }

  getUvtRanking(){
    this.rankingService.getUvtUsers().subscribe(response =>{
      this.dataSource = response;
    }, error => {
      this.notificationsService.showErrorNotification("Table failed to load!");
      throw error;
    })
  }
}
