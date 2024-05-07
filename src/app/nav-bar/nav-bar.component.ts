import {Component, OnInit} from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {AuthenticatorComponent} from "../authenticator/authenticator.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../services/notifications.service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],

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
    public notificationsService:NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.checkedTheme = localStorage.getItem('theme') === 'light';
  }

  isLoggedIn(): boolean {
    return this.usersService.isLoggedIn();
  }
  openAuthenticatorModal() {
    this.modalRef = this.modalService.open(AuthenticatorComponent)
  }

  mustLoginAlert(){
    this.notificationsService.showDefaultNotification('You must login to access!');
  }

  openProfilePage(){
    this.router.navigate(['/profile',this.usersService.loggedUser.username]);
  }
  openNotificationsPage(){
    this.router.navigate(['/notifications',this.usersService.loggedUser.username]);
  }

  // @ts-ignore
  switchTheme(e) {
    var featureMap = document.getElementById("feature-map") as HTMLImageElement;


    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); //add this
      const page = document.getElementById('page');
      if(page != null)
        page.classList.remove('alternative');

      if(window.location.pathname === '/home'){
        featureMap.src = "assets/Photos/map-light.png"
      }
    }
    else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); //add this
      const page = document.getElementById('page');
      if(page != null)
        page.classList.add('alternative');

      if(window.location.pathname === '/home'){
        featureMap.src = "assets/Photos/map-dark.png"      }

    }



    // if(window.location.pathname != '/map'){
    //   this.reloadPage();
    //
    // }
  }

  reloadPage(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
