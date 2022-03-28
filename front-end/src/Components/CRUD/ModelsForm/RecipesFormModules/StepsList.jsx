const StepsList = ({steps, ingredients, deleteItem}) => {

    return (
        <>
            {steps && (
                <div>
                {steps.map((step, index) => (
                    <div key={index}>
                        <span>{index + 1} - {step} </span>
                        <button onClick = {(event) => deleteItem(event, "REMOVE_STEP_OR_INGREDIENT", step, steps, "steps")}> - </button>
                        <br/>
                    </div>
                ))}
                </div>
            )} 
            {ingredients && (
                <div>
                    {ingredients.map((food, index) => (
                        <div key= {index}>
                            <span>{food.ingredient.name || food.ingredient} </span> {/* food.ingredient.name = when we display an ingredient already in the recipe object stored in the DB || food.ingredient = when we display an object we have just added with the form */}
                            <span>{food.quantity} </span>
                            <span>{food.ingredient.unit}</span>
                            <button onClick = {(event) => deleteItem(event, "REMOVE_STEP_OR_INGREDIENT", food, ingredients, "ingredientsNeeded")}> - </button>
                            <br/>
                        </div>
                    ))}
                </div>
            )}
        </>    
    )
};
 
export default StepsList;