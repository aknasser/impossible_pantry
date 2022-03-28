import * as React from 'react';


const CategoryForm = ({submitNewCategory, allIngredients, updateValue, objectToUpdate, selectedAndCheckedInput}) => {
    
    const [newCategory, setNewCategory] = React.useState(objectToUpdate || {                  // We just need to give an alterative value (with ||) to get the form for Update operations!!!
        name : "",
        ingredients : [],
        categoryPicture : "",
        description : ""
    });

    // CHECK THE NEW CATEGORY BEING CREATED
    React.useEffect ( () => {
        console.log (JSON.stringify(newCategory));
    }, [newCategory])


    // To select automatically the right option input when objectToUpdate exists! 
    // For example, If objectToUpdate.price = 3, we want to have this option selected from the get-go.
    React.useEffect( () => {
        selectedAndCheckedInput(objectToUpdate, "checkbox");
    }, [objectToUpdate])




    return (
        <>
            <form onSubmit = {(event) => submitNewCategory(event, newCategory, "categories")}>
                <label htmlFor="name">Name</label>
                <input name="name" type="text" value = {newCategory.name} onChange = {(event) => updateValue(event, newCategory, setNewCategory)} required />
                
                {allIngredients.map(ingredient => (
                    <div key = {ingredient._id}>
                        <label htmlFor={ingredient.name}>{ingredient.name} {/* {ingredient.category.name} */}</label>
                        <input type="checkbox" name="ingredients" value={ingredient._id} onChange = {(event) => updateValue(event, newCategory, setNewCategory)} />
                    </div>
                ))}

                <label htmlFor="categoryPicture">Picture URL</label>
                <input name="categoryPicture" type="text" value = {newCategory.categoryPicture} onChange = {(event) => updateValue(event, newCategory, setNewCategory)} required />
                <label htmlFor="description">Description</label>
                <input name="description" type="text" value = {newCategory.description} onChange = {(event) => updateValue(event, newCategory, setNewCategory)} required/>
                <input type="submit" value = "New Entry" />
            </form>
        </>
    );
}
 
export default CategoryForm;