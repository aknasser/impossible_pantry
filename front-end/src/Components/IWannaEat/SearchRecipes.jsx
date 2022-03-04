import PageInstructions from "../SmallParts/PageInstructions";
import PageTitle from "../SmallParts/PageTitle";
import RecipesGroup from "../SmallParts/RecipesGroup";
import * as React from 'react';
import axios from "axios";
import Filter from "./SubFilters/Filter";
import KeywordsFilter from "./SubFilters/KeywordsFilter";
import CountryFilter from "./SubFilters/CountryFilter";


const SearchRecipes = ({endpoint, allIngredients, allStyles, recipesUpdater}) => {                   // allRecipes will be used to display the recipe available while the user types its request.

    const [styles, setStyles] = React.useState(allStyles); 
    const [ingredients, setIngredients] = React.useState(allIngredients); 

    // We update the countries using by calling an API with the countries name.
    const [countries, setCountries] = React.useState();
    const [difficulties, setDifficulties] = React.useState([
        {
            name : "1",
        }, 
        {
            name : "2",
        }, 
        {
            name : "3",
        }
    ]); 


    React.useEffect(() => {
        let isMounted = true;
        const fetchCountries = async() => {

                try {
                    let allCountries = await axios.get(`https://restcountries.com/v3.1/all`);
                    const sortedCountries = allCountries.data.sort((a, b) => {
                        let nameA = a.name.common;
                        let nameB = b.name.common;
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0
                    });
                    if (isMounted) {
                        setCountries(sortedCountries);
                    }
                } catch (e) {
                    console.log (`some troubles to get the countries using the API restcountries :${e}`)
            }
        }
        fetchCountries();
        return() => {
            isMounted = false;
            console.log("ça laggggggg ouin ouin!!")
        }
    }, [])


    // START - STATE MANAGEMENT  FOR THE FILTER
     const filterReducer = (state, action) => {
        switch (action.type) {
            case "SEARCH_START":
                return {
                    ...state,
                    isLoading : true,
                    standby : false
                }
            case "ADD_NEW_FILTER":
                return {
                    ...state,
                    filters : {
                        ...state.filters,
                        [action.typeOfFilter] : [...state.filters[action.typeOfFilter], action.payload],
                    },
                    isLoading : false,
                    standby : false
                }


            case "KEYWORDS_FILTERED":
                return {
                    ...state,
                    filters : {
                        ...state.filters,
                        keywords : [...state.keywords, action.payload],
                    },
                    isLoading : false,
                    standby : false
                }

            /* WIP - Reset filters for the filter targeted (use event.target I guess). */
            case "RESET_FILTER":
                return {
                    ...state,
                    [action.filterTargeted] : [],  // We will find a better name later on.
                    isLoading : true,
                    standby : false
                }

            default:
                break;
        }

    };

     const [filter, dispatchFilter] = React.useReducer(
        filterReducer,
        {
            filters : {
                country : [],
                style : [],
                difficulty : [],
                ingredients : [],
                keywords : [],
            },
            isLoading : false,
            isError : false,
            standby : true
        }
    );


    // This useEffect check the new state of the filter
    React.useEffect( () => {
        console.log(`new State of Filter : ${JSON.stringify(filter)}`);
    }, [filter])

    // END - STATE MANAGEMENT  FOR THE FILTER


    // START - Action to add new filter
    /* This function is passed to the following component : Filters, CountryFilter
        When is it triggered : When the user "submit" the Filter selected and click on the button Filter
        What does it do ? : 
            1 - Prevent the form to reload the page.
            2 - Collect the data typed by the user
            3 - format the filterName to target the right property of filter
            4 - Update
        Final outcome(s) ? : A new filter is added to the search ==> A new element is added to the property targeted during the submit process. The new element is the filterTyped (with validation) by the user 
     */

    const submitFilter = (event, filterToUpdate, filterInTheInputField) => {
        // 1 - Prevent the usual action of the submitted form (DONE!)
        event.preventDefault();
        console.log(`New Filter : ${filterInTheInputField}`)
        // 2 - Collect the data submitted in an array AND the property to update (for instance, countryFilter, ingredientFilter)
        const newFilter = filterInTheInputField;

        // 3 - We change the format of the ... to make it match with the right property of filter (we just need to use lowercase())
        const cleanPropertyFormat =  filterToUpdate.toLowerCase();

        // 4 - Update the array filter using the dispatch function upddater (called filterUpdater in this component and use the type : ADD_NEW_FILTER)          
        dispatchFilter({
            type : "ADD_NEW_FILTER",
            payload : newFilter,
            typeOfFilter : cleanPropertyFormat
        })
    };
    // END - Action to add new filter


    // START - DISPLAYING THE RECIPES MATCHING THE FILTER
    
    // 1 - A state to contains the matching recipes
    const [recipesFiltered, setRecipesFiltered] = React.useState([]);
    
    // 2 - USE EFFECT TO POST THE FILTER 
    React.useEffect( async() => {
        let isMounted = true;
        try {
            const matchingRecipes = await axios.post(`${endpoint}/recipes/filteredrecipes`, filter);
            // 3 - Update recipesFiltered with the newRecipes
            if (isMounted) {
                setRecipesFiltered(matchingRecipes.data);
            }
        }catch (e) {
            console.log(`Error to fetch the filtered Recipes : ${e}`);
        }
        return () => {
            isMounted = false;
            console.log("it's not time yet!")
        }
    }, [filter])
    
    // A mere useeffect() to check the value of recipes

    React.useEffect( () => {
        console.log(`recipesFiltered : ${JSON.stringify(recipesFiltered)}`)
    }, [recipesFiltered])


    // START - DISPLAYING THE RECIPES MATCHING THE FILTER


    return (
        <>
            <PageTitle title="Foodopedia" />
            <PageInstructions instructions="Choose your preferences!"/>


        {/* countries has a different data structure, to make it simple we "hardcode" here without using the Component Filter */}
            <CountryFilter
                filterName = "Country"
                countries={countries}
                countriesUpdater = {setCountries}
                filter = {filter.filters.country}
                submitFilter ={submitFilter}
            />

            <Filter
                filterName = "Style"
                entries = {styles}
                entriesUpdater = {setStyles}
                dataToDisplay = "name"
                filter = {filter.filters.style}
                submitFilter ={submitFilter}
            />

            <Filter
                filterName = "Difficulty"
                entries = {difficulties}
                entriesUpdater = {setDifficulties}
                dataToDisplay = "name"
                filter = {filter.filters.difficulty}
                submitFilter = {submitFilter}
            />

            <Filter
                filterName = "Ingredients"
                entries = {ingredients}
                entriesUpdater = {setIngredients}
                dataToDisplay = "name"
                filter = {filter.filters.ingredients}
                submitFilter = {submitFilter}

            />


            <KeywordsFilter
                filter = {filter.filters.keywords}
                filterUpdater = {dispatchFilter}
            />
            {/* the search by keywords is specific:
            1 - appear if the user click on a given button.
            2 - Unlike the other filter, it's a search bar (input text) 
           */}

            

            {/* To display the recipes matching the selected filters */}
{/*                 {!recipesFiltered ? (
                    <p>No recipes found</p>
                ) : 
                (
                    <RecipesGroup recipeFound={recipesFiltered} pantryUpdater={recipesUpdater}/>
                )}   */}
        </>
    );
}
 
export default SearchRecipes;