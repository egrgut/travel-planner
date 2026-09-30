//TODO
import {useNavigate, useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import NotFoundPage from "./NotFoundPage.tsx";
import TripCard from "../components/TripCard.tsx";
import {deleteTrip} from "../features/trip/tripSlice.ts";
import {useState} from "react";
import CreateTrip from "../components/CreateTrip.tsx";

function TripPage() {
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const trip = useAppSelector(state => state.trips.items.find(trip => trip.id === id))

    if (!trip) {
        return <NotFoundPage/>;
    }
    const handleDelete = () => {
        dispatch(deleteTrip(trip.id));
        navigate('/');
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
                </div>
            )}
        </>
    );
}


export default TripPage;