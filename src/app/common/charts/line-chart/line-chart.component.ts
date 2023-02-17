import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  public chart: any;
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('line', {
      type: 'line', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        datasets: [
          {
            label: 'Grades',
            data: [5, 7, 3, 6, 8, 10, 1, 2, 4, 5],
          },
        ],
      },
    });
  }
}
