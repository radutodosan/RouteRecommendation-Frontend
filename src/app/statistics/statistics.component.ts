import {Component} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500})
  ],
})
export class StatisticsComponent{
}
