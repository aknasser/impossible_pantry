import { Link } from "react-router-dom";


const Cta = ({cta, href}) => {
    return (
        <>
            <Link to={`/${href}`}>
                <h4>{cta}</h4>
            </Link>
        </>
    );
}
 
export default Cta;