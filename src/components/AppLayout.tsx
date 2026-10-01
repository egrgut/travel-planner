//TODO
// Add weather widget that change weather on specific trip

import {Outlet, useNavigate} from "react-router";
import TripList from "./TripList.tsx";

function AppLayout() {
    const navigate=useNavigate();
    return (
        <div>
            <TripList/>
            <button onClick={()=>navigate("/")}>Dashboard</button>
            <Outlet/>
        </div>
    )
}


export default AppLayout;