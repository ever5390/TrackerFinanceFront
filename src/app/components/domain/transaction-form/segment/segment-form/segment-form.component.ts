import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { SegmentModel } from 'src/app/models/segment/segment.model';
import { SegmentService } from 'src/app/services/segment/segment.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-segment-form',
  templateUrl: './segment-form.component.html',
  styleUrls: ['./segment-form.component.css']
})
export class SegmentFormComponent {

  @Input("segmentReceivedFromSegments") segmentReceivedFromSegments :SegmentModel = new SegmentModel();
  @Input("textHeaderReceivedFromSegments") textHeaderReceivedFromSegments :string = '';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sentSuccessfullyProcessingFromFormulary = new EventEmitter<any>();

  userId: number = 0;
  segment: SegmentModel = new SegmentModel();

  _oauthService = inject(AuthenticationService);
  _segmentService = inject(SegmentService);

  textActionButton: string = "Registrar nuevo";

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  backForm() {
    this.sendOrderClosePopUp.emit();
  }
  
  saveChanges() {
    //setting values from data received
    this.segment.name = this.segmentReceivedFromSegments.name;
    //send to save changes
    this.register(this.segment);
  }
  
  register(segmentReceived: SegmentModel) {
    this._segmentService.createByUserId(segmentReceived, this.userId).subscribe({
      next: (response: SegmentModel) => {
        alert(response.name + " agregado correctamente");
        this.sentSuccessfullyProcessingFromFormulary.emit();
      },
      error: (error: any) => {
        console.log(error.error.message);
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
