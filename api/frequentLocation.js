/*
*The frequentLocation API
* Created by Kartik Sawhney on 4/19/2016
* Copyright © 2016 Cargi. All rights reserved.
*/

//Gets the distance between a pair of geographic coordinates
function getDistance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
    }

function checkForDuplicates(results, minTime, maxTime, lat, long) {
    for (var i = 0; i < results.length; i++) {
        if (
            (minTime >= results[i]["minTime"] && minTime <= results[i]["maxTime"] && getDistance(results[i]["latitude"], results[i]["longitude"], lat, long) <= 0.5) ||
(maxTime >= results[i]["minTime"] && maxTime <= results[i]["maxTime"] && getDistance(results[i]["latitude"], results[i]["longitude"], lat, long) <= 0.5) ||
            (results[i]["minTime"] >= minTime && results[i]["minTime"] <= maxTime && getDistance(results[i]["latitude"], results[i]["longitude"], lat, long) <= 0.5) ||
            (results[i]["maxTime"] >= minTime && results[i]["maxTime"] <= maxTime && getDistance(results[i]["latitude"], results[i]["longitude"], lat, long) <= 0.5)) {
            return true;
        }
    }
    return false;
}

function checkForDates(dateArray) {
    for (var i = 0; i < dateArray.length; i++) {
        if (dateArray[i] == "null") {
            continue;
        }

        if (new Date(dateArray[i]).getDay() == new Date().getDay()) {
            return true;
        }
    }
    return false;
}

/*
*This function uses an SQL query to get the desired information. 
*We account for two scenarios here-an event that repeats on a daily basis (M-F, in which case we use the condition that the event should have occured within the time window on at least five consecutive days within the past week).
*For weekly events, we use the condition that the event should have occured on that day within a particular time window for at least the past three weeks. 
*We use the distance as a filter later.
*/

var api = {
    get: function(request, response, next) {
        var query = {
         sql: 'SELECT id from Users where device_id=@device_id',
            parameters: [
                { name: 'device_id', value: request.query.device_id }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            var user_id = results[0]["id"];
            var query2 = {
                sql: 'SELECT a.user_id as user, a.latitude as latitude1, a.longitude as longitude1, b.latitude as latitude2, b.longitude as longitude2, e.latitude as latitude3, e.longitude as longitude3, a.datetime as date1, b.datetime as date2, c.datetime as date3, d.datetime as date4, e.datetime as date5, "daily" as frequency FROM Location_history a, Location_history b, Location_history c, Location_history d, Location_history e WHERE a.user_id = @user_id and b.user_id = @user_id and c.user_id = @user_id and d.user_id = @user_id and e.user_id = @user_id and julianday(b.datetime)-julianday(a.datetime) >= 0.97 and julianday(b.datetime)-julianday(a.datetime) <= 1.021 and julianday(c.datetime)-julianday(b.datetime) >= 0.97 and julianday(c.datetime)-julianday(b.datetime) <= 1.021 and julianday(d.datetime)-julianday(c.datetime) >= 0.97 and julianday(d.datetime)-julianday(c.datetime) <= 1.021 and julianday(e.datetime)-julianday(d.datetime) >= 0.97 and julianday(e.datetime)-julianday(d.datetime) <= 1.021 and julianday(CURRENT_TIMESTAMP)-julianday(e.datetime) <= 7 UNION SELECT a.user_id as user, a.latitude as latitude1, a.longitude as longitude1, b.latitude as latitude2, b.longitude as longitude2, c.latitude as latitude3, c.longitude as longitude3, a.datetime as date1, b.datetime as date2, c.datetime as date3, "null" as datetime4, "null" as datetime5, "weekly" as frequency FROM Location_history a, Location_history b, Location_history c WHERE a.user_id = @user_id and b.user_id = @user_id and c.user_id = @user_id and julianday(b.datetime)-julianday(a.datetime) >= 6.97 and julianday(b.datetime)-julianday(a.datetime) <= 7.021 and julianday(c.datetime)-julianday(a.datetime) >= 13.94 and julianday(c.datetime)-julianday(a.datetime) <= 14.042 and julianday(CURRENT_TIMESTAMP)-julianday(a.datetime) <= 21',
                parameters: [
                    { name: 'user_id', value: user_id }
                ]
            };
            request.azureMobile.data.execute(query2)
            .then(function(results) {
                var finalArray = [];
                for (var i = 0; i < results.length; i++) {
                    var dateArray = [results[i]["date1"], results[i]["date2"], results[i]["date3"], results[i]["date4"], results[i]["date5"]];
                    if (!checkForDates(dateArray)) {
                       continue;
                    }
                    var latitude1 = results[i]["latitude1"];
                    var longitude1 = results[i]["longitude1"];
                    var latitude2 = results[i]["latitude2"];
                    var longitude2 = results[i]["longitude2"];
                    var latitude3 = results[i]["latitude3"];
                    var longitude3 = results[i]["longitude3"];
                    var distance1 = getDistance(latitude1, longitude1, latitude2, longitude2);
                    var distance2 = getDistance(latitude1, longitude1, latitude3, longitude3);
                    var distance3 = getDistance(latitude2, longitude2, latitude3, longitude3);
                    var latitude = 0;
                    var longitude = 0;

                    if (distance1<=0.5 && distance2<=0.5 && distance3<=0.5) { //if all distances are within the 0.5 mile radius
                        if ((latitude1 == latitude2 && longitude1 == longitude2) || (latitude1 == latitude3 && longitude1 == longitude3)) { //want to use the more commonly recorded coordinates since they are likely to be more accurate
                            latitude = latitude1;
                            longitude = longitude1;
                        } else if (latitude2 == latitude3 && longitude2 == longitude3) {
                            latitude = latitude2;
                            longitude = longitude2;
                        } else {
                            latitude = latitude1;
                            longitude = longitude1;
                        } 

                        if (results[i]["frequency"] == "daily") {
                            var date1 = new Date(results[i]["date1"]);
                            var date2 = new Date(results[i]["date2"]);
                            var date3 = new Date(results[i]["date3"]);
                            var date4 = new Date(results[i]["date4"]);
                            var date5 = new Date(results[i]["date5"]);

                            var minTime = Math.min(date1.getHours() + (date1.getMinutes()/100), date2.getHours() + (date2.getMinutes()/100), date3.getHours() + (date3.getMinutes()/100), date4.getHours() + (date4.getMinutes()/100), date5.getHours() + (date5.getMinutes()/100));
                            var maxTime = Math.max(date1.getHours() + (date1.getMinutes()/100), date2.getHours() + (date2.getMinutes()/100), date3.getHours() + (date3.getMinutes()/100), date4.getHours() + (date4.getMinutes()/100), date5.getHours() + (date5.getMinutes()/100));
                            if (!checkForDuplicates(finalArray, minTime, maxTime, latitude, longitude)) {
                                var finalObj = {user_id: results[i]["user"], latitude: latitude, longitude: longitude, day: new Date().getDay(), minTime: minTime, maxTime: maxTime};
                                finalArray.push(finalObj);
                            }
                        } else if (results[i]["frequency"] == "weekly") {
                            var date1 = new Date(results[i]["date1"]);
                            var date2 = new Date(results[i]["date2"]);
                            var date3 = new Date(results[i]["date3"]);
                            var minTime = Math.min(date1.getHours() + (date1.getMinutes()/100), date2.getHours() + (date2.getMinutes()/100), date3.getHours() + (date3.getMinutes()/100));
                            var maxTime = Math.max(date1.getHours() + (date1.getMinutes()/100), date2.getHours() + (date2.getMinutes()/100), date3.getHours() + (date3.getMinutes()/100));
                            if (!checkForDuplicates(finalArray, minTime, maxTime, latitude, longitude)) {
                                var finalObj = {user_id: results[i]["user"], latitude: latitude, longitude: longitude, day: date3.getDay(), minTime: minTime, maxTime: maxTime};
                                finalArray.push(finalObj);
                            }
                        }
                    }
                }

                response.send({result: finalArray});
            });
        });
    }
};
module.exports = api;

