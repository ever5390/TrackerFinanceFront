import { Component, Input, OnInit, inject } from '@angular/core';
import { SegmentModel } from 'src/app/models/segment/segment.model';
import { SegmentService } from 'src/app/services/segment/segment.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-segment-list',
  templateUrl: './segment-list.component.html',
  styleUrls: ['./segment-list.component.css']
})
export class SegmentListComponent implements OnInit {
  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = '';

  userId: number = 0;
  segments: SegmentModel[] = [];
  segment: SegmentModel = new SegmentModel();

  _oauthService = inject(AuthenticationService);
  _segmentService = inject(SegmentService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
    this.getAllByUserId();
  }

  getAllByUserId() {
    this._segmentService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.segments = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
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

  deleteByIdAndUserId(segmentId: number) {
    this._segmentService.deleteByIdAndUserId(segmentId, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
  
}
