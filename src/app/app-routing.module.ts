import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './utils/calendario/calendario.component';
import { MessageBoxComponent } from './utils/message-box/message-box/message-box.component';
import { Calendar2Component } from './utils/calendar2/calendar2.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { SubCategoriesComponent } from './pages/subCategories/subCategories.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { UserLoginComponent } from './pages/user/login/user-login.component';
import { UserRegisterComponent } from './pages/user/register/user-register.component';
import { WorkspacesComponent } from './pages/workspaces/workspaces.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,    
    children: [
      {
        path:'',
        component:TransactionsComponent
      },
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
        component:SubCategoriesComponent
      }
    ]
  },
  {
    path:'home',
    component:WorkspacesComponent
  },
  {
    path:'login',
    component:UserLoginComponent
  },
  {
    path:'register',
    component:UserRegisterComponent
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
    path:'messagebox',
    component:MessageBoxComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
