import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
// @ts-ignore
import H from '@here/maps-api-for-javascript';
// @ts-ignore
import onResize from 'simple-element-resize-detector';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  private map?: H.Map;

  @ViewChild('map') mapDiv?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      const engineType = H.Map.EngineType['HARP'];
      console.log("engineType:", engineType);

      const platform = new H.service.Platform({
        apikey: 'ytHIOTT8bd0YFzTmVYnKWhEPZGghok1Ee7LN7KPlsIM'
      });

      const layers = platform.createDefaultLayers({
        engineType: engineType
      });

      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).vector.normal.litenight,
        {
          engineType: engineType,
          pixelRatio: window.devicePixelRatio,
          center: {lat: 45.755, lng: 21.23},
          zoom: 13,
        },
      );

      this.map = map;

      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });

      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create the default UI components

      map.addLayer((layers as any).vector.traffic.litenight);
      const ui = H.ui.UI.createDefault(map,layers);

      // Disable map-settings
      const control = ui.getControl('mapsettings');
      // @ts-ignore
      control.setVisibility(false);

      // Add the DistanceMeasurement control to the UI
      ui.addControl("distancemeasurement",  this.addDistanceMeasurement());

      // Get an instance of the geocoding service:
      var service = platform.getSearchService();

      // Call the geocode method with the geocoding parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      service.geocode({
        q: 'FC Ripensia 14'
      }, (result : any) => {
        // Add a marker for each location found
        result.items.forEach((item : any) => {
          map.addObject(new H.map.Marker(item.position));
        });
      }, alert);


    }
  }


  getLocationBySearch(){

  }

  addDistanceMeasurement(){
    // Define the colors for the icons
    const startColor = "#00008B";
    const stopoverColor = "#8AC9C9";
    const splitColor = "#A2EDE7";
    const endColor = "#990000";

    // Create the icons with respective colors
    const startIcon = new H.map.Icon(this.createMarkerIcon(startColor));
    const stopoverIcon = new H.map.Icon(this.createMarkerIcon(stopoverColor));
    const endIcon = new H.map.Icon(this.createMarkerIcon(endColor));
    const splitIcon = new H.map.Icon(this.createMarkerIcon(splitColor));

    // Create the DistanceMeasurement control
    return new H.ui.DistanceMeasurement({
      startIcon: startIcon,
      stopoverIcon: stopoverIcon,
      endIcon: endIcon,
      splitIcon: splitIcon,
      lineStyle: {
        strokeColor: "rgba(95, 229, 218, 0.5)",
        lineWidth: 6
      },
      alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM
    });

  }

  // Create a template for marker icons by using custom SVG style
  createMarkerIcon(color:string) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
    <path d="M12 0C6.48 0 2 4.48 2 10c0 5.057 3.333 14.5 10 22 6.667-7.5 10-16.943 10-22 0-5.52-4.48-10-10-10zm0 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
    fill="${color}" stroke="#FFFFFF"/>
  </svg>`;
  }



}
