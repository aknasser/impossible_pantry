import FilterList from "../FilterList";
import * as React from 'react';
import axios from "axios";



const KeywordsFilter = ({filters, filterUpdater, endpoint, dispatchRecipesFiltered}) => {
    
    // MANAGE THE WORDSS TYPED BY THE USER IN THIS SEARCH BAR
    const [keywordsTyped, setKeywordsTyped] = React.useState("");

    const keywordsUpdater = (event) => {
        setKeywordsTyped(event.target.value);
    };

    // EVERYTIME FILTER CHANGE WE UPDATE THIS COMPONENT TO DISPLAY THE NEW FILTER (OR THE FILTER DELETED).
    React.useEffect ( async() => {
            if (keywordsTyped !== "") {
                try {
                    // 1 - GET the recipes containing this keywords in their name 
                    const fetchRecipes = await axios.get(`${endpoint}/recipes/search/${keywordsTyped}`, {crossdomain : true});
                    // 2 - Store the results in a variable 
                    const matchingRecipes = fetchRecipes.data;
                    // 3 - update the property keyword of filters
                    dispatchRecipesFiltered({
                        type : "FILTERING_SUCCESS",
                        payload: matchingRecipes
                    });
                } catch (e) {
                    console.log(`Issue to fetch in Keywords Filter :${e}`);
                }
            }
    },[keywordsTyped])



    return (  
        <>
        {/* IDEA TBC ? When the user clicks on this button
         the form for the keywords appear and the others filters are turned off (action FILTER_RESET) - we will use filterUpdater here */}
        <>
            <h3>Search by keywords</h3>  
            <form action="">
                <input type="text" onChange = {keywordsUpdater} value = {keywordsTyped} />
                <input type="submit" value="Search" />
            </form>
            </>
            <FilterList
                selectedFilter = {filters}
            />
        </>


    );
}
 
export default KeywordsFilter;