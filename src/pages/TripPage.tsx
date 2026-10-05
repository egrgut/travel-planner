
import {useNavigate, useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import NotFoundPage from "./NotFoundPage.tsx";
import TripCard from "../components/TripCard.tsx";
import {addDay, deleteTrip} from "../features/trip/tripSlice.ts";
import {useState} from "react";
import CreateTrip from "../components/CreateTrip.tsx";
import DayCard from "../components/DayCard.tsx";
import BudgetCard from "../components/BudgetCard.tsx";
import TripTodoCard from "../components/TripTodo.tsx";

function TripPage() {
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const trip = useAppSelector(state => state.trips.items.find(trip => trip.id === id))
    const [newDayDate, setNewDayDate] = useState(trip?.startDate??'');

    if (!trip) {
        return <NotFoundPage/>;
    }
    const handleDelete = () => {
        dispatch(deleteTrip(trip.id));
        navigate('/');
    }
    const handleAddDay = () => {
        const newDay = {
            id: crypto.randomUUID(),
            dayNumber: trip.days.length + 1,
            date:newDayDate,
            place: [],
        }
        dispatch(addDay({tripId: trip.id, day: newDay}));
    }

    return (
        <>
            {isEditing ? (
                <CreateTrip
                    initialTrip={trip}
                    onClose={() => setIsEditing(false)}
                />
            ) : (
                <div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                    <TripCard trip={trip}/>
                    <BudgetCard trip={trip}/>
                    <h3>Trip Todo</h3>
                    <TripTodoCard trip={trip}/>
                    {
                        trip.days.map((day) =>
                            (<DayCard key={day.id} day={day}/>))
                    }
                    <button onClick={handleAddDay}>Add Day</button>
                    <input type="date"
                           value={newDayDate}
                           min={trip.startDate}
                           max={trip.endDate}
                           onChange={(e) =>
                        setNewDayDate(e.target.value)}/>
                </div>
            )}
        </>
    );
}


export default TripPage;