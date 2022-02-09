import * as React from 'react';

/* Between the parenthesis. We give the default value of the data stored in the context
The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
This default value can be helpful for testing components in isolation without wrapping them. 
*/



const UserContext = React.createContext({
    userAccount :"",
    setUserAccount: () => {}
});



export default UserContext;

