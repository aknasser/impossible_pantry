import { Link } from "react-router-dom";


const NavBar = () => {

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



    return (
        <>
        <div>
            <div>
                <div /* onClick = {navBarHandler} */ >
                    <img src="/RectangleNavbar.svg" alt="whiteRect" />
                    <img src="/RectangleNavbar.svg" alt="whiteRect" />
                    <img src="/RectangleNavbar.svg" alt="whiteRect" />
                </div>
                <a href="/contact">
                    <span>GO!</span>
                </a>
            </div>
            

            <div 
                /* yposition = {visibilityNavBar.data.top}  */
            >
                    <Link to="/" /* onClick = {navBarHandler} */ >
                        <span>Dashboard</span>
                    </Link>
                    <a href="/#foodStock" /* onClick = {navBarHandler} */>
                        <span>Your Food Stock</span>
                    </a>
                    <a href="/#discover" /* onClick = {navBarHandler} */>
                        <span>Discover</span>
                    </a>
                    <a href="/#signOut" /* onClick = {navBarHandler} */>
                        <span>Sign out</span>
                    </a>

            </div>
        </div>
        </>
    );
}
 
export default NavBar;