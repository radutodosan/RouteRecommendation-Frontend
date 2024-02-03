import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {UsersService} from "../../services/users.service";
import {NotificationsService} from "../../services/notifications.service";
import {SavedAddressesService} from "../../services/saved-addresses.service";
import {SavedAddress} from "../../entities/saved-address";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-addresses',
  templateUrl: './edit-addresses.component.html',
  styleUrls: ['./edit-addresses.component.css']
})
export class EditAddressesComponent {
  editAddressesForm!:FormGroup;

  //@ts-ignore
  savedAddresses: SavedAddress;

  constructor(
    public modalRef: MdbModalRef<EditAddressesComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    private savedAddressesService: SavedAddressesService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.savedAddresses = this.savedAddressesService.savedAddresses;

    this.editAddressesForm = this.formBuilder.group({
      homeAddress: [this.savedAddresses?.home],
      workAddress: [this.savedAddresses?.work],
      schoolAddress: [this.savedAddresses?.school],
      otherAddress: [this.savedAddresses?.other]
    });
  }

  editAddresses(){
    const homeAddress = this.editAddressesForm.value["homeAddress"];
    const workAddress = this.editAddressesForm.value["workAddress"];
    const schoolAddress = this.editAddressesForm.value["schoolAddress"];
    const otherAddress = this.editAddressesForm.value["otherAddress"];

    const savedAddresses: SavedAddress = {
      user:this.usersService.loggedUser,
      home:homeAddress,
      work:workAddress,
      school:schoolAddress,
      other:otherAddress
    }

    this.savedAddressesService.saveAddresses(savedAddresses).subscribe(response =>{
      this.notificationsService.showSuccessNotification("Addresses Updated");
      this.savedAddressesService.savedAddresses = response;
      localStorage.setItem("savedAddresses", JSON.stringify(this.savedAddressesService.savedAddresses));
      this.savedAddresses = this.savedAddressesService.savedAddresses;

    }, error => {
      this.notificationsService.showErrorNotification("Error Updating Addresses!");
      throw error;
    })
  }
  reloadPage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
