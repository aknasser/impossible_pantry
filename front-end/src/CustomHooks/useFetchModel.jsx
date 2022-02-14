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
                    isLoading : true, // When the componend is dismounted and unsubscribing, we are actuallyloading the data. We want to display a loading message during this temporary state
                    isError : false,
                    content : ""

                };
        }
    };


    const [modelList, dispatchModelList] = React.useReducer(
        modelReducer,
        {content : "", isLoading : false, isError: false}
    )


// 2 - THE FUNCTION TO FETCH THE DATA




// 3 - THE USEEFFECT TO TRIGGER THE DATA

    React.useEffect( () => {

        let isMounted = true;
        const getModelData = async(apiLocation) => {
            dispatchModelList({
                type : "FETCH_START"
            });
            if (isMounted) {
                try {
                    const modelContent = await axios.get(apiLocation, {crossdomain: true})
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