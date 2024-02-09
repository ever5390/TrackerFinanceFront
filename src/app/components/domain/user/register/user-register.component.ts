import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  formulario: FormGroup;

  authService = inject(AuthenticationService);
  
  constructor() {
    this.formulario = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      country: new FormControl()
    })
  }

  async onSubmit() {
    const response = await this.authService.registerForm(this.formulario.value);
    console.log(response);
  }
}
