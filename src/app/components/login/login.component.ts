import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  // logo: string = './assets/img/usuario.png';
  logo: string = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';
  formLogin!: FormGroup;
  
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {}
  
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required]
    });
  }
  
  hasError(controlName: string, errorName: string) {
    return this.formLogin.get(controlName)?.hasError(errorName);
  }
  
  ingresar() {
    const usuario: userLogin = this.formLogin.value;
    if (usuario.email == 'boris@test.com' && usuario.pwd == '1234') {
      this.router.navigate(['/dashboard']);
    } else {
      this.error();
    }
  }
  
  error() {
    this._snackBar.open('Email o contrasena ingresado son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}

interface userLogin {
  email: string,
  pwd: string
}
