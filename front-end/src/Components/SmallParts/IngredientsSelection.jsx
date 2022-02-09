import axios from 'axios';
import * as React from 'react';
import IngredientsList from "./IngredientsList";


const IngredientsSelection = ({category, endpoint}) => {




// This variable includes all the ingredients available for a given category.
    const [categoryIng, setCategoryIng] = React.useState([]);



    React.useEffect(() => {
        //isMounted will help us to control the state of the component and set the clean-up function (the return function at the end of fechCatIng)
        let isMounted = true;

        const fetchCatIng = async() => {
            try {
                let allIng = [];
                // we loop in the ingredients included in category.
                for (let i = 0; i < category.ingredients.length; i++) {
                    const ingFetched = await axios.get(`${endpoint}/ingredients/${category.ingredients[i]}`, {crossdomain : true});
                    // IF the ingredient exists AND the component is mounted 
                    if (category.ingredients[i] && isMounted) {
                        console.log(ingFetched.data.name);
                        allIng.push(ingFetched.data);
                        console.log ("allIng (le content de l'update) :" + allIng); 

                    }
                }
                 setCategoryIng(allIng);  
                console.log("categoryIng :" + categoryIng);
            } catch(e) {
                console.log("Heyo we have some issue to fetch the data : " + e);
            }
        }; 
        fetchCatIng();

    //below, The clean-up function. We used is to set isMounted = false; "block" the fetch while waiting for the mounting component. 
        return () => {
            isMounted = false;
            console.log("Component not mounted yet")
        };

    }, []);


    


// This variable includes the ingredients added by the user to its foodstock.
    const [newIngredients, setNewIngredients] = React.useState([]);

/* // The handler function to update newIngredients with new value
    const ingredientsHandler = (event) => {
        setNewIngredients(event.target.value);
    }; */

// This functions enable us to updat
    const validationIngredients = (event) => {
        setNewIngredients(event.target.value) // It's an array so we have to take this into account think about rest operator, to update the array
    };


    return (
        <div>
            <h3>{category.name}</h3>
            <img src={category.categoryPicture} alt="Category" />
            <h4>{category.description}</h4>
            <form action="" onSubmit={validationIngredients}>
                <label htmlFor="ingInput">In your kitchen...</label>
                <input list={category.name} id={category._id} name="pickedIng" /* onChange= {() => ingredientsHandler()} */ />
                <datalist id={category.name}>
                    {categoryIng.map(ingredient => (
                        <option value={ingredient.name} key={ingredient._id} />
                    ))} 
                </datalist>
                <input type="submit" />
            </form>
            <IngredientsList ingredients={newIngredients}/>

        </div>
    );
}
 
export default IngredientsSelection;