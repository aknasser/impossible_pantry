import PageInstructions from "../SmallParts/PageInstructions";
import PageTitle from "../SmallParts/PageTitle";
import RecipesGroup from "../SmallParts/RecipesGroup";
import * as React from 'react';
import axios from "axios";
import Filter from "./SubFilters/Filter";
import KeywordsFilter from "./SubFilters/KeywordsFilter";
import useCountries from "../../CustomHooks/useCountries";


const SearchRecipes = ({endpoint, allIngredients, allStyles, recipesUpdater, checkValidation, checkDuplicate}) => {                   // allRecipes will be used to display the recipe available while the user types its request.

    const [styles, setStyles] = React.useState(allStyles); 
    const [ingredients, setIngredients] = React.useState(allIngredients); 

    // We use our customHook useCountries() to get the countries.
    const [countries, setCountries] = useCountries();
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


    /* React.useEffect(() => {
        let isMounted = true;
        const fetchCountries = async() => {

                try {
                    let allCountries = await axios.get(`https://restcountries.com/v3.1/all`);
                    // 1 - we push all the countries.name.common in an array of objects with one property (name).
                    // With this data manipulation, the countries have a similar structure as styles/ingredients/difficulties


                    let countriesName = [];
                    for (let i = 0 ; i < allCountries.data.length; i++) {
                        allCountries.data[i].name = allCountries.data[i].name.common;
                    }

                    // 2 - We sort the countries in the ascendant order (based on their name - we just defined it up there)
                    const sortedCountries =  allCountries.data.sort( (a, b) => {
                        let entryNameA = a.name;
                        let entryNameB = b.name;

                        if ( entryNameA < entryNameB) {
                            return -1;
                        };

                        if ( entryNameA > entryNameB) {
                          return 1;
                        };
                        return 0;
                    })  
                // 3 - Once the component is Mounted, we update the value of countries with our array sorted by ascendant order.
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
    }, []); */


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

            case "DELETE_FILTER": 
                return {
                    ...state,
                    filters : {
                        ...state.filters,
                        [action.typeOfFilter] : action.payload
                    },
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
                    filters : {
                        ...state.filters,
                        [action.typeOfFilter] : [],  // We will find a better name later on.
                    },
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
                keywords : "",    // keywords is only a couple of string. An array isn't neccesary here. 
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


    // START - ADD, DELETE AND RESET  FILTERS
    /* This function is passed to the following component : Filters, CountryFilter
        When is it triggered : When the user "submit" the Filter selected and click on the button Filter
        What does it do ? : 
            1 - Prevent the form to reload the page.
            2 - Check the data (correct data ? duplicated data ?).
            3 - format the filterName to target the right property of filter
            4 - Check the data validity (entry accepted ? duplicate)
            5 - Update...or Reject the user entry

        Parameters : 
            param 1 - the event itself
            param 2 - the entries accepted for this filter
            param 3 - the name of the field to update using the reducer action (ex : country, styles, etc).
            param 4 - the value of the new filter (ex: France, Yummy, tomato pulp, etc).
        Final outcome(s) ? : A new filter is added to the search ==> A new element is added to the property targeted during the submit process. The new element is the filterTyped (with validation) by the user 
     */


    const addFilter = (event, entriesAccepted, filterInputFieldName, newFilter) => {
        // 1 - Prevent the usual action of the submitted form (DONE!)
        event.preventDefault();
        console.log(`New Filter : ${newFilter}`)


        // 3 - We change the format of newFilter to make it match with the right property of filter (we just need to use lowercase())
        const cleanInputField =  filterInputFieldName.toLowerCase();

        // 4 - Check the data validity (entry accepted ? duplicate)
        const validEntry = checkValidation(entriesAccepted, newFilter);
        const uniqueEntry = checkDuplicate(filter.filters[cleanInputField], newFilter);

            
        // 5 - Update the array filter using the dispatch function upddater (called filterUpdater in this component and use the type : ADD_NEW_FILTER)          
        if (validEntry && uniqueEntry) {
            console.log ("Entry accepted!");
            dispatchFilter({
                type : "ADD_NEW_FILTER",
                payload : newFilter,
                typeOfFilter : cleanInputField
            })
        }
        // ...Reject the user entry
        if (!validEntry) {
            alert("entry not valid. Please choose/type a valid option!");
        };

        if (!uniqueEntry) {
            alert("duplicated entry!"); 
        }
    };

    const deleteFilter = (filterToDelete, propertyToAmend) => { 
        //We need these parameters :
        // param 1 - the filter we want to delete
        // param 2 - the field name to amend in the state "filter"
        // 1 - Format fieldToAmend to match with the properties in the filter state
        const cleanProperty = propertyToAmend.toLowerCase()

        // 2 - Get all the elements for the filter to delete
        const allElements = filter.filters[cleanProperty];

        // 3 - With array.reduce(), select all the elements of this filter EXCEPT the filterToDelete
        const updatedFilter = allElements.filter(element => {
            return element !== filterToDelete
        });
        console.log(updatedFilter);

        // 4 - Update the filter state using the REDUCER ACTION 
        dispatchFilter({
            type : "DELETE_FILTER",
            payload : updatedFilter,
            typeOfFilter : cleanProperty
        }) 
    };

    const resetFilter = (propertyToClean) => {
        // 1 - We clean the property collected from the Component Filter to match with the properties of the "filter" state
        const cleanProperty = propertyToClean.toLowerCase();

        // We update the state using the dispatchFilter.
        dispatchFilter({
            type : "RESET_FILTER",
            typeOfFilter : cleanProperty
        }) 
    };
    // END - ADD, DELETE AND RESET  FILTERS



    // START - DISPLAYING THE RECIPES MATCHING THE FILTER
    
    // 1 - A state to contains the matching recipes


    const recipesFilteredReducer = (state, action) => {
        switch (action.type) {
            case "FILTERING_START":
                return {
                    ...state,
                    isLoading : true,
                };
            case "FILTERING_SUCCESS":
                return {
                    ...state,
                    isLoading : false,
                    recipes : action.payload
                };
            default:
                break;
        }
    }

    const [recipesFiltered, dispatchRecipesFiltered] = React.useReducer(
        recipesFilteredReducer,
        {isLoading : false, isError : false}
    );
    
    // 2 - USE EFFECT TO POST THE FILTER 
    React.useEffect(() => {
        let isMounted = true;
        const filtering_api_call = async() => {
            try {
                const matchingRecipes = await axios.post(`${endpoint}/recipes/filteredrecipes`, filter);
                // 3 - Update recipesFiltered with the newRecipes
                if (isMounted) {
                    dispatchRecipesFiltered({
                        type : "FILTERING_SUCCESS",
                        payload : matchingRecipes.data
                    });
                }
            } catch (e) {
                console.log(`Error to fetch the filtered Recipes : ${e}`);
            }
        }
        if (isMounted) {
            filtering_api_call();
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





    return (
        <>
            <PageTitle title="Foodopedia" />
            <PageInstructions instructions="Choose your preferences!"/>

            {!countries || !styles ||!difficulties || !ingredients ? (
                <p>Loading</p>
            ) : (
                <>
                    <Filter
                        filterName = "Country"
                        entries = {countries}
                        entriesUpdater = {setCountries}
                        filters = {filter.filters.country}
                        addFilter ={addFilter}
                        deleteFilter = {deleteFilter}
                        resetFilter = {resetFilter}
                        checkValidation = {checkValidation}
                    />

                    <Filter
                        filterName = "Style"
                        entries = {styles}
                        entriesUpdater = {setStyles}
                        filters = {filter.filters.style}
                        addFilter ={addFilter}
                        deleteFilter = {deleteFilter}
                        resetFilter = {resetFilter}
                        checkValidation = {checkValidation}
                    />

                    <Filter
                        filterName = "Difficulty"
                        entries = {difficulties}
                        entriesUpdater = {setDifficulties}
                        filters = {filter.filters.difficulty}
                        addFilter ={addFilter}
                        deleteFilter = {deleteFilter}
                        resetFilter = {resetFilter}
                        checkValidation = {checkValidation}
                    />

                    <Filter
                        filterName = "Ingredients"
                        entries = {ingredients}
                        entriesUpdater = {setIngredients}
                        filters = {filter.filters.ingredients}
                        addFilter ={addFilter}
                        deleteFilter = {deleteFilter}
                        resetFilter = {resetFilter}
                        checkValidation = {checkValidation}

                    />

                    <KeywordsFilter
                        filters = {filter.filters.keywords}
                        filterUpdater = {dispatchFilter}
                        endpoint = {endpoint}
                        dispatchRecipesFiltered ={dispatchRecipesFiltered}
                    />
                </>
            )}

            {/* To display the recipes matching the selected filters */}
            {recipesFiltered.isLoading || !recipesFiltered.recipes  ? (
                <>
                    <p>No Recipes found</p>
                </>
                ) : 
                (
                     <RecipesGroup recipesGroup={recipesFiltered} pantryUpdater={recipesUpdater}/>
                )
            }
        </>
    );
}
 
export default SearchRecipes;