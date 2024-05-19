import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import onResize from 'simple-element-resize-detector';
import {MapService} from "../services/map.service";

import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  @ViewChild('map') mapDiv?: ElementRef;

  // @ts-ignore
  map: L.Map;
  constructor(
    private mapService:MapService,
  ) {}

  ngOnInit() {
    this.map = this.mapService.getMap();

    // Add contextmenu event listener to the map
    this.map.on('contextmenu', (e) => this.mapService.onMapRightClick(e));


  }




}
