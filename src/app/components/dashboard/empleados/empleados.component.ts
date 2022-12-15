import { MatSnackBar } from '@angular/material/snack-bar';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { DialogoAddEditEmpleadoComponent } from '../dialogs/dialogo-add-edit-empleado/dialogo-add-edit-empleado.component';
import { DialogoDeleteEmpleadoComponent } from '../dialogs/dialogo-delete-empleado/dialogo-delete-empleado.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['NombreCompleto', 'Departamento', 'Sueldo', 'FechaContrato', 'Acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _empleadoService: EmpleadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  dialogoNuevoEmpleado() {
    this.dialog.open(DialogoAddEditEmpleadoComponent, {
      disableClose: true,
      width: '350px',
    }).afterClosed().subscribe(resultado => {
      if (resultado == 'creado') {
        this.mostrarEmpleados();
      }
    });
  }

  dialogoEditarEmpleado(dataEmpleado: Empleado) {
    this.dialog.open(DialogoAddEditEmpleadoComponent, {
      disableClose: true,
      width: '350px',
      data: dataEmpleado
    }).afterClosed().subscribe(resultado => {
      if (resultado == 'editado') {
        this.mostrarEmpleados();
      }
    });
  }

  dialogoEliminarEmpleado(dataEmpleado: Empleado) {
    this.dialog.open(DialogoDeleteEmpleadoComponent, {
      disableClose: true,
      width: '350px',
      data: dataEmpleado
    }).afterClosed().subscribe(resultado => {
      if (resultado == 'eliminar') {
        this._empleadoService.DeleteEmpleado(dataEmpleado.idEmpleado).subscribe({
          next: (data) => {
            this.mostrarAlerta('Empleado eliminado correctamente', 'Listo');
            this.mostrarEmpleados();
          }, error: (e) => {
            this.mostrarAlerta('No se pudo elimar Empleado', 'Error');
          }
        });
      }
    });
  }

  mostrarEmpleados() {
    this._empleadoService.GetEmpleados().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }, error: (error) => {
        console.log('ERROR: ', error);
      }
    });
  }

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

}
