import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../authenticator.component";
import {FriendshipService} from "../../services/friendship.service";
import {NotificationsService} from "../../services/notifications.service";
import {SavedAddressesService} from "../../services/saved-addresses.service";
import {RoutesService} from "../../services/routes.service";
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    public modalRef: MdbModalRef<AuthenticatorComponent>,
    private friendshipService: FriendshipService,
    private notificationsService: NotificationsService,
    private savedAddressesService: SavedAddressesService,
    private routesService: RoutesService,
    private statsService: StatsService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser(){

    this.usersService.loginUser(this.loginForm.value).subscribe(response=>{
      if(response != null){

        this.usersService.loggedUser = response;
        localStorage.setItem("loggedUser", JSON.stringify(this.usersService.loggedUser));

        this.notificationsService.showSuccessNotification("Hello, " + this.usersService.loggedUser.full_name + "!");

        this.getPendingFriendRequests();

        this.getPendingRoutes();

        this.getAddresses();

        this.getNrOfRoutesPerMonth();
        this.getKmCompletedPerMonth();
        this.getEmissionsSavedPerMonth();
        this.getCalBurnedPerMonth();
        this.getMoneySavedPerMonth();
        this.getTransportPercentage();

        this.reloadPage();


      }
      else{
        this.notificationsService.showErrorNotification("Username or password are wrong!");
      }
    }, err => {
      this.notificationsService.showErrorNotification("Username: " + this.loginForm.value["username"] + " does not exist.");
      throw err;
    })

  }

  getPendingFriendRequests(){
    this.friendshipService.getPendingFriendRequests(this.usersService.loggedUser.username).subscribe(response =>{

      this.notificationsService.notificationsNumber = response.length;
    }, error => {
      throw error;
    })
  }

  getPendingRoutes(){
    this.routesService.getPendingRoutes(this.usersService.loggedUser.id).subscribe(response =>{

      this.notificationsService.notificationsNumber += response.length;
    }, error => {
      throw error;
    })
  }

  getAddresses(){
    this.savedAddressesService.getAddresses(this.usersService.loggedUser.id).subscribe(response =>{

      this.savedAddressesService.savedAddresses = response;
      localStorage.setItem("savedAddresses", JSON.stringify(this.savedAddressesService.savedAddresses));

    }, error => {
      this.notificationsService.showErrorNotification("Error Fetching Addresses!");
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
