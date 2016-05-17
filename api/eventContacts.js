/*
*The eventContacts API
* Created by Kartik Sawhney on 4/28/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

/*
*This function uses an SQL query to get the desired information. 
*We check if user B has an event with user A, which means that A and B are asociated events contacts for sure. 
*/

var api = {
    get: function(request, response, next) {
        var query = {
         sql: 'SELECT name from users where device_id = @device_id',
            parameters: [
                { name: 'device_id', value: request.query.device_id }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            var name = results[0]["name"];
            var query2 = {sql: 'SELECT datetime as datetime from event_history where id = @event_id',
                parameters: [
                    { name: 'event_id', value: request.query.event_id }
                ]
            };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var event_datetime = results[0]["datetime"];
                var query3 = {sql: 'SELECT e.user_id from event_history e, event_contacts ec, contacts c where e.id = ec.event_id and c.id = ec.contact_id and abs(e.datetime-@event_datetime) <= 0.021 and ec.contact_id in (select ec.contact_id from event_contacts ec, contacts c where c.name = @name and ec.contact_id = c.id)',
                    parameters: [
                        { name: 'event_datetime', value: event_datetime},
                        { name: 'name', value: name}
                    ]
                };
                request.azureMobile.data.execute(query3)
                .then(function(results) {
                    var query4 = {sql: 'SELECT c.name as name, u.id as user_id from contacts c, users u where u.id = @user_id and c.name = u.name',
                        parameters: [
                            { name: 'user_id', value: results[0]["user_id"]}
                        ]
                    };
                    request.azureMobile.data.execute(query4)
                    .then(function(results) {
                        response.send(results);
                    });
                });
            });
        });
    }
};
module.exports = api;

