const RecipesGroup = ({recipesGroup}) => {
    return (

        
        <div>
            <h3>{recipesGroup.title}</h3>
            
            {/* A map to get all the recipes and their properties*/}
             {recipesGroup.recipes.map(meal => (
                <div key = {meal._id}>
                    <a href={`recipe/${meal._id}`}>
                        <h4>{meal.name}</h4>
                    </a>
                        <span>Style: {meal.style.name}</span>
                        <span>Difficulty: {meal.difficulty}</span>
                        <span>Main Ingredient: {meal.mainIngredient.name}</span>
                </div>
            ))} 
        </div>
    );
}
 
export default RecipesGroup;