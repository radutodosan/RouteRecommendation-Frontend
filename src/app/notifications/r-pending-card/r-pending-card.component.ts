import {Component, Input} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-r-pending-card',
  templateUrl: './r-pending-card.component.html',
  styleUrls: ['./r-pending-card.component.css']
})
export class RPendingCardComponent {
  @Input() city?:string;
  @Input() start?:string;
  @Input() end?:string;

  clicked = false;

  constructor(
    private notificationsService: NotificationsService,
  ) {}

  completeRoute(){
    this.clicked = true;
    this.notificationsService.showWarningNotification("Route Completed!");
  }

  declineRoute(){
    this.clicked = true;
    this.notificationsService.showWarningNotification("Route Canceled!");
  }
}
