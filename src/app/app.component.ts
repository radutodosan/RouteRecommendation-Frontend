import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {slideRightLeftAnimation} from "./services/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideRightLeftAnimation]

})
export class AppComponent implements OnInit{
  title = 'RouteRecommendation-Frontend';

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  constructor(
  ){}

  ngOnInit(): void {
    if (this.currentTheme) {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      if(this.currentTheme == 'dark'){
        const page = document.getElementById('page');
        if(page != null)
          page.classList.add('alternative');
      }

    }
  }

  prepareRoute(outlet:RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  protected readonly onchange = onchange;
}



