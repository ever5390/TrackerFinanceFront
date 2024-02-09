import { Component, OnInit, inject } from '@angular/core';
import { MemberModel } from 'src/app/models/member/member.model';
import { MemberService } from 'src/app/services/member/member.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent  implements OnInit {

  userId: number = 0;
  members: MemberModel[] = [];
  member: MemberModel = new MemberModel();

  _oauthService = inject(AuthenticationService);
  _memberService = inject(MemberService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {


  }

  getAllByUserId() {
    this._memberService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.members = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  getByIdAndUserId(memberId: number) {
    this._memberService.getByIdAndUserId(memberId, this.userId).subscribe({
      next: (response) => {
        this.member = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  deleteByIdAndUserId(memberId: number) {
    this._memberService.deleteByIdAndUserId(memberId, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
  
}
