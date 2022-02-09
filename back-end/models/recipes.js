const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const recipeSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
        },
        intro : {
            type : String,
            required : true,
        },
        steps: {
            type: String,
            required: true,
            lowercase: true
        },
        country : {
            type : String,
            required : true,
        },
        style : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Style"
        },
        difficulty : {
            type : Number,
            required : true
        },
        pictureUrl : {
            type : String,
            required : true
        },
        mainIngredient : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Ingredient"
        },
        ingredientsNeeded: [
            {
                ingredient : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Ingredient"
                },
                quantity : {
                    type : Number,
                },
                unit :  {
                    type : String,
                }
            }
        ],


    },
    {
        timestamps: true
    }
    
);
 




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Recipe", recipeSchema);      