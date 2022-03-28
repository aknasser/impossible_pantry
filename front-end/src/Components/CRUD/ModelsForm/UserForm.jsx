import * as React from 'react';


const UserForm = ({submitNewUser, allRecipes, updateValue, objectToUpdate, selectedAndCheckedInput}) => {

    const [newUser, setNewUser] = React.useState(objectToUpdate || {
        name : "",
        surname : "",
        username  :"",
        recipesSaved :[],
        recipesCooked : [],
        stock : []                  // We post an empty stock. The stock is completed / updated in Pantry.jsx(and its children).
    });

    // just to check the state of newUser and changes.
    React.useEffect( () => {
        console.log(JSON.stringify(newUser));
    }, [newUser]);

    // to check automatically the recipes already saved / cooked by the user
    React.useEffect( () => {
        selectedAndCheckedInput(objectToUpdate, "checkbox")
    }, [objectToUpdate])

    return (
        <>
            <form onSubmit = {(event) => submitNewUser(event, newUser, "users")}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={newUser.name} onChange = {(event) => updateValue(event, newUser, setNewUser)} /> 
                <label htmlFor="surname">Surname</label>
                <input type="text" name="surname" value={newUser.surname} onChange = {(event) => updateValue(event, newUser, setNewUser)} />
                <label htmlFor="email">Email</label>
                <input type="email" name="username" value={newUser.username} onChange = {(event) => updateValue(event, newUser, setNewUser)} />
                <h5>Recipes Saved</h5>
                {allRecipes.map(recipe => (
                <div key = {recipe._id}>
                            <label htmlFor="recipesSaved">{recipe.name}</label>
                            <input type="checkbox" name="recipesSaved" value={recipe._id} onChange = {(event) => updateValue(event, newUser, setNewUser)} />
                </div>
                ))}
                <h5>Recipes Cooked</h5>
                {allRecipes.map(recipe => (
                <div>
                    <label htmlFor="recipesCooked">{recipe.name}</label>
                    <input type="checkbox" name="recipesCooked" value={recipe._id} onChange = {(event) => updateValue(event, newUser, setNewUser)} />
                </div>
                ))}

                <input type="submit" value = "Create New Account" />
            </form>
        </>
    );
}
 
export default UserForm;