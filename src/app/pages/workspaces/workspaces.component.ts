import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Workspaces } from 'src/app/models/workspaces/workspace.model';
import { MessageBoxService } from 'src/app/services/message-box/message-box.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.css']
})
export class WorkspacesComponent {

  _authService = inject(AuthenticationService);
  _workspaceService = inject(WorkspacesService);

  workspace: Workspaces = new Workspaces();
  workspaces: Workspaces[] = [];

  orderCloseormularyPopUp: boolean = false;

  constructor(
    private _messageBoxService : MessageBoxService,
    private _router: Router  ) {
      this.findAllWorkspaceByUserLogged();
  }

  findAllWorkspaceByUserLogged() {
    this._workspaceService.readAllByUserId(this._authService.getUserId()).subscribe({
      next: (res:any) => {
        this.workspaces = res;
        console.log(res);
      }, error: (err : any)=> {
        console.log(err.error.message);
        setTimeout(() => {
          this._messageBoxService.sendDateRequest({type:"error", message:err.error.message, isActive:true});
        }, 1);
      }
    })
  }

  selectWorkspace(idWorkspace: any) {
    localStorage.setItem("workspaceId", idWorkspace);
    this._router.navigate(['/']);
  }

  create() {
    this.orderCloseormularyPopUp = true;
  }

  receiveOrderCloseFormularyPopUp() {
    this.orderCloseormularyPopUp = false;
    this.findAllWorkspaceByUserLogged();
  }

  // localStorage.setItem("workspaceId", res[0].id);
  // this._router.navigate(['/']);
  // setTimeout(() => {
  //   this._messageBoxService.sendDateRequest({type:"success", message:"Bienvenido(a), Has accedido correctamente", isActive:true});
  // }, 1);
}
