import * as DivStyle from "../../Style/DivStyle";

const Suggestions = ({randomRecipe, go_to_recipe_featured}) => {

    const go_to_recipe = (recipe) => {
        go_to_recipe_featured({
            type : "RECIPE_PICKED",
            recipe : recipe,
        })
        window.scrollTo({      
            top : 0,
            behavior :"smooth"
        })
    };

    return (
        <DivStyle.Suggestion onClick={() => go_to_recipe(randomRecipe)}>
                <h3>{randomRecipe.name}</h3>
                {/* <img src={randomRecipe.pic} alt="RecipePic" />   ONLY FOR DESKTOP ?*/}
        </DivStyle.Suggestion>
    );
}
 
export default Suggestions;