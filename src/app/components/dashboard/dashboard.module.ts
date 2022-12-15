import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { SharedModule } from '../shared/shared.module';
import { DialogoAddEditEmpleadoComponent } from './dialogs/dialogo-add-edit-empleado/dialogo-add-edit-empleado.component';
import { DialogoDeleteEmpleadoComponent } from './dialogs/dialogo-delete-empleado/dialogo-delete-empleado.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    EmpleadosComponent,
    DialogoAddEditEmpleadoComponent,
    DialogoDeleteEmpleadoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
