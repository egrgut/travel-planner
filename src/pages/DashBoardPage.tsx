//TODO

import {useAppSelector} from "../app/hooks.ts";
import TripCard from "../components/TripCard.tsx";
import {useState} from "react";
import TripFilterBar, {type TripFilter, type TripSortOption} from "../components/TripFilterBar.tsx";

function DashBoardPage() {
    const trips = useAppSelector((state) => state.trips.items);
    const [search, setSearch] = useState<string>("");
    const [status, setStatus] = useState<TripFilter>("All");
    const [sort, setSort] = useState<TripSortOption>("Default");
    const searchQuery = search.trim().toLocaleLowerCase();
    const filteredTrips = trips.filter(trip =>
        trip.city.toLocaleLowerCase().includes(searchQuery) || trip.country.toLocaleLowerCase().includes(searchQuery));
    const filtredStatus = status === "All" ? filteredTrips : filteredTrips.filter(trip => trip.status === status);
    const sortedTrips = [...filtredStatus].sort((a, b) => {
        switch (sort) {
            case"Budget-cheapest":
                return a.budget - b.budget;
            case "Budget-expensive":
                return b.budget - a.budget;
            case "Date-later":
                return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
            case "Date-upcoming":
                return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
            case "Default":
                return 0;
        }
    })

    return (
        <div>
            <TripFilterBar search={search} onSearchChange={setSearch}
                           status={status} onStatusChange={setStatus}
                           sort={sort} onSortChange={setSort}/>
            {sortedTrips.map(f => <TripCard key={f.id} trip={f}></TripCard>)}

        </div>
    )
}

export default DashBoardPage;
