import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private baseUrl = 'http://localhost:9091/sensor';
  constructor(private http: HttpClient) {}

  // Obtener un solo dato del sensor
  getSensorData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data`);
  }

  // Obtener todos los datos almacenados
  getAllSensorData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // Obtener datos paginados
  getPaginatedSensorData(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all?page=${page}`);
  }
}
