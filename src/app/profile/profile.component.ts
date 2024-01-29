import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {slideInUpOnEnterAnimation} from "angular-animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertTypes} from "../enums/alert-types";
import {AlertService} from "../services/alert.service";
import {User} from "../entities/user";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations:[
    slideInUpOnEnterAnimation({duration:650})
  ],
})
export class ProfileComponent implements OnInit{
  editForm!: FormGroup;

  //@ts-ignore
  loggedUser: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.usersService.loggedUser;
    console.log(this.loggedUser);

    this.editForm = this.formBuilder.group({
      full_name: [this.loggedUser.full_name, Validators.required],
      password: ['', Validators.required],
      email: [this.loggedUser.email, Validators.required],
      confirmPassword: ['', Validators.required],
      address: [this.loggedUser.saved_address],
    });
  }

  showAlert(type:AlertTypes, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  logoutUser(){
    this.usersService.logoutUser();
    this.router.navigate(['/']);
    this.showAlert(AlertTypes.INFO,'Logout Successful!')
  }
  deleteAccount(){
    this.usersService.deleteUser(this.loggedUser.id).subscribe((response) =>{
      console.log(response);
    })

    this.usersService.logoutUser();
    this.router.navigate(['/']);
    this.showAlert(AlertTypes.ERROR,'Account deleted!')
  }

}
