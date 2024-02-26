import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  @Input() id:string = '0';
  @Input() title:string = '';

  chartOptions ?:any;

  constructor(
    private usersService: UsersService,
    private statsService: StatsService,
  ) {}

  ngOnInit(): void {
    switch(this.id) {
      case '1': {
        this.createChart("column", this.statsService.nrOfRoutes);

        break;
      }
      case '2': {
        this.createChart("column", this.statsService.kmCompleted);
        break;
      }
      case '3': {
        this.createChart("column", this.statsService.emissionsSaved);
        break;
      }
      case '4': {
        this.createChart("column", this.statsService.calBurned);
        break;
      }
      case '5': {
        this.createChart("column", this.statsService.moneySaved);
        break;
      }
      case '6': {
        this.createChart("pie", this.statsService.transportPercentage);
        break;
      }
      default: {
        //statements;
        break;
      }
    }

  }


  createChart(type:string, statsData:any){

    if(type != "pie"){
      const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const chartData: { label: string, y: number }[] = Object.keys(statsData).map(key => ({ label: months[parseInt(key) - 1], y: statsData[parseInt(key)] }));

      console.log(chartData);

      this.chartOptions = {
        animationEnabled: true,
        theme: 'dark2',
        backgroundColor: "transparent",
        subtitles: [{
          text: this.title
        }],
        data: [{
          type: type, //change type to column, line, area, doughnut, etc
          dataPoints:chartData

        }]
      }
    }
    else{

      const chartData = Object.entries(statsData).map(([label, y]) => ({ label, y }));

      console.log(chartData);

      this.chartOptions = {
        animationEnabled: true,
        theme: 'dark2',
        backgroundColor: "transparent",
        subtitles: [{
          text: this.title
        }],
        data: [{
          type: type, //change type to column, line, area, doughnut, etc
          dataPoints:chartData

        }]
      }
    }






  }

}
