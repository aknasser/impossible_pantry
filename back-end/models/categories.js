const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const categorySchema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        ingredients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Ingredient"
        }],
        categoryPicture: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
    
);






// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Category", categorySchema);      