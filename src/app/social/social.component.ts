import {Component, OnInit} from '@angular/core';
import {slideInUpOnEnterAnimation} from "angular-animations";
import {UsersService} from "../services/users.service";
import {RankingService} from "../services/ranking.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "../services/alert.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:500}),
  ],
})
export class SocialComponent implements OnInit{


  // @ts-ignore
  friendsList$ : Observable<any>;

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
    this.friendsList$ = this.rankingService.getAllUsers();
  }

  searchUsers(){
    if(this.searchForm.value["searchField"] != "")
      this.friendsList$ = this.usersService.searchUsers(this.searchForm.value["searchField"]);
    else
      this.friendsList$ = this.rankingService.getAllUsers();
  }
}
