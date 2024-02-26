import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  @Input() title:string = '';
  @Input() statsData:any = [];

  chartOptions ?:any;



  ngOnInit(): void {
    this.chartOptions = {
      animationEnabled: true,
      theme: 'dark2',
      backgroundColor: "transparent",
      subtitles: [{
        text: this.title
      }],
      data: [{
        type: "pie", //change type to column, line, area, doughnut, etc
        indexLabel: "{name}: {y}%",
        dataPoints: this.statsData
      }]
    }
  }
}
