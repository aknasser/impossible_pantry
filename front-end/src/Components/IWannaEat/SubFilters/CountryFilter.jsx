import FilterList from "../FilterList";


const CountryFiltter = ({countries, countriesUpdater, filter, filterUpdater}) => {
    return (
        <>
            {!countries ? (
                <p>Loading </p>
            ) : (
                <form>
                    <h3>Country</h3>
                    <label htmlFor="country"></label>
                    <input list="allCountries" id="worldCountry" name="country" />
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
                selectedFilter = {filter} 
            />
        </>
    );
}
 
export default CountryFiltter;