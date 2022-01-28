// LES MODULES NECESSAIRES DE BASE

const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const router = require("./router/indexRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config()



// LE SERVER
const app = express();

// PORT DE L'APPLICATION
app.set("port", process.env.PORT || 1993);   // Si l'environnement ne définit pas de valeur spécifique alors PORT= 1993


// PREPARER A ECOUTER LE SERVEUR

const server = app.listen(app.get("port"), () => {
    console.log(`Nous sommes connectés au port ${app.get("port")}`);
});


// CONNECTION A LA DB

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING ,        // Ainsi Mongoose en utilisant les variables de l'environnement ou le cas échéant à l'adresse local de la DB
    {useNewUrlParser: true},
    {useUnifiedTopology: true},
    {useCreateIndex: true},
);

const db = mongoose.connection;

mongoose.Promise = global.Promise

db.once("open", () => {                                                             // Quand db est ouvert, on reçoit ce message sur la console.
    console.log("All Right ! Connexion etablie avec la DB: new_website");
});


// PARSING AND COOKIE MANAGEMENT

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))  // cookieParser utilise COOKIE_SECRET pour crypter les datas des cookies envoyés. Idéalement, ce mot de passe est représenté par une variable. Ceci évite les failles de sécurité.


// PASSPORT INITIALISATION

app.use(passport.initialize());



// POUR LIRE LES DATAS POSTEES PAR USER

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());





// IMPORTATION ET GESTION DES ROUTES.

app.use("/", router);

