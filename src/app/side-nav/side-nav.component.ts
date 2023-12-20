import { Component } from '@angular/core';
import {
  faBars,
  faBarsProgress, faChartColumn,
  faChartGantt,
  faChartSimple,
  faHome,
  faMap,
  faRankingStar,
  faUser
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  protected readonly faMap = faMap;
  protected readonly faHome = faHome;
  protected readonly faChartSimple = faChartSimple;
  protected readonly faUser = faUser;
  protected readonly faBarsProgress = faBarsProgress;
  protected readonly faRankingStar = faRankingStar;
  protected readonly faChartGantt = faChartGantt;
  protected readonly faChartColumn = faChartColumn;
  protected readonly faBars = faBars;
}
