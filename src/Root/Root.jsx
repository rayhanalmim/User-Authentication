import { Outlet } from "react-router-dom";
import NavBar from "../Component/Header/NavBar";

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="w-10/12 mx-auto">
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;