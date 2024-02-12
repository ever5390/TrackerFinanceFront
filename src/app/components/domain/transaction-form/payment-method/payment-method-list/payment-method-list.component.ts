import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { PaymentMethodService } from 'src/app/services/payment-method/payment-method.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {
  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = '';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<{object:any, type: string}>();

  userId: number = 0;
  paymentMethods: PaymentMethodModel[] = [];
  paymentMethod: PaymentMethodModel = new PaymentMethodModel();

  _oauthService = inject(AuthenticationService);
  _paymentMethodService = inject(PaymentMethodService);

  // :::: BEGIN ::: formulary register interaction

  listPaymenthMethodsSendSearch: PaymentMethodModel[] = [];


  @ViewChild('contenedorDiv') contenedorDiv!: ElementRef;
  posicionTop: number = -700; // Inicialmente fuera de la pantalla
  divHeight: number = 0; // Altura del div cuando está visible
  showTextHeader: string = "";
  
  flagShowFormulary: boolean = false;
  flagIsDataFiltered: boolean = false;
  flagDataLoaded: boolean = false;
  textFiltered: string = "";

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
    this.paymentMethods = data.data;
    this.textFiltered = data.text;
  }

  showFormularyRegister(item: any) {
    if(this.paymentMethod.id == 0) this.showTextHeader = "Formulario de registro de Medio de pago";
    else this.showTextHeader = "Formulario edición de Medio de pago";
    console.log(this.textFiltered);
    this.posicionTop = 0; // Mueve el div hacia abajo
    this.paymentMethod.name = this.textFiltered;
    this.divHeight = this.contenedorDiv.nativeElement.clientHeight; // Establece la altura del div al tamaño del contenedor
    this.flagShowFormulary = true;
  }

  receivedSuccessfullyProcessingFromFormulary() {
    this.subirDiv();
    this.getAllByUserId();
  }

  subirDiv() {
    this.posicionTop = -1500; // Mueve el div de vuelta arriba
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

  receiveOrderBack() {
    this.backForm();
  }

  catchItemSelected(itemSelected: any) {
    if(this.receivedTextHeaderForm.includes("destino"))
      this.sendItemSelected.emit({object: itemSelected, type:"pmd"});
    else
      this.sendItemSelected.emit({object: itemSelected, type:"pmo"});
  }

  receivedItemSelected(event: any) {
    console.log("PML: " + event);
    this.paymentMethod.account = event.object;
    this.subirDiv();
  }

// ::: END formulary register interaction 

  getAllByUserId() {
    console.log(this.userId);
    this._paymentMethodService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.paymentMethods = response;
        this.flagDataLoaded = true;
        this.flagIsDataFiltered = false;
        this.listPaymenthMethodsSendSearch = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  getByIdAndUserId(paymentMethodId: number) {
    this._paymentMethodService.getByIdAndUserId(paymentMethodId, this.userId).subscribe({
      next: (response) => {
        this.paymentMethod = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  deleteByIdAndUserId(paymentMethodId: number) {
    this._paymentMethodService.deleteByIdAndUserId(paymentMethodId, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
  
}
