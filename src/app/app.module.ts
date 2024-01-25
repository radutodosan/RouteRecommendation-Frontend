import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DescriptionComponent } from './home/description/description.component';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import {MatTableModule} from "@angular/material/table";
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { LoginFormComponent } from './authenticator/login-form/login-form.component';
import { SignupFormComponent } from './authenticator/signup-form/signup-form.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    SidePanelComponent,
    NavBarComponent,
    DescriptionComponent,
    AuthenticatorComponent,
    LoginFormComponent,
    SignupFormComponent,
    FooterComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule,
        BrowserAnimationsModule,
        NgxTypedJsModule,
        MdbCollapseModule,
        MdbModalModule,
        MdbTabsModule,
        MatTableModule,
        ReactiveFormsModule,
        AlertComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
