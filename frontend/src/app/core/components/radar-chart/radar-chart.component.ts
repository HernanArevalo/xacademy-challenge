import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, RadialLinearScale, RadarController, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { RadarStats } from '../../models';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {
  @Input() data!: RadarStats;

  public config: ChartConfiguration | null = null;
  chart: any;

  constructor() {
    Chart.register(RadialLinearScale, RadarController, Tooltip, Legend, PointElement, LineElement);
  }

  ngOnInit() {
    if (this.data && Object.keys(this.data.stats).length > 0) {
      this.config = {
        type: 'radar',
        data: {
          labels: Object.keys(this.data.stats),
          datasets: [
            {
              data: Object.keys(this.data.stats).map(key => this.data.stats[key]),
              borderColor: this.data.color
            },
          ]
        },
        options: {
          aspectRatio: 2,
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            r: {
              pointLabels: {
                font: {
                  family: 'Arial',
                  size: 14,
                  weight: 'bold',
                },
                color: 'black',
              },
              ticks: {
                font: {
                  family: 'Arial',
                  size: 12,
                  weight: 'normal',
                },
                color: 'gray',
              }
            }
          }
        }

      };

      this.chart = new Chart(this.data.name, this.config);
    }
  }
}
