import axios from 'axios';
import * as React from 'react';
import UserContext from '../Context/UserContext';
import  {useContext} from "react";

const Login = ({endpoint, pantryUpdater}) => {

    const {userAccount, setUserAccount} = useContext(UserContext);


    const [login_info, set_login_info] = React.useState({
        username : "", 
        password : "",
        valid_form : true
    })

    const [sign_up_info, set_sign_up_info] = React.useState({
        name : "", 
        surname : "",
        username : "", 
        password : "",
        recipesSaved : [],
        recipesCooked : [],
        stock : [],
        valid_form : true 
    })


    const update_login_or_sign_up_info = (event, state, state_update_function) => {
        state_update_function({
            ...state,
            [event.target.name] : event.target.value
        })
    };

    const submit_login_info = async(event, user_action, state, state_updater_function) => {
        event.preventDefault();
        // We display the loading info picture and update the state accordingly.
        setUserAccount({
            ...userAccount,
            isLoading : true,
        });
        console.log("he")
        // 1 - we post these data to the back-end to check the user_info
        const access_to_dashboard = await axios.post(`${endpoint}/users/${user_action}`, state, {withCredentials: true});
        // 2 -  server response === valid user ===> we redirect the user towards the user dashboard using the pantryUpdater (updater function to)
        console.log(`${JSON.stringify(access_to_dashboard.data)}`);
        if (access_to_dashboard.data.success) {
            console.log("valid user!!")
            // 2a - To remove the error message if any.
            state_updater_function({
                ...state,
                valid_form : true      
            });
            // 2b - We update the context with the user_info stored in the response
            setUserAccount({
                user_details: access_to_dashboard.data.user,
                token: access_to_dashboard.data.token,
                isLoading : false,
            });

            // 2c - This action.type will update the state of the app component : We are redirected to the user dashboard component
            pantryUpdater({
                type : "UI_FLOW",
                page_name : "dashboard"         
            })

        } else {
        // 3 - server response === incorrect user ==> we display an error message on the login page (invalid user info).
        state_updater_function({
                ...state,
                valid_form : false      // An error message is displayed above the login form.
            });
        }
    };


// REGISTER NEW USER

    const display_register_form = () => {
        // Play with visibility / display of the NewUser component 
    };

    // If we are smart we can find a way to factorise this code using the function submitNewEntry (in AddEntry - CRUD - ADMIN)
/*     const create_new_user = async(event) => {
        event.preventDefault();
        const newUser = await axios.post(`${endpoint}/users/create`,sign_up_info, {withCredentials : true});
        setUserAccount({
            ...userAccount,
            isLoading : true
        })
        if (newUser.data.success) {
            setUserAccount({
                user_details: newUser.data.user,
                token : newUser.data.token,
                isLoading : false
            })
        } else {

        }
    }; */

    React.useEffect( () => {
        console.log(`LOGIN_INFO: ${JSON.stringify(sign_up_info)}`)
    }, [sign_up_info])


    return (
        <>
            <h2>Login</h2>
            {!login_info.valid_form && <h3>Invalid user info. Check the username and / or the password</h3>}
            <form onSubmit={(event) => submit_login_info(event,"login",login_info, set_login_info)}>
                <label htmlFor="username">Email</label>
                <input type="text" name ="username" value={login_info.username} onChange={(event) => update_login_or_sign_up_info(event, login_info, set_login_info)} />
                <label htmlFor="password">Password</label>
                <input type="password" name = "password" value={login_info.password} onChange={(event) => update_login_or_sign_up_info(event, login_info, set_login_info)}/>
                <input type="submit" value = "login" />
            </form>
            {/* // When the user click on this button the form below is displayed.
            <button onClick={display_register_form}>New Account</button> */}
            <h2>Sign up</h2>
            {!sign_up_info.valid_form && <h3>Please complete the form properly</h3>}
            <form onSubmit = {(event) => submit_login_info(event, "create", sign_up_info, set_sign_up_info)}>
                <label htmlFor="name">Name</label>
                <input type="text" name ="name" value={sign_up_info.name} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)} />
                <label htmlFor="surname">Surname</label>
                <input type="text" name ="surname" value={sign_up_info.surname} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)} />
                <label htmlFor="email">Email</label>
                <input type="email" name ="username" value={sign_up_info.username} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)} />
                <label htmlFor="password">Password</label>
                <input type="password" name = "password" value={sign_up_info.password} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)}/>
                <input type="submit" value = "register" />
            </form>
        </> 
    );
}
 
export default Login;