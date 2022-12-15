import { EmpleadoService } from 'src/app/services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import { Departamento } from 'src/app/interfaces/departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Empleado } from 'src/app/interfaces/empleado';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialogo-add-edit-empleado',
  templateUrl: './dialogo-add-edit-empleado.component.html',
  styleUrls: ['./dialogo-add-edit-empleado.component.css'],
  providers: [
    { provide: MAT_MOMENT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DialogoAddEditEmpleadoComponent implements OnInit{

  formEmpleado!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  listaDepartamentos: Departamento[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoAddEditEmpleadoComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _empleadoService: EmpleadoService,
    private _departamentoService: DepartamentoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) {}

  ngOnInit(): void {
    this.formEmpleado = this.fb.group({
      nombreCompleto: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      sueldo: ['', Validators.required],
      fechaContrato: ['', Validators.required],
    });
    this.mostrarDepartamentos();
  }

  mostrarDepartamentos() {
    this._departamentoService.GetDepartamentos().subscribe({
      next: (data) => {
        this.listaDepartamentos = data;
      }, error: (e) => {
        console.log('Error', e);
      }
    });
  }

}
