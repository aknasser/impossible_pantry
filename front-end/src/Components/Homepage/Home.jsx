import PUV from "./PUV";
import ActivityDetails from "./ActivityDetails"




const Home = () => {
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
            <PUV/>
            {activities.map(activity => (
                <ActivityDetails activity={activity} key={activity.title}/>
            ))}
        </>
    );
}
 
export default Home;