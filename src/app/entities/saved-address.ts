import {User} from "./user";

export interface SavedAddress {
  user: User;
  home:string;
  work:string;
  school:string;
  other:string;
}
