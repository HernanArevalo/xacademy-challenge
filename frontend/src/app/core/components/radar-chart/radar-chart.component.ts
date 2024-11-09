import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { RadarStat } from '../../models';

Chart.register(...registerables);

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnChanges, OnDestroy {
  @Input() data: RadarStat | null = null;
  canvasId = 'chart-' + Math.random().toString(36).substr(2, 9); // ID único para el canvas
  config: ChartConfiguration = {
    type: 'radar',
    data: {
      labels: [],
      datasets: []
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
          min: 0,
          max: 100,
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
  chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.config.data = {
        labels: this.data.labels,
        datasets: [
          {
            label: this.data.name,
            data: this.data.stats
          },
        ]
      };

      this.config.options!.backgroundColor = this.data.color;
      this.initializeChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  initializeChart() {
    setTimeout(() => {
      const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
      if (canvas) {
        this.chart = new Chart(canvas, this.config);
      }
    });
  }
}
