import {Component, OnInit} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {MapService} from "../services/map.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SavedAddress} from "../entities/saved-address";
import {SavedAddressesService} from "../services/saved-addresses.service";
import {RoutesService} from "../services/routes.service";
import {UsersService} from "../services/users.service";
import {NotificationsService} from "../services/notifications.service";
import {Router} from "@angular/router";

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
    private router:Router

  ) {}

  ngOnInit(): void {
    this.savedAddresses = this.savedAddressesService.savedAddresses;
    console.log(this.savedAddresses);

    this.routeForm = this.formBuilder.group({
      startValue: ['', Validators.required],
      endValue: ['', Validators.required],
      transportType: ['', Validators.required]
    });

  }

  searchRoute(){
    console.log("Searching...");
    this.mapService.getLocationBySearch(this.routeForm.value["startValue"], 0);
    this.mapService.getLocationBySearch(this.routeForm.value["endValue"], 1);
    console.log(this.routeForm.value["startValue"], this.routeForm.value["endValue"])

    if(this.usersService.loggedUser != null){
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
    else{
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

  reloadPage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
