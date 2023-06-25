import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @Input('data1') data1: any;
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
    this.chart = new Chart('line', {
      type: 'line', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        datasets: [
          {
            label: 'Grades',
            data: this.data1,
            backgroundColor: '#1d2c28',
            borderColor: '#1d2c28',
          },
        ],
      },
    });
  }
  updateChart() {
    this.chart.data.datasets[0].data = this.data1;
    this.chart.update();
  }
}
