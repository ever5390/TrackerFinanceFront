import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { PaymentMethodService } from 'src/app/services/payment-method/payment-method.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.css']
})
export class PaymentMethodFormComponent{

  @Input("paymentMethodReceivedFromPaymentMenthods") paymentMethodReceivedFromPaymentMenthods :PaymentMethodModel = new PaymentMethodModel();
  @Input("textHeaderReceivedFromPaymentMenthods") textHeaderReceivedFromPaymentMenthods :string = '';
  @Output() sentSuccessfullyProcessingFromFormulary = new EventEmitter<any>();
  @Output() orderBack = new EventEmitter<any>();

  
  userId: number = 0;
  paymentMethod: PaymentMethodModel = new PaymentMethodModel();

  _oauthService = inject(AuthenticationService);
  _peymentMethodService = inject(PaymentMethodService);

  textActionButton: string = "Registrar nuevo";


  @ViewChild('contenedorDiv') contenedorDiv!: ElementRef;
  posicionTop: number = -700; // Inicialmente fuera de la pantalla
  divHeight: number = 0; // Altura del div cuando está visible
  showTextHeader: string = "";
  
  flagShowFormularyAccount: boolean = false;

  

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }


/* BEGIN SHOW FORMULARY*/
 showFormularyRegister(item: any) {
   this.posicionTop = 0; // Mueve el div hacia abajo
   this.divHeight = this.contenedorDiv.nativeElement.clientHeight; // Establece la altura del div al tamaño del contenedor
   this.flagShowFormularyAccount = true;
 }

 receivedSuccessfullyProcessingFromFormulary() {
   this.subirDiv();
 }

 receiveOrderClosePopUp() {
  this.posicionTop = -500; // Mueve el div de vuelta arriba
  setTimeout(() => {
    this.divHeight = 0; // Establece la altura del div a cero después de un pequeño retraso
  }, 100); // Ajusta el tiempo según sea necesario para permitir que la transición ocurra completamente

 }
 
 subirDiv() {
   this.posicionTop = -500; // Mueve el div de vuelta arriba
   setTimeout(() => {
     this.divHeight = 0; // Establece la altura del div a cero después de un pequeño retraso
     this.flagShowFormularyAccount = false;
   }, 100); // Ajusta el tiempo según sea necesario para permitir que la transición ocurra completamente
 }

 backForm() {
   this.orderBack.emit();
 }

 receivedItemSelected(event: any) {
  this.subirDiv();
  this.paymentMethodReceivedFromPaymentMenthods.account = event.object;
  this.flagShowFormularyAccount = false;
 }


/* FIN SHOW FORMULARY*/















  saveChanges() {
    //setting values from data received
    this.paymentMethod.name = this.paymentMethodReceivedFromPaymentMenthods.name;
    this.paymentMethod.account =  this.paymentMethodReceivedFromPaymentMenthods.account;

    //send to save changes
    this.register(this.paymentMethod);
  }


  getByIdAndUserId(merberId: number) {
    this._peymentMethodService.getByIdAndUserId(merberId, this.userId).subscribe({
      next: (response) => {
        this.paymentMethod = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  register(paymentMethodReceived: PaymentMethodModel) {
    this._peymentMethodService.createByUserId(paymentMethodReceived, this.userId).subscribe({
      next: (response: PaymentMethodModel) => {
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
    this._peymentMethodService.updateByIdAndUserId(this.paymentMethod.id, this.paymentMethod, this.userId).subscribe({
      next: (response: PaymentMethodModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }
  
}
