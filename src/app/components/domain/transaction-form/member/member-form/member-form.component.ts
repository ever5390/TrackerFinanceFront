import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MemberModel } from 'src/app/models/member/member.model';
import { MemberService } from 'src/app/services/member/member.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent {

  @Input("memberReceivedFromMembers") memberReceivedFromMembers :MemberModel = new MemberModel();
  @Input("textHeaderReceivedFromMembers") textHeaderReceivedFromMembers :string = '';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sentSuccessfullyProcessingFromFormulary = new EventEmitter<any>();

  userId: number = 0;

  member: MemberModel = new MemberModel();

  _oauthService = inject(AuthenticationService);
  _memberService = inject(MemberService);

  textActionButton: string = "Registrar nuevo";

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  backForm() {
    this.sendOrderClosePopUp.emit();
  }

  saveChanges() {
    //setting values from data received
    this.member.name = this.memberReceivedFromMembers.name;
    //send to save changes
    this.register(this.member);
  }


  getByIdAndUserId(merberId: number) {
    this._memberService.getByIdAndUserId(merberId, this.userId).subscribe({
      next: (response) => {
        this.member = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  register(memberToRegister: MemberModel) {
    this._memberService.createByUserId(memberToRegister, this.userId).subscribe({
      next: (response: MemberModel) => {
        alert("miembro fue registrado exitosmaente!!..");
        console.log(response);
        this.sentSuccessfullyProcessingFromFormulary.emit();
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }

  update() {
    this._memberService.updateByIdAndUserId(this.member.id, this.member, this.userId).subscribe({
      next: (response: MemberModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }
  
}