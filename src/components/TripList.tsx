//TODO
import {useAppSelector} from "../app/hooks.ts";
import TripSidebarItem from "./TripSidebarItem.tsx";
import {useState} from "react";
import CreateTrip from "./CreateTrip.tsx";

const TripList = () => {
    const [isCreatingTrip, setIsCreatingTrip] = useState(false);
    const trips = useAppSelector((state) => state.trips.items);

    return (
        <>
            <button onClick={() => setIsCreatingTrip(true)}>Add new</button>
            {isCreatingTrip && <CreateTrip onClose={() => setIsCreatingTrip(false)}></CreateTrip>
            }
            <p>TRIPS</p>
            <ul>
                {trips.map(trip => <TripSidebarItem key={trip.id} trip={trip}></TripSidebarItem>)}
            </ul>
        </>
    )

}

export default TripList;