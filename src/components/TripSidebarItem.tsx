import type {Trip} from "../types/types.ts";
import {NavLink} from "react-router";

type TripSidebarItemProps = {
    trip: Trip;
}

function TripSidebarItem({trip}: TripSidebarItemProps) {
    return (
        <NavLink to={`/trips/${trip.id}`}>
        <div>
            <p>
                {trip.city}
            </p>
            <p>
                {trip.startDate}
            </p>
        </div>
        </NavLink>
    )
}

export default TripSidebarItem;

