import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  title = 'RouteRecommendation-Frontend';

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  startValue: string = '';
  endValue: string = '';

  onSearch(data: { start: string, end: string }) {
    this.startValue = data.start;
    this.endValue = data.end;
  }

  constructor() {}

  ngOnInit(): void {
    if (this.currentTheme) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
  }

  protected readonly onchange = onchange;
}



