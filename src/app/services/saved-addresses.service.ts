import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SavedAddress} from "../entities/saved-address";


const URL = ["http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class SavedAddressesService {



  //@ts-ignore
  private _savedAddresses: any = JSON.parse(localStorage.getItem("savedAddresses"));
  get savedAddresses(): any {
    return this._savedAddresses;
  }

  set savedAddresses(value: any) {
    this._savedAddresses = value;
  }
  constructor(
    private http:HttpClient,
  ) {}

  getAddresses(id: number):Observable<any>{
    const GET_SAVED_ADDRESSES_URL = `${URL}/profile/addresses?id=${id}`

    return this.http.get(GET_SAVED_ADDRESSES_URL);
  }

  saveAddresses(addresses: SavedAddress):Observable<any>{
    const SAVE_ADDRESSES_URL = `${URL}/profile/addresses`

    return this.http.put(SAVE_ADDRESSES_URL, addresses);
  }
}
