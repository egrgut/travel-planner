import type {Trip} from "../../types/types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type TripsState = {
    trips: Trip[];
}

const initialState: TripsState = {
    trips: [
        {
            id: "1",
            status: "business trip",
            country: "United Kingdom",
            city: "London",
            days: [],
            todo: [],
            budget: 3000,
            expenses: [],
            startDate: "2026-01-01",
            endDate: "2026-02-01",
        }
    ]
}

const tripSlice = createSlice({
    name: "trips",
    initialState,
    reducers: {
        addTrip: (state, action: PayloadAction<Trip>) => {
            state.trips.push(action.payload);
        },
        editTrip: (state, action: PayloadAction<Trip>) => {
            const  index = state.trips.findIndex(trip => trip.id === action.payload.id);
            if (index > -1) {
                state.trips[index] = action.payload;
            }
        },
        deleteTrip: (state, action: PayloadAction<string>) => {
            state.trips= state.trips.filter(trip=>trip.id !== action.payload);
            }
        }
})

export const {addTrip, editTrip, deleteTrip} = tripSlice.actions;
export default tripSlice.reducer;


