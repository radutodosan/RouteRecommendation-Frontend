import {AlertTypes} from "../enums/alert-types";

export interface Alert {
  type: AlertTypes;
  text: String;
}
