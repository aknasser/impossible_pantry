import FilterList from "../FilterList";
import * as React from 'react';


const CountryFiltter = ({filterName, countries, filter, submitFilter}) => {

    // filterTyped contains the value typed by the user in the filter input
    const [filterTyped, setFilterTyped] = React.useState();

    // this function enables us to update the value of the input typed by the user in the filter input
    const updateFilterTyped = (event) => {
        setFilterTyped(event.target.value);
    };

    return (
        <>
            {!countries ? (
                <p>Loading </p>
            ) : (
                <form onSubmit={(event) => submitFilter(event, filterName, filterTyped)}>
                    <h3>Country</h3>
                    <label htmlFor="country"></label>
                    <input list="allCountries" id="worldCountry" name="country" onChange = {updateFilterTyped} />
                    <datalist id="allCountries">
                        {countries.map(country => (
                            <option value={country.name.common} key = {country.name.common}></option>
                        ))}
                    </datalist>
                    <input type="submit" value="Filter"/>
                    <input type="submit" value="Reset"/>
                </form>
            )}
            <FilterList
                selectedFilters = {filter} 
            />
        </>
    );
}
 
export default CountryFiltter;