//TODO
// Add weather widget that change weather on specific trip

import {Outlet} from "react-router";
import TripList from "./TripList.tsx";

function AppLayout() {
    return (
        <div>
            <TripList/>
            <button>Dashboard</button>
            <Outlet/>
        </div>
    )
}


export default AppLayout;