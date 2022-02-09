const IngredientsList = ({ingredients}) => {
    return ( 

    /* We use array.map here to cycle in the ingredients chosen by the user */
        <>
            <span>{ingredients}</span>
        </>
    );
}
 
export default IngredientsList;