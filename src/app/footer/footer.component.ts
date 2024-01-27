import { Component } from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {AuthenticatorComponent} from "../authenticator/authenticator.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  description="Lucrarea mea de licență are ca scop dezvoltarea și implementarea unui sistem inteligent de recomandare" +
    " a rutelor adaptat vehiculelor ecologice, concentrându-se pe promovarea mobilității urbane durabile. ";

  modalRef: MdbModalRef<AuthenticatorComponent> | null = null;
  constructor(
    public usersService: UsersService,
    private router: Router,
    private modalService: MdbModalService,
  ) {}
  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }
  openAuthenticatorModal() {
    this.modalRef = this.modalService.open(AuthenticatorComponent)
  }
  openProfilePage(){
    if(this.isLoggedIn())
      this.router.navigate(['/profile',this.usersService.loggedUser.username]);
    else{
      this.openAuthenticatorModal();
    }
  }

}
