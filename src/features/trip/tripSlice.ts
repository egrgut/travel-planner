import type {DayProgram, Expense, Places, TodoList, TodoStatus, Trip} from "../../types/types.ts";
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
        //CRUD TRIPS
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
        //CRUD PLACES
        addDay: (state, action: PayloadAction<{ tripId: string; day: DayProgram }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId);
            if (tripIndex > -1) {
                state.items[tripIndex].days.push(action.payload.day);
            }
        },

        addPlace: (state, action: PayloadAction<{ tripId: string; dayId: string; place: Places }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId);
            if (tripIndex > -1) {
                const days = state.items[tripIndex].days;
                const dayIndex = days.findIndex(day => day.id === action.payload.dayId)
                if (dayIndex > -1) {
                    days[dayIndex].place.push(action.payload.place);
                }
            }
        },

        editPlace: (state, action: PayloadAction<{ tripId: string; dayId: string, place: Places }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId);
            if (tripIndex > -1) {
                const days = state.items[tripIndex].days;
                const dayIndex = days.findIndex(day => day.id === action.payload.dayId)
                if (dayIndex > -1) {
                    const places = days[dayIndex].place;
                    const placesIndex = places.findIndex(place => place.id === action.payload.place.id);
                    if (placesIndex > -1) {
                        places[placesIndex] = action.payload.place;
                    }
                }
            }
        },

        deletePlace: (state, action: PayloadAction<{ tripId: string; dayId: string, placeId: string }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId);
            if (tripIndex > -1) {
                const days = state.items[tripIndex].days;
                const dayIndex = days.findIndex(day => day.id === action.payload.dayId)
                if (dayIndex > -1) {
                    days[dayIndex].place = days[dayIndex].place.filter(place => place.id !== action.payload.placeId)
                }
            }
        },
        movePlace: (state, action: PayloadAction<{
            tripId: string;
            dayId: string;
            placeId: string;
            direction: 'up' | 'down'
        }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId);
            if (tripIndex > -1) {
                const days = state.items[tripIndex].days;
                const dayIndex = days.findIndex(day => day.id === action.payload.dayId);
                if (dayIndex > -1) {
                    const places = days[dayIndex].place;
                    const placesIndex = places.findIndex(placeId => placeId.id === action.payload.placeId);
                    if (placesIndex > -1) {
                        const targetIndex = action.payload.direction === 'up' ? placesIndex - 1 : placesIndex + 1;
                        if (targetIndex >= 0 && targetIndex < places.length) {
                            places.splice(targetIndex, 0, places.splice(placesIndex, 1)[0]);
                        }
                    }
                }
            }
        },
        //CRUD Expense
        addExpense: (state, action: PayloadAction<{ tripId: string; expense: Expense }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId)
            if (tripIndex > -1) {
                state.items[tripIndex].expenses.push(action.payload.expense)
            }
        },

        deleteExpense: (state, action: PayloadAction<{ tripId: string; expenseId: string }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId)
            if (tripIndex > -1) {
                state.items[tripIndex].expenses = state.items[tripIndex].expenses.filter(expense => expense.id !== action.payload.expenseId)
            }
        },

        updateBudget: (state, action: PayloadAction<{ tripId: string; budget: number }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId)
            if (tripIndex > -1) {
                state.items[tripIndex].budget = action.payload.budget
            }
        },
        //CRUD TODO
        addTodo: (state, action: PayloadAction<{ tripId: string; todo: TodoList }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId)
            if (tripIndex > -1) {
                state.items[tripIndex].todo.push(action.payload.todo)
            }
        },

        deleteTodo: (state, action: PayloadAction<{ tripId: string; todoId: string }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId)
            if (tripIndex > -1) {
                state.items[tripIndex].todo = state.items[tripIndex].todo.filter(todo => todo.id !== action.payload.todoId)
            }
        },

        updateTodoStatus: (state, action: PayloadAction<{ tripId: string;todoId: string; status: TodoStatus }>) => {
            const tripIndex = state.items.findIndex(trip => trip.id === action.payload.tripId)
            if (tripIndex > -1) {
                const todoIndex = state.items[tripIndex].todo.findIndex(todo => todo.id === action.payload.todoId)
                if (todoIndex > -1) {
                    state.items[tripIndex].todo[todoIndex].status = action.payload.status
                }
            }
        },
    }
})

export const {
    addTrip, editTrip,
    deleteTrip, addDay,
    addPlace, deletePlace,
    editPlace, movePlace,
    addExpense, deleteExpense, updateBudget,
    addTodo, deleteTodo, updateTodoStatus
} = tripSlice.actions;

export default tripSlice.reducer;


