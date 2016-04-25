/*
* The main backend application file
* Developed by Kartik Sawhney on 4/19/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

var express = require('express'),
    azureMobileApps = require('azure-mobile-apps');

// Set up a standard Express app
var app = express();

// If you are producing a combined Web + Mobile app, then you should handle
// anything like logging, registering middleware, etc. here

var mobile = azureMobileApps();

// Import the files from the tables directory to configure the /tables API
mobile.tables.import('./tables');

// Import the files from the API directory to configure the /api API
mobile.api.import('./api');

// Initialize the database before listening for incoming requests
// The tables.initialize() method does the initialization asynchronously
// and returns a Promise.
mobile.tables.initialize()
    .then(function () {
        app.use(mobile); // Register the Azure Mobile Apps middleware
        app.listen(process.env.PORT || 3000);   // Listen for requests
    });
