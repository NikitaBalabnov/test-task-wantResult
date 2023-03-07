import { IEvent } from "../../../models/IEvent"
import { IUser } from "../../../models/IUsers"


export interface IEventState {
    guests: IUser[],
    events: IEvent[]
}
