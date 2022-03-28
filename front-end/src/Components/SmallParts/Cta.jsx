const Cta = ({cta, href}) => {
    return (
        <>
            <a href={`/${href}`}>
                <h4>{cta}</h4>
            </a>
        </>
    );
}
 
export default Cta;