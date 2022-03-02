import FilterList from "../FilterList";
import * as React from 'react';


const Filter = ({filterName, entries, entriesUpdater, dataToDisplay, filter, filterUpdater}) => {

    // START - To sort the entries in the alphabetical order (ascendant)
    React.useEffect( () => {
        let isMounted = true;
        const sortedEntries = entries.sort((a, b) => {
            let nameA = a.name;
            let nameB = b.name;

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
        if (isMounted) {
            entriesUpdater(sortedEntries);
        }
        return () => {
            isMounted = false;
            console.log("Ils ont pas les codes!")
        }
    }, []);
    // END - To sort the entries in the alphabetical order (ascendant)



    // START - Action to add new filter
    const addingFilter = (event, propertyToFormat) => {
        // 1 - Prevent the usual action of the submitted form (DONE!)
        event.preventDefault();
        // 2 - Collect the data submitted in an array AND the property to update (for instance, countryFilter, ingredientFilter)
        const newFilter = event.target.value;

        // 3 - We change the format of the ... to make it match with the right property of filter (we just need to use lowercase())
        
        const cleanPropertyFormat =  propertyToFormat.toLowerCase();

        // 4 - Update the array filter using the dispatch function upddater (called filterUpdater in this component and use the type : ADD_NEW_FILTER)
            /* restOperator 
            the action.type : "ADD_NEW_FILTER"
            action.payload : the new filter to be added to the property 
            action.typeOfFilter :  Th
            */
    };
    // END - Action to add new filter


    const resetFilter = () => {

    };

    return (
        <>
            {!entries ? (
                <p>Loading</p>
            ) : (
                <form onSubmit={() => addingFilter()}>
                    <h3>{filterName}</h3>
                    <label htmlFor={filterName}></label>
                    <input list={`${filterName}_name`} id="filter" name={filterName} />
                    <datalist id={`${filterName}_name`}>
                        {entries.map(entry => (
                            <option value={entry[dataToDisplay]} key = {entry.name}></option>
                        ))}
                    </datalist>
                    <input type="submit" value="Filter"/>
                    <button onClick={resetFilter}>Reset</button>
                </form>
            )}
            <FilterList
                selectedFilter = {filter} 
            />
        </>
    );
    

}
 
export default Filter;