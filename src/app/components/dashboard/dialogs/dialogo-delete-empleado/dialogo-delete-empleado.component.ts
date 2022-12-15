import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/interfaces/empleado';

@Component({
  selector: 'app-dialogo-delete-empleado',
  templateUrl: './dialogo-delete-empleado.component.html',
  styleUrls: ['./dialogo-delete-empleado.component.css']
})
export class DialogoDeleteEmpleadoComponent {
  
  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) {}

  confirmarEliminar() {
    if (this.dataEmpleado) {
      this.dialogoReferencia.close('eliminar');
    }
  }

}
