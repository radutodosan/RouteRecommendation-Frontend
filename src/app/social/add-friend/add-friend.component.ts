import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {HttpClient} from "@angular/common/http";
import {slideInUpOnEnterAnimation} from "angular-animations";
import {FriendshipService} from "../../services/friendship.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500}),
  ],
})
export class AddFriendComponent {


  // @ts-ignore
  usersList$ : Observable<any>;

  searchForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private friendshipService: FriendshipService,
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit(){
    this.searchForm = this.formBuilder.group({
      searchField: ['', Validators.required],
    });
    this.usersList$ = this.getUsersList();
  }

  public getUsersList(){
    this.usersList$ = this.friendshipService.getNonFriendsList(this.usersService.loggedUser.username);

    return this.usersList$;
  }

  searchUsers(){
    if(this.searchForm.value["searchField"] != "")
     this.usersList$ = this.friendshipService.searchNonFriends(this.usersService.loggedUser.username, this.searchForm.value["searchField"]);
    else
      this.usersList$ = this.friendshipService.getNonFriendsList(this.usersService.loggedUser.username);
  }
}
