const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB

const passportLocalMongoose = require("passport-local-mongoose");   //Pour utiliser librement userSchema.plugin (juste en dessous)


const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true
        },
        surname: {
            type: String,
            required: true,
        },
        username: {                 // FYI username = email
            type: String,
            required: true,
            lowercase: true
        },
        recipesSaved: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Recipe"
            },
        ],
        recipesSearched: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Recipe"
            },
        ],
        recipesCooked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Recipe"
            },
        ],
        stock: [
            {
                ingredient : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Ingredient"
                },
                quantity : {
                    type : Number,
                    required : true,
                },
            }
        ],
    },
    {
        timestamps: true
    }
    
);
 
// Avec ce plugin, nous indiquons que nous utilisons passportLocalMongoose pour hasher et stocker les data (et du coup plus besoin de password dans le model Schema)
userSchema.plugin(passportLocalMongoose);




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("User", userSchema);      