import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import StyleContext from "../../Context/StyleContext";
import * as React from 'react';
import * as DivStyle from '../../Style/DivStyle'
import * as ButtonStyle from '../../Style/ButtonStyle'
import * as PictureStyle from '../../Style/PictureStyle'
import BarNavButton from "./BarNavButton";



const NavBar = ({endpoint, pantryUpdater}) => {
        const {userAccount, setUserAccount} = React.useContext(UserContext); // To get the user info in the navBar
        const {style, set_style} = React.useContext(StyleContext);


    const [visibility_navBar, set_visibility_navBar] = React.useState({
        display :"none",
        position : "100%",
        bg_button_color: style.color_theme.primary_color,
        txt_button_color : "white"
    });

    // to display / hide the details of the navbar
    const switch_navbar = () => {
        if (visibility_navBar.display === "none") {
            set_visibility_navBar({
                display : "flex",
                position : "0%",
                bg_button_color: "white",
                txt_button_color : style.color_theme.primary_color
            });
        } else {
            set_visibility_navBar({
                display : "none",
                position : "100%",
                bg_button_color: style.color_theme.primary_color,
                txt_button_color : "white"
            });

        }
    };


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
        <DivStyle.NavBar_grid>
            <DivStyle.NavBar_compact>
                <DivStyle.navbar_three_rect onClick = {switch_navbar}  >
                    <PictureStyle.navBar_rect xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149.99 20.35">
                        <BarNavButton bar_color={visibility_navBar.bg_button_color}/>
                    </PictureStyle.navBar_rect>
                    <PictureStyle.navBar_rect xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149.99 20.35">
                        <BarNavButton bar_color={visibility_navBar.bg_button_color}/>
                    </PictureStyle.navBar_rect>                  
                    <PictureStyle.navBar_rect xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149.99 20.35">
                        <BarNavButton bar_color={visibility_navBar.bg_button_color}/>
                    </PictureStyle.navBar_rect>
                </DivStyle.navbar_three_rect>
                <Link to="/yourkitchen" onClick={() => update_app_flow("dashboard")}>
                    {userAccount.user_details.username ? (
                    <ButtonStyle.Navbar_CTA 
                        onClick = {logout}
                        bg_button = {visibility_navBar.bg_button_color}
                        txt_button = {visibility_navBar.txt_button_color}
                    >
                        Sign out
                    </ButtonStyle.Navbar_CTA>
                    ) : (
                        <ButtonStyle.Navbar_CTA
                            bg_button = {visibility_navBar.bg_button_color}
                            txt_button = {visibility_navBar.txt_button_color}
                        >
                            Login / SignUp
                        </ButtonStyle.Navbar_CTA>
                    )}
                </Link>
            </DivStyle.NavBar_compact>
            
            {userAccount.isLoading ? (
                <div>
                    {null}
                </div>
            
            ) : userAccount.token && !userAccount.isLoading ? (
                <DivStyle.Navbar_extended 
                    visibility = {visibility_navBar}
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
                </DivStyle.Navbar_extended>
            ) : userAccount.token === null && !userAccount.isLoading ? (
                <DivStyle.Navbar_extended
                    visibility = {visibility_navBar}
                >
                    <Link to="/" onClick={() => update_app_flow("home")}>
                        <span>Home</span>
                    </Link>
                    <Link to="/yourkitchen"  onClick={() => update_app_flow("dashboard")}>
                        <span>Your Food Stock</span>
                    </Link>
                    <Link to="/search" onClick={() => update_app_flow("search")}>
                        <span>Discover</span>
                    </Link>

                </DivStyle.Navbar_extended>
            ) : (
                null
            )}
        </DivStyle.NavBar_grid>
    );
}
 
export default NavBar;