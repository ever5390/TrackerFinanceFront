import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = 'accounts text hedaer default';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<{object:any, type: string}>();

  userId: number = 0;
  accounts: AccountModel[] = [];
  account: AccountModel = new AccountModel();

  _oauthService = inject(AuthenticationService);
  _accountService = inject(AccountService);

 // :::: BEGIN ::: formulary register interaction

 listAccountsSendSearch: AccountModel[] = [];


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

 backForm() {
   this.sendOrderClosePopUp.emit();
 }

 receivedDataFromSearch(data : any) {
   this.flagIsDataFiltered = true;
   this.accounts = data.data;
   this.textFiltered = data.text;
 }

 showFormularyRegister(item: any) {
   if(this.account.id == 0) this.showTextHeader = "Formulario de registro";
   else this.showTextHeader = "Formulario edición";
   console.log(this.textFiltered);
   this.posicionTop = 0; // Mueve el div hacia abajo
   this.account.name = this.textFiltered;
   this.divHeight = this.contenedorDiv.nativeElement.clientHeight; // Establece la altura del div al tamaño del contenedor
   this.flagShowFormulary = true;
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

 catchItemSelected(itemSelected: any) {
   this.sendItemSelected.emit({object: itemSelected, type:"account"});
 }

 receiveOrderClosePopUp() {
  this.subirDiv();
 }

//  receivedItemSelected

// ::: END formulary register interaction 


  getAllByUserId() {
    this._accountService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.accounts = response;
        this.flagDataLoaded = true;
        this.flagIsDataFiltered = false;
        this.listAccountsSendSearch = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  getByIdAndUserId(idAccount: number) {
    this._accountService.getByIdAndUserId(idAccount, this.userId).subscribe({
      next: (response) => {
        this.account = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  deleteByIdAndUserId(idAccount: number) {
    this._accountService.deleteByIdAndUserId(idAccount, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

}
