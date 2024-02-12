import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { MemberModel } from 'src/app/models/member/member.model';
import { MemberService } from 'src/app/services/member/member.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent  implements OnInit {

  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = '';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<{object:any, type: string}>();

  userId: number = 0;
  members: MemberModel[] = [];
  member: MemberModel = new MemberModel();

  _oauthService = inject(AuthenticationService);
  _memberService = inject(MemberService);

  // :::: BEGIN ::: formulary register interaction

  listMembersSendSearch: MemberModel[] = [];


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
    this.members = data.data;
    this.textFiltered = data.text;
  }

  showFormularyRegister(item: any) {
    if(this.member.id == 0) this.showTextHeader = "Formulario de registro";
    else this.showTextHeader = "Formulario edición";
    console.log(this.textFiltered);
    this.posicionTop = 0; // Mueve el div hacia abajo
    this.member.name = this.textFiltered;
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

  backForm() {
    this.posicionTop = -500; // Mueve el div de vuelta arriba
    setTimeout(() => {
      this.divHeight = 0; // Establece la altura del div a cero después de un pequeño retraso
    }, 100); // Ajusta el tiempo según sea necesario para permitir que la transición ocurra completamente

  }

  catchItemSelected(itemSelected: any) {
    this.sendItemSelected.emit({object: itemSelected, type:"member"});
  }

// ::: END formulary register interaction 


  getAllByUserId() {
    this._memberService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.members = response;
        this.flagDataLoaded = true;
        this.flagIsDataFiltered = false;
        this.listMembersSendSearch = response;
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
