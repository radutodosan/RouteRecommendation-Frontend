import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../authenticator.component";
import {AlertTypes} from "../../enums/alert-types";
import {AlertService} from "../../services/alert.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    public modalRef: MdbModalRef<AuthenticatorComponent>,
    private alertService: AlertService,

  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  showAlert(type:AlertTypes, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  loginUser(){

    console.log(this.loginForm.value);

    this.usersService.loginUser(this.loginForm.value).subscribe((response)=>{
      if(response != null){
        this.usersService.loggedUser = response;
        localStorage.setItem("loggedUser", JSON.stringify(this.usersService.loggedUser));
        this.showAlert(AlertTypes.SUCCESS, "You logged in successfully!");
      }
      else{
        this.showAlert(AlertTypes.ERROR, "Username or password are incorrect!");
      }
    })
    catchError((error)=> {
      this.showAlert(AlertTypes.ERROR, "Username: " + this.loginForm.value["username"] + " does not exist.");
      throw error;
    })



    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });


  }
}
