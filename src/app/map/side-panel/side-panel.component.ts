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

  calculated_routes:any = null;
  public_transport_route:any = null;
  route:any = null;

  constructor(
    public mapService:MapService,
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
    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();

    console.log(this.mapService.calculateDistance());
    if(this.mapService.calculateDistance() > 500){
      // @ts-ignore
      this.mapService.getAddressCoordinates(this.routeForm.value['startValue']).then(start_coordinates => {

        // @ts-ignore
        this.mapService.getAddressCoordinates(this.routeForm.value['endValue']).then(end_coordinates => {
          console.log(start_coordinates, end_coordinates)
          this.mapService.sendAddresses(this.routeForm.value["startValue"], this.routeForm.value["endValue"], start_coordinates, end_coordinates, network_type, day, hour).subscribe(
            response => {
              if(network_type != 'bus'){
                this.calculated_routes = response;
                this.public_transport_route = null
                console.log(this.calculated_routes);

                if(network_type == 'drive')
                  this.notificationsService.showSuccessNotification("Routes Created!");
                else
                  this.notificationsService.showSuccessNotification("Route Created!");
              }
              else{
                this.public_transport_route = response;
                this.calculated_routes = null;
                console.log(this.public_transport_route)
                this.notificationsService.showSuccessNotification("Route Created!");
              }

            },
            error => {
              console.error('Error calculating routes:', error)
              this.notificationsService.showErrorNotification("Error calculating routes!")
            }

          );
        })
      })



    }
    else{
      this.notificationsService.showErrorNotification("You are too close to destination!")
    }



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


  sendRoute(route_distance:any, emissions_saved:any, cal_burned:any, travel_time:any){
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
        this.notificationsService.showSuccessNotification("Route Started!");
        this.notificationsService.notificationsNumber ++;
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
