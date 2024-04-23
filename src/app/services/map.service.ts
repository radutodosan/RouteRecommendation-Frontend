import {Injectable} from '@angular/core';
// @ts-ignore
import H from "@here/maps-api-for-javascript";

import * as L from "leaflet";
import axios from 'axios';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Polyline} from "leaflet";

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

  // @ts-ignore
  private _routePolyline: L.Polyline;

  _startAddress:string = '';
  _endAddress:string = '';

  private startAddressSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private endAddressSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  startAddress$ = this.startAddressSubject.asObservable();
  endAddress$ = this.endAddressSubject.asObservable();

  constructor(
    private http:HttpClient
  ) {}




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
        <li id="addStartMarker" style="cursor: pointer; padding:2px 0;"><img src="../../assets/Photos/Markers/start-marker.png" alt=""> Start</li>
        <li id="addEndMarker" style="cursor: pointer; padding:2px 0"><img src="../../assets/Photos/Markers/end-marker.png" alt=""> End</li>
      </ul>
    `)
      .openOn(this.map);

    // @ts-ignore
    document.getElementById('addStartMarker').addEventListener('click', async () => {
      this.markerType(0);

      this.clearOldStartMarker()

      this.startMarker = this.addMarker([event.latlng.lat, event.latlng.lng]);
      this.startAddress = await this.getAddress(event.latlng.lat, event.latlng.lng);
      this.startAddressSubject.next(this.startAddress);
      contextMenu.remove(); // Close the context menu after adding the marker
    });

    // @ts-ignore
    document.getElementById('addEndMarker').addEventListener('click', async () => {
      this.markerType(1);

      this.clearOldEndMarker();

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
        this.clearOldStartMarker();

        this.startMarker = this.addMarker([lat, lon]);
        this.startAddress = await this.getAddress(lat, lon);
      }
      else{

        this.clearOldEndMarker();

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

        this.clearOldStartMarker()

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
        iconSize: [32, 32], // Adjust the size as needed
        iconAnchor: [32, 32] // Adjust the anchor point if necessary
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
    console.log('Address:', address);
    return address;
  }

  sendAddresses(start:string, end:string){
    const URL = ["http://localhost:5000"];
    const SEND_ADDRESSES_URL = `${URL}/addresses`;

    const body = {
      start: start,
      end: end
    };

    return this.http.post(SEND_ADDRESSES_URL, body);
  }

  drawRoute(routeCoordinates:number[][]){

    // Convert route coordinates to LatLngExpression array
    const routeLatLngs: L.LatLngExpression[] = routeCoordinates.map(coord => [coord[0], coord[1]]);

    this.clearOldDrawnRoute();

    if (routeCoordinates.length > 0) {

      this._routePolyline = L.polyline(routeLatLngs, { color: "#1F75FE" }).addTo(this.map);
      this.map.fitBounds(this._routePolyline.getBounds());
    }
  }

  clearOldStartMarker(){
    if (this.startMarker) {
      this.map.removeLayer(this.startMarker);
    }
  }

  clearOldEndMarker(){
    if (this.endMarker) {
      this.map.removeLayer(this.endMarker);
    }
  }

  clearOldDrawnRoute(){
    // Check if there's a previously drawn route polyline
    if (this._routePolyline) {
      this.map.removeLayer(this._routePolyline); // Remove the old polyline
    }
  }



  // GETTERS & SETTERS

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

  get routePolyline(): Polyline {
    return this._routePolyline;
  }

  set routePolyline(value: Polyline) {
    this._routePolyline = value;
  }
}
