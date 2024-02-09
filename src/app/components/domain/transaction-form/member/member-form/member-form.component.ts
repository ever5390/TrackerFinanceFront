import { Component, OnInit, inject } from '@angular/core';
import { MemberModel } from 'src/app/models/member/member.model';
import { MemberService } from 'src/app/services/member/member.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent  implements OnInit {

  userId: number = 0;
  member: MemberModel = new MemberModel();

  _oauthService = inject(AuthenticationService);
  _memberService = inject(MemberService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
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

  register() {
    this._memberService.createByUserId(this.member, this.userId).subscribe({
      next: (response: MemberModel) => {
        console.log(response);
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