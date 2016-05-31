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

function sortByFrequency(array) {
    var frequency = {}
    array.forEach(function(value) { frequency[value] = 0; });
    var uniques = array.filter(function(value) {
        return ++frequency[value] == 1;
    });
    return uniques.sort(function(a, b) {
        return frequency[b] - frequency[a];
    });
}

function sortByFrequencyAndRemoveDuplicates(array) {
    var frequency = {}, value;

    // compute frequencies of each value
    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }

    // make array from the frequency object to de-duplicate
    var uniques = [];
    for(value in frequency) {
        uniques.push(value);
    }

    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
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
            if (results.length == 0) {
                response.send("email does not exist");
            }

            var user_id = results[0]["id"];
            var query2 = {sql: 'SELECT DISTINCT c.name as name, c.id as id1, e.id as id2, ec.contact_id as id3, ec.event_id as id4, e.user_id as id5 FROM contacts c, event_history e, event_contacts ec'
            ]
            };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var tempArray = []
                tempArray = results
                response.send("hello");

                /*
                var finalArray = []

                for (var i = 0; i < tempArray.length; i++) {
                    if (tempArray[i]["id1"] && tempArray[i]["id2"] && tempArray[i]["id3"] && tempArray[i]["id4"]) {
                        if ((tempArray[i]["id1"].indexOf(tempArray[i]["id3"]) > -1 || tempArray[i]["id3"].indexOf(tempArray[i]["id1"]) > -1) && (tempArray[i]["id2"].indexOf(tempArray[i]["id4"]) > -1 || tempArray[i]["id4"].indexOf(tempArray[i]["id2"]) > -1)) {
                        //if ((tempArray[i]["id1"] == tempArray[i]["id3"] || tempArray[i]["id1"] == "Optional(" + tempArray[i]["id3"] + ")" || tempArray[i]["id3"] == "Optional(" + tempArray[i]["id1"] + ")") && (tempArray[i]["id2"] == tempArray[i]["id4"] || tempArray[i]["id2"] == "Optional(" + tempArray[i]["id4"] + ")" || tempArray[i]["id4"] == "Optional(" + tempArray[i]["id2"] + ")")) {
                            finalArray.push(tempArray[i]["name"])
                            finalArray.push(tempArray[i]["id1"])
                            finalArray.push(tempArray[i]["id2"])
                            finalArray.push(tempArray[i]["id3"])
                            finalArray.push(tempArray[i]["id4"])
                        }
                    }
                }
                //finalArray = sortByFrequencyAndRemoveDuplicates(finalArray)
                response.send(finalArray);
                */
            });
        });
    }
};
module.exports = api;

