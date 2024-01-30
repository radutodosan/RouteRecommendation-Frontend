import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {RankingService} from "../../services/ranking.service";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../../services/alert.service";
import {slideInUpOnEnterAnimation} from "angular-animations";

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
    private rankingService: RankingService,
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {}

  ngOnInit(){
    this.searchForm = this.formBuilder.group({
      searchField: ['', Validators.required],
    });
    this.usersList$ = this.rankingService.getAllUsers();
  }

  searchUsers(){
    if(this.searchForm.value["searchField"] != "")
     this.usersList$ = this.usersService.searchUsers(this.searchForm.value["searchField"]);
    else
      this.usersList$ = this.rankingService.getAllUsers();
  }
}
