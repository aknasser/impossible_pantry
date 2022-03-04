import FilterList from "../FilterList";
import * as React from 'react';


const Filter = ({filterName, entries, entriesUpdater, dataToDisplay, filter, submitFilter}) => {


    // filterTyped contains the value typed by the user in the filter input
    const [filterTyped, setFilterTyped] = React.useState();

    // this function enables us to update the value of the input typed by the user in the filter input
    const updateFilterTyped = (event) => {
        setFilterTyped(event.target.value);
    };


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



    const resetFilter = () => {

    };




    return (
        <>
            {!entries ? (
                <p>Loading</p>
            ) : (
                <form onSubmit={(event) => submitFilter(event, filterName, filterTyped)}>
                    <h3>{filterName}</h3>
                    <label htmlFor={filterName}></label>
                    <input list={`${filterName}_name`} id="filter" name={filterName} onChange = {updateFilterTyped}  />
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
                selectedFilters = {filter} 
            />
        </>
    );
    

}
 
export default Filter;