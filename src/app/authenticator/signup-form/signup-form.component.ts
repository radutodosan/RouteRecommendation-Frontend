import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../authenticator.component";
import {UsersService} from "../../services/users.service";
import {catchError} from "rxjs";
import {AlertTypes} from "../../enums/alert-types";
import {AlertService} from "../../services/alert.service";

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
    private alertService: AlertService,
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
      this.usersService.signupUser(this.signupForm.value).subscribe((response)=>{
        console.log(response);
        this.showAlert(AlertTypes.SUCCESS, "You signed up successfully!");
      })
      catchError((error)=> {
          this.showAlert(AlertTypes.ERROR, "Sign up failed! " + error.error.message);
          throw error;
      })
    }
    else{
      console.log("ERROR");
    }
  }

  showAlert(type:AlertTypes, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }
}
