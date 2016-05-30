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
            var query2 = {sql: 'SELECT DISTINCT c.name as name, "event" as type from contacts c, event_history e, event_contacts ec where e.user_id = @user_id and e.id = ec.event_id and c.id = ec.contact_id and julianday(e.datetime)-julianday(CURRENT_TIMESTAMP) <= 1 and julianday(e.datetime)-julianday(CURRENT_TIMESTAMP) >= 0 order by e.datetime LIMIT 6',
                parameters: [
                    { name: 'user_id', value: user_id }
                ]
            };

            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var tempArray = []
                tempArray = results
                var query3 = {sql: 'SELECT DISTINCT c.name as name, "frequent" as type, count(ec.contact_id) as counter FROM contacts c, event_history e, event_contacts ec where e.user_id = @user_id and e.id = ec.event_id and c.id = ec.contact_id and julianday(CURRENT_TIMESTAMP)-julianday(e.datetime) <= 30 group by ec.contact_id order by count(ec.contact_id) desc',
                    parameters: [
                    {     name: 'user_id', value: user_id }
                    ]
                };
                request.azureMobile.data.execute(query3)
                .then(function(results) {
                    var tempArray2 = []
                    tempArray2 = results
                    var query4 = {sql: 'SELECT DISTINCT c.name as name, "recent" as type FROM contacts c, communication_history ch where ch.user_id = @user_id and c.id = ch.contact_id ORDER BY ch.createdAt DESC LIMIT 6',
                        parameters: [
                        {     name: 'user_id', value: user_id }
                        ]
                    };
                    request.azureMobile.data.execute(query4)
                    .then(function(results) {
                        var tempArray3 = []
                        tempArray3 = results
                        var query5 = {sql: 'SELECT DISTINCT c.name as name, a.createdAt as date1, b.createdAt as date2, "timely" as ttype FROM contacts c, communication_history a, communication_history b WHERE a.user_id = @user_id and b.user_id = @user_id and c.id = a.contact_id and c.id = b.contact_id and julianday(date2)-julianday(date1) >= 0.97 and julianday(date2)-julianday(date1) <= 1.021 and julianday(CURRENT_TIMESTAMP)-julianday(date2) >= 0.97 and julianday(CURRENT_TIMESTAMP)-julianday(date2) <= 1.021 UNION SELECT c.name as name, a.createdAt as date1, b.createdAt as date2, "timely" as type FROM contacts c, communication_history a, communication_history b WHERE a.user_id = @user_id and b.user_id = @user_id and c.id = a.contact_id and c.id = b.contact_id and julianday(date2)-julianday(date1) >= 6.97 and julianday(date2)-julianday(date1) <= 7.021 and julianday(CURRENT_TIMESTAMP)-julianday(date2) >= 6.97 and julianday(CURRENT_TIMESTAMP)-julianday(date2) <= 7.021',
                            parameters: [
                            {     name: 'user_id', value: user_id }
                            ]
                        };
                        request.azureMobile.data.execute(query5)
                        .then(function(results) {
                            if (request.query.type == "event") {
                                response.send(tempArray);
                            } else if (request.query.type == "frequent") {
                                response.send(tempArray2);
                            } else if (request.query.type == "recent") {
                                response.send(tempArray3);
                            } else if (request.query.type == "timely") {
                                response.send(results);
                            } else {
                                var finalArray = [];
                                for (var i = 0; i < tempArray.length; i++) {
                                    if (!checkForDuplicates(finalArray, tempArray[i]["name"])) {
                                        var finalObj = {name: tempArray[i]["name"], type: "event"};
                                        finalArray.push(finalObj);
                                    }
                                }

                                for (var i = 0; i < tempArray2.length; i++) {
                                    if (!checkForDuplicates(finalArray, tempArray2[i]["name"])) {
                                        var finalObj = {name: tempArray2[i]["name"], type: "frequent"};
                                        finalArray.push(finalObj);
                                    }
                                }

                                for (var i = 0; i < tempArray3.length; i++) {
                                    if (!checkForDuplicates(finalArray, tempArray3[i]["name"])) {
                                        var finalObj = {name: tempArray3[i]["name"], type: "recent"};
                                        finalArray.push(finalObj);
                                    }
                                }

                                for (var i = 0; i < results.length; i++) {
                                    if (!checkForDuplicates(finalArray, results[i]["name"])) {
                                        var finalObj = {name: results[i]["name"], type: "timely"};
                                        finalArray.push(finalObj);
                                    }
                                }

                                response.send({result: finalArray});
                            }
                        });
                    });
                });
            });
        });
    }
};
module.exports = api;

