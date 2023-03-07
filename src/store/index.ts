import  AuthReducer  from './reducers/Login/AuthSlice';
import  EventReducer  from './reducers/Events/EventSlice';
import {  configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    events: EventReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch