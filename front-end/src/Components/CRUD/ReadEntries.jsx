import * as React from 'react';
import axios from "axios";


const ReadEntries = ({adminManagement, dispatchAdminManagement, endpoint}) => {


    const plural_name = () => {
        let modelName;
        // To fit the name of the right entry points path (".../categories..." , ".../users...", ".../styles/...", etc).
        if (adminManagement.modelChosen === "category") {
            modelName = "categories"
        } else {
            modelName = adminManagement.modelChosen + "s"; 
        };
        return modelName;
    };

    const [modelEntries, setModelEntries] = React.useState([]);

    // Lead to the form to update an entry.
    const go_to_update = (object_to_update) => {
        dispatchAdminManagement({
            type : "CREATE_OR_UPDATE",
            payload : {
                name: "update",
                status : "underway",
                objectSelected : object_to_update
            }
        })
    };

    // To start the deletion process.
    const delete_entry = async(object_to_delete) => {
        try {
            //we post the object to delete.
            const deletion_process = await axios.post(`${endpoint}/${plural_name()}/delete/${object_to_delete._id}` , object_to_delete)
        } catch (e) {
            console.log(`error in the deletion process : ${e}`);
        }
    }


    // To fetch all entries of this model.
    React.useEffect ( async() => {
        try {
            const fetchEntries = await axios.get(`${endpoint}/${plural_name()}`, {crossdomain :true});
            setModelEntries(fetchEntries.data);
        } catch (e) {
            console.log(`Trouble to fetch data (R of the CRUD) : ${e}`);
        };
    }, [delete_entry]); // To refresh the list of entries everytime we delete something.  


    return (
        <>
            <h2>All {plural_name()}</h2>
            {modelEntries.map(entry => (
                <div key={entry._id}>
                    <span>{entry.name} </span>
                    <span onClick ={() => go_to_update(entry)}>Update </span>
                    <span onClick = {() => delete_entry(entry)}>Delete </span>
                    <br/>
                </div>

            ))}

        </>
    );
}
 
export default ReadEntries;