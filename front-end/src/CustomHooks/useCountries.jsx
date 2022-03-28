import axios from 'axios';
import * as React from 'react';

const useCountries = () => {

    const [allCountries, setAllCountries] = React.useState();

    React.useEffect(() => {
        let isMounted = true;
        const fetchCountries = async() => {

                try {
                    let allCountries = await axios.get(`https://restcountries.com/v3.1/all`);
                    // 1 - we push all the countries.name.common in an array of objects with one property (name).
                    // With this data manipulation, the countries have a similar structure as styles/ingredients/difficulties


                    let countriesName = [];
                    for (let i = 0 ; i < allCountries.data.length; i++) {
                        allCountries.data[i].name = allCountries.data[i].name.common;
                    }

                    // 2 - We sort the countries in the ascendant order (based on their name - we just defined it up there)
                    const sortedCountries =  allCountries.data.sort( (a, b) => {
                        let entryNameA = a.name;
                        let entryNameB = b.name;

                        if ( entryNameA < entryNameB) {
                            return -1;
                        };

                        if ( entryNameA > entryNameB) {
                          return 1;
                        };
                        return 0;
                    })  
                // 3 - Once the component is Mounted, we update the value of countries with our array sorted by ascendant order.
                    if (isMounted) {
                        setAllCountries(sortedCountries);
                    }
                } catch (e) {
                    console.log (`some troubles to get the countries using the API restcountries :${e}`)
            }
        }
        fetchCountries();
        return() => {
            isMounted = false;
            console.log("ça laggggggg ouin ouin!!")
        }
    }, []);

    
    // 4 - EXPORT THE CUSTOM HOOK
    return [allCountries, setAllCountries];



}
 
export default useCountries;