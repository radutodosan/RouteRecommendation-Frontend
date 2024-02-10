import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.css']
})
export class FeatureBoxComponent {
  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  @Input() feature = '';
}
