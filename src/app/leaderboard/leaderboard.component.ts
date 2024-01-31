import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {style} from "@angular/animations";
import {RankingService} from "../services/ranking.service";
import {FriendshipService} from "../services/friendship.service";
import {UsersService} from "../services/users.service";

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
  dataSource = this.friendshipService.getFriendsRanking(this.usersService.loggedUser.username);

  constructor(
    private rankingService: RankingService,
    private friendshipService: FriendshipService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // this.allUsers$ = this.authService.getAllUsers()
    //
    // const observable$ = this.authService.getAllUsers()
    // observable$.subscribe(users => {
    //   this.users = users.data;
    //   console.log(this.users);
    // })

  }

    protected readonly style = style;
}
