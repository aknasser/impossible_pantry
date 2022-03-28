import CategoryForm from "./ModelsForm/CategoryForm"
import IngredientForm from "./ModelsForm/IngredientForm"
import RecipeForm from "./ModelsForm/RecipeForm"
import StyleForm from "./ModelsForm/StyleForm"
import UserForm from "./ModelsForm/UserForm"



const UpdateEntry = ({adminManagement, dispatchAdminManagement}) => {
    return (
        <>
            {adminManagement.modelChosen === "category" ? (
                <CategoryForm
                    dispatchAdminManagement = {dispatchAdminManagement}
                />
            ) : adminManagement.modelChosen === "ingredient" ? (
                <IngredientForm
                    dispatchAdminManagement = {dispatchAdminManagement}
                />
            ) : adminManagement.modelChosen === "recipe" ? (
                <RecipeForm
                    dispatchAdminManagement = {dispatchAdminManagement}
                />
            ) : adminManagement.modelChosen === "style" ? (
                <StyleForm
                    dispatchAdminManagement = {dispatchAdminManagement}
                />
            ) : adminManagement.modelChosen === "user" ? (
                <UserForm
                    dispatchAdminManagement = {dispatchAdminManagement}
                />
            ) : (
                null
            )}
        </>
    );
}
 
export default UpdateEntry;