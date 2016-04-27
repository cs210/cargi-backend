/*
*The filterContacts API
* Created by Kartik Sawhney on 4/23/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

function checkForDuplicates(results, firstName, lastName, phoneNumber) {
    for (var i = 0; i < results.length; i++) {
        if (results[i]["first_name"] == firstName & results[i]["last_name"] == lastName && results[i]["phone_number"] == phoneNumber) {
            return true;
        }
    }
    return false;
}

/*
*This function uses an SQL query to get the desired information. 
* We first query for any contacts that the person has an event with that day, followed by 
* a list of those that the person usually calls that day of the week, followed by everyone else. 
*/

var api = {
    get: function(request, response, next) {
        var query = {
         sql: 'SELECT c.first_name, c.last_name, c.phone from Contacts c, Event_history e, Event_contacts ec where c.user_id = @user_id and e.user_id = @user_id and e.id = ec.event_id and c.id = ec.contact_id and julianday(e.datetime)-julianday(CURRENT_TIMESTAMP) <= 0.125 UNION SELECT c.first_name, c.last_name, c.phone FROM Contacts c WHERE c.user_id=@user_id',
            parameters: [
                { name: 'user_id', value: request.query.user_id }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            var finalArray = [];
            /*
            for (var i = 0; i < results.length; i++) {
                if (!checkForDuplicates(finalArray, results[i]["first_name"], results[i]["last_name"], results[i]["phone_number"])) {
                    var finalObj = {first_name: results[i]["first_name"], last_name: results[i]["last_name"], phone_number: results[i]["phone_number"]};
                    finalArray.push(finalObj);
                }
            }
            */
            response.send({result: "Hello"});
        });
    }
};
module.exports = api;

