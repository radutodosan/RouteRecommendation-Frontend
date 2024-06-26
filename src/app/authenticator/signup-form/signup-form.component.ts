import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../authenticator.component";
import {UsersService} from "../../services/users.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(
    public modalRef: MdbModalRef<AuthenticatorComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  signupUser(){
    if(this.signupForm.value["password"] === this.signupForm.value["confirmPassword"]) {
      this.usersService.signupUser(this.signupForm.value).subscribe(response=>{

        this.notificationsService.showSuccessNotification(response['username'] + " created!");
      }, err => {
          this.notificationsService.showErrorNotification("Sign up failed!");
          throw err;
      })
    }
    else{
      this.notificationsService.showErrorNotification("Passwords don't match!");
    }
  }

}
