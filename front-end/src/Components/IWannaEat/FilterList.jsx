import * as React from 'react';



const FilterList = ({selectedFilters, deleteFilter, filterToUpdate}) => {

    return (
        <>
        {/* If selectedFilters is undefined (in the case of keywords) OR if the array selectedFilters is empty
        We display "no filters"
        ...  */}
        {!selectedFilters || selectedFilters.length === 0 ? (
            <p>No Filter</p>
        ) : (
            selectedFilters.map(filter => (
                <div key={filter}>
                    <span>{filter}</span>
                    <button onClick ={() => deleteFilter(filter, filterToUpdate)}> - </button>
                    <br/> 
                </div>

            ))
        )}
        </>
    );
}
 
export default FilterList;