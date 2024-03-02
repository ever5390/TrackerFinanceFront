import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  formulario: FormGroup;

  authService = inject(AuthenticationService);
  
  constructor(private _route: Router) {
    this.formulario = new FormGroup({
      username: new FormControl("ejrosalesp"),
      password: new FormControl("2051"),
      firstname: new FormControl("ever rosales"),
      email: new FormControl("admin1@gmail.com"),
    })
  }

  async onSubmit() {
    try {
      const response = await this.authService.registerForm(this.formulario.value);
      alert("registrado con éxito, ahora loggeate :D");
      this._route.navigate(['/login']);
    } catch (error: any) {
      alert(error.error.message);
    }
  }
}
