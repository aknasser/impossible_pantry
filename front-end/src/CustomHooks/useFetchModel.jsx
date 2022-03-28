import axios from 'axios';
import * as React from 'react';


// 0 - CUSTOM HOOK INITIALIZATION

const useFetchModel = (endpoint) => {

// 1 - REDUCER
    const modelReducer = (state, action) => {
        switch (action.type) {
            case "FETCH_START": 
                return {
                    ...state,
                    isLoading : true,
                    isError : false
                };
            case "FETCH_SUCCESS": 
                return {
                    ...state,
                    isLoading : false,
                    isError : false,
                    content : action.payload
                };
            case "FETCH_ERROR": 
                return {
                    ...state,
                    isLoading : false,
                    isError : true
                };
            case "FETCH_UNSUSCRIBE": // Useful to avoid the memory leak when we unmount the component.
                return {
                    ...state,
                    isLoading : true, // When the component is dismounted and unsubscribing, we are actually loading the data. We want to display a loading message during this temporary state
                    isError : false,
                    content : ""

                };
        }
    };


    const [modelList, dispatchModelList] = React.useReducer(
        modelReducer,
        {content : "", isLoading : true, isError: false}
    )


// 2 - THE FUNCTION TO FETCH THE DATA




// 3 - THE USEEFFECT TO GET THE DATA

    React.useEffect( () => {

        let isMounted = true;
        const getModelData = async(apiLocation) => {
            dispatchModelList({
                type : "FETCH_START"
            });
            if (isMounted) {
                try {
                    const modelContent = await axios.get(apiLocation, {crossdomain: true})
                 // TO SORT ENTRIES IN THE ASCENDANT ORDER BY NAME (FROM A TO Z) - All the models have a property "name", so it's perfect!
                    // If the data fetched is iterable (an array then), we want to order the element by name. 
                    // Why this extra conditional ?
                    // If we just fetch a specific user we don't want to sort it(otherwise the code might break).
                    if (modelContent.data.length > 0) {
                        const sortedEntry =  modelContent.data.sort( (a, b) => {
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
                    }


                //ONCE THE ENTRIES ARE SORTED WE CAN UPDATE THE STATE PROPERLY 
                    dispatchModelList(
                        {
                            type : "FETCH_SUCCESS",
                            payload : modelContent.data
                        },
                    );
                } catch (e) {
                    console.log("The error:" + e);
                    dispatchModelList(
                        {
                            type : "FETCH_ERROR",
                        },
                    )
                }
            }
        };

        // We execute the effect
        getModelData(endpoint);

             //CLEAN-UP FUNCTION :  We used is to set isMounted = false; "block" the fetch while waiting for the mounting component. 
        return () => {
            isMounted = false;
            console.log("Where is my component ?")
            dispatchModelList(
                {
                    type : "FETCH_UNSUSCRIBE",
                })
        }
        }, []); 


           

// 4 - EXPORT THE CUSTOM HOOK

    return [modelList, dispatchModelList];

}


export default useFetchModel;