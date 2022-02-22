import PageTitle from "../../SmallParts/PageTitle"
import PageInstructions from "../../SmallParts/PageInstructions"
import RecipesGroup from "../../SmallParts/RecipesGroup";

const RecipesAvailable = () => {

    // Some FETCH GET REQUEST
    /* STEPS TO COMPLETE THIS PART
    1 - CREATE AN ENDPOINT IN THE BACK-END TO GET THE MATCHING RECIPES (the tricky part)
        a - Create a hash Table with user.stock
        b-  For each recipe check if their property "ingredientNeeded" is contained in the hashTable created with user.stock
        c-  To do so, we create a variable  const missingIngredinent = 0
        d - everytime, an ingredient is absent from the hashtable, missingingredient++ (it increases by 1).
        e - once the loop for is over, we check the variable missingIngredient.
        f - if missingIngredient = 0 we push the recipe in the object perfectMatch | = 1 in the object almost | = 2 a stretch
        g - We send these 3 objects in the response (we store these 3 objects in one array).

    2 - PREPARE THE GET REQUEST HERE - nothing special here. Target the right endpoint

    3 - PUT THE RESPONSE (something.data) in an array (collection of 3 objects) - nothing special here

    4 - LOOP INTO THE 3 OBJECTS OF THIS ARRAY

    5 - IN PANTRY, CHANGE THE REDIRECTION TARGET IN THE submit handler function.
    
    
     */

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