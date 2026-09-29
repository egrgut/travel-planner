import * as React from "react";
import {useState} from "react";
import type {Trip, TripStatus} from "../types/types.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {addTrip} from "../features/trip/tripSlice.ts";


type CreateTripProps = {
    onClose: () => void
}

function CreateTrip({onClose}: CreateTripProps) {
    const dispatch = useAppDispatch();

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState<TripStatus>('Vacation trip');
    const [budget, setBudget] = useState(0);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTrip: Trip = {
            id: crypto.randomUUID(),
            country: country,
            city: city,
            status: status,
            startDate: startDate,
            endDate: endDate,
            days: [],
            budget: budget,
            todo: [],
            expenses: [],
        };
        dispatch(addTrip(newTrip));
        onClose();

    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>New trip</h3>
            <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" placeholder="Add Country"/>
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Add City"/>
            <select value={status} onChange={(e) => setStatus(e.target.value as TripStatus)}>
                <option value="Vacation trip">Vacation trip</option>
                <option value="Business trip">Business trip</option>
            </select>
            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date"
                   placeholder="Add Start date"/>
            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" placeholder="Add End date"/>
            <label>Budget
                <input value={budget} onChange={(e) => setBudget(Number(e.target.value))} type="number"
                       placeholder="Add Budget"/>
            </label>
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    )
}

export default CreateTrip;