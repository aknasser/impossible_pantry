import * as React from 'react';
import * as TextStyle from '../../Style/TextStyle';


const DailyRecipe = ({recipeTrigger, dailyRecipe}) => {
    
    const displayRandomRecipe = () => {
        recipeTrigger({
            type : "RECIPE_PICKED",
            recipe : dailyRecipe 
        })
        window.scrollTo({      
            top : 0,
            behavior :"smooth"
        })
    }
    
    React.useEffect( () => {
        console.log(`ING NEEDED RAND : ${JSON.stringify(dailyRecipe)}`)
    }, [])
    return (
        <>
            <h3>Recipe of the day</h3>
            <TextStyle.Recipe_title_footer onClick = {displayRandomRecipe}>{dailyRecipe.name}</TextStyle.Recipe_title_footer>
            <TextStyle.Recipe_description_footer>{dailyRecipe.intro}</TextStyle.Recipe_description_footer>
        </>
    );
}
 
export default DailyRecipe;