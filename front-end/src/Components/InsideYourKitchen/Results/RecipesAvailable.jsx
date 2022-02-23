import PageTitle from "../../SmallParts/PageTitle"
import PageInstructions from "../../SmallParts/PageInstructions"
import RecipesGroup from "../../SmallParts/RecipesGroup";
import * as React from 'react';
import axios from "axios";
import UserContext from "../../../Context/UserContext";
import  {useContext} from "react";



const RecipesAvailable = ({endpoint}) => {

    // Some FETCH GET REQUEST
    /* STEPS TO COMPLETE THIS PART
    1 - CREATE AN ENDPOINT IN THE BACK-END TO GET THE MATCHING RECIPES (the tricky part)
    2 - PREPARE THE GET REQUEST HERE - nothing special here. Target the right endpoint
    3 - PUT THE RESPONSE (something.data) in an array (collection of 3 objects) - nothing special here
    4 - LOOP INTO THE 3 OBJECTS OF THIS ARRAY
    5 - IN PANTRY, CHANGE THE REDIRECTION TARGET IN THE submit handler function.
    */

    // We will the user to sent the GET request to the right endpoint
    const {userAccount, setUserAccount} = useContext(UserContext);


    const matchRecipesReducer = (state, action) => {
        switch (action.type) {
            case "FETCH_MATCHED_RECIPES_START":
                return {
                    ...state,
                    isLoading : true,
                    isError : false
                }
            case "FETCH_MATCHED_RECIPES_SUCCESS":
                return {
                    ...state,
                    isLoading : false,
                    isError : false,
                    data : action.payload
                }

            case "FETCH_MATCHED_RECIPES_ERROR":
                return {
                    ...state,
                    isLoading : false,
                    isError : true
                }
            default : 
                console.log("Nothing happended...so sad!");
        }

    }

    const [matchingRecipes, dispatchMatchingRecipes] = React.useReducer(
        matchRecipesReducer,
        {isLoading : false, isError : false}
    );
    



    React.useEffect( () => {
        let isMounted = true;
        const getRecipes = async() => {
            if(isMounted) {
                try {
                    console.log(`userId : ${userAccount.content._id}`)
                    dispatchMatchingRecipes({
                        type : "FETCH_MATCHED_RECIPES_START"
                    })
                    const fetchRecipe = await axios.get(`${endpoint}/recipes/matchingRecipes/${userAccount.content._id}`, {crossdomain : true});
                    const availableRecipes = await fetchRecipe.data;
                    dispatchMatchingRecipes({
                        type : "FETCH_MATCHED_RECIPES_SUCCESS",
                        payload : {
                            perfectMatchRecipes : availableRecipes.perfectMatchRecipes, 
                            almostRecipes: availableRecipes.almostRecipes, 
                            complexRecipes: availableRecipes.complexRecipes
                        }
                    });
                } catch (e) {
                    console.log("The error:" + e);
                    dispatchMatchingRecipes({type : "FETCH_MATCHED_RECIPES_ERROR"});
                }

            }
        }
        getRecipes();
        return () => {
            isMounted = false;
            console.log("Hold...hold...");
            dispatchMatchingRecipes({
                type : "FETCH_MATCHED_RECIPES_START"
            })
        }
    }, [endpoint, userAccount.content._id]);

    // To check the state "availableRecipes" if needed.
    React.useEffect( () => {
        let isMounted = true;
        if (isMounted && matchingRecipes.data) {
            console.log(JSON.stringify(matchingRecipes.data))

        }
        return () => {
            isMounted = false;
            console.log("We are waiting baby!")
        }
    }, [matchingRecipes])



    return (
        <>
            <PageTitle title="Matching recipes"></PageTitle>
            <PageInstructions instructions="Here is what you can cook with your food stock" />
                {/* IF we are : LOADING THE DATA(isLoading=true) OR IF DATA is still undefined ==> We display a Loading Message */}
                {matchingRecipes.isLoading || !matchingRecipes.data  ?  (
                    <p>Recipes incoming...</p>
                ) : (
                <div>
                    <RecipesGroup recipesGroup={matchingRecipes.data.perfectMatchRecipes}/>
                    <RecipesGroup recipesGroup={matchingRecipes.data.almostRecipes}/>
                    <RecipesGroup recipesGroup={matchingRecipes.data.complexRecipes}/>
                </div> 
                )}
        </>
    );
}
 
export default RecipesAvailable;