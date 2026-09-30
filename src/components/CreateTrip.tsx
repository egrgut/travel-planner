import * as React from "react";
import {useState} from "react";
import type {Trip, TripStatus} from "../types/types.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {addTrip, editTrip} from "../features/trip/tripSlice.ts";


type CreateTripProps = {
    onClose: () => void;
    initialTrip?: Trip;
}

function CreateTrip({onClose, initialTrip}: CreateTripProps) {
    const dispatch = useAppDispatch();
    const [city, setCity] = useState(initialTrip?.city ?? '');
    const [country, setCountry] = useState(initialTrip?.country ?? '');
    const [persons, setPersons] = useState(initialTrip?.persons ?? 1);
    const [startDate, setStartDate] = useState(initialTrip?.startDate ?? '');
    const [endDate, setEndDate] = useState(initialTrip?.endDate ?? '');
    const [status, setStatus] = useState<TripStatus>(initialTrip?.status ?? 'Vacation trip');
    const [budget, setBudget] = useState(initialTrip?.budget ?? 0);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (initialTrip) {
            const updatedTrip: Trip = {
                id: initialTrip.id,
                country: country,
                city: city,
                status: status,
                persons: persons,
                startDate: startDate,
                endDate: endDate,
                budget: budget,
                days: initialTrip.days,
                todo: initialTrip.todo,
                expenses: initialTrip.expenses,
            };
            dispatch(editTrip(updatedTrip));
        } else {
            const newTrip: Trip = {
                id: crypto.randomUUID(),
                country: country,
                city: city,
                status: status,
                persons: persons,
                startDate: startDate,
                endDate: endDate,
                days: [],
                budget: budget,
                todo: [],
                expenses: [],
            };
            dispatch(addTrip(newTrip));
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{initialTrip ? "Edit trip" : "New trip"}</h3>
            <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" placeholder="Add Country"/>
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Add City"/>
            <select value={status} onChange={(e) => setStatus(e.target.value as TripStatus)}>
                <option value="Vacation trip">Vacation trip</option>
                <option value="Business trip">Business trip</option>
            </select>
            <label>Persons
                <input value={persons} onChange={(e) => setPersons(Number(e.target.value))} type="number"
                       placeholder="Add Persons"/>
            </label>
            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date"
                   placeholder="Add Start date"/>
            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" placeholder="Add End date"/>
            <label>Budget
                <input value={budget} onChange={(e) => setBudget(Number(e.target.value))} type="number"
                       placeholder="Add Budget"/>
            </label>
            <button type="submit">{initialTrip ?"Save":"Add"}</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    )
}

export default CreateTrip;