import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {slideInUpOnEnterAnimation} from "angular-animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../entities/user";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {DelLogoutConfirmationComponent} from "./del-logout-confirmation/del-logout-confirmation.component";
import {EditPassComponent} from "./edit-pass/edit-pass.component";
import {NotificationsService} from "../services/notifications.service";
import {EditAddressesComponent} from "./edit-addresses/edit-addresses.component";


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
  modalRefChangePassword: MdbModalRef<EditPassComponent> | null = null;
  modalRefEditAddresses: MdbModalRef<EditAddressesComponent> | null = null;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
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
    });
  }

  updateUser(){
    if(this.editForm.value["password"] === this.editForm.value["confirmPassword"]) {
      this.usersService.updateUser(this.loggedUser.id, this.editForm.value).subscribe(response => {
        console.log(response);
        this.usersService.loggedUser = response;
        localStorage.setItem("loggedUser", JSON.stringify(this.usersService.loggedUser));
        this.notificationsService.showSuccessNotification("Updated successfully!");
        this.reloadPage();
      }, error => {
        this.notificationsService.showErrorNotification("Update failed!");
        throw error;
      })
    }
    else{
      this.notificationsService.showErrorNotification("Passwords don't match!");
      console.log("Passwords don't match!");
    }
  }

  openEditAddressesModal(){
    this.modalRefEditAddresses = this.modalService.open(EditAddressesComponent)
  }

  openChangePasswordModal(){
    this.modalRefChangePassword = this.modalService.open(EditPassComponent)
  }

  openDeleteConfirmation() {
    this.modalRef = this.modalService.open(DelLogoutConfirmationComponent);
    this.modalRef.component.action = "DELETE";
  }

  openLogoutConfirmation() {
    this.modalRef = this.modalService.open(DelLogoutConfirmationComponent);
    this.modalRef.component.action = "LOGOUT";
  }

  reloadPage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
