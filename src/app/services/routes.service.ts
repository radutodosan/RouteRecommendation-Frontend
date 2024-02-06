import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = ["http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private http:HttpClient,
  ) {}

  addRoute(route: any):Observable<any>{
    const ADD_ROUTE_URL = `${URL}/map`;

    return this.http.post(ADD_ROUTE_URL, route);
  }

  getPendingRoutes(id: number): Observable<any>{
    const GET_PENDING_ROUTES_URL = `${URL}/notifications/routes?id=${id}`;

    return this.http.get(GET_PENDING_ROUTES_URL);
  }

  completeRoute(route: any):Observable<any>{
    const COMPLETE_ROUTE_URL = `${URL}/notifications/route`;

    return this.http.put(COMPLETE_ROUTE_URL, route);
  }

  declineRoute(id: any):Observable<any>{
    const DECLINE_ROUTE_URL = `${URL}/notifications/route/${id}`;

    return this.http.delete(DECLINE_ROUTE_URL);
  }
}
