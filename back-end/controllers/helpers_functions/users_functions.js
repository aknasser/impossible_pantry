module.exports = {
    find_recipes : async(recipes_cooked_or_saved) => {
        const recipesFound = [];
        if (!recipes_cooked_or_saved) {
            return recipesFound;
        }
        for (let i = 0; i < recipes_cooked_or_saved.length; i++) {
            const searchingRecipe = await Recipe.findOne({name : recipes_cooked_or_saved[i]});
            recipesFound.push(searchingRecipe);
        };
        console.log("dodou" + recipesFound);
        return recipesFound;
    }
};

