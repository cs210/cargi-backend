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
* We first query for any contacts that the person has an event with within the next three hours, followed by 
* a list of those that the person usually has events with, followed by everyone else. 
*/

var api = {
    get: function(request, response, next) {
        var query = {
         sql: 'SELECT id from Users where phone_number=@phone_number',
            parameters: [
                { name: 'phone_number', value: request.query.phone_number }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            var user_id = results[0]["id"];
            var query2 = {sql: 'SELECT c.first_name as first_name, c.last_name as last_name, c.phone_number as phone_number, "event" as type from Contacts c, Event_history e, Event_contacts ec where c.user_id = @user_id and e.user_id = @user_id and e.id = ec.event_id and c.id = ec.contact_id and julianday(e.datetime)-julianday(CURRENT_TIMESTAMP) <= 0.125 and julianday(e.datetime)-julianday(CURRENT_TIMESTAMP) >= 0 UNION SELECT c.first_name as first_name, c.last_name as last_name, c.phone_number as phone_number, "regular" as type from Contacts c, Event_history e, Event_contacts ec where c.user_id = @user_id',
                parameters: [
                    { name: 'user_id', value: user_id }
                ]
            };

            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var tempArray = []
                tempArray = results
                var query3 = {
             sql: 'SELECT c.first_name as first_name, c.last_name as last_name, c.phone_number as phone_number, "frequent" as type, count(ec.Contact_id) as counter FROM Contacts c, Event_history e, Event_contacts ec where c.user_id = @user_id and e.user_id = @user_id and e.id = ec.event_id and c.id = ec.contact_id and julianday(CURRENT_TIMESTAMP)-julianday(e.datetime) <= 30 GROUP BY ec.contact_id ORDER BY count(ec.contact_id) DESC LIMIT 6',
                    parameters: [
                    {     name: 'user_id', value: user_id }
                    ]
                };
                request.azureMobile.data.execute(query3)
                .then(function(results) {
                    var finalArray = [];
                    for (var i = 0; i < tempArray.length; i++) {
                        var counter = 0;
                        if (!checkForDuplicates(finalArray, tempArray[i]["first_name"], tempArray[i]["last_name"], tempArray[i]["phone_number"]) && tempArray[i]["type"] == "event") {
                            var finalObj = {first_name: tempArray[i]["first_name"], last_name: tempArray[i]["last_name"], phone_number: tempArray[i]["phone_number"], type: "event"};
                            finalArray.push(finalObj);
                            counter++;
                        }
                        if (counter >= 6) {
                            break;
                       }
                }

                    for (var i = 0; i < results.length; i++) {
                        if (!checkForDuplicates(finalArray, results[i]["first_name"], results[i]["last_name"], results[i]["phone_number"])) {
                            var finalObj = {first_name: results[i]["first_name"], last_name: results[i]["last_name"], phone_number: results[i]["phone_number"], type: "frequent", count: results[i]["counter"]};
                            finalArray.push(finalObj);
                        }
                }

                    for (var i = 0; i < tempArray.length; i++) {
                        if (!checkForDuplicates(finalArray, tempArray[i]["first_name"], tempArray[i]["last_name"], tempArray[i]["phone_number"]) && tempArray[i]["type"] == "regular") {
                            var finalObj = {first_name: tempArray[i]["first_name"], last_name: tempArray[i]["last_name"], phone_number: tempArray[i]["phone_number"], type: "regular"};
                            finalArray.push(finalObj);
                        }
                }
                response.send({result: finalArray});
            });
            });
        });
    }
};
module.exports = api;

