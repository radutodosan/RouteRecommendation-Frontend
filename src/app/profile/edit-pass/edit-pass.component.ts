import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {AlertService} from "../../services/alert.service";
import {AlertTypes} from "../../enums/alert-types";

@Component({
  selector: 'app-edit-pass',
  templateUrl: './edit-pass.component.html',
  styleUrls: ['./edit-pass.component.css']
})
export class EditPassComponent implements OnInit{
  changePassForm!:FormGroup;

  //@ts-ignore
  loggedUser: User;
  constructor(
    public modalRef: MdbModalRef<EditPassComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.usersService.loggedUser;

    this.changePassForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      c_new_password: ['', Validators.required],
    });
  }

  changePassword(){
    const id = this.loggedUser.id;
    const old_password = this.changePassForm.value["old_password"];
    const new_password = this.changePassForm.value["new_password"];
    const c_new_password = this.changePassForm.value["c_new_password"];
    console.log(id,old_password,new_password)
    if(new_password == c_new_password){
      this.usersService.changePassWord(id,old_password,new_password).subscribe(response=>{
        console.log(response);
        this.usersService.loggedUser = response;
        localStorage.setItem("loggedUser", JSON.stringify(this.usersService.loggedUser));
        this.showAlert(AlertTypes.SUCCESS, "Password Changed!");

      },error => {
        this.showAlert(AlertTypes.ERROR, "Changing password failed");
        throw error;
      })
    }
    else{
      this.showAlert(AlertTypes.ERROR, "Passwords don't match!");
    }

  }

  showAlert(type:AlertTypes, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }
}
