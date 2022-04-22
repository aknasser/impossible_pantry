import * as ButtonStyle from '../Style/ButtonStyle'
import * as TextStyle from '../Style/TextStyle'
import * as PictureStyle from '../Style/PictureStyle'
import { Link } from "react-router-dom";


const NotFound = ({pantryUpdater}) => {

    const back_to_homepage = () => {
        pantryUpdater({
            type : "UI_FLOW",
            page_name : "home"  
        })
        window.scrollTo({      
            top : 0,
            behavior :"smooth"
        })
    };

    return (
        <div>
            <TextStyle.Title_404>Sorry my man...404 - Cette page n'existe pas</TextStyle.Title_404>
            <PictureStyle.Error_pic src="/not_found_pic.jpg" alt="Page not Found"/>
                <Link to="/">
                    <ButtonStyle.Error_button onClick = {back_to_homepage}>
                        Back to homepage
                    </ButtonStyle.Error_button>
                </Link>
        </div>
    );
}
 
export default NotFound;