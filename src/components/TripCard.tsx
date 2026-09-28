//TODO
import type {Trip} from "../types/types.ts";

type TripCardProps = {
    trip: Trip;
}

function TripCard({trip}: TripCardProps) {
    return (
        <div>
            <p>Type trip: {trip.status}</p>
            <p>Country: {trip.country}</p>
            <p>City: {trip.city}</p>
            <p>From: {trip.startDate}</p>
            <p>To: {trip.endDate}</p>
            <p>Budget: {trip.budget}$</p>
        </div>
    )
}

export default TripCard;