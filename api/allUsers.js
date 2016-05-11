/*
*The allUsers API
* Created by Kartik Sawhney on 5/8/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

var api = {
    get: function(request, response, next) {
        var query = {sql: 'SELECT DISTINCT u.name as name, u.email as email, a.action as action, a.createdAt as actionTime, l.start_datetime as startTime, l.end_datetime as endTime, l.duration as duration from users u, actions_taken a, log l WHERE u.id = a.user_id AND u.id = l.user_id'
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            response.send(results);
        });
    }
};
module.exports = api;

