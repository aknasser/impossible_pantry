import CategoryForm from "./ModelsForm/CategoryForm"
import IngredientForm from "./ModelsForm/IngredientForm"
import RecipeForm from "./ModelsForm/RecipeForm"
import StyleForm from "./ModelsForm/StyleForm"
import UserForm from "./ModelsForm/UserForm"
import axios from 'axios';


const AddEntry = ({adminManagement, dispatchAdminManagement, endpoint, allCategories, allIngredients, allRecipes, allStyles, allUsers}) => {
    

        // TO AUTOMATICALLY SELECT AND CHECK THE OPTION / CHECKBOXES MATCHING THE ENTRY VALUE FOR A PROPERTY (when we update an entry)
        const selectedAndCheckedInput = (objectToReview, tagName) => {               // ARG 1 : The object with the properties to check || ARG 2 : The type of tag (checkbox or select here)
            // 1 - we check that objectToReview exists,
            if (objectToReview) {
                // 2 - We catch all the children of the form and explore them
                const theForm = document.getElementsByTagName("form")[0];
                const allChildrenForm = theForm.children;
                for (let element of allChildrenForm) {
                    // 3 - Depending on the nodeName (INPUT, SELECT..ETC), we proceed to some verification.
                    switch (element.nodeName) {
                        case "SELECT":
                            const allSelects = document.getElementsByTagName(tagName);
                            for (let select of allSelects) {
                                // a - We get the children of this select tag (== the options) in an array.
                                const allOptions = select.children;
                                // b- We get the name of the element being checked. (We need this info to check the right property of objectToReview)
                                const propertyToCheck = select.getAttribute("name")
                                // c  - Within this array,   IF objectToReview[propertyToCheck exist] AND (value = objectToReview.propertyTargeted OR [propertyToCheck][name] when we check the name of properties connected to a model (ingredients, categories, styles, recipes, users)).
                                for (let i = 0; i < allOptions.length; i++) {
                                    if (objectToReview[propertyToCheck] && 
                                        (objectToReview[propertyToCheck].toString() === allOptions[i].innerHTML || objectToReview[propertyToCheck]["name"] === allOptions[i].innerHTML)) {
                                        // d - we give the attribute "selected" to the matching option,
                                        const selectedOption = allOptions[i];
                                        selectedOption.selected = true;
                                    }
                                }
                            }
                            break;
    
                        case "DIV":
                             // a - If we are in a div, we check the children of this div
                            const divChildren = element.children;
                            // b - We inspect all th children of div with a for of loop.
                            for (let child of divChildren) {
                                const typeToCheck = child.getAttribute("type");
                                // c - When we encounter a checkbox...
                                if (typeToCheck === "checkbox") {
                                    // We identify the property to check and the value.
                                    const propertyToCheck = child.getAttribute("name");
                                    const valueToCheck = child.getAttribute("value");
                                    // If an object has a property with this Name 
                                    if (objectToReview[propertyToCheck]) {
                                        // We check the elements of objectToReview[propertyToCheck] and look for a match.
                                        for (let item of objectToReview[propertyToCheck]) {
                                            if (item === valueToCheck) {            // Both value are object_id
                                                // When there is a match we tick the checkbox.
                                                child.checked = true;
                                            }
                                        }
                                    }
                                }
                            }
                            break; 
                    
                        default:
                            break;
                    }
                }

            }
        };





    // TO UPDATE VALUES WHEN THE USER IS FILLING THE FORM (triggered onChange) - EXCEPT RECIPES (this form uses a reducer )
    const updateValue = (event, entryBeingCreated, stateUpdaterFn) => {
        // 1 - We check the type of input
        if (event.target.type === "checkbox") {
            const entryTicked = event.target.value;
        
            // 2 - we create a hashTable with the entries selected by the user so far
            const entryHashTable = {};
            for (let item of entryBeingCreated[event.target.name]) {
                entryHashTable[item]= true;
            };
            
            // 3 - we check whether the box has been ticked off OR deselected.
                if (!entryHashTable[entryTicked]) { 
                // a - The entryTicked IS NOT PART OF the checkboxes array for this category. The user just has selected it now
                // We have to add it to the checkboxes array.
                    stateUpdaterFn({  
                        ...entryBeingCreated,
                        [event.target.name] : [...entryBeingCreated[event.target.name], entryTicked]
                    }); 
                } else { 
                    console.log("Take it out!!")
                    // b - The entry IS ALREADY PART OF the checkboxes array. The user has just deselected this box
                    // We have to remove this entry from the checkbox array.
            
                    // b1 -  we create an array WITHOUT this entry.
                    const ingredientsUpdated = entryBeingCreated[event.target.name].filter(entry => {
                        return entry !== entryTicked;
                    });
                    console.log(ingredientsUpdated);
            
                    // b2 - we update the state 
                    stateUpdaterFn({  
                        ...entryBeingCreated,
                        [event.target.name] : ingredientsUpdated
                    }); 
                }
        } else {
            stateUpdaterFn({
                ...entryBeingCreated,
                [event.target.name] : event.target.value
            })
        }
    };

    // SUBMIT FORM (CREATE AND UPDATE)
    const submitNewEntry = async(event, entry, modelType) => {   
        event.preventDefault();
        switch (adminManagement.crudAction.name) {
            case "create":
                const createNewEntry = await axios.post(`${endpoint}/${modelType}/create`, entry);
                dispatchAdminManagement({
                    type: "REDIRECTION_ENTRY_CREATED"
                })
                break;
        
            case "update":
                const updateEntry = await axios.post(`${endpoint}/${modelType}/update/${entry._id}`, entry);
                dispatchAdminManagement({
                    type: "REDIRECTION_ENTRY_UPDATED/DELETED"
                })
                break;

            default:
                console.log(`welp we got a bug with adminManagement.crudAction.name: ${adminManagement.crudAction.name}`)
                break;
        }
    }; 

    return (
        <>
            <h2>Add new entry for {adminManagement.modelChosen}</h2>
            {adminManagement.modelChosen === "category" ? (
                <CategoryForm
                    submitNewCategory = {submitNewEntry}
                    allIngredients = {allIngredients}
                    updateValue = {updateValue}
                    objectToUpdate = {adminManagement.crudAction.objectSelected}
                    selectedAndCheckedInput={selectedAndCheckedInput}
                />

            ) : adminManagement.modelChosen === "ingredient" ? (
                <IngredientForm
                    submitNewCategory = {submitNewEntry}
                    allCategories = {allCategories}
                    updateValue = {updateValue}
                    objectToUpdate = {adminManagement.crudAction.objectSelected}
                    selectedAndCheckedInput={selectedAndCheckedInput}
                />

            ) : adminManagement.modelChosen === "recipe" ? (
                <RecipeForm
                    endpoint = {endpoint}
                    submitNewRecipe = {submitNewEntry}
                    allIngredients = {allIngredients}
                    allStyles = {allStyles}
                    objectToUpdate = {adminManagement.crudAction.objectSelected}
                    selectedAndCheckedInput={selectedAndCheckedInput}
                />

            ) : adminManagement.modelChosen === "style" ? (
                <StyleForm
                    submitNewStyle = {submitNewEntry}
                    updateValue = {updateValue}
                    objectToUpdate = {adminManagement.crudAction.objectSelected}
                />

            ) : adminManagement.modelChosen === "user" ? (
                <UserForm
                    submitNewUser = {submitNewEntry}
                    allRecipes = {allRecipes}
                    updateValue = {updateValue}
                    objectToUpdate = {adminManagement.crudAction.objectSelected}
                    selectedAndCheckedInput={selectedAndCheckedInput}

                />
            ) : (
                null
            )}
        </>
    );
}
 
export default AddEntry;