import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(
    private http:HttpClient
  ) {}

  getFriendsList(username:string):Observable<any>{
    return this.http.get(URL + "/social/" + username);
  }

  getNonFriendsList(username:string):Observable<any>{
    return this.http.get(URL + "/social/add-friends/" + username);
  }

  getPendingFriendRequests(username:string):Observable<any>{
    console.log(username);
    return this.http.get(URL + "/notifications/friends/" + username);
  }

  sendFriendRequest(username01:string, username02:string):Observable<any>{
    const SEND_FRIEND_REQUEST_URL = `${URL}/social/add-friends?username01=${username01}&username02=${username02}`
    const body = {username01: username01, username02:username02};

    return this.http.post(SEND_FRIEND_REQUEST_URL, body);
  }

  acceptFriendRequest(username01:string, username02:string):Observable<any>{
    const SEND_FRIEND_REQUEST_URL = `${URL}/notifications/friends?username01=${username01}&username02=${username02}`
    const body = {username01: username01, username02:username02};

    console.log(body);

    return this.http.put(SEND_FRIEND_REQUEST_URL, body);
  }
}
