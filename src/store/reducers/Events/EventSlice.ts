import { IEvent } from "./../../../models/IEvent";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEventState } from "./reducerTypes";
import { IUser } from "../../../models/IUsers";
import { fetchUsers } from "../Login/AuthSlice";

export const setEvents = createAsyncThunk(
  "events/setEvents",
  async (event: IEvent) => {
    const events = localStorage.getItem("events") || "[]";
    const json = JSON.parse(events) as IEvent[];
    json.push(event);
    localStorage.setItem("events", JSON.stringify(json));
    return event as IEvent;
  }
);


export const fetchEvent = createAsyncThunk(
  "events/fetchEvent",
  async (user:string) => {
    const events = localStorage.getItem("events") || "[]";
    const json = JSON.parse(events) as IEvent[];
    const currentEvents = json.filter(
      (event) => event.author === user || event.guest === user
    );
    return currentEvents;
  }
);

const initialState: IEventState = {
  events: [],
  guests: [] as IUser[],
};
export const EventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.guests = [...action.payload];
      }
    );
    builder.addCase(
      setEvents.fulfilled,
      (state, action: PayloadAction<IEvent>) => {
        state.events = [...state.events, action.payload];
      }
    );
    // builder.addCase(
    //   fetchEvent.pending,
    //   (state, action:  PayloadAction<any>) => {
    //     state.events = [...action.payload];
    //   }
    // );
    builder.addCase(
      fetchEvent.fulfilled,
      (state, action:  PayloadAction<IEvent[]>) => {
        state.events = [...action.payload];
      }
    );
  },
});
// action: PayloadAction<IEvent[]>
export default EventSlice.reducer;
