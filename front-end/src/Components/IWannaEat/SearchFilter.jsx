const SearchFilter = () => {


    const filterSelected = [];

    const countries = []; // A GET REQUEST TO FETCH THESE DATA
    const styles = []; // A GET REQUEST TO FETCH THESE DATA
    const difficulties = ["Easy", "Doable", "Master Chief"]; // A GET REQUEST TO FETCH THESE DATA
    const ingredients = []; // A GET REQUEST TO FETCH THESE DATA

    const countryFilterAdded = [];    // THE data Posted by the user (will be used to fetch the data with a Post request).
    const styleFilterAdded = [];
    const difficultyFilterAdded = [];
    const ingredientsFilterAdded = [];



    return (
        <>
            <form >
                <h3>Country</h3>
                <input type="text" />
                <input type="submit" />
            </form>
            <form >
                <h3>Style</h3>
                <select name="" id="">
                    {styles.map(style => (
                        <option value={style}></option>
                    ))}
                </select>
                <input type="submit" />
            </form>
            <form >
                <h3>Difficulty</h3>
                <select name="" id="">
                    {difficulties.map(difficulty => (
                        <option value={difficulty}></option>
                    ))}
                </select>
                <input type="submit" />
            </form>
            <form >
                <h3>Ingredients</h3>
                <input type="text" />
                <input type="submit" />
            </form>


        <span></span>
        </>
    );
}
 
export default SearchFilter;