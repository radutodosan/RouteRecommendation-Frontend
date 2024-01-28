import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-r-pending-card',
  templateUrl: './r-pending-card.component.html',
  styleUrls: ['./r-pending-card.component.css']
})
export class RPendingCardComponent {
  @Input() city?:string;
  @Input() start?:string;
  @Input() end?:string;
}
