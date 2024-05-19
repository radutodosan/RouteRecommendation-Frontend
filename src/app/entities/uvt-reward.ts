import {User} from "./user";
import {Status} from "../enums/status";

export interface UvtReward {
  id:number;
  user:User;
  placement:number;
  reward:string;
  status:Status;
}
