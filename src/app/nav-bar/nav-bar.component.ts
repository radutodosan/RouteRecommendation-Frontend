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

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  checkedTheme!: boolean;

  constructor(private modalService: MdbModalService) {}

  openAuthenticatorModal() {
    this.modalRef = this.modalService.open(AuthenticatorComponent)
  }

  // @ts-ignore
  switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); //add this
    } else {

      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); //add this
    }
  }
}
