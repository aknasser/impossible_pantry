const Suggestions = ({randomRecipe}) => {
    return (
        <>
            <h3>{randomRecipe.name}</h3>
            <a href ={`recipe/${randomRecipe._id}`}>
                <img src={randomRecipe.pic} alt="RecipePic" />
            </a>
        </>
    );
}
 
export default Suggestions;