import {Component, OnInit} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {MapService} from "../../services/map.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SavedAddress} from "../../entities/saved-address";
import {SavedAddressesService} from "../../services/saved-addresses.service";
import {RoutesService} from "../../services/routes.service";
import {UsersService} from "../../services/users.service";
import {NotificationsService} from "../../services/notifications.service";

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

  savedAddresses: SavedAddress;

  route:any = null;
  route_directions:any = null;

  constructor(
    private mapService:MapService,
    private formBuilder:FormBuilder,
    private savedAddressesService: SavedAddressesService,
    private routesService: RoutesService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
  ) {
    this.savedAddresses = this.savedAddressesService.savedAddresses;
  }

  ngOnInit(): void {

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
    this.notificationsService.showDefaultNotification("Calculating route...");

    let network_type: string;
    switch(this.routeForm.value["transportType"]) {
      case '0': {
        network_type = 'drive';
        break;
      }
      case '1': {
        network_type = 'bus';
        break;
      }
      case '2': {
        network_type = 'all';
        break;
      }
      case '3': {
        network_type = 'walk';
        break;
      }
      default: {
        network_type = 'drive ';
        break;
      }
    }

    this.mapService.sendAddresses(this.routeForm.value["startValue"], this.routeForm.value["endValue"], network_type).subscribe(
      response => {
        console.log(response)
        // @ts-ignore
        this.mapService.drawRoute(response["route_nodes"])
        this.notificationsService.showSuccessNotification("Route Created!");
        this.notificationsService.notificationsNumber ++;

        // @ts-ignore
        this.sendRoute(response["route_distance"], response["emissions_saved"], response["cal_burned"], response["travel_time"], response["avg_speed"]);
        // @ts-ignore
        this.route_directions = response["directions"];

      },
      error => {
        console.error('Error calculating routes:', error)
        this.notificationsService.showErrorNotification("Error calculating routes!")
      }

    );

  }

  searchStartLocation(){
    this.mapService.getLocationBySearch(this.routeForm.value["startValue"], 0);
  }
  searchEndLocation(){
    this.mapService.getLocationBySearch(this.routeForm.value["endValue"], 1);
  }
  searchCurrentLocation(){
    console.log("Searching current location...");
    this.mapService.getCurrentLocation();
  }


  sendRoute(route_distance:any, emissions_saved:any, cal_burned:any, travel_time:any, avg_speed:any){
    if(this.usersService.loggedUser != null) {
      this.route = {
        user: this.usersService.loggedUser,
        start: this.routeForm.value["startValue"],
        end: this.routeForm.value["endValue"],
        transport: this.routeForm.value["transportType"],
        distance: route_distance,
        emissions_saved: emissions_saved,
        cal_burned:cal_burned.toFixed(0),
        time:travel_time
      }

      this.routesService.addRoute(this.route).subscribe(response =>
      {
        console.log(response);
      }, error => {
        this.notificationsService.showErrorNotification("Error creating route!");
        throw error;
      })
    }
    else{
      this.notificationsService.showWarningNotification("You must login to start a route!")
    }

  }
}
