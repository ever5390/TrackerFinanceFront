import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/domain/user/register/user-register.component';
import { UserLoginComponent } from './components/domain/user/login/user-login.component';
import { MovementListComponent } from './components/domain/movements/movement-list/movement-list.component';
import { DarshboardPageComponent } from './pages/darshboard/darshboard.component';
import { CalendarioComponent } from './utils/calendario/calendario.component';
import { TransactionFormComponent } from './components/domain/transaction-form/transaction-form.component';

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
    path:'transaction-register',
    component:TransactionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
