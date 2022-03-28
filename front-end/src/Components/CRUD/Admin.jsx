import HomeAdmin from "./HomeAdmin";
import * as React from 'react';
import CreateOrUpdate from "./CreateOrUpdate";
import AddEntry from "./AddEntry";
import ReadEntries from "./ReadEntries";
import UpdateEntry from "./UpdateEntry";



/* We will use a reducer to manage the multiple state of the admin :
    State 1 : THE USER IS ON THE HOME PAGE - no model has been chosen yet - no action has been chosen yet - no action has been carried out
    State 2 : THE USER HAS CHOSEN A MODEL TO MANIPULATE - a model has been chosen - no action has been chosen yet - no action has been carried out
    State 3 : THE USER HAS CHOSEN AN ACTION (between ADD and UPDATE/DELETE entry) - a model has been chosen - an action has been chosen - no action has been carried out
    State 4 : THE USER IS COMPLETING A CRUD ACTION (CREATE, UPDATE, DELETE) - a model has been chosen - an action has been chosen - the action is underway
    State 5 : THE USER HAS COMPLETED THE CRUD ACTION (CREATE, UPDATE, DELETE) he is now redirected to the STATE 3 - a model has been chosen - an action has been chosen - the action is done
*/

const Admin = ({endpoint, allCategories, allIngredients, allRecipes, allStyles, allUsers}) => {

    
    const adminReducer = (state, action) => {
        switch (action.type) {
            case "HOME":
                return  {
                    ...state,
                    modelChosen : null
                };
            case "MAIN_PAGE_MODEL":
                return  {
                    ...state,
                    modelChosen : action.payload
                };
                
            case "CREATE_OR_UPDATE":
                return  {
                    ...state,
                    crudAction : action.payload,
                };
                
/*             case "ACTION_COMPLETED":  // Not sure if it's useful.
                return  {
                    ...state,
                    crudAction : {
                        ...state.crudAction,
                        status : "completed"
                    }
                }; */

            case "REDIRECTION_ENTRY_CREATED":
                return  {
                    ...state,
                    crudAction : {                        // TO GO BACK TO THE COMPONENT CREATE OR UPDATE
                            name : null,
                            status : null
                        }
                };
                
            case "REDIRECTION_ENTRY_UPDATED/DELETED":
                return  {
                    ...state,
                    crudAction : {
                        name : "read",                  // TO GO BACK TO THE PAGE WITH ALL THE ENTRIES
                        status : null
                    }
                };

            default:
                break;
        }
    };
    
    const [adminManagement, dispatchAdminManagement] = React.useReducer(
        adminReducer, 
        {
            modelChosen : null,   // The model we want to manipulate (categories, recipes, ingredients, styles, users)
            crudAction : {
                name : null,        // the name of the CRUD action (create, read, update or delete)
                status : null,       // could be null, underway (when the admin is completing the form to add / update an entry). done (when the admin clicks on the submit button).
                objectSelected : null   // The object we want to update / delete - Updated in the component ReadEntries.jsx
            },
        }
    )
    
    // To check the value of adminManagement 
    React.useEffect ( () => {
        console.log(JSON.stringify(adminManagement))
    },[adminManagement])


    return (
        <>
            {!adminManagement.modelChosen ? (
                <HomeAdmin
                    dispatchAdminManagement = {dispatchAdminManagement}
                />
            ) : adminManagement.modelChosen && !adminManagement.crudAction.name ? (
                <CreateOrUpdate
                    adminManagement = {adminManagement}
                    dispatchAdminManagement = {dispatchAdminManagement}
                />
            ) : adminManagement.crudAction.name === "create" ? (
                <AddEntry
                    adminManagement = {adminManagement}
                    dispatchAdminManagement = {dispatchAdminManagement}
                    endpoint = {endpoint}
                    allCategories = {allCategories}
                    allIngredients = {allIngredients}
                    allRecipes = {allRecipes}
                    allStyles = {allStyles}
                    allUsers = {allUsers}
                />
            ) : adminManagement.crudAction.name === "read" ? (
                <ReadEntries
                    adminManagement = {adminManagement}
                    dispatchAdminManagement = {dispatchAdminManagement}
                    endpoint = {endpoint}
                />
            ) : adminManagement.crudAction.name === "update" ? (
                <AddEntry
                    adminManagement = {adminManagement}
                    dispatchAdminManagement = {dispatchAdminManagement}
                    endpoint = {endpoint}
                    allCategories = {allCategories}
                    allIngredients = {allIngredients}
                    allRecipes = {allRecipes}
                    allStyles = {allStyles}
                    allUsers = {allUsers}
                />
            ) : (
                null
            )}

        </>
 
    );
}
 
export default Admin;