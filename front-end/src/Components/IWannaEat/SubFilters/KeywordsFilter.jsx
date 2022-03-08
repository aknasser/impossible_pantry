import FilterList from "../FilterList";
import * as React from 'react';



const KeywordsFilter = ({filters, filterUpdater}) => {


    // EVERYTIME FILTER CHANGE WE UPDATE THIS COMPONENT TO DISPLAY THE NEW FILTER (OR THE FILTER DELETED).
    React.useEffect ( () => {

    },[filters])

    return (  
        <>
        {/* IDEA TBC ? When the user clicks on this button
         the form for the keywords appear and the others filters are turned off (action FILTER_RESET) */}
        <>
            <h3>Search by keywords</h3>  
            <form action="">
                <input type="text" />
                <input type="submit" value="Search" />
            </form>
            </>
            <FilterList
                selectedFilter = {filters}
            />
        </>


    );
}
 
export default KeywordsFilter;