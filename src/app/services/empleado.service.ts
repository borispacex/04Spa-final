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
  
  SaveEmpleado(modelo: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiURL + 'guardar', modelo);
  }

  UpdateEmpleado(idEmpleado: number, modelo: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(this.apiURL + 'actualizar/' + idEmpleado, modelo);
  }

  DeleteEmpleado(idEmpleado: number) {
    return this.http.delete<Empleado>(this.apiURL + 'eliminar/' + idEmpleado);
  }
}
