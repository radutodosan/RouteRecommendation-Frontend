import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class UvtRewardsService {

  constructor(
    private http:HttpClient
  ) { }

  getUVTRewards(username:string):Observable<any>{
    return this.http.get(URL + "/rewards/" + username);
  }

  addRewards():Observable<any>{
    const ADD_REWARDS_URL = `${URL}/add-rewards`

    return this.http.get(ADD_REWARDS_URL);
  }
}
