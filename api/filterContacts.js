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
            var query2 = {sql: 'SELECT * FROM contacts'
            };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var finalArray = []
                response.send(results);

                /*
                for (var i = 0; i < results.length; i++) {
                    var id5String = "Optional(" + results[i]["id5"] + ")"

                    if (results[i]["id5"] != user_id && id5String != user_id) {
                        continue;
                    }
                    if (results[i]["id1"] && results[i]["id2"] && results[i]["id3"] && results[i]["id4"]) {
                        var id1String = "Optional(" + results[i]["id1"] + ")";
                        var id2String = "Optional(" + results[i]["id2"] + ")";
                        var id3String = "Optional(" + results[i]["id3"] + ")";
                        var id4String = "Optional(" + results[i]["id4"] + ")";
                        //if ((results[i]["id1"].indexOf(results[i]["id3"]) > -1 || results[i]["id3"].indexOf(results[i]["id1"]) > -1) && (results[i]["id2"].indexOf(results[i]["id4"]) > -1 || results[i]["id4"].indexOf(results[i]["id2"]) > -1)) {
                        if ((results[i]["id1"] == results[i]["id3"] || results[i]["id1"] == id3String || results[i]["id3"] == id1String) && (results[i]["id2"] == results[i]["id4"] || results[i]["id2"] == id4String || results[i]["id4"] == id2String)) {
                            finalArray.push(results[i]["name"])
                            finalArray.push(results[i]["id1"])
                            finalArray.push(results[i]["id2"])
                            finalArray.push(results[i]["id3"])
                            finalArray.push(results[i]["id4"])
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

