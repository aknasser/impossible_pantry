import * as React from 'react';



const FilterList = ({selectedFilters}) => {
    return (
        <>
        {/* Put a map here to loop into the array selectedFilter */}

        {!selectedFilters ? (
            <p>No Filters</p>
        ) : (
            selectedFilters.map(filter => (
                <div key={filter}>
                    <span >{filter}</span>
                    <br/> 
                </div>

            ))
        )}
        </>
    );
}
 
export default FilterList;