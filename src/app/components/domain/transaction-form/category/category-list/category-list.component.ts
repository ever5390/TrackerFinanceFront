import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CategoryModel } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent  implements OnInit {
  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = '';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<{object:any, type: string}>();

  userId: number = 0;
  categories: CategoryModel[] = [];
  category: CategoryModel = new CategoryModel();

  _oauthService = inject(AuthenticationService);
  _categoryService = inject(CategoryService);

  listaCategoriesSendSearch: CategoryModel[] = [];


  
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
    this.categories = data.data;
    this.textFiltered = data.text;
  }


  @ViewChild('contenedorDiv') contenedorDiv!: ElementRef;
  posicionTop: number = -700; // Inicialmente fuera de la pantalla
  divHeight: number = 0; // Altura del div cuando está visible
  showTextHeader: string = "";

  showFormularyRegister(item: any) {
     if(this.category.id == 0) this.showTextHeader = "Formulario de registro";
     else this.showTextHeader = "Formulario edición";
    console.log(this.textFiltered);
    this.posicionTop = 0; // Mueve el div hacia abajo
    this.category.name = this.textFiltered;
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
    this.sendItemSelected.emit({object: itemSelected, type:"category"});
  }











  getAllByUserId() {
    this._categoryService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.flagDataLoaded = true;
        this.flagIsDataFiltered = false;
        this.listaCategoriesSendSearch = response;
        this.categories = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  getByIdAndUserId(categoryId: number) {
    this._categoryService.getByIdAndUserId(categoryId, this.userId).subscribe({
      next: (response) => {
        this.category = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  deleteByIdAndUserId(categoryId: number) {
    this._categoryService.deleteByIdAndUserId(categoryId, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
  
}
