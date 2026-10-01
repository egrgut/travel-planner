import type {DayProgram, Places, Trip} from "../../types/types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type TripsState = {
    items: Trip[];
}

const initialState: TripsState = {
    items: [
        {
            id: "1",
            status: "Business trip",
            country: "United Kingdom",
            city: "London",
            persons: 1,
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
            state.items.push(action.payload);
        },
        editTrip: (state, action: PayloadAction<Trip>) => {
            const index = state.items.findIndex(trip => trip.id === action.payload.id);
            if (index > -1) {
                state.items[index] = action.payload;
            }
        },
        deleteTrip: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(trip => trip.id !== action.payload);
        },
        addDay: (state, action: PayloadAction<{ tripId: string; day: DayProgram}>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId);
            if (tripIndex > -1) {
                state.items[tripIndex].days.push(action.payload.day);
            }
        },
        addPlace:(state, action: PayloadAction<{tripId:string;dayId:string;place:Places}>)=>{
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId);
            if (tripIndex > -1) {
                const days=state.items[tripIndex].days;
                const dayIndex=days.findIndex(day=>day.id===action.payload.dayId)
               if(dayIndex>-1){
                days[dayIndex].place.push(action.payload.place);
               }
            }
        }
    }
})

export const {addTrip, editTrip, deleteTrip, addDay,addPlace} = tripSlice.actions;
export default tripSlice.reducer;


