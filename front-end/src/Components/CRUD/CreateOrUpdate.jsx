const CreateOrUpdate = ({adminManagement, dispatchAdminManagement}) => {
    
    const adminUpdater = (crudName, crudStatus) => {
        console.log("button clicked")
        dispatchAdminManagement({
                type : "CREATE_OR_UPDATE",
                payload : {
                    name : crudName,
                    status: crudStatus
                }
        })
        window.scrollTo({      
            top : 0,
            behavior :"smooth"
        })
    };
    
    return (
        <>
            <h3>{adminManagement.modelChosen.toUpperCase()}</h3>
            <span onClick = {() => adminUpdater("create", "underway")}>Create</span> <br/>   {/* After clicking, the user lands on AddEntry. He can then add a new entry to the chosen model */}
            <span onClick = {() => adminUpdater("read", null)}>Update</span>   {/* After clicking, the user lands on ReadEntries. He can then review all the entries. From there, he can chose to update or delete any entry */}
        </>
    );
}
 
export default CreateOrUpdate;