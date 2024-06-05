import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {UsersService} from "../../services/users.service";
import {FriendshipService} from "../../services/friendship.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{
  // @ts-ignore
  friendsList$ : Observable<any>;

  searchForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private friendshipService: FriendshipService,
    private http:HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(){
    this.searchForm = this.formBuilder.group({
      searchField: ['', Validators.required],
    });
    this.friendsList$ = this.friendshipService.getFriendsList(this.usersService.loggedUser.username);
  }

  searchUsers(){
    if(this.searchForm.value["searchField"] != "")
      this.friendsList$ = this.friendshipService.searchFriends(this.usersService.loggedUser.username, this.searchForm.value["searchField"]);
    else
      this.friendsList$ = this.friendshipService.getFriendsList(this.usersService.loggedUser.username);
  }

}
