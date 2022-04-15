import styled from "styled-components";
import * as MainStyle from "./MainStyle"

export const Login_input = styled.input`
    width : 60vw;
    border: solid 0.1rem ${MainStyle.colors.primary_color};
    border-radius: 0.25rem;
    text-align: left;
}
`; 

export const Login_label = styled.label`
    width : 30vw;
    text-align: left;
}
`; 

export default Login_input;