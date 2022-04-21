import axios from 'axios';
import * as React from 'react';
import DailyRecipe from '../SmallParts/DailyRecipe';
import * as TextStyle from '../../Style/TextStyle'
import * as DivStyle from '../../Style/DivStyle'
import { Link } from "react-router-dom";


const Footer = ({recipeTrigger, endpoint}) => {

    const [dailyRecipe, setDailyRecipe] = React.useState("");

    // TO get the random recipe from the API.
    React.useEffect ( () => {
        const get_random_recipe = async() => {
            try {
                const fetchRecipes = await axios.get(`${endpoint}/recipes/dailyrecipe`, {crossdomain : true});
                const randomRecipe = await fetchRecipes.data;
                setDailyRecipe(randomRecipe);
            } catch (e) {
                console.log (`Error in the footer (daily Recipe) : ${e}`);
            };
        }
        get_random_recipe();

    }, [])


    return (
        <DivStyle.Footer_div>
            <DailyRecipe
                recipeTrigger = {recipeTrigger}
                dailyRecipe = {dailyRecipe}
            />
            <DivStyle.Copyright>
                <span>Nasser "Nass La Menace" Massadimi</span> 
                <span>© Copyright 2022</span> 
            </DivStyle.Copyright>

        </DivStyle.Footer_div>
    );
}
 
export default Footer;