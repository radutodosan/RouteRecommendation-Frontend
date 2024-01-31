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

    return this.http.put(SEND_FRIEND_REQUEST_URL, body);
  }

  deleteFriendship(username01:string, username02:string):Observable<any>{
    const SEND_FRIEND_REQUEST_URL = `${URL}/delete-friendship?username01=${username01}&username02=${username02}`

    return this.http.delete(SEND_FRIEND_REQUEST_URL);
  }

  searchFriends(username:string, search:string):Observable<any>{
    const SEND_FRIEND_REQUEST_URL = `${URL}/social?username=${username}&search=${search}`

    return this.http.get(SEND_FRIEND_REQUEST_URL);
  }

  searchNonFriends(username:string, search:string):Observable<any>{
    const SEND_FRIEND_REQUEST_URL = `${URL}/social/add-friends?username=${username}&search=${search}`

    return this.http.get(SEND_FRIEND_REQUEST_URL);
  }

  getFriendsRanking(username:string):Observable<any>{
    const SEND_FRIEND_REQUEST_URL = `${URL}/ranking/${username}`

    return this.http.get(SEND_FRIEND_REQUEST_URL);
  }
}
