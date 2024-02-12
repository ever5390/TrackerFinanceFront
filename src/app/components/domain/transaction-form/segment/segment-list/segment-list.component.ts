import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
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
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<{object:any, type: string}>();

  userId: number = 0;
  segments: SegmentModel[] = [];
  segment: SegmentModel = new SegmentModel();

  _oauthService = inject(AuthenticationService);
  _segmentService = inject(SegmentService);

// :::: BEGIN ::: formulary register interaction

 // Manages the list of data
  flagIsDataFiltered: boolean = false;
  flagDataLoaded: boolean = false;
  textFiltered: string = "";

  // For Searching 
  listSegmentSendSearch: SegmentModel[] = [];

  //Show Formulary
  @ViewChild('contenedorDiv') contenedorDiv!: ElementRef;
  posicionTop: number = -700; // Inicialmente fuera de la pantalla
  divHeight: number = 0; // Altura del div cuando está visible
  showTextHeader: string = "";
  flagShowFormulary: boolean = false;

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
    this.getAllByUserId();
  }

  back() {
    this.sendOrderClosePopUp.emit();
  }

  receivedDataFromSearch(data : any) {
    this.flagIsDataFiltered = true;
    this.segments = data.data;
    this.textFiltered = data.text;
  }

  showFormularyRegister(item: any) {
    this.setsHeaderDataToBeSent();
    this.downloadFormularyRegister();
    //Sets the object to be sent register
    this.segment.name = this.textFiltered;
  }

  private downloadFormularyRegister() {
    this.posicionTop = 0; // Mueve el div hacia abajo
    this.divHeight = this.contenedorDiv.nativeElement.clientHeight; // Establece la altura del div al tamaño del contenedor
    this.flagShowFormulary = true;
  }

  private setsHeaderDataToBeSent() {
    if (this.segment.id == 0) 
      this.showTextHeader = "Formulario de registro";
    else 
      this.showTextHeader = "Formulario edición";
  }

  receivedSuccessfullyProcessingFromFormulary() {
    this.subirDiv();
    this.getAllByUserId();
  }

  subirDiv() {
    this.posicionTop = -500; // Mueve el div de vuelta arriba
    setTimeout(() => {
      this.divHeight = 0; // Establece la altura del div a cero después de un pequeño retraso
    }, 100); // Ajusta el tiempo según sea necesario para permitir que la transición ocurra completamente
  }

  backForm() {
    this.posicionTop = -500; // Mueve el div de vuelta arriba
    setTimeout(() => {
      this.divHeight = 0; // Establece la altura del div a cero después de un pequeño retraso
    }, 100); // Ajusta el tiempo según sea necesario para permitir que la transición ocurra completamente

  }

  catchItemSelected(itemSelected: any) {
    this.sendItemSelected.emit({object: itemSelected, type:"segment"});
  }

// ::: END formulary register interaction 


  getAllByUserId() {
    this._segmentService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.flagDataLoaded = true;
        this.flagIsDataFiltered = false;
        this.listSegmentSendSearch = response;
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
