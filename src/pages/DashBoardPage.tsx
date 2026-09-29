//TODO

import {useAppSelector} from "../app/hooks.ts";
import TripCard from "../components/TripCard.tsx";

function DashBoardPage() {
    const trips = useAppSelector((state) => state.trips.items);
    return (
        <div>
            {trips.map(trip => <TripCard key={trip.id} trip={trip}></TripCard>)}
        </div>
    )
}

export default DashBoardPage;
