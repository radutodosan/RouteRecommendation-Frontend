import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})

export class StatsService {
  get nrOfRoutes(): any {
    return this._nrOfRoutes;
  }

  set nrOfRoutes(value: any) {
    this._nrOfRoutes = value;
  }

  get kmCompleted(): any {
    return this._kmCompleted;
  }

  set kmCompleted(value: any) {
    this._kmCompleted = value;
  }

  get emissionsSaved(): any {
    return this._emissionsSaved;
  }

  set emissionsSaved(value: any) {
    this._emissionsSaved = value;
  }

  get calBurned(): any {
    return this._calBurned;
  }

  set calBurned(value: any) {
    this._calBurned = value;
  }

  get moneySaved(): any {
    return this._moneySaved;
  }

  set moneySaved(value: any) {
    this._moneySaved = value;
  }

  get transportPercentage(): any {
    return this._transportPercentage;
  }

  set transportPercentage(value: any) {
    this._transportPercentage = value;
  }


  //@ts-ignore
  private _nrOfRoutes: any = JSON.parse(localStorage.getItem("nrOfRoutes"));
  //@ts-ignore
  private _kmCompleted: any = JSON.parse(localStorage.getItem("kmCompleted"));
  //@ts-ignore
  private _emissionsSaved: any = JSON.parse(localStorage.getItem("emissionsSaved"));
  //@ts-ignore
  private _calBurned: any = JSON.parse(localStorage.getItem("calBurned"));
  //@ts-ignore
  private _moneySaved: any = JSON.parse(localStorage.getItem("moneySaved"));
  //@ts-ignore
  private _transportPercentage: any = JSON.parse(localStorage.getItem("transportPercentage"));

  constructor(
    private http:HttpClient,
  ) {}

  getNrOfRoutesPerMonth(user_id:number):Observable<any>{
    const GET_ROUTES_PER_MONTH = `${URL}/statistics/routes-month/${user_id}`;

    return this.http.get(GET_ROUTES_PER_MONTH);
  }

  getKmCompletedPerMonth(user_id:number):Observable<any>{
    const GET_KM_PER_MONTH = `${URL}/statistics/km-month/${user_id}`;

    return this.http.get(GET_KM_PER_MONTH);
  }

  getEmissionsSavedPerMonth(user_id:number):Observable<any>{
    const GET_EMISSIONS_SAVED_PER_MONTH = `${URL}/statistics/emissions-saved-month/${user_id}`;

    return this.http.get(GET_EMISSIONS_SAVED_PER_MONTH);
  }

  getCalBurnedPerMonth(user_id:number):Observable<any>{
    const GET_CAL_BURNED_PER_MONTH = `${URL}/statistics/cal-burned-month/${user_id}`;

    return this.http.get(GET_CAL_BURNED_PER_MONTH);
  }

  getMoneySavedPerMonth(user_id:number):Observable<any>{
    const GET_MONEY_SAVED_PER_MONTH = `${URL}/statistics/money-saved-month/${user_id}`;

    return this.http.get(GET_MONEY_SAVED_PER_MONTH);
  }

  getTransportPercentage(user_id:number):Observable<any>{
    const GET_TRANSPORT_PERCENTAGE = `${URL}/statistics/transport-percentage/${user_id}`;

    return this.http.get(GET_TRANSPORT_PERCENTAGE);
  }
}
