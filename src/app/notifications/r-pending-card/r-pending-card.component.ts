import {Component, Input} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";
import {RoutesService} from "../../services/routes.service";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

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
  ) {
  }

  completeRoute(){


    const route = {
      id:this.id,
      user: this.usersService.loggedUser,
      start:this.start,
      end:this.end
    }

    this.routesService.completeRoute(route).subscribe(response =>{
      this.clicked = true;
      console.log(response)
      this.usersService.loggedUser = response.user;
      localStorage.setItem("loggedUser", JSON.stringify(this.usersService.loggedUser));
      this.notificationsService.showSuccessNotification("Route Completed!");
      this.reloadPage();
      this.notificationsService.notificationsNumber --;
    }, error => {
      this.notificationsService.showErrorNotification("ERROR completing route!");
      throw error;
    })

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

  reloadPage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
