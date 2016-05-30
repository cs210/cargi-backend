/*
*The filterContacts API
* Created by Kartik Sawhney on 4/23/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

function checkForDuplicates(results, name) {
    for (var i = 0; i < results.length; i++) {
        if (results[i]["name"] == name) {
            return true;
        }
    }
    return false;
}

/*
*This function uses an SQL query to get the desired information. 
* We first query for any contacts that the person has an event that day, followed by 
* a list of those that the person usually has events with, followed by recent contacts, and finally people that the user contacts at that time of the day.
*/

var api = {
    get: function(request, response, next) {
        var query = {sql: 'SELECT id from users where email=@email',
            parameters: [
                { name: 'email', value: request.query.email }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            var user_id = results[0]["id"];
            var query2 = {sql: 'SELECT DISTINCT c.name as name, COUNT(ec.contact_id) as counter FROM contacts c, event_history e, event_contacts ec GROUP BY ec.contact_id',
            parameters: [
                {     name: 'user_id', value: user_id }
            ]
            };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var tempArray = []
                tempArray = results
                if (request.query.type == "frequent") {
                    response.send(tempArray);
                }
            });
        });
    }
};
module.exports = api;

