import PUV from "./PUV";
import ActivityDetails from "./ActivityDetails"
import StyleContext from "../../Context/StyleContext";
import * as React from 'react';




const Home = ({pantry_flow}) => {

    const {style, set_style} = React.useContext(StyleContext);


    const activities = [{
        title: "Inspiration",
        pic :"fridge.svg",
        pic_width: "45vw",
        benefits :"Find what to cook with what you have right now. You have more food than you think.",
        bg_color: style.color_theme.secundary_color,
        txt_color : style.color_theme.primary_color,
        link : "/yourkitchen"
    },
    {
        title: "Discover new recipes",
        pic :"new_recipes.svg",
        pic_width : "85vw",
        benefits :"Discover new recipes and impress your guests!",
        bg_color: style.color_theme.third_color,
        txt_color : "white",
        link: "/search"
    }

    ];




    return (
        <>
            <PUV
                pantry_flow = {pantry_flow} // To manage the flow of the app when thge user click on a link.
            />
            {activities.map(activity => (
                <ActivityDetails activity={activity} key={activity.title}/>
            ))}
        </>
    );
}
 
export default Home;