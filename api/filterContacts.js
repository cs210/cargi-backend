/*
*The filterContacts API
* Created by Kartik Sawhney on 4/23/2016
* Copyright © 2016 Cargi. All rights reserved.
This is to rank contacts in decreasing order of their event frequency with a given user. 
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
            response.send("Email does not exist");
            }

            var user_id = results[0]["id"]

            var query2 = {sql: 'SELECT c.name as name, c.id as id1, e.id as id2, ec.contact_id as id3, ec.event_id as id4, e.user_id as id5 FROM contacts c, event_history e, event_contacts ec where c.id = ec.contact_id AND e.id = ec.event_id'
            };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var finalArray = []
                for (var i = 0; i < results.length; i++) {
                    if (results[i]["id5"]) {
                        if (results[i]["id5"] == user_id) {
                            finalArray.push(results[i]["name"])
                        }
                    }
                }
                if (finalArray.length != 0) {
                    finalArray = sortByFrequencyAndRemoveDuplicates(finalArray)
                }
                response.json(finalArray);
            });
        });
    }
};
module.exports = api;

