import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import * as React from 'react';


const NavBar = ({endpoint, pantryUpdater}) => {
        const {userAccount, setUserAccount} = React.useContext(UserContext); // To get the user info in the navBar


/*      const [visibilityNavBar, dispatchVisibility] = useRevealContent();

    const navBarHandler = () => {
        if (visibilityNavBar.data.top === "-30rem") {
            dispatchVisibility({
                type :"NAVBAR_SLIDE",
                payload : 
                    {
                        top : "0rem",
                    }
            });
        } else {
            dispatchVisibility({
                type :"NAVBAR_SLIDE",
                payload : 
                    {
                        top : "-30rem",
                    }
            });
        }; 
    }; */

    // TO update the page when we click on a link in the navbar
    const update_app_flow = (page_to_display) => {
        pantryUpdater({
            type : "UI_FLOW",
            page_name : page_to_display,
        })
    }

    const logout = async() => {
        const imma_out = await axios.get(`${endpoint}/users/logout/${userAccount.user_details._id}`, {withCredentials: true})
        console.log(`are we out ? ${JSON.stringify(imma_out)}`);
        pantryUpdater({
            type : "UI_FLOW",
            page_name : "dahboard",
        })
        setUserAccount({
            user_details: {},
            token : null,
            isLoading : false
        })
    };


    return (
        <>
        <div>
            <div>
                <div /* onClick = {navBarHandler} */ >
                    <img src="/RectangleNavbar.svg" alt="whiteRect" />
                    <img src="/RectangleNavbar.svg" alt="whiteRect" />
                    <img src="/RectangleNavbar.svg" alt="whiteRect" />
                </div>
                <Link to="/contact">
                    <span>GO!</span>
                </Link>
            </div>
            
            {userAccount.isLoading ? (
                <div>
                    <p>Loading</p>
                </div>
            
            ) : userAccount.token && !userAccount.isLoading ? (
                <div 
                /* yposition = {visibilityNavBar.data.top}  */
                >
                    <Link to="/"  onClick={() => update_app_flow("home")} >
                        <span>{userAccount.user_details.name}</span>
                    </Link>
                    <Link to="/yourkitchen" onClick={() => update_app_flow("dashboard")} >
                        <span>Your Food Stock</span>
                    </Link>
                    <Link to="/search" onClick={() => update_app_flow("search")}>
                        <span>Explore</span>
                    </Link>
                    {userAccount.user_details.username && <span onClick = {logout}>Sign out</span>}

                </div>
            ) : userAccount.token === null && !userAccount.isLoading ? (
                <div>
                    <Link to="/" onClick={() => update_app_flow("home")}>
                        <span>Home</span>
                    </Link>
                    <Link to="/yourkitchen"  onClick={() => update_app_flow("dashboard")}>
                        <span>Login / Sign up</span>
                    </Link>
                    <Link to="/search" onClick={() => update_app_flow("search")}>
                        <span>Discover</span>
                    </Link>
                    {userAccount.user_details.username && <span onClick = {logout}>Sign out</span>}

                </div>
            ) : (
                null
            )}

        </div>
        </>
    );
}
 
export default NavBar;