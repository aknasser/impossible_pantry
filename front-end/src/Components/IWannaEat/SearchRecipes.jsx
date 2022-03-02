import PageInstructions from "../SmallParts/PageInstructions";
import PageTitle from "../SmallParts/PageTitle";
import RecipesGroup from "../SmallParts/RecipesGroup";
import * as React from 'react';
import axios from "axios";
import Filter from "./SubFilters/Filter";
import KeywordsFilter from "./SubFilters/KeywordsFilter";
import CountryFilter from "./SubFilters/CountryFilter";


const SearchRecipes = ({allIngredients, allStyles}) => {                   // allRecipes will be used to display the recipe available while the user types its request.

    const [recipesFiltered, setRecipesFiltered] = React.useState([]); //RESULT FETCHED WITH AN AUTO POST + REQUEST

    //
    const [styles, setStyles] = React.useState(allStyles); 
    const [ingredients, setIngredients] = React.useState(allIngredients); 

    // We update the countries using by calling an API with the countries name.
    const [countries, setCountries] = React.useState();
    const [difficulties, setDifficulties] = React.useState([
        {
            name : "LEVEL 1 - Easy",
            level : 1
        }, 
        {
            name : "LEVEL 2 - Doable",
            level : 2
        }, 
        {
            name : "LEVEL 3 - Master Chief",
            level : 3
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
                        country : [...state.country, action.payload],
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
                ingredient : [],
                keywords : [],
            },
            isLoading : false,
            isError : false,
            standby : true
        }
    );


    // THIS FUNCTION IS USED TO SORT THE ENTRIES BEFORE DISPLAYING THEM.


    // END - STATE MANAGEMENT  FOR THE FILTER


    return (
        <>
            <PageTitle title="Foodopedia" />
            <PageInstructions instructions="Choose your preferences!"/>


        {/* countries has a different data structure, to make it simple we "hardcode" here without using the Component Filter */}
            <CountryFilter
                countries={countries}
                countriesUpdater = {setCountries}
                filter = {filter}
                filterUpdater = {dispatchFilter}
            />

            <Filter
                filterName = "Style"
                entries = {styles}
                entriesUpdater = {setStyles}
                dataToDisplay = "name"
                filter = {filter}
                filterUpdater = {dispatchFilter}
            />

            <Filter
                filterName = "Difficulty"
                entries = {difficulties}
                entriesUpdater = {setDifficulties}
                dataToDisplay = "name"
                filter = {filter}
                filterUpdater = {dispatchFilter}
            />

            <Filter
                filterName = "Ingredients"
                entries = {ingredients}
                entriesUpdater = {setIngredients}
                dataToDisplay = "name"
                filter = {filter}
                filterUpdater = {dispatchFilter}
            />


            <KeywordsFilter
                filter = {filter}
                filterUpdater = {dispatchFilter}
            />
            {/* the search by keywords is specific:
            1 - appear if the user click on a given button.
            2 - Unlike the other filter, it's a search bar (input text) 
           */}

            

            {/* To display the recipes matching the selected filters */}
            {recipesFiltered.map(recipe => (
                <RecipesGroup recipeFound={recipe} key={recipe._id}/>
            ))}
















{/* COPY JUST IN A CASE...

            <form action="">
            <h3>Search by keywords</h3>
                <input type="text" />
                <input type="submit" />
            </form>


            {!countries ? (
                <p>Loading </p>
            ) : (
                <form>
                    <h3>Country</h3>
                    <label htmlFor="country"></label>
                    <input list="allCountries" id="worldCountry" name="country" />
                    <datalist id="allCountries">
                        {countries.map(country => (
                            <option value={country.name.common} key = {country.name.common}></option>
                        ))}
                    </datalist>
                    <input type="submit" value="Filter"/>
                </form>
            )}

            <form>
                <h3>Style</h3>
                <select name="" id="">
                    {styles.map(style => (
                        <option value={style.name} key={style._id}>{style.name}</option>
                    ))}
                </select>
                <input type="submit" />
            </form> 

            <form>
                <h3>Difficulty</h3>
                <select name="" id="">
                    {difficulties.map(difficulty => (
                        <option value={difficulty} key={difficulty}>{difficulty}</option>
                    ))}
                </select>
                <input type="submit" value="Filter" />
            </form>

            <form>
                <h3>Ingredients</h3> 
                <label htmlFor="ingredient"></label>
                <input list="allIngredients" id="" name="ingredient"/>
                <datalist id="allIngredients">
                    {ingredients.map(ingredient => (
                        <option value={ingredient.name} key={ingredient._id}/>
                    ))}
                </datalist>
                <input type="submit" value="Filter" />
            </form>




            {recipesFiltered.map(recipe => (
                <RecipesGroup recipeFound={recipe} key={recipe._id}/>
            ))} */}
        </>
    );
}
 
export default SearchRecipes;