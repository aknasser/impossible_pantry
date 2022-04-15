import * as React from 'react';
import * as DivStyle from '../../Style/DivStyle';
import * as TextStyle from "../../Style/TextStyle";
import * as ButtonStyle from "../../Style/ButtonStyle";



const FilterList = ({selectedFilters, deleteFilter, filterToUpdate}) => {

    return (
        <DivStyle.Filter_group>
        {/* If selectedFilters is undefined (in the case of keywords) OR if the array selectedFilters is empty
        We display "no filters"
        ...  */}
        {!selectedFilters || selectedFilters.length === 0 ? (
            <p>No Filter</p>
        ) : (
            selectedFilters.map(filter => (
                <DivStyle.Ingredient key={filter}>
                    <ButtonStyle.Minus_button onClick ={() => deleteFilter(filter, filterToUpdate)}> - </ButtonStyle.Minus_button>
                    <TextStyle.Item_dashboard>{filter}</TextStyle.Item_dashboard>
                    <br/> 
                </DivStyle.Ingredient>

            ))
        )}
        </DivStyle.Filter_group>
    );
}
 
export default FilterList;