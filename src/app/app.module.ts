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
import { UserCardComponent } from './social/user-card/user-card.component';
import { NotificationCardComponent } from './notifications/notification-card/notification-card.component';
import { RPendingCardComponent } from './notifications/r-pending-card/r-pending-card.component';
import { RemoveConfirmationComponent } from './social/remove-confirmation/remove-confirmation.component';
import {HttpClientModule} from "@angular/common/http";
import { DelLogoutConfirmationComponent } from './profile/del-logout-confirmation/del-logout-confirmation.component';
import { EditPassComponent } from './profile/edit-pass/edit-pass.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MdbTooltipModule} from "mdb-angular-ui-kit/tooltip";
import { NotifierModule } from 'angular-notifier';
import {NotificationModule} from "./notification.module";
import {FriendsComponent} from "./social/friends/friends.component";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {EditAddressesComponent} from "./profile/edit-addresses/edit-addresses.component";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FeaturesComponent} from "./home/features/features.component";
import {FeatureBoxComponent} from "./home/features/feature-box/feature-box.component";
import {ChartComponent} from "./statistics/chart/chart.component";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {FormatTimePipe} from "./services/format-time.pipe";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SidePanelComponent,
    NavBarComponent,
    DescriptionComponent,
    AuthenticatorComponent,
    LoginFormComponent,
    SignupFormComponent,
    FooterComponent,
    UserCardComponent,
    NotificationCardComponent,
    RPendingCardComponent,
    RemoveConfirmationComponent,
    DelLogoutConfirmationComponent,
    EditPassComponent,
    FriendsComponent,
    EditAddressesComponent,
    FeaturesComponent,
    FeatureBoxComponent,
    ChartComponent,
    FormatTimePipe
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
    HttpClientModule,
    MatBadgeModule,
    MdbTooltipModule,
    NotifierModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    CanvasJSAngularChartsModule,
    MatExpansionModule,
    MatIconModule,
  ],
  providers: [NotificationModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
