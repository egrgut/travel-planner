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
    | 'default'
    | 'date-upcoming'
    | 'date-later'
    | 'budget-cheapest'
    | 'budget-expensive'

function TripFilterBar({
                           search, onSearchChange,
                           status, onStatusChange,
                           sort, onSortChange
                       }: TripFilterBarProps) {
    return (
        <>
            <input type="text" value={search} placeholder="...." onChange={(e) => onSearchChange(e.target.value)}/>
            <select value={status} onChange={(e) => onStatusChange(e.target.value as TripFilter)}>
                <option value="All">All</option>
                <option value="Business trip">Business trip</option>
                <option value="Vacation trip">Vacation trip</option>
            </select>
            <select value={sort} onChange={(e) => onSortChange(e.target.value as TripSortOption)}>
                <option value="default">Default</option>
                <option value="date-upcoming">Date - Upcoming</option>
                <option value="date-later">Date - Later</option>
                <option value="budget-cheapest">Budget - Cheapest</option>
                <option value="budget-expensive">Budget - Expensive</option>
            </select>
        </>


    )

}

export default TripFilterBar;

