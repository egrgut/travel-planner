import {configureStore} from "@reduxjs/toolkit";
import tripReducer from "../features/trip/tripSlice.ts";

export const store = configureStore({
    reducer:{
        trips: tripReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;