import {createBrowserRouter, Navigate} from "react-router"
import NotFoundPage from "../pages/NotFoundPage.tsx";
import TripPage from "../pages/TripPage.tsx";
import AppLayout from "../components/AppLayout.tsx";

//TODO route elements
export const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                index: true,
                path: "dashboard",
                element: <Navigate to="/" replace/>
            },
            {
                path: 'trips/:id',
                element: <TripPage/>

            },
            {
                path: '*',
                element: <NotFoundPage/>
            },

        ]
    }


])