import {Component, OnInit} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {MapService} from "../services/map.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SavedAddress} from "../entities/saved-address";
import {SavedAddressesService} from "../services/saved-addresses.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit{

  protected readonly faBars = faBars;

  routeForm!:FormGroup;
  options: string[] = [
    '<i class="fa-solid fa-house"></i> &nbsp; Home',
    '<i class="fa-solid fa-briefcase"></i> &nbsp; Work',
    '<i class="fa-solid fa-book"></i> &nbsp; School' ,
    '<i class="fa-solid fa-location-dot"></i> &nbsp; Other'
  ];

  //@ts-ignore
  savedAddresses: SavedAddress;

  constructor(
    private mapService:MapService,
    private formBuilder:FormBuilder,
    private savedAddressesService: SavedAddressesService,
  ) {
  }

  ngOnInit(): void {
    this.savedAddresses = this.savedAddressesService.savedAddresses;
    console.log(this.savedAddresses);

    this.routeForm = this.formBuilder.group({
      startValue: ['', Validators.required],
      endValue: ['', Validators.required]
    });

  }

  searchRoute(){
    console.log("Searching...");
    this.mapService.getLocationBySearch(this.routeForm.value["startValue"]);
    this.mapService.getLocationBySearch(this.routeForm.value["endValue"]);
    console.log(this.routeForm.value["startValue"], this.routeForm.value["endValue"])
  }
  searchStartLocation(){
    console.log("Searching start location...");
    this.mapService.getLocationBySearch(this.routeForm.value["startValue"]);
  }
  searchEndLocation(){
    console.log("Searching end location...");
    this.mapService.getLocationBySearch(this.routeForm.value["endValue"]);
  }

}
