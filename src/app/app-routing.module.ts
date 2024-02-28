import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/domain/user/login/user-login.component';
import { MovementListComponent } from './components/domain/movements/movement-list/movement-list.component';
import { DarshboardPageComponent } from './pages/darshboard/darshboard.component';
import { CalendarioComponent } from './utils/calendario/calendario.component';
import { TransactionFormComponent } from './components/domain/transaction-form/transaction-form.component';
import { MessageBoxComponent } from './utils/message-box/message-box/message-box.component';
import { Calendar2Component } from './utils/calendar2/calendar2.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,    
    children: [
      {
        path:'transactions',
        component:TransactionsComponent
      },
      {
        path:'accounts',
        component:AccountsComponent
      },
      {
        path:'categories',
        component:CategoriesComponent
      }
    ]
  },
  {
    path:'login',
    component:UserLoginComponent
  },
  {
    path:'movements',
    component:MovementListComponent
  },
  {
    path:'dashboard',
    component:DarshboardPageComponent
  },
  {
    path:'calendar',
    component:CalendarioComponent
  },  
  {
    path:'calendar2',
    component:Calendar2Component
  },
  {
    path:'transaction-register',
    component:TransactionFormComponent
  },
  // {
  //   path:'accounts',
  //   component:AccountListComponent
  // },
  {
    path:'messagebox',
    component:MessageBoxComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
