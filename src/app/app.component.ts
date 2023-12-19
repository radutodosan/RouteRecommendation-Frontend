import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RouteRecommendation-Frontend';

  startValue: string = '';
  endValue: string = '';

  onSearch(data: { start: string, end: string }) {
    this.startValue = data.start;
    this.endValue = data.end;
  }

  constructor() {}



}



