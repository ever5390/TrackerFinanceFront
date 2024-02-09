import { Component, OnInit, inject } from '@angular/core';
import { SegmentModel } from 'src/app/models/segment/segment.model';
import { SegmentService } from 'src/app/services/segment/segment.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-segment-form',
  templateUrl: './segment-form.component.html',
  styleUrls: ['./segment-form.component.css']
})
export class SegmentFormComponent  implements OnInit {

  userId: number = 0;
  segment: SegmentModel = new SegmentModel();

  _oauthService = inject(AuthenticationService);
  _segmentService = inject(SegmentService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
  }

  getByIdAndUserId(segmentId: number) {
    this._segmentService.getByIdAndUserId(segmentId, this.userId).subscribe({
      next: (response) => {
        this.segment = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  register() {
    this._segmentService.createByUserId(this.segment, this.userId).subscribe({
      next: (response: SegmentModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }

  update() {
    this._segmentService.updateByIdAndUserId(this.segment.id, this.segment, this.userId).subscribe({
      next: (response: SegmentModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }
  
}
