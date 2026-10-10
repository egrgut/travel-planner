import type {TripStatus} from "../types/types.ts";

type TripFilterBarProps = {
    search: string;
    onSearchChange: (search: string) => void;

    status: TripFilter;
    onStatusChange: (status: TripFilter) => void;

    sort: TripSortOption;
    onSortChange: (sort: TripSortOption) => void;
}
export type TripFilter = 'All' | TripStatus;

export type TripSortOption =
    | 'Default'
    | 'Date-upcoming'
    | 'Date-later'
    | 'Budget-cheapest'
    | 'Budget-expensive'

function TripFilterBar({
                           search, onSearchChange,
                           status, onStatusChange,
                           sort, onSortChange
                       }: TripFilterBarProps) {
    return (
        <>
            <input type="text" value={search} placeholder="Type to search" onChange={(e) => onSearchChange(e.target.value)}/>
            <select value={status} onChange={(e) => onStatusChange(e.target.value as TripFilter)}>
                <option value="All">All</option>
                <option value="Business trip">Business trip</option>
                <option value="Vacation trip">Vacation trip</option>
            </select>
            <select value={sort} onChange={(e) => onSortChange(e.target.value as TripSortOption)}>
                <option value="Default">Default</option>
                <option value="Date-upcoming">Date - Upcoming</option>
                <option value="Date-later">Date - Later</option>
                <option value="Budget-cheapest">Budget - Cheapest</option>
                <option value="Budget-expensive">Budget - Expensive</option>
            </select>
        </>


    )

}

export default TripFilterBar;

