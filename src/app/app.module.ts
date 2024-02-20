import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/user/authentication.service';
import { AuthInterceptor } from './auth/interceptor/interceptor-auth.interceptor';
import { UserRegisterComponent } from './components/domain/user/register/user-register.component';
import { UserLoginComponent } from './components/domain/user/login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountFormComponent } from './components/domain/transaction-form/accounts/account-form/account-form.component';
import { AccountListComponent } from './components/domain/transaction-form/accounts/account-list/account-list.component';
import { TransactionFormComponent } from './components/domain/transaction-form/transaction-form.component';
import { MovementListComponent } from './components/domain/movements/movement-list/movement-list.component';
import { CategoryListComponent } from './components/domain/transaction-form/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/domain/transaction-form/category/category-form/category-form.component';
import { SegmentListComponent } from './components/domain/transaction-form/segment/segment-list/segment-list.component';
import { SegmentFormComponent } from './components/domain/transaction-form/segment/segment-form/segment-form.component';
import { PaymentMethodFormComponent } from './components/domain/transaction-form/payment-method/payment-method-form/payment-method-form.component';
import { PaymentMethodListComponent } from './components/domain/transaction-form/payment-method/payment-method-list/payment-method-list.component';
import { MemberListComponent } from './components/domain/transaction-form/member/member-list/member-list.component';
import { MemberFormComponent } from './components/domain/transaction-form/member/member-form/member-form.component';
import { DarshboardPageComponent } from './pages/darshboard/darshboard.component';
import { DarshboardHeaderComponent } from './components/generic/dashboard/darshboard-header/darshboard-header.component';
import { DarshboardBalanceResumeComponent } from './components/generic/dashboard/darshboard-balance-resume/darshboard-balance-resume.component';
import { DarshboardAccountsComponent } from './components/generic/dashboard/darshboard-accounts/darshboard-accounts.component';
import { DarshboardFiltersComponent } from './components/generic/dashboard/darshboard-filters/darshboard-filters.component';
import { DarshboardMovementsComponent } from './components/generic/dashboard/darshboard-movements/darshboard-movements.component';
import { CalendarioComponent } from './utils/calendario/calendario.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypesTransactionsComponent } from './components/domain/transaction-form/types-transactions/types-transactions.component';
import { SearchComponent } from './utils/search/search.component';
import { MessageBoxComponent } from './utils/message-box/message-box/message-box.component';
import { MessageBoxService } from './services/message-box/message-box.service';
import { Calendar2Component } from './utils/calendar2/calendar2.component';
import { DashboardSearchingComponent } from './components/generic/dashboard/dashboard-searching/dashboard-searching.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserLoginComponent,
    AccountFormComponent,
    AccountListComponent,
    TransactionFormComponent,
    MovementListComponent,
    CategoryListComponent,
    CategoryFormComponent,
    SegmentListComponent,
    SegmentFormComponent,
    PaymentMethodFormComponent,
    PaymentMethodListComponent,
    MemberListComponent,
    MemberFormComponent,
    DarshboardPageComponent,
    DarshboardHeaderComponent,
    DarshboardBalanceResumeComponent,
    DarshboardAccountsComponent,
    DarshboardFiltersComponent,
    DarshboardMovementsComponent,
    CalendarioComponent,
    TypesTransactionsComponent,
    SearchComponent,
    MessageBoxComponent,
    Calendar2Component,
    DashboardSearchingComponent
    

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule
  ],
  providers: [AuthenticationService, MessageBoxService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
