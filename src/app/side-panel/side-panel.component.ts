import {Component, OnInit} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {MapService} from "../services/map.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SavedAddress} from "../entities/saved-address";
import {SavedAddressesService} from "../services/saved-addresses.service";
import {RoutesService} from "../services/routes.service";
import {UsersService} from "../services/users.service";
import {NotificationsService} from "../services/notifications.service";

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
    private routesService: RoutesService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.savedAddresses = this.savedAddressesService.savedAddresses;
    console.log(this.savedAddresses);

    this.routeForm = this.formBuilder.group({
      startValue: ['', Validators.required],
      endValue: ['', Validators.required],
      transportType: ['', Validators.required]
    });

    // Subscribe to marker addresses emitted by MapService
    this.mapService.startAddress$.subscribe(startAddress => {
      this.routeForm.patchValue({ startValue: startAddress });
    });

    this.mapService.endAddress$.subscribe(endAddress => {
      this.routeForm.patchValue({ endValue: endAddress });
    });

  }

  searchRoute(){
    console.log("Searching...");

    this.sendAddressesToCalculateRoute();

    if(this.usersService.loggedUser != null) {
      this.sendRoute()
    }
    else {
      this.notificationsService.showWarningNotification("You must login to start a route!")
    }

  }
  searchStartLocation(){
    console.log("Searching start location...");
    this.mapService.getLocationBySearch(this.routeForm.value["startValue"], 0);
  }
  searchEndLocation(){
    console.log("Searching end location...");
    this.mapService.getLocationBySearch(this.routeForm.value["endValue"], 1);
  }
  searchCurrentLocation(){
    console.log("Searching current location...");
    this.mapService.getCurrentLocation();
  }

  sendAddressesToCalculateRoute(){
    this.mapService.sendAddresses(this.routeForm.value["startValue"], this.routeForm.value["endValue"]).subscribe(
      response => {
        // @ts-ignore
        this.mapService.drawRoute(response["routes"])
      },
      error => {
        console.error('Error calculating routes:', error)
        this.notificationsService.showErrorNotification("Error calculating routes!")
      }

    );
  }

  sendRoute(){
    const route = {
      user: this.usersService.loggedUser,
      start: this.routeForm.value["startValue"],
      end: this.routeForm.value["endValue"],
      transport: this.routeForm.value["transportType"],
    }

    this.routesService.addRoute(route).subscribe(response =>
    {
      console.log(response);
      this.notificationsService.showSuccessNotification("Route Created!");
      this.notificationsService.notificationsNumber ++;
    }, error => {
      this.notificationsService.showErrorNotification("Error creating route!");
      throw error;
    })
  }
}
