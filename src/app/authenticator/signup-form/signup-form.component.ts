import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../authenticator.component";
import {UsersService} from "../../services/users.service";

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
    private userService: UsersService,
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
    this.userService.signupUser(this.signupForm.value).subscribe((response)=>{
        console.log(response);

    })
  }
}
