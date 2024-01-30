import {Component, Input} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {RemoveConfirmationComponent} from "../remove-confirmation/remove-confirmation.component";
import {AlertService} from "../../services/alert.service";
import {AlertTypes} from "../../enums/alert-types";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

 @Input() username:string = '';
 @Input() full_name:string = '';
 @Input() email?:string;
 @Input() picture_url?:string;
 @Input() type:string = '';


  modalRef: MdbModalRef<RemoveConfirmationComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private alertService: AlertService,
  ) {}

  open_remove_confirmation(username:string) {
    this.modalRef = this.modalService.open(RemoveConfirmationComponent);
    this.modalRef.component.username = username;
  }

  sendFriendRequest(){
    this.alertService.showAlert(AlertTypes.SUCCESS, "Sent friend request to: " + this.full_name);
  }
}
