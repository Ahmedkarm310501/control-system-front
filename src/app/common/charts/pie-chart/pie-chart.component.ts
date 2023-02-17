import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  public chart: any;
  constructor() {}

  ngOnInit(): void {
    this.createChart();
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
            data: ['80', '20'],
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
