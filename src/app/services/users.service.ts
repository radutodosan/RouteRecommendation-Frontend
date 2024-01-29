import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const URL = ["http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private loggedIn = false;
  // @ts-ignore
  private _loggedUser: any = JSON.parse(localStorage.getItem("loggedUser"));
  constructor(
    private http:HttpClient
  ) {}

  isLoggedIn() {
    this.loggedIn = localStorage.getItem("loggedUser") != null;
    return this.loggedIn;
  }

  get loggedUser(): any {
    return this._loggedUser;
  }

  set loggedUser(value: any) {
    this._loggedUser = value;
  }


  logoutUser(): void {
    this.loggedIn = false;
    localStorage.removeItem("loggedUser");
    // this.notificationService.showDefaultNotification("Logged out successfully")
  }

  signupUser(user: any):Observable<any>{
    return this.http.post(URL + "/signup", user);
  }
  loginUser(user:any):Observable<any>{
    return this.http.post(URL + "/login", user);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(URL + "/profile/" + id);
  }

  updateUser(id:number, user: any):Observable<any>{
    return this.http.put(URL + "/profile/" + id, user);
  }
}
