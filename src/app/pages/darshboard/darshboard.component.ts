import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { MovementDto } from 'src/app/dto/movementDto/movement-dto.model';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';
import { Item } from 'src/app/interfaces/ItemFiltered.interface';
import { Filter } from 'src/app/models/filter/filter.model';
import { TransactionFilters } from 'src/app/models/transaction-filters/transaction-filters.model';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { Utils } from 'src/app/utils/utils.component';

@Component({
  selector: 'app-darshboard',
  templateUrl: './darshboard.component.html',
  styleUrls: ['./darshboard.component.css']
})
export class DarshboardPageComponent implements OnInit  {

  @ViewChild('contenedorDiv') contenedorDiv!: ElementRef;
  @ViewChild('IDFormularyTransaction') IDFormularyTransaction: ElementRef | any;

  posicionTop: number = -700; // Inicialmente fuera de la pantalla
  divHeight: number = 0; // Altura del div cuando está visible

  transaction: TransactionModel = new TransactionModel();

  orderResetSend: string ='default';
  filters: TransactionFilters = new TransactionFilters();
  nameTimeFilter: string = '';
  userId: number = 0;
  movementResume: ResumenMovementDto = new ResumenMovementDto();

  //Injects
  transactionService = inject(TransactionService);
  oauthService = inject(AuthenticationService);

  //Calendar send && received
  
  requestGetInitOrFinalDate: string = '';
  flagShowCalendar: boolean = false;
  initialDateCalendarSendPrintFilter: string = Utils.formatDateToInitialDate(new Date(),new Date().getDate() - 1,0, false);
  finalDateCalendarToSendPrintFilter: string = Utils.formatDateToActualDate(new Date(), false);
  initialDateCalendarReceived: Date = new Date();
  finalDateCalendarReceived: Date = new Date();

  constructor(private _renderer: Renderer2 ) {
    this.userId = this.oauthService.getIdFromToken();
  }

  ngOnInit(): void {
    this.listenClickOut();
    this.getAllMovementsByUserId();
  }

  listenClickOut() {
    this._renderer.listen('window','click', (e: Event)=> {
      if( this.IDFormularyTransaction && e.target === this.IDFormularyTransaction.nativeElement){
        this.receivedOrderClosePopUp();
      }
    });
  }

  receivedOrderClosePopUp() {
    this.subirDiv();
    this.getAllMovementsByUserId();
  }

  subirDiv() {
    this.posicionTop = -700; // Mueve el div de vuelta arriba
    setTimeout(() => {
      this.divHeight = 0; // Establece la altura del div a cero después de un pequeño retraso
      this.flagShowTransactionRegister = false;
    }, 100); // Ajusta el tiempo según sea necesario para permitir que la transición ocurra completamente
  }

  bajarDiv() {
    this.posicionTop = 0; // Mueve el div hacia abajo
    this.divHeight = this.contenedorDiv.nativeElement.clientHeight;
  }

  getAllMovementsByUserId() {
    this.transactionService.readAllResumeByUserIdAndFilters(this.userId, this.filters).subscribe({
      next: (data: ResumenMovementDto) => {
        this.movementResume = data;
        this.filter = [];
        this.filterData();
      },
      error: (error: any) => {
        console.error(error.error.message);
      } 
   });
  }

  //received select name account
  handleChildAccountListToParentDataReceived(accountNameReceived: string) {
    this.orderResetSend = 'default';
    this.filters.account = accountNameReceived;
    this.getAllMovementsByUserId();
  }

  //received select name account
  handleChildFiltersToParentDataReceived(dates: any) {
    this.orderResetSend = 'default';
    this.filters.startDate = dates.initialDate;
    this.filters.endDate = dates.finalDate;
    this.nameTimeFilter = dates.text;

    this.flagShowFilters = false;
    this.getAllMovementsByUserId();
  }

  handleChildBalanceResumeToParentDataReceived(event: any) {
    //RESET
    this.filters = new TransactionFilters();
    this.nameTimeFilter = '';
    this.orderResetSend = '';
    this.initialDateCalendarSendPrintFilter = Utils.formatDateToInitialDate(new Date(),new Date().getDate() - 1,0, false);
    this.finalDateCalendarToSendPrintFilter = Utils.formatDateToActualDate(new Date(), false);
    this.getAllMovementsByUserId();
  }

  receiveOrderToShowCalendar(rangeInitOrFinal: string) {
      this.requestGetInitOrFinalDate = rangeInitOrFinal;
      this.flagShowCalendar = true;
  }

  receivedDateSelectedFromCalendar(event: any) {
    if(event.order == "initial") {
      this.initialDateCalendarReceived = event.dateSelected;
      this.initialDateCalendarSendPrintFilter = Utils.formatDateToInitialDate(event.dateSelected, 0, 0, false);
    }

    if(event.order == "final") {
      this.finalDateCalendarReceived = event.dateSelected;
      this.finalDateCalendarToSendPrintFilter = Utils.formatDateToActualDate(event.dateSelected, false);

      this.nameTimeFilter =  this.initialDateCalendarSendPrintFilter + " - " + this.finalDateCalendarToSendPrintFilter;
      this.filters.startDate = Utils.formatDateToInitialDate(this.initialDateCalendarReceived, 0, 0, true);
      this.filters.endDate =  Utils.formatDateToActualDate(this.finalDateCalendarReceived, true);
      this.getAllMovementsByUserId();
    }

    this.flagShowCalendar = false;
    
  }

  //receive order to show transaction register
  flagShowTransactionRegister: boolean = false;
  receiveOrderShowTransactionRegister() {
    this.flagShowTransactionRegister = true;
    this.transaction = new TransactionModel();
    this.bajarDiv();
  }


  filter : Filter[] = [];
  flagShowFilters: boolean = false;
  filterData() {
    this.flagShowFilters = true;

    // Realizar el filtro y conteo
    this.obtenerConteoPorParametro('category');
    this.obtenerConteoPorParametro('segment');
    this.obtenerConteoPorParametro('paymentMethod');
    this.obtenerConteoPorParametro('type');
    this.obtenerConteoPorParametro('action');

    console.log(this.filter);
  }

  obtenerConteoPorParametro(parametro: string) {
    const filterItem = new Filter();
    const conteo: Item[] = [];
    this.movementResume.movememts.forEach((entidad: MovementDto) => {
        let valor: string | null = null;
        switch (parametro) {
          case 'category':
            valor =  entidad.category;
            break;
          case 'segment':
            valor =  entidad.segment;
            break;     
          case 'paymentMethod':
            valor =  entidad.paymentMethod;
            break;
          case 'type':
            valor =  entidad.type;
            break;
          case 'action':
            valor =  entidad.action;
            break;  
          default:
            break;
        }

        if (valor != null && valor != "") {
          const itemIndex = conteo.findIndex(item => item.name === valor);
          if (itemIndex !== -1) {
            conteo[itemIndex].total++;
          } else {
            conteo.push({ name: valor, itemSelected: "", total: 1 });
          }
        }
    });

    if(conteo.length > 0) {
      filterItem.item = parametro;
      filterItem.itemList = conteo;
      this.filter.push(filterItem);
    }

  }

  sendItemFilteredToMovement: Item[] = [];
  itemFilteredSelected: Item = {name:"", itemSelected:"", total:0};

  receivedItemSelectedByFiltered(paramItemFilterSelected: any) {
    this.setterFilterToBlockFiltersShow(paramItemFilterSelected);
    this.setterFilteredToMovements(paramItemFilterSelected);
    this.getAllMovementsByUserId();
    //this.updateCountFiltersBlock();
  }

  updateCountFiltersBlock() {
    this.filter.forEach(elFilter => {
      this.sendItemFilteredToMovement.forEach(elFilterBlock => {
        if(elFilter.item == elFilterBlock.name){
          elFilter.itemList.forEach(itemFilter => {
            elFilterBlock.total = itemFilter.total;
          })
        }
      });
    });
  }

  private setterFilteredToMovements(paramItemFilterSelected: any) {
    switch (paramItemFilterSelected.name) {
      case 'category':
        this.filters.category = paramItemFilterSelected.itemSelected;
        break;
      case 'segment':
        this.filters.segment = paramItemFilterSelected.itemSelected;
        break;
      case 'paymentMethod':
        this.filters.paymentMethod = paramItemFilterSelected.itemSelected;
        break;
      case 'type':
        this.filters.type = paramItemFilterSelected.itemSelected;
        break;
      case 'action':
        this.filters.action = paramItemFilterSelected.itemSelected;
        break;
      default:
        break;
    }
  }

  private removeFilteredToMovements(paramItemFilterSelected: any) {
    switch (paramItemFilterSelected.name) {
      case 'category':
        this.filters.category = "";
        break;
      case 'segment':
        this.filters.segment = "";
        break;
      case 'paymentMethod':
        this.filters.paymentMethod = "";
        break;
      case 'type':
        this.filters.type = "";
        break;
      case 'action':
        this.filters.action = "";
        break;
      default:
        break;
    }
  }

  private setterFilterToBlockFiltersShow(paramItemFilterSelected: any) {
    let itemFilteredSelected: Item = { name: "", itemSelected: "", total: 0 };
    itemFilteredSelected.name = paramItemFilterSelected.name;
    itemFilteredSelected.itemSelected = paramItemFilterSelected.itemSelected;
    itemFilteredSelected.total = paramItemFilterSelected.total;

    let exist = false;
    this.sendItemFilteredToMovement.forEach(el => {
      if (el.name == itemFilteredSelected.name) {
        el.itemSelected = itemFilteredSelected.itemSelected;
        el.total = itemFilteredSelected.total;
        exist = true;
      }
    });

    if (!exist) this.sendItemFilteredToMovement.push(itemFilteredSelected);
  }

  receiveItemRemoveToFilterFromMovement(itemFilterRemove: any) {
    console.log("remove");
    this.sendItemFilteredToMovement = this.sendItemFilteredToMovement.filter(el => el.name != itemFilterRemove.name);
    this.removeFilteredToMovements(itemFilterRemove);
    this.getAllMovementsByUserId();
  }
  
  // obtenerConteoPorParametro(parametro: string) {
  //   const filterItem = new Filter();
  //   const conteo = new Map<any, number>();

  //   this.movementResume.movememts.forEach((entidad: MovementDto) => {
  //       let valor = null;
  //       switch (parametro) {
  //         case 'category':
  //           valor =  entidad.category;
  //           break;
  //         case 'segment':
  //           valor =  entidad.segment;
  //           break;     
  //         case 'paymentMethod':
  //           valor =  entidad.paymentMethod;
  //           break;
  //         case 'type':
  //           valor =  entidad.type;
  //           break;
  //         case 'action':
  //           valor =  entidad.action;
  //           break;  
  //         default:
  //           break;
  //       }

  //       if(valor != null && valor != "") conteo.set(valor, (conteo.get(valor) || 0) + 1);

  //   });

  //   if(conteo.size > 0) {
  //     filterItem.item = parametro;
  //     filterItem.itemList = conteo;
  //   }

  //   this.filter.push(filterItem);
  // }
}

