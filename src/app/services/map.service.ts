import {Injectable} from '@angular/core';
// @ts-ignore
import H from "@here/maps-api-for-javascript";

import * as L from "leaflet";
import axios from 'axios';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {


  // @ts-ignore
  private map: L.Map;
  // @ts-ignore
  private startMarker: L.Marker;
  // @ts-ignore
  private endMarker: L.Marker;

  _startAddress:string = '';
  _endAddress:string = '';

  private startAddressSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private endAddressSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  startAddress$ = this.startAddressSubject.asObservable();
  endAddress$ = this.endAddressSubject.asObservable();

  getMap(){


    this.map = L.map('map').setView([45.755, 21.23], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: 'map-tiles'
    }).addTo(this.map);

    return this.map;
  }


  onMapRightClick(event: L.LeafletMouseEvent) {
    // Prevent default right-click behavior
    event.originalEvent.preventDefault();


    // Show a context menu at the clicked position
    const contextMenu = L.popup()
      .setLatLng(event.latlng)
      .setContent(`
      <ul style="justify-content: center">
        <li id="addStartMarker" style="cursor: pointer; padding:2px 0;"><img src="../../assets/Photos/Markers/start-marker.png" height="32px" width="24px" alt=""> Start</li>
        <li id="addEndMarker" style="cursor: pointer; padding:2px 0"><img src="../../assets/Photos/Markers/end-marker.png" height="32px" width="32px" alt=""> End</li>
      </ul>
    `)
      .openOn(this.map);

    // @ts-ignore
    document.getElementById('addStartMarker').addEventListener('click', async () => {
      this.markerType(0);
      // Remove the old marker if it exists
      if (this.startMarker) {
        this.map.removeLayer(this.startMarker);
      }
      this.startMarker = this.addMarker([event.latlng.lat, event.latlng.lng]);
      this.startAddress = await this.getAddress(event.latlng.lat, event.latlng.lng);
      this.startAddressSubject.next(this.startAddress);
      contextMenu.remove(); // Close the context menu after adding the marker
    });

    // @ts-ignore
    document.getElementById('addEndMarker').addEventListener('click', async () => {
      this.markerType(1);
      // Remove the old marker if it exists
      if (this.endMarker) {
        this.map.removeLayer(this.endMarker);
      }
      this.endMarker = this.addMarker([event.latlng.lat, event.latlng.lng]);
      this.endAddress = await this.getAddress(event.latlng.lat, event.latlng.lng);
      this.endAddressSubject.next(this.endAddress);
      contextMenu.remove(); // Close the context menu after adding the marker
    });
  }

  async getLocationBySearch(address: string, type: number) {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
      const { lat, lon } = response.data[0];
      this.markerType(type);
      if(type == 0){
        if (this.startMarker) {
          this.map.removeLayer(this.startMarker);
        }
        this.startMarker = this.addMarker([lat, lon]);
        this.startAddress = await this.getAddress(lat, lon);
      }
      else{
        if (this.endMarker) {
          this.map.removeLayer(this.endMarker);
        }
        this.endMarker = this.addMarker([lat, lon]);
        this.endAddress = await this.getAddress(lat, lon);
      }
      this.map.setView([lat, lon], 15);

    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords;
        this.markerType(0);
        if (this.startMarker) {
          this.map.removeLayer(this.startMarker);
        }
        this.startMarker = this.addMarker([latitude,longitude]);
        this.map.setView([latitude, longitude], 15);
        this.startAddress = await this.getAddress(latitude, longitude);
        this.startAddressSubject.next(this.startAddress);
      }, (error) => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  addMarker(coords: [number, number]) {
    return L.marker(coords).addTo(this.map);
  }

  markerType(type: number){
    if(type == 0)
      L.Marker.prototype.options.icon = L.icon({
        iconUrl: '../../assets/Photos/Markers/start-marker.png',
        iconSize: [24, 32], // Adjust the size as needed
        iconAnchor: [24, 32] // Adjust the anchor point if necessary
      });
    else
      L.Marker.prototype.options.icon = L.icon({
        iconUrl: '../../assets/Photos/Markers/end-marker.png',
        iconSize: [32, 32], // Adjust the size as needed
        iconAnchor: [32, 32] // Adjust the anchor point if necessary
      });
  }

  async getAddress(lat:number, lng:number){
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const address = response.data.display_name;
    console.log('Location information:');
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);
    console.log('Address:', address);
    return address;
  }


  get endAddress(): string {
    return this._endAddress;
  }

  set endAddress(value: string) {
    this._endAddress = value;
  }
  get startAddress(): string {
    return this._startAddress;
  }

  set startAddress(value: string) {
    this._startAddress = value;
  }

  // private map?:H.Map;
  //
  // constructor() { }
  //
  // getEngineType(){
  //   return H.Map.EngineType['HARP'];
  // }
  //
  // getAPIkey(){
  //   return new H.service.Platform({
  //     apikey: 'ytHIOTT8bd0YFzTmVYnKWhEPZGghok1Ee7LN7KPlsIM'
  //   });
  // }
  //
  // getLayers(){
  //   return this.getAPIkey().createDefaultLayers({
  //     engineType: this.getEngineType()
  //   });
  // }
  //
  // getMap(mapDiv: ElementRef){
  //
  //
  //     if(localStorage.getItem('theme') === 'light'){
  //     this.map = new H.Map(
  //       mapDiv.nativeElement,
  //       (this.getLayers() as any).vector.normal.map,
  //       {
  //         engineType: this.getEngineType(),
  //         pixelRatio: window.devicePixelRatio || 1,
  //         center: {lat: 45.755, lng: 21.23},
  //         zoom: 13,
  //
  //       },
  //
  //     );
  //   }
  //   else{
  //     this.map = new H.Map(
  //       mapDiv.nativeElement,
  //       (this.getLayers() as any).vector.normal.litenight,
  //       {
  //         engineType: this.getEngineType(),
  //         pixelRatio: window.devicePixelRatio || 1,
  //         center: {lat: 45.755, lng: 21.23},
  //         zoom: 13,
  //
  //       },
  //
  //     );
  //   }
  //   console.log("Map centered on TIMISOARA");
  //   return this.map;
  // }
  //
  // addBehavior(map:H.Map){
  //   return new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  // }
  //
  // addMapUI(map:H.Map){
  //   return H.ui.UI.createDefault(map,this.getLayers());
  // }
  //
  // addDistanceMeasurement(){
  //   // Define the colors for the icons
  //   const startColor = "#00008B";
  //   const stopoverColor = "#8AC9C9";
  //   const splitColor = "#A2EDE7";
  //   const endColor = "#990000";
  //
  //   // Create the icons with respective colors
  //   const startIcon = new H.map.Icon(this.createMarkerIcon(startColor));
  //   const stopoverIcon = new H.map.Icon(this.createMarkerIcon(stopoverColor));
  //   const endIcon = new H.map.Icon(this.createMarkerIcon(endColor));
  //   const splitIcon = new H.map.Icon(this.createMarkerIcon(splitColor));
  //
  //   // Create the DistanceMeasurement control
  //   return new H.ui.DistanceMeasurement({
  //     startIcon: startIcon,
  //     stopoverIcon: stopoverIcon,
  //     endIcon: endIcon,
  //     splitIcon: splitIcon,
  //     lineStyle: {
  //       strokeColor: "rgba(95, 229, 218, 0.5)",
  //       lineWidth: 6
  //     },
  //     alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM
  //   });
  //
  // }
  // createMarkerIcon(color:string) {
  //   return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
  //   <path d="M12 0C6.48 0 2 4.48 2 10c0 5.057 3.333 14.5 10 22 6.667-7.5 10-16.943 10-22 0-5.52-4.48-10-10-10zm0 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
  //   fill="${color}" stroke="#FFFFFF"/>
  // </svg>`;
  // }
  //
  //
  // getLocationBySearch(address:string){
  //   if(address != '') {
  //     // Get an instance of the geocoding service:
  //     const service = this.getAPIkey().getSearchService();
  //
  //     service.geocode({
  //       q: address
  //     }, (result: any) => {
  //       // Add a marker for each location found
  //       result.items.forEach((item: any) => {
  //         if(this.map)
  //           this.map.addObject(new H.map.Marker(item.position));
  //       });
  //     }, alert);
  //   }
  // }

}
