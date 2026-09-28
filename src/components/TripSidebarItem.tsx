import type {Trip} from "../types/types.ts";

type TripSidebarItemProps = {
    trip: Trip;
}

function TripSidebarItem({trip}: TripSidebarItemProps) {
    return (
        <div>
            <p>
                {trip.city}
            </p>
            <p>
                {trip.startDate}
            </p>
        </div>
    )
}

export default TripSidebarItem;

