const Steps = ({recipeSteps}) => {

    return (
            recipeSteps.map((step, index) => (
                <div key = {step}>
                    <span>{index + 1} - {step}</span>
                    <br/>
                </div>
            ))
    );
}
 
export default Steps;