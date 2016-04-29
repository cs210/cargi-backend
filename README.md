<img src="http://i.imgur.com/Tyx3dLj.png" alt="cargi logo" width="300">

Many tools in our lives are personalized, and we should expect the same things from our cars, considering the amount of time we spend in them. Drivers have varying skills and habits: some might prefer a safe driver mode which allows them to easily switch lanes, guides them into a parking spot, and finds roads where there are fewer cars.  Others might want the radio blasting and mood lighting as they speed down the highway, or want to automatically play their favorite morning radio show on their way to work. We’re really excited to make the car experience something that is more than just about getting from one place to another - the car should feel like an extension of yourself where everything is customized to perfectly meet your needs.

# Instructions for local development using node.js backend and Azure:

. You do not need to install anything after you clone the repo. 
. From the terminal, type "node app.js" (without the quotes) to launch the local server. 
. Use the URL localhost:3000/api/<name of the API>?ZUMO-API-VERSION=2.0.0&<additional params>. e.g. To call the filterContacts API with the phone number 1234567890, use localhost:3000/api/filterContacts?ZUMO-API-VERSION=2.0.0&phone_number=1234567890
. After deploying to Azure (which happens automatically once you push the changes to the master branch of the repo), use the URL cargi.azurewebsites.net/api/<name of the API>?<params>. 
. If you want to view the tables, use cargi.azurewebsites.net/tables/<name of the table>.

# Instructions for Node.js app (not required for node.js backend with Azure):

. Install homebrew
. Install npm
. Go into cargi-webapp/nodeapp
. Do `npm install`
. Run with `DEBUG=myapp:* npm start` on Mac or `set DEBUG=myapp:* & npm start` on Windows

# Instruction for using the gas price api:

* Go to https://gas-price-api.herokuapp.com/stations/[zipcode]
* Where [zipcode] is the 5 digit zipcode for the area you want to get gas info for. 
* Example: https://gas-price-api.herokuapp.com/94305
* You will get a json object with the name of each station, the price, and its address
* The github for the gas api is at https://github.com/mayanb/gaspriceapi
* 



# Instructions for using the filterContacts API:

. Pass in the phone number of the current user as the param to the API. 
. You will get a json object with first_name, last_name, phone_number, type (event, frequent, regular in that order) and counter (in case of frequent). You are most likely not interested in type and counter; these are only if we need more information. 
. Algorithm: Start with at most 6 contacts that the user has an event with in the next three hours, followed by at most six contacts that the user has had events with in the past 30 days ordered in the descending order of the No. of events, followed by everyone else. 

