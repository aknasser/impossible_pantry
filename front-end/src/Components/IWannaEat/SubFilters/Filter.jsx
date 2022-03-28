import FilterList from "../FilterList";
import * as React from 'react';


const Filter = ({filterName, entries, entriesUpdater, filters, addFilter, deleteFilter, resetFilter, checkValidation}) => {


    // filterTyped contains the value typed by the user in the filter input
    const [filterTyped, setFilterTyped] = React.useState();

    // this function enables us to update the value of the input typed by the user in the filter input
    const updateFilterTyped = (event) => {
        setFilterTyped(event.target.value);
/*         checkValidation(entries, event.target.value);
 */ };



    return (
        <>
            {!entries ? (
                <p>Loading</p>
            ) : (
                <>
                    <form onSubmit={(event) => addFilter(event, entries, filterName, filterTyped)}>
                        <h3>{filterName}</h3>
                        <label htmlFor={filterName}></label>
                        <input list={`${filterName}_name`} id="filter" name={filterName} onChange = {updateFilterTyped}  />
                        <datalist id={`${filterName}_name`}>
                            {entries.map(entry => (
                                <option value={entry.name} key = {entry.name}></option>
                            ))}
                        </datalist>
                        <input type="submit" value="Filter"/>
                    </form>
                    <button onClick={() => resetFilter(filterName)}>Reset</button>
                </>


            )}
            <FilterList
                selectedFilters = {filters}
                deleteFilter = {deleteFilter}
                filterToUpdate = {filterName}  // We needs this props to identify the field we need to update after the deletion.
            />
        </>
    );
    

}
 
export default Filter;