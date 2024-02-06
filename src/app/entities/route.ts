import {User} from "./user";
import {Transport} from "../enums/transport";
import {Status} from "../enums/status";

export interface Route {
  id: number,
  user: User,
  start: string,
  end: string,
  transport: Transport,
  distance: number,
  time: number,
  emissions_saved: number,
  cal_burned: number,
  status: Status
}
