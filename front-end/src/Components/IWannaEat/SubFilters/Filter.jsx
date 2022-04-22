import FilterList from "../FilterList";
import * as React from 'react';
import * as DivStyle from "../../../Style/DivStyle";
import * as FormStyle from "../../../Style/FormStyle";
import * as TextStyle from "../../../Style/TextStyle";
import * as ButtonStyle from "../../../Style/ButtonStyle";
import * as PictureStyle from "../../../Style/PictureStyle";


const Filter = ({filterName, entries, entriesUpdater, filters, addFilter, deleteFilter, resetFilter, checkValidation}) => {


    // filterTyped contains the value typed by the user in the filter input
    const [filterTyped, setFilterTyped] = React.useState();

    // this function enables us to update the value of the input typed by the user in the filter input
    const updateFilterTyped = (event) => {
        setFilterTyped(event.target.value);
/*         checkValidation(entries, event.target.value);
 */ };



    return (
        <div>
            {!entries ? (
                <TextStyle.Loading_message>Loading...</TextStyle.Loading_message>
            ) : (
                <>
                    <form onSubmit={(event) => addFilter(event, entries, filterName, filterTyped)}>
                        <DivStyle.Filter_intro>
                            <TextStyle.Filter_name>{filterName}</TextStyle.Filter_name>
                            <PictureStyle.Filter_pic src={`recipes_explorer/${filterName}.svg`} alt="pika.png" />
                        </DivStyle.Filter_intro>
                            <FormStyle.Food_stock_input list={`${filterName}_name`} id="filter" name={filterName} onChange = {updateFilterTyped}  />
                            <datalist id={`${filterName}_name`}>
                                {entries.map(entry => (
                                    <option value={entry.name} key = {entry.name}></option>
                                ))}
                            </datalist>
                        <DivStyle.Double_button>
                            <ButtonStyle.Main_button type="submit" value="Filter"/>
                            <ButtonStyle.Secundary_button onClick={() => resetFilter(filterName)}>Reset</ButtonStyle.Secundary_button>
                        </DivStyle.Double_button>

                    </form>
                </>


            )}
            <FilterList
                selectedFilters = {filters}
                deleteFilter = {deleteFilter}
                filterToUpdate = {filterName}  // We needs this props to identify the field we need to update after the deletion.
            />
        </div>
    );
    

}
 
export default Filter;