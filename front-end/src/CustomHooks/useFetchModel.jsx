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
        }
    };


    const [modelList, dispatchModelList] = React.useReducer(
        modelReducer,
        {content : "", isLoading : false, isError: false}
    )


// 2 - THE FUNCTION TO FETCH THE DATA

    const getModelData = async(apiLocation) => {
        let isMounted = true;
        dispatchModelList({
            type : "FETCH_START"
        });
        const modelContent = await axios.get(apiLocation, {crossdomain: true})
        if (isMounted) {
            try {
                dispatchModelList(
                    {
                        type : "FETCH_SUCCESS",
                        payload : modelContent.data
                    },
                );
            } catch (e) {
                console.log("The error:" + e)
            }
        }
        return () => {
            isMounted = false;
            console.log("Component not Mounted yet")
        }
    };


// 3 - THE USEEFFECT TO TRIGGER THE DATA

    React.useEffect( () => {
        getModelData(endpoint);
    },[]) 


// 4 - EXPORT THE CUSTOM HOOK

    return [modelList, dispatchModelList];

}


export default useFetchModel;