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
                        <span>Accueil</span>
                    </Link>
                    <a href="/#form" /* onClick = {navBarHandler} */>
                        <span>Un Café Ensemble</span>
                    </a>
                    <a href="/#why" /* onClick = {navBarHandler} */>
                        <span>Pourquoi ?</span>
                    </a>
                    <a href="/#approche" /* onClick = {navBarHandler} */>
                        <span>Mon Approche</span>
                    </a>
                    <a href="/projectsList" /* onClick = {navBarHandler} */>
                        <span>Projets</span>
                    </a>
                    <a href="/blog" /* onClick = {navBarHandler} */>
                    <span>Blog</span>
                    </a>
            </div>
        </div>
        </>
    );
}
 
export default NavBar;