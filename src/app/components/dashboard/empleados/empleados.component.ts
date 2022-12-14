import { MatSnackBar } from '@angular/material/snack-bar';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit, AfterViewInit{

  // displayedColumns: string[] = ['NombreCompleto', 'Departamento', 'Sueldo', 'FechaContrato', 'Acciones'];
  displayedColumns: string[] = ['NombreCompleto'];
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

  dialogoNuevoEmpleado() { }

  dialogoEditarEmpleado() { }

  mostrarEmpleados() {
    this._empleadoService.GetEmpleados().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }, error: (error) => {
        console.log('ERROR: ', error);
      }
    });
  }

}
