import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Workspaces } from 'src/app/models/workspaces/workspace.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { WorkspacesService } from 'src/app/services/workspaces/workspaces.service';

@Component({
  selector: 'app-workspace-form',
  templateUrl: './workspace-form.component.html',
  styleUrls: ['./workspace-form.component.css']
})
export class WorkspaceFormComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();

  workspace: Workspaces = new Workspaces();

  _authService = inject(AuthenticationService);


  constructor(private _workspaceService: WorkspacesService) {
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }

  create() {
    this.workspace.owner.id = this._authService.getUserId();
    this._workspaceService.createByUserId(this.workspace).subscribe({
      next: (response) => {
        alert("Espacio de trabajo creado correctamente");
        this.closeFormularyPopUp();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

}
