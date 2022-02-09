const BlocPicture = ({recipe}) => {

    const country = "";  // FETCH  THE COUNTRIES OBJECT IN THE DB CORRESPONDING TO recipe.country 
    const style = "";    // FETCH ALL THE STYLE IN THE DB CORRESPONDING TO recipe.style
 
    return (
        <div>
            <img src="" alt="bookmark" />
            <img src={recipe.pictureUrl} alt={recipe.name} />
            <div>
                <img src={country.pic} alt="RecipeCountry" />
                <img src={style.pic} alt="RecipeStyle" />
            </div>
        </div>
    );
}
 
export default BlocPicture;