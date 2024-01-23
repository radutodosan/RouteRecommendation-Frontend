import {Component} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {

  protected readonly faBars = faBars;
  startValue: string = '';
  endValue: string = '';


  constructor(private mapService:MapService) {
  }

  search(){
    this.mapService.getLocationBySearch(this.startValue);
  }
}
