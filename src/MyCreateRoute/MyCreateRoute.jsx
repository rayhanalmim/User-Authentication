import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Component/Home";
import SingIn from "../Component/SingIn";
import LogIn from "../Component/LogIn";

const MyCreateRoute = createBrowserRouter([
    {
        path:'/',
        element: <Root></Root>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/join',
                element:<SingIn></SingIn>
            },
            {
                path:'/login',
                element: <LogIn></LogIn>
            }
        ]
    }
])

export default MyCreateRoute;