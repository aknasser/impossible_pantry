import axios from 'axios';
import * as React from 'react';
import UserContext from '../../Context/UserContext';
import  {useContext} from "react";
import * as DivStyle from '../../Style/DivStyle';
import * as FormStyle from '../../Style/FormStyle';
import * as ButtonStyle from "../../Style/ButtonStyle";

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

    React.useEffect( () => {
        console.log(`LOGIN_INFO: ${JSON.stringify(sign_up_info)}`)
    }, [sign_up_info])


    return (
        <>
            <h2>Login</h2>
            {!login_info.valid_form && <h3>Invalid user info. Check the username and / or the password</h3>}
            <form onSubmit={(event) => submit_login_info(event,"login",login_info, set_login_info)}>
                <DivStyle.Login_form_input>
                    <FormStyle.Login_label htmlFor="username">Email </FormStyle.Login_label>
                    <FormStyle.Login_input type="text" name ="username" value={login_info.username} onChange={(event) => update_login_or_sign_up_info(event, login_info, set_login_info)} />
                </DivStyle.Login_form_input>
                <DivStyle.Login_form_input>
                    <FormStyle.Login_label htmlFor="password">Password</FormStyle.Login_label>
                    <FormStyle.Login_input type="password" name = "password" value={login_info.password} onChange={(event) => update_login_or_sign_up_info(event, login_info, set_login_info)}/>
                </DivStyle.Login_form_input>
                <DivStyle.Double_button>
                    <ButtonStyle.Main_button type="submit" value = "login" />
                    <ButtonStyle.Secundary_button onClick={display_register_form}>New User</ButtonStyle.Secundary_button>
                </DivStyle.Double_button>
            </form>

            <h2>Sign up</h2>
            {!sign_up_info.valid_form && <h3>Please complete the form properly</h3>}
            <form onSubmit = {(event) => submit_login_info(event, "create", sign_up_info, set_sign_up_info)}>
                <DivStyle.Login_form_input>
                    <FormStyle.Login_label htmlFor="name">Name</FormStyle.Login_label>
                    <FormStyle.Login_input type="text" name ="name" value={sign_up_info.name} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)} />
                </DivStyle.Login_form_input>
                <DivStyle.Login_form_input>
                    <FormStyle.Login_label htmlFor="surname">Surname</FormStyle.Login_label>
                    <FormStyle.Login_input type="text" name ="surname" value={sign_up_info.surname} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)} />
                </DivStyle.Login_form_input>
                <DivStyle.Login_form_input>
                    <FormStyle.Login_label htmlFor="email">Email</FormStyle.Login_label>
                    <FormStyle.Login_input type="email" name ="username" value={sign_up_info.username} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)} />
                </DivStyle.Login_form_input>
                <DivStyle.Login_form_input>
                    <FormStyle.Login_label htmlFor="password">Password</FormStyle.Login_label>
                    <FormStyle.Login_input type="password" name = "password" value={sign_up_info.password} onChange={(event) => update_login_or_sign_up_info(event, sign_up_info, set_sign_up_info)}/>
                </DivStyle.Login_form_input>
                <ButtonStyle.Main_button type="submit" value = "register" />
            </form>
        </> 
    );
}
 
export default Login;