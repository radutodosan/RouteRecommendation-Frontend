import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent {
  @Input() full_name?:string;
  @Input() email?:string;
  @Input() picture_url?:string;
}
