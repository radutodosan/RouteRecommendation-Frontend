import {Component, Input} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";
import {RoutesService} from "../../services/routes.service";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {StatsService} from "../../services/stats.service";
import {MapService} from "../../services/map.service";

@Component({
  selector: 'app-r-pending-card',
  templateUrl: './r-pending-card.component.html',
  styleUrls: ['./r-pending-card.component.css']
})
export class RPendingCardComponent {
  @Input() id?:string;
  @Input() city?:string;
  @Input() start?:string;
  @Input() end?:string;
  @Input() transport?:string;
  @Input() distance?:string;
  @Input() emissions_saved?:string;

  clicked = false;

  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private routesService:RoutesService,
    private router:Router,
    private statsService: StatsService,
    private mapService: MapService
  ) {
  }

  completeRoute(){


    const route = {
      id:this.id,
      user: this.usersService.loggedUser,
      start:this.start,
      end:this.end
    }


    // @ts-ignore
    this.mapService.getAddressCoordinates(route.end).then(addressCoordinates => {

      this.mapService.getCurrentLocationCoordinates().then(currentLocationCoordinates =>{
        const distance = this.mapService.calculateDistance(addressCoordinates, currentLocationCoordinates)

        console.log(distance);

        if(distance < 500){
          this.routesService.completeRoute(route).subscribe(response =>{
            this.clicked = true;
            console.log(response)
            this.usersService.loggedUser = response.user;
            localStorage.setItem("loggedUser", JSON.stringify(this.usersService.loggedUser));
            this.notificationsService.showSuccessNotification("Route Completed!");
            this.notificationsService.notificationsNumber --;

            this.getNrOfRoutesPerMonth();
            this.getKmCompletedPerMonth();
            this.getEmissionsSavedPerMonth();
            this.getCalBurnedPerMonth();
            this.getMoneySavedPerMonth();
            this.getTransportPercentage();

            this.reloadPage();

          }, error => {
            this.notificationsService.showErrorNotification("ERROR completing route!");
            throw error;
          })
        }
        else{
          this.notificationsService.showErrorNotification("You are too far away from destination!");
        }
      });



    });



  }

  declineRoute(){
    this.routesService.declineRoute(this.id).subscribe(response =>{
      this.clicked = true;
      console.log(response)
      this.notificationsService.showWarningNotification("Route Canceled!");
      this.reloadPage();
      this.notificationsService.notificationsNumber --;
    }, error => {
      this.notificationsService.showErrorNotification("ERROR canceling route!");
      throw error;
    })
  }

  getNrOfRoutesPerMonth(){
    this.statsService.getNrOfRoutesPerMonth(this.usersService.loggedUser.id).subscribe(response =>{

      this.statsService.nrOfRoutes = response;
      localStorage.setItem("nrOfRoutes", JSON.stringify(this.statsService.nrOfRoutes));
    }, error => {
      throw error;
    });

  }
  getKmCompletedPerMonth(){
    this.statsService.getKmCompletedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{

      this.statsService.kmCompleted = response;
      localStorage.setItem("kmCompleted", JSON.stringify(this.statsService.kmCompleted));
    }, error => {
      throw error;
    });
  }

  getEmissionsSavedPerMonth(){
    this.statsService.getEmissionsSavedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{

      this.statsService.emissionsSaved = response;
      localStorage.setItem("emissionsSaved", JSON.stringify(this.statsService.emissionsSaved));
    }, error => {
      throw error;
    });
  }

  getCalBurnedPerMonth(){
    this.statsService.getCalBurnedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{

      this.statsService.calBurned = response;
      localStorage.setItem("calBurned", JSON.stringify(this.statsService.calBurned));
    }, error => {
      throw error;
    });
  }

  getMoneySavedPerMonth(){
    this.statsService.getMoneySavedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{

      this.statsService.moneySaved = response;
      localStorage.setItem("moneySaved", JSON.stringify(this.statsService.moneySaved));
    }, error => {
      throw error;
    });
  }

  getTransportPercentage(): void{
    this.statsService.getTransportPercentage(this.usersService.loggedUser.id).subscribe(response =>{

      this.statsService.transportPercentage = response;
      localStorage.setItem("transportPercentage", JSON.stringify(this.statsService.transportPercentage));
    }, error => {
      throw error;
    });
  }


  reloadPage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
