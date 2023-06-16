import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CourseDashboardComponent } from '../../course-dashboard/course-dashboard.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input('data1') data1: any;
  public chart: any;
  constructor(private courseDashboardComponent: CourseDashboardComponent) {}

  ngOnInit(): void {
    console.log(this.data1);

    this.createChart();
    console.log(this.data1);
  }

  createChart() {
    this.chart = new Chart('pie', {
      type: 'pie', //this denotes tha type of chart
      plugins: [ChartDataLabels],

      data: {
        // values on X-Axis
        labels: ['Pass', 'Fail'],
        datasets: [
          {
            label: 'Total students',
            data: [this.data1[0].toString(), this.data1[1].toString()],
            backgroundColor: ['#1d2c28', '#e74c3c'],
            // hoverOffset: 4,
          },
        ],
      },
      // Configuration options go here

      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
          datalabels: {
            display: true,
            color: '#fff',
            font: {
              size: 16,
            },
            formatter: (value, ctx) => {
              // return the percentage with the label
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              let label = ctx.chart.data.labels[ctx.dataIndex];
              dataArr.map((data) => {
                sum += +data;
              });
              let percentage = ((value * 100) / sum).toFixed(1) + '%';
              return `${label}: ${percentage}`;
            },
          },
        },
      },
    });
  }
}
