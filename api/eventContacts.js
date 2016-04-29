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
         sql: 'SELECT phone_number from Users where device_id = @device_id',
            parameters: [
                { name: 'device_id', value: request.query.device_id }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            var phone_number = results[0]["phone_number"];
            var query2 = {sql: 'SELECT datetime as datetime from Event_history where id = @event_id',
                parameters: [
                    { name: 'event_id', value: request.query.event_id }
                ]
            };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var event_datetime = results[0]["datetime"];
                var query3 = {sql: 'SELECT e.user_id from Event_history e, Event_contacts ec, Contacts c where e.id = ec.event_id and c.id = ec.contact_id and abs(e.datetime-@event_datetime) <= 0.021 and ec.contact_id in (select ec.contact_id from Event_contacts ec, Contacts c where c.phone_number = @phone_number and ec.contact_id = c.id)',
                    parameters: [
                        { name: 'event_datetime', value: event_datetime},
                        { name: 'phone_number', value: phone_number}
                    ]
                };
                request.azureMobile.data.execute(query3)
                .then(function(results) {
                    var query4 = {sql: 'SELECT c.first_name as first_name, c.last_name as last_name, c.phone_number as phone_number from Contacts c, Users u where u.id = @user_id and c.phone_number = u.phone_number',
                        parameters: [
                            { name: 'user_id', value: results[0]["user_id"]}
                        ]
                    };
                    request.azureMobile.data.execute(query4)
                    .then(function(results) {
                        response.send({result: results});
                    });
                });
            });
        });
    }
};
module.exports = api;

