<img src="http://i.imgur.com/Tyx3dLj.png" alt="cargi logo" width="300">

Many tools in our lives are personalized, and we should expect the same things from our cars, considering the amount of time we spend in them. Drivers have varying skills and habits: some might prefer a safe driver mode which allows them to easily switch lanes, guides them into a parking spot, and finds roads where there are fewer cars.  Others might want the radio blasting and mood lighting as they speed down the highway, or want to automatically play their favorite morning radio show on their way to work. We’re really excited to make the car experience something that is more than just about getting from one place to another - the car should feel like an extension of yourself where everything is customized to perfectly meet your needs.

# Instructions for local development using node.js backend and Azure:

. You do not need to install anything after you clone the repo. 
. From the terminal, type "node app.js" (without the quotes) to launch the local server. 
. Use the URL localhost:3000/api/<name of the API>?ZUMO-API-VERSION=2.0.0&<additional params>. e.g. To call the filterContacts API with the device ID abc and type recent, use localhost:3000/api/filterContacts?ZUMO-API-VERSION=2.0.0&device_id=abc&type=recent
. After deploying to Azure (which happens automatically once you push the changes to the master branch of the repo), use the URL cargi.azurewebsites.net/api/<name of the API>?<params>. 
. If you want to view the tables, use cargi.azurewebsites.net/tables/<name of the table>.

# Instruction for using the gas price api:

* Go to https://gas-price-api.herokuapp.com/stations/[zipcode] 
* [zipcode] is the 5 digit zipcode for the area you want to get gas info for. 
* Example: https://gas-price-api.herokuapp.com/stations/94305
* You will get a json object with the name of each station, the price, and its address
* The github for the gas api is at https://github.com/mayanb/gaspriceapi

# Instructions for using the filterContacts API:

. Pass in the device_id of the current user as the param to the API. 
. Optionally, pass in a second param (type). The possible values are event (contacts that the user has an event with that day sorted in ascending order of event time), recent (recent calls/texts), frequent (contacts that the user has events with most often, sorted in the decreasing order of frequency of events) and timely (if the user calls a contact at that particular time of the day, e.g. the user calls his mom at 10:00 every night)
. If no param is passed, the API returns in an array of event, frequent, recent and timely contacts in that order, limiting the No. of contacts in each category to 6. Therefore, a maximum of 24 contacts are returned. 
. You will get a json object with name, type and counter (in case of frequent) only. You are most likely not interested in type and counter; these are only if we need more information. 
. Algorithm: For event contacts, return at most 6 contacts that the user has an event with that day sorted by event time (such that contacts with events in the near future appear before those later in the day). This is followed by retrieving frequent contacts. This looks for records in the past 30 days and sorts them in descending order of counts of records in the contact table for that particular user. Recent just retrieves the recent contacts that the user called. Timely checks if there is a contact that the user called at approximately the same time as now (we use 30 minutes as the allowed time difference) either yesterday and the day before, or on the same day in the past two weeks. If this is the case, it is returned with the hope that the user might want to call this person again as is evident from the patern. 

# Instructions for using the eventContacts API:

. This API is used for those events that do not have an associated contact. 
. This checks if the contacts of the users have an event with the user at the same time as this event with no contact. if that is the case, then it gets the details of this second user as an event contact. 
. e.g. a has an event with no contact. b, on the other hand, has an event with a at he same time (b has a as an event contact for that event). Then, we can say that the event contact for a's event is b, even though he did not explicitly define it as such. 
. To use this API, pass in the device_id of the current user and the event ID of the event for which we are unable to find a contact. 
. It returns the name of the suggested contact and the user_id. 