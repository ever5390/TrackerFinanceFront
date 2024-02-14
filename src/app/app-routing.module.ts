import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/domain/user/register/user-register.component';
import { UserLoginComponent } from './components/domain/user/login/user-login.component';
import { MovementListComponent } from './components/domain/movements/movement-list/movement-list.component';
import { DarshboardPageComponent } from './pages/darshboard/darshboard.component';
import { CalendarioComponent } from './utils/calendario/calendario.component';
import { TransactionFormComponent } from './components/domain/transaction-form/transaction-form.component';
import { AccountListComponent } from './components/domain/transaction-form/accounts/account-list/account-list.component';
import { MessageBoxComponent } from './utils/message-box/message-box/message-box.component';
import { Calendar2Component } from './utils/calendar2/calendar2.component';

const routes: Routes = [
  {
    path:'',
    component:UserRegisterComponent
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
  {
    path:'accounts',
    component:AccountListComponent
  },
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
