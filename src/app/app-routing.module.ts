import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {HomeComponent} from "./home/home.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {ProfileComponent} from "./profile/profile.component";
import {SocialComponent} from "./social/social.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {AddFriendComponent} from "./social/add-friend/add-friend.component";
import {FriendsComponent} from "./social/friends/friends.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'map', component: MapComponent},
  {path: 'ranking', component: LeaderboardComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'social', component: SocialComponent},
  {path: 'social/friends', component: FriendsComponent},
  {path: 'social/add-friends', component: AddFriendComponent},
  {path: 'notifications/:username', component: NotificationsComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  MapComponent,
  LeaderboardComponent,
  StatisticsComponent,
  ProfileComponent,
  SocialComponent,
  FriendsComponent,
  AddFriendComponent,
  NotificationsComponent,
]
