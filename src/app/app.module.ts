import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/user/authentication.service';
import { AuthInterceptor } from './auth/interceptor/interceptor-auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarioComponent } from './utils/calendario/calendario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './utils/search/search.component';
import { MessageBoxComponent } from './utils/message-box/message-box/message-box.component';
import { MessageBoxService } from './services/message-box/message-box.service';
import { Calendar2Component } from './utils/calendar2/calendar2.component';
import { TransactionsListComponent } from './components/transactions/transactions-list/transactions-list.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AsideComponent } from './layout/aside/aside.component';
import { HeaderComponent } from './layout/header/header.component';
import { DataResumeComponent } from './layout/data-resume/data-resume.component';
import { SearchTransactionsComponent } from './layout/search-transactions/search-transactions.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { RouterModule } from '@angular/router';
import { SubCategoryFormComponent } from './pages/shared/subcategory-form/subcategory-form.component';
import { AccountFormComponent } from './pages/shared/account-form/account-form.component';
import { TransactionFormComponent } from './components/transactions/transaction-form/transaction-form.component';
import { TransactionCategoriesComponent } from './components/transactions/transaction-categories/transaction-categories.component';
import { TransactionAccountsComponent } from './components/transactions/transaction-accounts/transaction-accounts.component';
import { TransactionOperationsTypesComponent } from './components/transactions/transaction-operations-types/transaction-operations-types.component';
import { TransactionTagsComponent } from './components/transactions/transaction-tags/transaction-tags.component';
import { TransactionRecurrencyComponent } from './components/transactions/transaction-recurrency/transaction-recurrency.component';
import { TransactionCounterpartComponent } from './components/transactions/transaction-counterpart/transaction-counterpart.component';
import { UserLoginComponent } from './pages/user/login/user-login.component';
import { UserRegisterComponent } from './pages/user/register/user-register.component';
import { PaymentMethodFormComponent } from './pages/shared/payment-method-form/payment-method-form.component';
import { WorkspacesComponent } from './pages/workspaces/workspaces.component';
import { WorkspaceFormComponent } from './components/workspace-form/workspace-form.component';
import { SubCategoriesComponent } from './pages/subCategories/subCategories.component';
import { GroupCategoryFormComponent } from './pages/shared/groupCategory-form/group-category-form.component';
import { ErrorInterceptor } from './auth/interceptor/interceptor-401.error.interceptor';
import { TransactionPaymentMethodComponent } from './components/transactions/transaction-payment-method/transaction-payment-method.component';
import { TransactionLoanAssocComponent } from './components/transactions/transaction-loan-assoc/transaction-loan-assoc.component';
import { CardTypeFormComponent } from './pages/shared/card-type-form/card-type-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserLoginComponent,
    AccountFormComponent,
    TransactionFormComponent,
    SubCategoryFormComponent,
    PaymentMethodFormComponent,
    CalendarioComponent,
    SearchComponent,
    MessageBoxComponent,
    Calendar2Component,
    TransactionsListComponent,
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    DataResumeComponent,
    SearchTransactionsComponent,
    SubCategoriesComponent,
    AccountsComponent,
    TransactionsComponent,
    TransactionCategoriesComponent,
    TransactionAccountsComponent,
    TransactionOperationsTypesComponent,
    TransactionTagsComponent,
    TransactionRecurrencyComponent,
    TransactionCounterpartComponent,
    UserRegisterComponent,
    WorkspacesComponent,
    WorkspaceFormComponent,
    GroupCategoryFormComponent,
    TransactionPaymentMethodComponent,
    TransactionLoanAssocComponent,
    CardTypeFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, MessageBoxService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
