import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
// @ts-ignore
import onResize from 'simple-element-resize-detector';
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  @ViewChild('map') mapDiv?: ElementRef;
  constructor(private mapService:MapService) {
  }

  ngAfterViewInit(): void {
    if (this.mapDiv) {

      const layers = this.mapService.getLayers();

      const map = this.mapService.getMap(this.mapDiv);

      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });

      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      const behavior = this.mapService.addBehavior(map);

      // Adding real-time traffic flow data
      map.addLayer((layers as any).vector.traffic.litenight);

      // Create the default UI components
      const ui = this.mapService.addMapUI(map);

      // Disable map-settings
      const control = ui.getControl('mapsettings');
      if(control)
        control.setVisibility(false);

      // Add the DistanceMeasurement control to the UI
      ui.addControl("distancemeasurement",  this.mapService.addDistanceMeasurement());


    }

  }


}
