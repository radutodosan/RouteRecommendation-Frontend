import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = ["http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private http:HttpClient,
  ) { }

  getAllUsers():Observable<any>{
      return this.http.get(URL + "/ranking")
  }

  getFriendsRanking(username:string):Observable<any>{
    const GET_FRIENDS_RANKING_URL = `${URL}/ranking/${username}`

    return this.http.get(GET_FRIENDS_RANKING_URL);
  }
}
