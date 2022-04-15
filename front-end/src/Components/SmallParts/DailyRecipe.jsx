import * as React from 'react';

const DailyRecipe = ({recipeTrigger, dailyRecipe}) => {
    
    const displayRandomRecipe = () => {
        recipeTrigger({
            type : "RECIPE_PICKED",
            recipe : dailyRecipe 
        })
    }
    
    React.useEffect( () => {
        console.log(`ING NEEDED RAND : ${JSON.stringify(dailyRecipe)}`)
    }, [])
    return (
        <>
            <h3>Recipe of the day</h3>
            <h5 onClick = {displayRandomRecipe}>{dailyRecipe.name}</h5>
            <h6>{dailyRecipe.intro}</h6>
        </>
    );
}
 
export default DailyRecipe;