/*
*The logInfo API
* Created by Kartik Sawhney on 5/8/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

var api = {
    get: function(request, response, next) {
        // var query = {sql: 'SELECT u.name as name, u.email as email, l.start_datetime as startTime, l.end_datetime as endTime, l.duration as duration from users u, log l where u.id=l.user_id'
        // };
        var query = {sql: 'SELECT user_id, start_datetime as startTime, l.end_datetime as endTime, l.duration as duration from log'
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            response.send(results);
        });
    }
};
module.exports = api;

