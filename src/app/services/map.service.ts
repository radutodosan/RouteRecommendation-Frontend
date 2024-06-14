import {Injectable} from '@angular/core';
// @ts-ignore
import H from "@here/maps-api-for-javascript";

import * as L from "leaflet";
import {LatLng, Polyline} from "leaflet";
import axios from 'axios';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NotificationsService} from "./notifications.service";

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
    private http:HttpClient,
    private notificationsService: NotificationsService,
  ) {}




  getMap(){


    this.map = L.map('map').setView([45.755, 21.23], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: 'map-tiles'
    }).addTo(this.map);

    const chargingStations : { name: string, coords: [number, number] }[] = [
      { name: 'Civitronic - Timișoara', coords : [45.757996722095854, 21.22379266694849] },
      { name: 'Lidl - Timișoara', coords: [45.76318579399588, 21.252262735192396] },
      { name: 'Kaufland - Timișoara', coords: [45.72875840350443, 21.235874009960916] },
      { name: 'Tesla Supercharger - Timișoara', coords: [45.755432930314896, 21.233112479589376] },
      { name: 'Enel X Charging Station', coords: [45.76573713032833, 21.22819597289703] },
      { name: 'Enel X Charging Station', coords: [45.76213286205778, 21.24400666412371] },
      { name: 'Ella Charging Station', coords: [45.74155148063759, 21.260575431101827] },
      { name: 'Renovatio e-charge', coords: [45.74005030963188, 21.21287699234312] },
      { name: 'Autoklass Timisoara', coords: [45.769626665078405, 21.220943911730416] },
      { name: 'Renovatio e-charge Charging Station', coords: [45.77504528509113, 21.213296788851803] },
      { name: 'Iulius Town Timisoara P1', coords: [45.76741422558739, 21.22784820514899] },
    ];

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: '../../assets/Photos/Markers/charging-station-marker.png',
      iconSize: [32, 32], // Adjust the size as needed
      iconAnchor: [32, 32] // Adjust the anchor point if necessary
    });

    chargingStations.forEach(station => {
      L.marker(station.coords).addTo(this.map)
        .bindPopup(station.name, { offset: [-20, -15] })
    });

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
      this.clearOldDrawnRoute()

      this.startMarker = this.addMarker([event.latlng.lat, event.latlng.lng]);
      this.startAddress = await this.getAddress(event.latlng.lat, event.latlng.lng);
      this.startAddressSubject.next(this.startAddress);
      contextMenu.remove(); // Close the context menu after adding the marker
    });

    // @ts-ignore
    document.getElementById('addEndMarker').addEventListener('click', async () => {
      this.markerType(1);

      this.clearOldEndMarker();
      this.clearOldDrawnRoute()

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
        this.clearOldDrawnRoute()

        this.startMarker = this.addMarker([lat, lon]);
        this.startAddress = await this.getAddress(lat, lon);
      }
      else{

        this.clearOldEndMarker();
        this.clearOldDrawnRoute()

        this.endMarker = this.addMarker([lat, lon]);
        this.endAddress = await this.getAddress(lat, lon);
      }
      this.map.setView([lat, lon], 15);


    } catch (error) {
      console.error('Error geocoding address:', error);
      this.notificationsService.showErrorNotification("Address not found!");
    }
  }

  getCurrentLocationCoordinates(): Promise<LatLng> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(new LatLng(latitude, longitude));
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords;

        await this.addStarterMarker(latitude, longitude);


      }, (error) => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async addStarterMarker(latitude: number, longitude: number) {
    this.markerType(0);

    this.clearOldStartMarker()
    this.clearOldDrawnRoute()

    this.startMarker = this.addMarker([latitude, longitude]);
    this.map.setView([latitude, longitude], 15);

    this.startAddress = await this.getAddress(latitude, longitude);
    this.startAddressSubject.next(this.startAddress);
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

  sendAddresses(start:string, end:string, network_type:string, day:number, hour:number){
    const URL = ["http://localhost:5000"];
    const SEND_ADDRESSES_URL = `${URL}/addresses`;

    const body = {
      start: start,
      end: end,
      network_type: network_type,
      day_of_week: day,
      hour_of_day: hour
    };

    return this.http.post(SEND_ADDRESSES_URL, body);
  }

  drawRoute(routeCoordinates:number[][]){

    // Convert route coordinates to LatLngExpression array
    const routeLatLngs: L.LatLngExpression[] = routeCoordinates.map(coord => [coord[0], coord[1]]);

    this.clearOldDrawnRoute();

    if (routeCoordinates.length > 0) {

      this._routePolyline = L.polyline(routeLatLngs, {color: "#1F75FE"}).addTo(this.map);
      this.map.fitBounds(this._routePolyline.getBounds(), {paddingTopLeft: [400, 0]});
    }

  }

  async getAddressCoordinates(address: string) {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
      const addressCoordinates : L.LatLng = new LatLng(response.data[0].lat, response.data[0].lon);

      return addressCoordinates;
  }

  calculateDistance(start: L.LatLng = this.startMarker.getLatLng(), end: L.LatLng = this.endMarker.getLatLng()): number {
    const startLatLng = start;
    const endLatLng = end;

    const R = 6371e3; // Radius of the Earth in meters
    const phi1 = startLatLng.lat * Math.PI / 180; // φ, λ in radians
    const phi2 =  endLatLng.lat * Math.PI / 180;
    const deltaPhi = ( endLatLng.lat - startLatLng.lat) * Math.PI / 180;
    const deltaLambda = ( endLatLng.lng - startLatLng.lng) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters

    return distance;
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
