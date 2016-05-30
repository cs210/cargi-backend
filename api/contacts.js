/*
*The Contacts API
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
        var query = {sql: 'SELECT DISTINCT e.user_id as userid, c.name as name, ec.contact_id as cid, c.id as cid1 FROM contacts c, event_history e, event_contacts ec where (CHARINDEX(e.id, ec.event_id) > 0 or CHARINDEX(ec.event_id, e.id) > 0) and (CHARINDEX(c.id, ec.contact_id) > 0 or CHARINDEX(ec.contact_id, c.id) > 0)'
            };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            response.send(results);
        });
    }
};
module.exports = api;

