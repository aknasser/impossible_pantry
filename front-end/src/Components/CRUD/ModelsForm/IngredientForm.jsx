import * as React from 'react';



const IngredientForm = ({submitNewCategory, allCategories, updateValue, objectToUpdate, selectedAndCheckedInput}) => {

    const [newIngredient, setNewIngredient] = React.useState(objectToUpdate || {
        name : "",
        price : "",
        scarcity : "",
        fSSIndex : "",
        unit : "",
        category : ""
    })

    React.useEffect( () => {
        console.log(`update ingredient : ${JSON.stringify(newIngredient)}`)
    }, [newIngredient]);


    // To select automatically the right option input when objectToUpdate exists! 
    // For example, If objectToUpdate.price = 3, we want to have this option selected from the get-go.
    React.useEffect( () => {
        selectedAndCheckedInput(objectToUpdate, "select");
    }, [objectToUpdate])


    return (
        <>
            <form onSubmit = {(event) => submitNewCategory(event, newIngredient, "ingredients")}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value = {newIngredient.name} onChange= {(event) => updateValue(event, newIngredient, setNewIngredient)} />
                <label htmlFor="price">Price</label>
                <select name="price" id="price" onChange= {(event) => updateValue(event, newIngredient, setNewIngredient)}>
                    <option value="">Pick a number</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <label htmlFor="scarcity">Scarcity</label>
                <select name="scarcity" id="scarcity" onChange= {(event) => updateValue(event, newIngredient, setNewIngredient)}>
                    <option value="">Pick a number</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <label htmlFor="fSSIndex">FSS Index</label>
                <select name="fSSIndex" id="fSSIndex" onChange= {(event) => updateValue(event, newIngredient, setNewIngredient)}>
                    <option value="">Pick a number</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <label htmlFor="unit">Unit</label>
                <select name="unit" onChange= {(event) => updateValue(event, newIngredient, setNewIngredient)}>
                    <option value="">Pick an unit</option>
                    <option value="piece">piece</option>
                    <option value="g">g</option>
                    <option value="g">l</option>
                </select>
                <label htmlFor="category">Category</label>
                <select name="category" onChange= {(event) => updateValue(event, newIngredient, setNewIngredient)}>
                    <option value="">Pick a category</option>
                    {allCategories.map(category => (
                        <option value={category.name} key= {category._id}>{category.name}</option>
                    ))}
                </select>
                <input type="submit" value = "New Entry" />
            </form>
        </>
    );
}
 
export default IngredientForm;