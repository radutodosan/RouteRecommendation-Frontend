import {Component, OnInit} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {AuthenticatorComponent} from "../authenticator/authenticator.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  protected readonly faBars = faBars;

  modalRef: MdbModalRef<AuthenticatorComponent> | null = null;

  currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  checkedTheme!: boolean;

  constructor(
    private modalService: MdbModalService,
    private usersService: UsersService,
    private router: Router,
  ) {}

  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }
  openAuthenticatorModal() {
    this.modalRef = this.modalService.open(AuthenticatorComponent)
  }

  // @ts-ignore
  switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); //add this
    }
    else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); //add this
    }

    if(window.location.pathname === '/map'){
      setTimeout(() => {
        window.location.reload();
      }, 500);

    }
  }

  ngOnInit(): void {
    this.checkedTheme = localStorage.getItem('theme') === 'light';
  }

  openProfilePage(){

    this.router.navigate(['/profile',this.usersService.loggedUser.username]);
  }
}
