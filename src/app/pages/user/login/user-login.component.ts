import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user/login.model';
import { MessageBoxService } from 'src/app/services/message-box/message-box.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{

  userLogin: UserLogin;
  _authService = inject(AuthenticationService);
  _workspaceService = inject(WorkspacesService);

  constructor(
    private route: ActivatedRoute,
    private _messageBoxService : MessageBoxService,
    private _router: Router  ) {
    this.userLogin = new UserLogin();
    this.userLogin.username = 'ejrosalesp';
    this.userLogin.password = '2051';
  }

  ngOnInit(): void {}

  onLogin() {
    this._authService.login(this.userLogin).subscribe({
        next: (res:any) => {
            if(res) {
              this._authService.saveToken(res.token);
              this._authService.saveUserDataFromToken(res.token);
              this._router.navigate(['/home']);
            }
        }, error: (err : any)=> {
          console.log(err.error.message);
          setTimeout(() => {
            this._messageBoxService.sendDateRequest({type:"error", message:"Datos incorrectos", isActive:true});
          }, 1);
        }
      })
  }
}
