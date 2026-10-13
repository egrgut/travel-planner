import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tripReducer from "../features/trip/tripSlice.ts";
import {loadState, saveState} from "./localStorage.ts";


const rootReducer = combineReducers({
    trips: tripReducer
})

export const store = configureStore({
    reducer:rootReducer,
    preloadedState: loadState()
})

store.subscribe(() => {
    saveState(store.getState())
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;