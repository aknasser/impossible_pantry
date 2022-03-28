import * as React from 'react';


const StyleForm = ({submitNewStyle, updateValue, objectToUpdate}) => {


    // If we want to update an object newStyle store the value of objectToUpdate (we pass it when we click on update in ReadEntries).
    // Otherwise, we create an object with empty properties
    const [newStyle, setNewStyle] = React.useState(objectToUpdate || {          
        name : "",
        stylePicture : ""
    });


    return (
        <>
            <form onSubmit={(event) => submitNewStyle(event, newStyle ,"styles")}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value= {newStyle.name} onChange= {(event) => updateValue(event, newStyle, setNewStyle)} />
                <label htmlFor="stylePicture">Picture URL</label>
                <input type="text" name="stylePicture" value= {newStyle.stylePicture} onChange= {(event) => updateValue(event, newStyle, setNewStyle)} />
                <input type="submit" value = "New Entry" />
            </form>
        </>
    );
}
 
export default StyleForm;