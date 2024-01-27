import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
 @Input() full_name?:string;
 @Input() email?:string;
 @Input() picture_url?:string;
}
