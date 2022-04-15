import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import * as React from 'react';
import * as DivStyle from '../../Style/DivStyle'

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
        <div>
            <DivStyle.NavBar_compact>
                <div /* onClick = {navBarHandler} */ >
                    <img src="/RectangleNavbar.svg" alt="dark_blue_rect" />
                    <img src="/RectangleNavbar.svg" alt="dark_blue_rect" />
                    <img src="/RectangleNavbar.svg" alt="dark_blue_rect" />
                </div>
                <Link to="/yourkitchen" onClick={() => update_app_flow("dashboard")}>
                    <button>Login / SignUp</button>
                </Link>
            </DivStyle.NavBar_compact>
            
            {userAccount.isLoading ? (
                <div>
                    {null}
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
    );
}
 
export default NavBar;