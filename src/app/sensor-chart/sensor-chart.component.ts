import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.css']
})
export class SensorChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() sensorData: any[] = [];
  chart: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.generateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sensorData'] && this.sensorData.length > 0) {
      this.updateChart();
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.destroy(); // Destruir gráfico anterior para evitar duplicados
    }
    this.generateChart();
  }

  generateChart() {
    if (!this.sensorData || this.sensorData.length === 0) return;

    const temperaturas = this.sensorData.map(s => s.variables?.Temperatura);
    const humedades = this.sensorData.map(s => s.variables?.Humedad);
    const contaminaciones = this.sensorData.map(s => s.variables?.Contaminacion);

    const minTemperatura = Math.min(...temperaturas);
    const maxTemperatura = Math.max(...temperaturas);
    const avgTemperatura = temperaturas.reduce((a, b) => a + b, 0) / temperaturas.length;

    const minHumedad = Math.min(...humedades);
    const maxHumedad = Math.max(...humedades);
    const avgHumedad = humedades.reduce((a, b) => a + b, 0) / humedades.length;

    const minContaminacion = Math.min(...contaminaciones);
    const maxContaminacion = Math.max(...contaminaciones);
    const avgContaminacion = contaminaciones.reduce((a, b) => a + b, 0) / contaminaciones.length;

    const ctx = document.getElementById('sensorChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Temperatura', 'Humedad', 'Contaminación'],
        datasets: [
          {
            label: 'Mínimo',
            data: [minTemperatura, minHumedad, minContaminacion],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Máximo',
            data: [maxTemperatura, maxHumedad, maxContaminacion],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
          {
            label: 'Promedio',
            data: [avgTemperatura, avgHumedad, avgContaminacion],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Estadísticas del Sensor (Min, Max, Promedio)'
          }
        }
      }
    });
  }
}
