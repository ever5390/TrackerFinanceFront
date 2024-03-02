import { Component, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    userName: string = "";
    email: string = "";
    _authService = inject(AuthenticationService);

    constructor(){
      this.userName = this._authService.getUserNanme();
      this.email = this._authService.getEmail();
    }
}
