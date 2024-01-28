import { Component } from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500}),
  ],
})
export class SocialComponent {

}
