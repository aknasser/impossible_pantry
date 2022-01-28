const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const ingredientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true
        },
        price: {
            type: Number, //Using a 3 stars ranking system
            required: true,
        },
        scarcity: {
            type: Number, //Using a 3 stars ranking system            
            required: true,
        },
        fSSIndex: {                 // fSS for Fat Salt Sweet
            type: Number, //Using a 3 stars ranking system            
            required: true,
        },
        category : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required : true
        }
    },
    {
        timestamps: true
    }
    
);
 




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Ingredient", ingredientSchema);      