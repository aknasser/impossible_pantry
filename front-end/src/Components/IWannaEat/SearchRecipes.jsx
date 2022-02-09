import PageInstructions from "../SmallParts/PageInstructions";
import PageTitle from "../SmallParts/PageTitle";
import RecipesGroup from "../SmallParts/RecipesGroup";
import SearchFilter from "./SearchFilter";


const SearchRecipes = ({allRecipes}) => {                   // allRecipes will be used to display the recipe available while the user types its request.

    const recipesFiltered = []; //RESULT FETCHED WITH A POST + REQUEST


    return (
        <>
            <PageTitle title="Foodopedia" />
            <PageInstructions instructions="Choose your preferences!"/>
            <div>
                <h3>Search by Name</h3>
                <form action="">
                    <input type="text" />
                </form>
            </div>
            <div>
            <h3>Search by Filter</h3>
                <SearchFilter/>
            </div>
            {recipesFiltered.map(recipe => (
                <RecipesGroup recipeFound={recipe}/>
            ))}

        </>
    );
}
 
export default SearchRecipes;