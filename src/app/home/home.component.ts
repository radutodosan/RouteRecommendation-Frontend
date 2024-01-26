import { Component } from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500})
  ],
})
export class HomeComponent {

}
