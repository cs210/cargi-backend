<img src="http://i.imgur.com/Tyx3dLj.png" alt="cargi logo" width="300">

Many tools in our lives are personalized, and we should expect the same things from our cars, considering the amount of time we spend in them. Drivers have varying skills and habits: some might prefer a safe driver mode which allows them to easily switch lanes, guides them into a parking spot, and finds roads where there are fewer cars.  Others might want the radio blasting and mood lighting as they speed down the highway, or want to automatically play their favorite morning radio show on their way to work. We’re really excited to make the car experience something that is more than just about getting from one place to another - the car should feel like an extension of yourself where everything is customized to perfectly meet your needs.

# Instructions for Node.js app:

. Install homebrew
. Install npm
. Go into cargi-webapp/nodeapp
. Do `npm install`
. Run with `DEBUG=myapp:* npm start` on Mac or `set DEBUG=myapp:* & npm start` on Windows

# Instruction for using the gas price api:

Go to https://frozen-meadow-85846.herokuapp.com/scrape/

Then add the [city]/[state]/[zipcode] to get gas info for that area.

Example: https://frozen-meadow-85846.herokuapp.com/scrape/redmond/wa/98052

For a city with two words (Palo Alto) use a + between the two words (palo+alto)

You will get a json object with the name of each station, the price, and its address

