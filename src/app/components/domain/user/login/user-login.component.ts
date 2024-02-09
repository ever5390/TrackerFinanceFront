import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user/login.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  userLogin: UserLogin;
  _authService = inject(AuthenticationService);

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {
    this.userLogin = new UserLogin();
    this.userLogin.username = 'erosales';
    this.userLogin.password = '2051';
  }

  onLogin() {
    this._authService.login(this.userLogin).subscribe({
        next: (res:any) => {
            if(res) {
              this._authService.saveToken(res.token);
              this._authService.saveUserDataFromToken(res.token);
              this.router.navigate(['/movements']);
            }
        }, error: (err : any)=> {
          console.log(err.error.message);
        }

      })
  }
}
