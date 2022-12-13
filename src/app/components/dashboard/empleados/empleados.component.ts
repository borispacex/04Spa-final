import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit{

  empleados!: Empleado[];

  constructor(private _empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  mostrarEmpleados() {
    this._empleadoService.GetEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      }, error: (error) => {
        console.log('ERROR: ', error);
      }
    });
  }

}
