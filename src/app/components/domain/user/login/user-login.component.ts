import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user/login.model';
import { MessageBoxService } from 'src/app/services/message-box/message-box.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{

  userLogin: UserLogin;
  _authService = inject(AuthenticationService);

  constructor(
    private route: ActivatedRoute,
    private _messageBoxService : MessageBoxService,
    private router: Router  ) {
    this.userLogin = new UserLogin();
    this.userLogin.username = 'erosales';
    this.userLogin.password = '2051';
  }

  ngOnInit(): void {}

  onLogin() {
    this._authService.login(this.userLogin).subscribe({
        next: (res:any) => {
            if(res) {
              this._authService.saveToken(res.token);
              this._authService.saveUserDataFromToken(res.token);
              this.router.navigate(['/dashboard']);
              setTimeout(() => {
                this._messageBoxService.sendDateRequest({type:"success", message:"Bienvenido(a), Has accedido correctamente", isActive:true});
              }, 10);
            }
        }, error: (err : any)=> {
          console.log(err.error.message);
        }

      })
  }
}
