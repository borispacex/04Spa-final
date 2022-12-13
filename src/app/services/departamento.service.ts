import { Departamento } from './../interfaces/departamento';
import { endPoint } from './../global';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  // http://borisvargas-001-site1.atempurl.com/api/departamento/
  private apiURL = endPoint + 'departamento/';

  constructor(private http: HttpClient) { }

  GetDepartamentos(): Observable<Departamento[]> {
    // GET --> http://borisvargas-001-site1.atempurl.com/api/departamento/lista
    return this.http.get<Departamento[]>(this.apiURL + 'lista');
  }

}
