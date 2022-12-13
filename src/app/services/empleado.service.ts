import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from '../global';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiURL = endPoint + 'empleado/';

  constructor(private http: HttpClient) { }

  GetEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiURL + 'lista');
  }
  
}
