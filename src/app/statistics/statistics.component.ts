import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {StatsService} from "../services/stats.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500})
  ],
})
export class StatisticsComponent implements OnInit{

  data:any;

  constructor(
    private usersService: UsersService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    if(this.usersService.isLoggedIn()){
      this.getNrOfRoutesPerMonth();
      this.getKmCompletedPerMonth();
      this.getEmissionsSavedPerMonth();
      this.getCalBurnedPerMonth();
      this.getMoneySavedPerMonth();
      this.data = this.getTransportPercentage();
    }

  }

  getNrOfRoutesPerMonth(){
    this.statsService.getNrOfRoutesPerMonth(this.usersService.loggedUser.id).subscribe(response =>{
      console.log("Routes per month: ", response);
    }, error => {
      throw error;
    });
  }
  getKmCompletedPerMonth(){
    this.statsService.getKmCompletedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{
      console.log("Km per month: ", response);
    }, error => {
      throw error;
    });
  }

  getEmissionsSavedPerMonth(){
    this.statsService.getEmissionsSavedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{
      console.log("Emissions saved per month: ", response);
    }, error => {
      throw error;
    });
  }

  getCalBurnedPerMonth(){
    this.statsService.getCalBurnedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{
      console.log("Calories burned per month: ", response);
    }, error => {
      throw error;
    });
  }

  getMoneySavedPerMonth(){
    this.statsService.getMoneySavedPerMonth(this.usersService.loggedUser.id).subscribe(response =>{
      console.log("Money saved per month: ", response);
    }, error => {
      throw error;
    });
  }

  getTransportPercentage():any{
    this.statsService.getTransportPercentage(this.usersService.loggedUser.id).subscribe(response =>{
      console.log("Transport percentage: ", response);
      return response;
    }, error => {
      throw error;
    });
  }

}
