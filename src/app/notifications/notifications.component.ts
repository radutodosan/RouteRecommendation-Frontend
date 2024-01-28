import { Component } from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500})
  ],
})
export class NotificationsComponent {

}
