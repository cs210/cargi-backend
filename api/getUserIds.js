/*
*The allUsers API
* Created by Kartik Sawhney on 5/8/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

var api = {
    get: function(request, response, next) {
        var query = {sql: 'SELECT name, email, id from users'
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            response.send(results);
        });
    }
};
module.exports = api;

