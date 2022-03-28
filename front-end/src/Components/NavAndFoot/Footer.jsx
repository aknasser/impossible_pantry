import axios from 'axios';
import * as React from 'react';
import DailyRecipe from '../SmallParts/DailyRecipe';


const Footer = ({recipeTrigger, endpoint}) => {

    const [dailyRecipe, setDailyRecipe] = React.useState("");

    React.useEffect ( async() => {
            try {
                const fetchRecipes = await axios.get(`${endpoint}/recipes/dailyrecipe`, {crossdomain : true});
                const randomRecipe = await fetchRecipes.data;
                setDailyRecipe(randomRecipe);
                console.log(randomRecipe);
            } catch (e) {
                console.log (`Error in the footer (daily Recipe) : ${e}`);
            };
    }, [])


    return (
        <>
            <DailyRecipe
                recipeTrigger = {recipeTrigger}
                dailyRecipe = {dailyRecipe}
            />
            <div>
                <p>© Copyright 2022</p> 
                <p>Nasser "Nass La Menace" Massadimi</p> 
            </div>

        </>
    );
}
 
export default Footer;