import { Component } from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {UsersService} from "../services/users.service";
import {RankingService} from "../services/ranking.service";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500}),
  ],
})
export class SocialComponent {

  friendList$ = this.rankingService.getAllUsers();
  constructor(
    private usersService: UsersService,
    private rankingService: RankingService,
  ) {}
}
