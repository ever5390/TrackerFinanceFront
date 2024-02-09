import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Action } from 'src/app/emuns/Action.enum';
import { Type } from 'src/app/emuns/Type.enum';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  animations: [
    trigger('animacionBloque', [
      state('visible', style({ bottom: '50px' })),
      state('oculto', style({ bottom: '-200px' })),
      transition('oculto => visible', animate('300ms ease-in')),
      transition('visible => oculto', animate('300ms ease-out'))
    ])
  ]
})
export class TransactionFormComponent  implements OnInit {


  @ViewChild('contenedorDiv') contenedorDiv!: ElementRef;
  posicionTop: number = -700; // Inicialmente fuera de la pantalla
  divHeight: number = 0; // Altura del div cuando está visible


  public readonly EXPENSE = "Gasto"
  public readonly INCOME = "Ingreso"
  public readonly LOAN_RECEIVED = "Préstamo recibido"
  public readonly LOAN_SENDED = "Préstamo realizado"
  public readonly PAYMENT_RECEIVED = "Pago recibido"
  public readonly PAYMENT_SENDED = "Pago realizado"
  public readonly TRANSFERENCE = "transferencia"

  operationTypes: any[] = [
    {name: this.EXPENSE, icon:""}, 
    {name: this.INCOME, icon:""}, 
    {name: this.LOAN_RECEIVED, icon:""}, 
    {name: this.LOAN_SENDED, icon:""}, 
    {name: this.PAYMENT_RECEIVED, icon:""},
    {name: this.PAYMENT_SENDED, icon:""}, 
    {name: this.TRANSFERENCE, icon:""}
  ];

  //Flags show components
  flagFormOptionSelected: boolean = false;
  flagShowTypeComponent: boolean = false;
  flagShowMemberComponent: boolean = false;
  flagShowPaymentMethodComponent: boolean = false;
  flagShowPaymentMethodDestinyComponent: boolean = false;
  flagShowCategoryComponent: boolean = false;
  flagShowSegmentComponent: boolean = false;
  flagShowLoanAssocComponent: boolean = false;

  transaction: TransactionModel = new TransactionModel();

  //tx type selected
  operationTypeSelected: string = "";
  

  _oauthService = inject(AuthenticationService);
  _transactionService = inject(TransactionService);

  userId: number = 0;

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
    this.receiveTypeSelected("");
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.bajarDiv("category");
    }, 200);
  }

  bajarDiv(popupShow: string) {
    console.log(popupShow);
    this.posicionTop = 0; // Mueve el div hacia abajo
    this.divHeight = this.contenedorDiv.nativeElement.clientHeight; // Establece la altura del div al tamaño del contenedor
    this.resetFlagToShowPopUps();
    switch (popupShow) {
      case "type":
        this.flagShowTypeComponent = true;
        break;
      case "member":
        this.flagShowMemberComponent = true;
        break;    
      case "loanAssoc":
        this.flagShowLoanAssocComponent = true;
        break;
      case "pmo":
        this.flagShowPaymentMethodComponent = true;
        break;
      case "pmd":
        this.flagShowPaymentMethodDestinyComponent = true;
        break;
      case "category":
        this.flagShowCategoryComponent = true;
        break;
      case "segment":
        this.flagShowSegmentComponent = true;
        break;
      default:
        break;
    }

  }

  subirDiv() {
    this.posicionTop = -500; // Mueve el div de vuelta arriba
    setTimeout(() => {
      this.divHeight = 0; // Establece la altura del div a cero después de un pequeño retraso
    }, 100); // Ajusta el tiempo según sea necesario para permitir que la transición ocurra completamente
  }


  flagShowBlockTransference: boolean = false;
  flagShowBlockMember: boolean = false;
  flagShowBlockLoanAssociated: boolean = false;


  
  public readonly TEXT_TYPE_DEAULT = "¿Que tipo de operación realizarás?";
  public readonly TEXT_LOAN_RECEIVED = "Operación: Préstamo recibido";
  public readonly TEXT_LOAN_SENDED = "Operación: Préstamo realizado";
  public readonly TEXT_PAYMENT_RECEIVED = "Operación: Pago recibido";
  public readonly TEXT_PAYMENT_SENDED = "Operación: Pago realizado";
  public readonly TEXT_EXPENSE = "Operación: Gasto";
  public readonly TEXT_INCOME = "Operación: Ingreso";
  public readonly TEXT_TRANSFERENCE = "Operación: transferencia";

  public readonly TEXT_REQUEST_COUNTERPART_RECEIVED_LOAN = "Registra quien te realizó el préstamo";
  public readonly TEXT_REQUEST_COUNTERPART_SENDED_LOAN = "Registra quien recibió el préstamo";
  public readonly TEXT_REQUEST_COUNTERPART_RECEIVED_PAYMENT = "Registra quien te ralizó el pago";
  public readonly TEXT_REQUEST_COUNTERPART_SENDED_PAYMENT = "Registra de quien recibiste el pago";
  public readonly TEXT_REQUEST_LOAN_ASSOC = "¿A qué préstamo está asciado el pago?";
  public readonly TEXT_REQUEST_PAYMENT_METHOD = "¿Con qué medio de pago realizaste la operación?";
  public readonly TEXT_REQUEST_PAYMENT_METHOD_DESTINY = "¿A qué medio de pago destino realizaste la operación?";
  public readonly TEXT_REQUEST_CATEGORY = "¿Deseas asociarlo alguna categoría?(opcional)";
  public readonly TEXT_REQUEST_GRUPO = "¿Deseas asociarlo a algún grupo en específico?(opcional)";

  sendTextHeaderForm: string = "";
  showTextType: string = "";
  showTextCounterpart: string = "";

  
  receiveTypeSelected(typeSelected:any){

    this.resetFlagsToShowBlock();
    this.showFormularyBlocksByTxTypeSelected(typeSelected);
    this.setterTxParamasByTxTypeSelected(typeSelected);
    this.setterTypeAndCounterpartTextToShowByTxParamsByType();
  }

  private setterTypeAndCounterpartTextToShowByTxParamsByType() {

    if (this.transaction.type === Type.DEFAULT)
      this.showTextType = this.TEXT_TYPE_DEAULT;

    if (this.transaction.type == Type.EXPENSE)
      this.showTextType = this.TEXT_EXPENSE;
  
    if (this.transaction.type == Type.INCOME)
      this.showTextType = this.TEXT_INCOME;
    
    if (this.transaction.type == Type.TRANSFERENCE)
      this.showTextType = this.TEXT_TRANSFERENCE;
  
    if (this.transaction.type == Type.LOAN && this.transaction.action == Action.REALICÉ) {
      this.showTextType = this.TEXT_LOAN_SENDED;
      this.showTextCounterpart = this.TEXT_REQUEST_COUNTERPART_SENDED_LOAN;
    }

    if (this.transaction.type == Type.LOAN && this.transaction.action == Action.RECIBÍ) {
      this.showTextType = this.TEXT_LOAN_RECEIVED;
      this.showTextCounterpart = this.TEXT_REQUEST_COUNTERPART_RECEIVED_LOAN;
    }

    if (this.transaction.type == Type.PAYMENT && this.transaction.action == Action.REALICÉ) {
      this.showTextType = this.TEXT_PAYMENT_SENDED;
      this.showTextCounterpart = this.TEXT_REQUEST_COUNTERPART_SENDED_PAYMENT;
    }

    if (this.transaction.type == Type.PAYMENT && this.transaction.action == Action.RECIBÍ) {
      this.showTextType = this.TEXT_PAYMENT_RECEIVED;
      this.showTextCounterpart = this.TEXT_REQUEST_COUNTERPART_RECEIVED_PAYMENT;
    }

  }

  private setterTxParamasByTxTypeSelected(typeSelected: any) {
    switch (typeSelected.name) {
      case this.LOAN_RECEIVED:
        this.transaction.type = Type.LOAN;
        this.transaction.action = Action.RECIBÍ;
        break;
      case this.LOAN_SENDED:
        this.transaction.type = Type.LOAN;
        this.transaction.action = Action.REALICÉ;
        break;
      case this.PAYMENT_RECEIVED:
        this.transaction.type = Type.PAYMENT;
        this.transaction.action = Action.RECIBÍ;
        break;
      case this.PAYMENT_SENDED:
        this.transaction.type = Type.PAYMENT;
        this.transaction.action = Action.REALICÉ;
        break;
      case this.TRANSFERENCE:
        this.transaction.type = Type.TRANSFERENCE;
        this.transaction.action = Action.NOT_APPLICABLE;
        break;
      case this.EXPENSE:
        this.transaction.type = Type.EXPENSE;
        this.transaction.action = Action.REALICÉ;
        break;
      case this.INCOME:
        this.transaction.type = Type.INCOME;
        this.transaction.action = Action.RECIBÍ;
        break;
      default:
        break;
    }
  }

  private showFormularyBlocksByTxTypeSelected(typeSelected: any) {
    switch (typeSelected.name) {
      case this.LOAN_RECEIVED:
        this.flagShowBlockMember = true;
        this.flagShowBlockLoanAssociated = false;
        this.flagShowBlockTransference = false;
        break;
      case this.LOAN_SENDED:
        this.flagShowBlockMember = true;
        this.flagShowBlockLoanAssociated = false;
        this.flagShowBlockTransference = false;
        break;
      case this.PAYMENT_RECEIVED:
        this.flagShowBlockLoanAssociated = true;
        this.flagShowBlockTransference = false;
        this.flagShowBlockMember = false;
        break;
      case this.PAYMENT_SENDED:
        this.flagShowBlockLoanAssociated = true;
        this.flagShowBlockTransference = false;
        this.flagShowBlockMember = false;
        break;
      case this.TRANSFERENCE:
        this.flagShowBlockTransference = true;
        this.flagShowBlockLoanAssociated = false;
        this.flagShowBlockMember = false;
        break;
      default:
        break;
    }
  }

  private resetFlagsToShowBlock() {
    this.flagShowBlockMember = false;
    this.flagShowBlockLoanAssociated = false;
    this.flagShowBlockTransference = false;
  }

  private resetFlagToShowPopUps() {
    this.flagShowTypeComponent = false;
    this.flagShowMemberComponent = false;
    this.flagShowPaymentMethodComponent = false;
    this.flagShowPaymentMethodDestinyComponent = false;
    this.flagShowCategoryComponent = false;
    this.flagShowSegmentComponent = false;
    this.flagShowLoanAssocComponent = false;
  }


  getByIdAndUserId(transactionId: number) {
    this._transactionService.getByIdAndUserId(transactionId, this.userId).subscribe({
      next: (response) => {
        this.transaction = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  register() {
    this._transactionService.createByUserId(this.transaction, this.userId).subscribe({
      next: (response: TransactionModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }

  update() {
    this._transactionService.updateByIdAndUserId(this.transaction.id, this.transaction, this.userId).subscribe({
      next: (response: TransactionModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }


  /*::: action recieved from pop ups :::*/
  receivedOrderClosePopUp() {
    this.subirDiv();
    setTimeout(() => {
      this.resetFlagToShowPopUps();
    }, 300);
  }

  receivedItemSelected(itemSelected: any) {
    switch (itemSelected.type) {
      case "category":
        this.transaction.category = itemSelected.object;
        break;
      case "segment":
        this.transaction.segment = itemSelected.object;
        break; 
      case "pmo":
        this.transaction.paymentMethod = itemSelected.object;
        break;
      case "pmd":
        this.transaction.paymentMethodDestiny = itemSelected.object;
        break;
      case "loanAssoc":
        this.transaction.idLoanAssoc = itemSelected.object;
        break;     
      default:
        break;
    }

    this.receivedOrderClosePopUp();
  }


}
