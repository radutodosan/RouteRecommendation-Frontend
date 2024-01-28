import {Component} from '@angular/core';
import {AlertTypes} from "../../enums/alert-types";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AuthenticatorComponent} from "../../authenticator/authenticator.component";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-remove-confirmation',
  templateUrl: './remove-confirmation.component.html',
  styleUrls: ['./remove-confirmation.component.css']
})
export class RemoveConfirmationComponent {
  public username = '';
  constructor(
    public modalRef: MdbModalRef<AuthenticatorComponent>,
    private alertService: AlertService,
    ) {}
  showAlert(type:AlertTypes, text:String){
    this.alertService.setAlert({
      type: type,
      text : text,
    });
  }

  confirm_remove_friend(){
    this.showAlert(AlertTypes.INFO, "Friend Removed!");
  }
}
