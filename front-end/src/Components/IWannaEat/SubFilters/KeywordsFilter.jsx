import FilterList from "../FilterList";
import * as React from 'react';
import axios from "axios";
import * as TextStyle from "../../../Style/TextStyle";
import * as PictureStyle from "../../../Style/PictureStyle";
import * as ButtonStyle from "../../../Style/ButtonStyle";
import * as FormStyle from "../../../Style/FormStyle";



const KeywordsFilter = ({filters, filterUpdater, endpoint, dispatchRecipesFiltered}) => {
    
    // MANAGE THE WORDSS TYPED BY THE USER IN THIS SEARCH BAR
    const [keywordsTyped, setKeywordsTyped] = React.useState("");

    const keywordsUpdater = (event) => {
        setKeywordsTyped(event.target.value);
    };

    // EVERYTIME FILTER CHANGE WE UPDATE THIS COMPONENT TO DISPLAY THE NEW FILTER (OR THE FILTER DELETED).
    React.useEffect ( () => {
        const keyword_filtering = async() => {
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
        if (keywordsTyped !== "") {
            keyword_filtering();
        }
    },[keywordsTyped])



    return (  
        <>
            <TextStyle.Filter_name>Search by keywords</TextStyle.Filter_name>
            <PictureStyle.Filter_pic src="recipes_explorer/keywords.svg" alt="" />  
            <FormStyle.Keywords_form action="">
                <FormStyle.Food_stock_input type="text" onChange = {keywordsUpdater} value = {keywordsTyped} />
                <ButtonStyle.Main_button type="submit" value="Search" />
            </FormStyle.Keywords_form>
        </>


    );
}
 
export default KeywordsFilter;