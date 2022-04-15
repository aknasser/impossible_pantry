const mongoose = require("mongoose");
const Style = require("../styles");

require('dotenv').config();


mongoose.connect(
    "mongodb://localhost:27017/impossible_pantry",
    {useNewUrlParser: true}, 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationStyle = async() => {
    const clean = await Style.deleteMany({});

    const healthy = await Style.create({
        name : "Healthy",
        stylePicture: "healthy.png"
    })

    const veggie = await Style.create({
        name : "Veggie",
        stylePicture: "veggie.png"
    })

    const yummy = await Style.create({
        name : "Yummy",
        stylePicture: "meat.png"
    })

    const spicy = await Style.create({
        name : "Spicy",
        stylePicture: "spicy.png"
    })

    const comfortFood = await Style.create({
        name : "Comfort Food",
        stylePicture: "winterSoup.png"
    })

    const quick = await Style.create({
        name : "Quick",
        stylePicture: "timer.png"
    })

    const sweet = await Style.create({
        name : "Sweet",
        stylePicture: "cake.png"
    })
    const classy = await Style.create({
        name : "Classy",
        stylePicture: "cake.png"
    })
    const no_style = await Style.create({
        name : "No Style",
        stylePicture: "nothingness.png"
    })
}

alimentationStyle();

