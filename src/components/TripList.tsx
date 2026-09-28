//TODO
import {useAppSelector} from "../app/hooks.ts";
import TripSidebarItem from "./TripSidebarItem.tsx";

const TripList = () => {
    const trips = useAppSelector((state) => state.trips.items);
    return (
        <ul>
            {trips.map(trip => <TripSidebarItem key={trip.id} trip={trip}></TripSidebarItem>)}
        </ul>
    )

}

export default TripList;