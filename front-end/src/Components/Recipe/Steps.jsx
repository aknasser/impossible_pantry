import * as DivStyle from "../../Style/DivStyle";
import * as TextStyle from "../../Style/TextStyle";

const Steps = ({recipeSteps}) => {

    return (
            <DivStyle.BG_steps>
                {recipeSteps.map((step, index) => (
                    <DivStyle.Cooking_instructions key = {step}>
                        <TextStyle.Item_dashboard>{index + 1} - {step}</TextStyle.Item_dashboard>
                        <br/>
                    </DivStyle.Cooking_instructions>
                ))}
            </DivStyle.BG_steps>

    );
}
 
export default Steps;