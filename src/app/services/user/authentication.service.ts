import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { UserRegister } from '../../models/user/register.model';
import { UserLogin } from '../../models/user/login.model';

import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host: string = enviroment.urlHost;
  private hostApi: string = enviroment.urlApi;
  private token: string | null = "" ;
  private httClient = inject(HttpClient); //Angular 16


  private tokenDecode: any;

  //constructor(private _httClient: HttpClient) { }

  registerForm(formValue: any) {
    return firstValueFrom(
      this.httClient.post<any>(this.host + '/auth/register', formValue)
      );
  }


  public login(userLogin: UserLogin) :Observable<any>{
    return this.httClient.post<any>
      (this.host + '/auth/login', userLogin);
  }

  public register(userReg: UserRegister):Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.httClient.post<HttpResponse<any> | HttpErrorResponse>
      (this.host + '/auth/register', userReg, {observe: 'response'});
  }

  public logOut(): void {
    this.token = null;
    console.log("sdasdasd asda");
    localStorage.removeItem("token");
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem("token", this.token);
  }

  public saveUserDataFromToken(token: string) {
    this.token = token;
    this.loadToken();
    this.tokenDecode = this.getDecodedAccessToken(this.getToken());
  }

  public loadToken(): void {
    this.token = localStorage.getItem("token");
  }

  public getToken(): string {
    return this.token!;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  getIdFromToken():any {
    this.loadToken();
    this.tokenDecode = this.getDecodedAccessToken(this.getToken());
    if(this.tokenDecode != null) {
      return this.tokenDecode.id;
    }
  }

  getParamasFromToken():any {
    this.loadToken();
    this.tokenDecode = this.getDecodedAccessToken(this.getToken());
    if(this.tokenDecode != null) {
      return this.tokenDecode;
    }
  }

  public getUserId(): number {
    return this.getParamasFromToken().userId;
  }

  public getUserNanme(): string {
    return this.getParamasFromToken().name;
  }

  public getEmail(): string {
    return this.getParamasFromToken().email;
  }
}
