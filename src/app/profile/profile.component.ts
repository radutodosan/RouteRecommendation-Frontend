import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {slideInUpOnEnterAnimation} from "angular-animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertTypes} from "../enums/alert-types";
import {AlertService} from "../services/alert.service";
import {User} from "../entities/user";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {DelLogoutConfirmationComponent} from "./del-logout-confirmation/del-logout-confirmation.component";


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

  modalRef: MdbModalRef<DelLogoutConfirmationComponent> | null = null;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private modalService: MdbModalService,
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.usersService.loggedUser;
    console.log(this.loggedUser);

    this.editForm = this.formBuilder.group({
      full_name: [this.loggedUser.full_name, Validators.required],
      password: ['', Validators.required],
      email: [this.loggedUser.email, Validators.required],
      confirmPassword: ['', Validators.required],
      saved_address: [this.loggedUser.saved_address],
    });
  }

  showAlert(type:AlertTypes, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  updateUser(){
    if(this.editForm.value["password"] === this.editForm.value["confirmPassword"]) {
      this.usersService.updateUser(this.loggedUser.id, this.editForm.value).subscribe(response => {
        console.log(response);
        this.usersService.loggedUser = response;
        localStorage.setItem("loggedUser", JSON.stringify(this.usersService.loggedUser));
        this.showAlert(AlertTypes.SUCCESS, "Updated successfully!");
      }, err => {
        this.showAlert(AlertTypes.ERROR, "Update failed!");
        throw err;
      })
    }
    else{
      this.showAlert(AlertTypes.ERROR, "Passwords don't match!");
      console.log("Passwords don't match!");
    }
  }

  openDeleteConfirmation() {
    this.modalRef = this.modalService.open(DelLogoutConfirmationComponent);
    this.modalRef.component.action = "DELETE";
  }

  openLogoutConfirmation() {
    this.modalRef = this.modalService.open(DelLogoutConfirmationComponent);
    this.modalRef.component.action = "LOGOUT";
  }
}
