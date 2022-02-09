import PageTitle from "../../SmallParts/PageTitle"
import PageInstructions from "../../SmallParts/PageInstructions"
import RecipesGroup from "../../SmallParts/RecipesGroup";

const RecipesAvailable = () => {

    // Some FETCH GET REQUEST


    const matchingRecipes = [                   // Just an example
        {
            title : "Perfect Match :D",
            recipes : [                         // One of the FETCH (GET perfectmatch)
                {
                    name : "",
                    steps: "",
                    country: "",
                    style: "",
                    difficulty: "",
                    pictureUrl : "",
                    mainIngredient: "",
                    ingredientsNeeded : []
                },
                {
                    name : "",
                    steps: "",
                    country: "",
                    style: "",
                    difficulty: "",
                    pictureUrl : "",
                    mainIngredient: "",
                    ingredientsNeeded : []
                }
            ]
        },
        {
            title : "Almost!",
            recipes : [                             // One of the FETCH (GET almost)   
                {
                    name : "",
                    steps: "",
                    country: "",
                    style: "",
                    difficulty: "",
                    pictureUrl : "",
                    mainIngredient: "",
                    ingredientsNeeded : []
                },
                {
                    name : "",
                    steps: "",
                    country: "",
                    style: "",
                    difficulty: "",
                    pictureUrl : "",
                    mainIngredient: "",
                    ingredientsNeeded : []
                }
            ]
        },
        {
            title : "A bit of a strech...",
            recipes : [                                         // One of the FETCH (GET abittough)   
                {
                    name : "",
                    steps: "",
                    country: "",
                    style: "",
                    difficulty: "",
                    pictureUrl : "",
                    mainIngredient: "",
                    ingredientsNeeded : []
                },
                {
                    name : "",
                    steps: "",
                    country: "",
                    style: "",
                    difficulty: "",
                    pictureUrl : "",
                    mainIngredient: "",
                    ingredientsNeeded : []
                }
            ]
        },
    ];

    return (
        <>
            <PageTitle title="Matching recipes"></PageTitle>
            <PageInstructions instructions="Here is what you can cook with your food stock" />
            {matchingRecipes.map(recipeGroup => (
                <div>
                    <h2>{recipeGroup.title}</h2>
                    {recipeGroup.map(recipe => (
                        <RecipesGroup recipeFound={recipe}/>
                    ))}
                </div>
            ))}

        </>
    );
}
 
export default RecipesAvailable;