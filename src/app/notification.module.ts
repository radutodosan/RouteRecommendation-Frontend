import {NotifierModule, NotifierOptions} from "angular-notifier";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";


const notifierCustomOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 400,
    },
    vertical: {
      position: 'bottom',
      distance: 50,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NotifierModule.withConfig(notifierCustomOptions),
    ],
    exports: [NotifierModule]})
export class NotificationModule {}
