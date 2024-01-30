import {User} from "./user";
import {Status} from "../enums/status";

export interface FriendshipDTO {
  user01:User;
  user02:User;
  status:Status;
}
