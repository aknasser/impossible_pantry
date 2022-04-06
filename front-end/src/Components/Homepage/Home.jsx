import PUV from "./PUV";
import ActivityDetails from "./ActivityDetails"




const Home = ({pantry_flow}) => {
    const activities = [{
        title: "Inspiration",
        pic :"ingredients.jpg",
        benefits :"Find what to cook with what you have right now. You have more food than you think.",
    },
    {
        title: "Discover new recipes",
        pic :"originalFood.jpg",
        benefits :"Discover new recipes and impress your guests!",
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