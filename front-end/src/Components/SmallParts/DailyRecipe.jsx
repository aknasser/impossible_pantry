const DailyRecipe = ({recipeTrigger, dailyRecipe}) => {
    
    const displayRandomRecipe = () => {
        recipeTrigger({
            type : "RECIPE_PICKED",
            recipe : dailyRecipe 
        })
    }
    
    return (
        <>
            <h4 onClick = {displayRandomRecipe}>{dailyRecipe.name}</h4>
        </>
    );
}
 
export default DailyRecipe;