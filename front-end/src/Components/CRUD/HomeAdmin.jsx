const HomeAdmin = ({dispatchAdminManagement}) => { 

// When the user clicks on a category, we pass the model to explore and move to the Component CreateOrUpdate(check the compponent Admin to see the reducer action)

    const adminUpdater = (model) => {
        console.log ("button clicked");
        dispatchAdminManagement({
                type : "MAIN_PAGE_MODEL",
                payload : model
        })
    };

    return (
        <>
            <h2>Welcome Master</h2>
            <h3>Choose a model</h3>
            <div>
                <span onClick = {() => adminUpdater ("category")}>Categories</span><br/>
                <span onClick = {() => adminUpdater ("ingredient")}>Ingredients</span><br/>
                <span onClick = {() => adminUpdater ("recipe")}>Recipes</span><br/>
                <span onClick = {() => adminUpdater ("style")}>Styles</span><br/>
                <span onClick = {() => adminUpdater ("user")}>Users</span><br/>
            </div>
        </>

    );
}
 
export default HomeAdmin;