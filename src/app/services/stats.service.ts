import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})

export class StatsService {

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
