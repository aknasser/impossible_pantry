const Suggestions = ({randomRecipe, go_to_recipe_featured}) => {

    const go_to_recipe = (recipe) => {
        go_to_recipe_featured({
            type : "RECIPE_PICKED",
            recipe : recipe,
        })
    };

    return (
        <div onClick={() => go_to_recipe(randomRecipe)}>
            <h3>{randomRecipe.name}</h3>
            <a href ={`recipe/${randomRecipe._id}`}>
                <img src={randomRecipe.pic} alt="RecipePic" />
            </a>
        </div>
    );
}
 
export default Suggestions;