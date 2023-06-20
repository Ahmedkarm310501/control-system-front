import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input('data1') data1: any;
  @Input('data2') data2: any;
  @Input('label1') label1: any = 'Grades';
  @Input('label2') label2: any = 'Grades';

  public chart: any;

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data1'] && !changes['data1'].firstChange) {
      this.updateChart();
    }
  }

  createChart() {
    // set the dataset array containing data1 and data2 if data1 and data2 are not null
    let arr = [];
    if (this.data1 && this.data2) {
      arr = [
        {
          label: this.label1,
          data: this.data1,
          backgroundColor: '#1d2c28',
        },
        {
          label: this.label2,
          data: this.data2,
          backgroundColor: '#6a6650',
        },
      ];
    } else {
      arr = [
        {
          label: this.label1,
          data: this.data1,
          backgroundColor: '#1d2c28',
        },
      ];
    }
    this.chart = new Chart('bar', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['F', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+'],
        datasets: arr,
      },
    });
  }
  updateChart() {
    this.chart.data.datasets[0].data = this.data1;
    this.chart.update();
  }
}
