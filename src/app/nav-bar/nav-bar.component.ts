import {Component} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {AuthenticatorComponent} from "../authenticator/authenticator.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  protected readonly faBars = faBars;

  modalRef: MdbModalRef<AuthenticatorComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openAuthenticatorModal() {
    this.modalRef = this.modalService.open(AuthenticatorComponent)
  }
}
