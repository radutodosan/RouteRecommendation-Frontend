import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";

export interface TableHeaders {
  name: string;
  photo: string;
  km: number;
}
const TABLE_DATA: TableHeaders[] = [
  {name: 'vasile', photo: "https://robohash.org/hehehe?bgset=bg1", km: 33},
  {name: 'ion', photo: "https://robohash.org/hehehe?bgset=bg1", km: 31},
  {name: 'john_doe', photo: "https://robohash.org/hehehe?bgset=bg1", km: 29},
  {name: 'gigi', photo: "https://robohash.org/hehehe?bgset=bg1", km: 24},
  {name: 'ionela', photo: "https://robohash.org/hehehe?bgset=bg1", km: 21},
  {name: 'marcel', photo: "https://robohash.org/hehehe?bgset=bg1", km: 13},
  {name: 'viorel', photo:"https://robohash.org/hehehe?bgset=bg1", km: 9},
  {name: 'petru', photo: "https://robohash.org/hehehe?bgset=bg1", km: 6},
  {name: 'maria', photo: "https://robohash.org/hehehe?bgset=bg1", km: 4},
  {name: 'florin', photo: "https://robohash.org/hehehe?bgset=bg1", km: 3},
];
@Component({
  selector: 'app-leaderboard',
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit{
  displayedColumns: string[] = ['position', 'photo', 'name', 'km'];
  dataSource = TABLE_DATA;

  constructor(
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
}
