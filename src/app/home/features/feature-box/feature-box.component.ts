import {Component, Input} from '@angular/core';
import {NotificationsService} from "../../../services/notifications.service";
import {UsersService} from "../../../services/users.service";
import {RankingService} from "../../../services/ranking.service";

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

  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private rankingService: RankingService,
  ) {}

  ngOnInit(): void {
    this.getOverallRanking();
  }

  getOverallRanking(){
    this.rankingService.getAllUsers().subscribe(response =>{
      this.dataSource = response;
      this.dataSource.length = 5;
    }, error => {
      this.notificationsService.showErrorNotification("Table failed to load!");
      throw error;
    })
  }
}
