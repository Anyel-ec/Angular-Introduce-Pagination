import { Component, OnInit } from '@angular/core';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  sensorData: any[] = [];
  page: number = 0;
  totalPages: number = 1; 

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.loadPaginatedSensorData();
  }

  // Cargar datos paginados desde el backend
  loadPaginatedSensorData() {
    this.sensorService.getPaginatedSensorData(this.page).subscribe(data => {
      this.sensorData = data.content;
      this.totalPages = data.totalPages;
    }, error => {
      console.error('Error al obtener datos del sensor:', error);
    });
  }

  // Ir a la página anterior
  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadPaginatedSensorData();
    }
  }

  // Ir a la siguiente página
  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadPaginatedSensorData();
    }
  }
}
