import { Component, OnInit, Input} from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input('data1') data1: any;

  public chart: any;

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('bar', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['F', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+'],
        datasets: [
          {
            label: 'Grades',
            data: this.data1,
            backgroundColor: '#1d2c28',
          },
        ],
      },
    });
  }
}
