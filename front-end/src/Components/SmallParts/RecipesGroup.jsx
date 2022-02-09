const RecipesGroup = ({recipeFound}) => {
    return (

/* 
- We create an object containing 3 objects : PerfectMatch, Almost, A stretch
- We run an array.map here
- and then another array.map to get all the recipes by Category

*/        
        <div>
{/* A map to get all the recipes */}
            <a href={`recipe/${recipeFound._id}`}>
                <h4>{recipeFound.name}</h4>
            </a>
            <h5>{recipeFound.style}</h5>
            <h5>{recipeFound.difficulty}</h5>
            <h5>{recipeFound.mainIngredient}</h5>
        </div>
    );
}
 
export default RecipesGroup;