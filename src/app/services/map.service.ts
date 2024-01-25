import {ElementRef, Injectable} from '@angular/core';
// @ts-ignore
import H from "@here/maps-api-for-javascript";


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?:H.Map;

  constructor() { }

  getEngineType(){
    return H.Map.EngineType['HARP'];
  }

  getAPIkey(){
    return new H.service.Platform({
      apikey: 'ytHIOTT8bd0YFzTmVYnKWhEPZGghok1Ee7LN7KPlsIM'
    });
  }

  getLayers(){
    return this.getAPIkey().createDefaultLayers({
      engineType: this.getEngineType()
    });
  }

  getMap(mapDiv: ElementRef){

      if(localStorage.getItem('theme') === 'light'){
      this.map = new H.Map(
        mapDiv.nativeElement,
        (this.getLayers() as any).vector.normal.map,
        {
          engineType: this.getEngineType(),
          pixelRatio: window.devicePixelRatio || 1,
          center: {lat: 45.755, lng: 21.23},
          zoom: 13,

        },

      );
    }
    else{
      this.map = new H.Map(
        mapDiv.nativeElement,
        (this.getLayers() as any).vector.normal.litenight,
        {
          engineType: this.getEngineType(),
          pixelRatio: window.devicePixelRatio || 1,
          center: {lat: 45.755, lng: 21.23},
          zoom: 13,

        },

      );
    }
    console.log("Map centered on TIMISOARA");
    return this.map;
  }

  addBehavior(map:H.Map){
    return new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }

  addMapUI(map:H.Map){
    return H.ui.UI.createDefault(map,this.getLayers());
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
  createMarkerIcon(color:string) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
    <path d="M12 0C6.48 0 2 4.48 2 10c0 5.057 3.333 14.5 10 22 6.667-7.5 10-16.943 10-22 0-5.52-4.48-10-10-10zm0 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
    fill="${color}" stroke="#FFFFFF"/>
  </svg>`;
  }


  getLocationBySearch(address:string){
    if(address != '') {
      // Get an instance of the geocoding service:
      const service = this.getAPIkey().getSearchService();

      service.geocode({
        q: address
      }, (result: any) => {
        // Add a marker for each location found
        result.items.forEach((item: any) => {
          if(this.map)
            this.map.addObject(new H.map.Marker(item.position));
        });
      }, alert);
    }
  }

}
