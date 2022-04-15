##### QUICK HEADS-UP
The code itself is already full of comments.
So you won't find that much code in this documentation. It 's more about explaining the purpose of the functions, code blocks and modules.
It's more about the WHY than the HOW.


### VISION  & GOAL
An app to figure out what to cook with the food stock available!

### MAIN FEATURES

[PANTRY]
The user provides information on his/her food stock (ingredients, quantity) and discover what he/she can cooks
with all of that

[SEARCHRECIPES]
With this feature the user can use different filters to explore our recipes
Filters available : 
-Country of the recipe
-Style of the recipe
-Level of difficulty of the recipe
-Ingredients of the recipe 
-keywords in the title of the recipe


[RECIPES_DETAILS]
This page displays : 
-the steps to cook of a recipe
-2 others recipes as suggestions at the end of the page

This page also includes : 
- a bookmark feature = The user can save the Recipes to find it easily later
- a already done button = this way the user can mention / remember what recipes he/she has already cooked.

### STACKS AND PACKAGES
MERN

MongodDB for the Database
Expresss and Node.JS for the Back-end
React.js for the front-end

React Native in the future for the mobile app

### DATA STRUCTURES AND MODELS (MONGODB)

[CATEGORIES]

## Description : 
Categories enables us to sort the ingredients by category such as :
- Veggie
- Dairy Products
- Meat
- Spices
- Beverage

## Connected to : 
INGREDIENTS


## Structure in the DB :
name ==> name of the category
INGREDIENTS(M) ==> Collection fo all the ingredients included in this category
categoryPicture ==> the URL/URI of a picture illustrating a given category
description ==> a short description of the category

## User interactions with this model :
C : No
R : Yes, he can see the ingredients of each category when he access the pantry page
U : No
D : No

## Connection to user Model : 
None.


[INGREDIENTS]
## Description : 
Contains all the informations for a given ingredients

## Connected to : 
CATEGORIES
RECIPES


## Structure in the DB :
name ==> name of the ingredient
price ==> A 3-star system to indicate the economic value of an ingredient. 1 star = cheap af | 3 = holy cow that's expensive
fSSIndex ==> fSS for Fat, Salt and Sweet. A 3-star system to indicate the nutritional value of an ingredient.
1 star = low fSS =healthy | 3 = holy cow that's fat ma man == yummy / fatty.
unit ==> The unit used to measure the quantity of a given ingredient. (g, l, piece). some ingredients have no units (salt, condiments, etc).
CATEGORY (M) ==> the collection to which belong the Ingredient


## User interactions with this model :
C : No
R : Yes, he can see the ingredients of each category when he access the pantry page
U : No
D : No

## Connection to user Model : 
The user can add ingredients to its "stock" property

[RECIPES]
## Description : 
Contains all the informations to cook a given recipes + the list of ingredients

## Connected to : 
STYLE
INGREDIENTS


## Structure in the DB :
name : self-explanatory
intro : A short presentation of the recipe
steps : The different steps to achieve the recipe
country : The origin of the recipe
STYLE (M) : The type of dish (healthy, yummy, sweet,etc)
difficulty : A scale system going from 1 to 3 (maybe 5 in the future). The bigger the number, the harder the recipe
pictureUrl : A string leading to a picture illustrating the recipe (will be a cartoonish picture).
mainIngredient : the dominant ingredient of the recipes. Useful if at some point the user is looking for a recipes focused on one specific ingredient
INGREDIENTSNEEDED (M) : A list of the ingredients needed to cook this recipes  

## User interactions with this model :
C : No
R : No
U : No
D : No

## Connection to user Model : 
The user can add recipes to his/her properties "recipesCooked" and "recipesSaved"



[STYLES]
## Description : 
The type of meal. A meal can only have one style (yummy, sweet, Healthy, etc).
Useful to find the recipe adapted to the user mood 

## Connected to : 
RECIPES

## Structure in the DB :
name : self-explanatory
stylePicture : A cartoonish pic to illustrate this cooking style

## User interactions with this model :
C : No
R : No
U : No
D : No

## Connection to user Model : 
none


[USERS]
## Description : 
Well...
## Connected to : 
RECIPES
INGREDIENTS

## Structure in the DB :
name : self-explanatory
surname : self-explanatory
username : will be the email of the user
RECIPESSAVED(M) : Allows the user to bookmark his favourite recipes and find them in a flash 
RECIPESCOOKED (M) : To help the user find the meal he has already cooked
stock
## User interactions with this model :
C : Yes, through the login / signup portal
R : Yes, the user can read all his informations on the dashboard
U : Yes, the user can change his / her information in the dashboard 
D : Yes, the user can delete his / her account on the dashboard (double verification to avoid unwanted deletions)



### BACK - END / API STRUCTURE (NODE.JS + EXPRESS)

Introduction

In this app, the server provide the API ENDPOINT to the front-end and achieve the CRUD operations with the Database (MongoDB)
The server is NOT involved in the rendering / view.
The structure of the back-end follows the MVC (without the View)
To top it off, there are as well a router folder to manage the different route in a clean way. It helps us "declutter" the code of the controller.


[INDEX.JS]

## MODULES
Express ==> the best framework to deal with server management
Passport ==> to manage the user authentification
Mongoose ==> to carry out DB operations faster
bodyParser ==> to parse the data posted by the user as JSON easily
cookieParser ==> to manage the cookies
Express ==>
DotEnv ==> To set environmental variables and ease their management
router ==> a JS file we will use to manage the API routes


## CODE SECTIONS

# SERVER
const app = express();
To create an express server.

# DB CONNECTION
Done with mongoose.connect


# COOKIE MANAGEMENT AND PARSING
The cookie_secret is defined in the .env file (it contains the environmental variable).

# PASSPORT AND AUTHENTIFICATION
TBD

# ROUTER SETTINGS
app.use("/", router);
==> The server express, will use router when we call / reach this url "/" (main page).
In other words, it means everytime we use an url with this server, router manage the action (GET, POST, DELETE, etc).


[ROUTERS]
See code. StraightForward.
Note that we set the cors Option in the file indexRouter.js. 
We need that to execute API CALLS with the front-end located on a different port.
[CONTROLLERS]




["LOGIN-AND-AUTHENTICATION"]


### FRONT-END STRUCTURE AND COMPONENTS (REACT)

Introduction


[HOMEPAGE]

[PANTRY]

[SEARCHRECIPES]

[RECIPES_DETAILS]

[FOOTER_AND_NAVBAR]


[ADMIN_AND_BACK-OFFICE]

## ADMIN.JSX

## HOMEADMIN

## CREATEORUPDATE

## ADDENTRY

## READENTRIES

## UPDATEENTRY




## CRUD ACTIONS BY MODEL

# CATEGORIES
<CREATE>
When we add ingredient to a brand new category we  add this category to the ingredient. the new category remplace the former category of the ingredient.

<READ>
Nothing worth mentionning.

<UPDATE>
Same Component as for CREATE operations but this time the alt value exists in the state newCategory.
Here is an example with the CATEGORY Model : 

const [newCategory, setNewCategory] = React.useState(
    categoryToUpdate || {
        name : "",
        categoryPicture : "",
        description : ""
    }
)

Once again we can't add / remove ingredients to/from this category.

<DELETE>


# INGREDIENTS
<CREATE>
When we add a new ingredients, we bind it to an existing category ==> We add this ingredient to a given category.
(see ingredientsController == newIngredient).
An ingredient without category is automatically added to the garbage Category : "NO CATEGORY"
 
<READ>
Nothing worth mentionning.

<UPDATE>
<DELETE>

# STYLES
<CREATE>
 
<READ>
Nothing worth mentionning.

<UPDATE>
<DELETE>


# STLE
<CREATE>
Nothing worth mentionning.

 
<READ>
Nothing worth mentionning.

<UPDATE>
<DELETE>

# STYLES
<CREATE>
 
<READ>
Nothing worth mentionning.

<UPDATE>
<DELETE>



# RECIPES
<CREATE>
 A recipe without style is automatically added to the garbage Style : "NO STYLE"

<READ>
Nothing worth mentionning.

<UPDATE>
 A recipe without style is automatically added to the garbage Style : "NO STYLE"

<DELETE>
Nothing worth mentionning.


# USERS
<CREATE>
The users can be created in two different ways :
the "normal" way : An user create his account. He can choose his/her 
    - username
    - name
    - surname
    - password.
The "admin" way : from the admin space we can create an user and add from the get go value to the properties recipesCooked and recipesSaved.

<READ>
Nothing worth mentionning.

<UPDATE>

<DELETE>
Nothing worth mentionning.



### BACK-OFFICE AND ADMIN (REACT)


A mere CRUD to manage ingredients, categories, recipes, styles and user.

### DESIGN AND AESTHETICS


[TONE OF VOICE]

[THE VIBE]

[MAIN CSS STYLE] (All the components adopt this style and their variations).
