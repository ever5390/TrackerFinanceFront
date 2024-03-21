import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    @Output() sendOpenCloseAsideOrder = new EventEmitter<any>();

    flagShowBoxCloseSession: boolean = false;
    userName: string = "";
    email: string = "";
    _authService = inject(AuthenticationService);

    constructor(private _router: Router){
      this.userName = this._authService.getUserNanme();
      this.email = this._authService.getEmail();
    }

    openCloseAsideOrder() {
      this.sendOpenCloseAsideOrder.emit();
    }

    showBoxCloseSession() {
      this.flagShowBoxCloseSession = !this.flagShowBoxCloseSession;
    }

    closeSession() {
      this._authService.logOut();
      this._router.navigate(['/login']);

    }
}
