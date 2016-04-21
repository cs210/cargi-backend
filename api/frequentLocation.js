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

function processDate(dateString) {
    return new Date(JSON.stringify(dateString).split("\"")[1]);
}

var api = {
    get: function(request, response, next) {
        var query = {
            sql: 'SELECT a.user_id as user, a.latitude as latitude1, a.longitude as longitude1, b.latitude as latitude2, b.longitude as longitude2, c.latitude as latitude3, c.longitude as longitude3, a.datetime as date FROM Location_history a, Location_history b, Location_history c WHERE a.user_id = @user_id and b.user_id = @user_id and c.user_id = @user_id and julianday(b.datetime)-julianday(a.datetime) >= 6.97 and julianday(b.datetime)-julianday(a.datetime) <= 7.021 and julianday(c.datetime)-julianday(a.datetime) >= 13.94 and julianday(c.datetime)-julianday(a.datetime) <= 14.042 and julianday(CURRENT_TIMESTAMP)-julianday(a.datetime) <= 22',
            parameters: [
                { name: 'user_id', value: request.query.user_id }
            ]
        };
        request.azureMobile.data.execute(query)
        .then(function(results) {
            var finalArray = [];
            var timeOffset = 8812800;
            for (var i = 0; i < results.length; i++) {
                var latitude1 = results[i]["latitude1"];
                var longitude1 = results[i]["longitude1"];
                var latitude2 = results[i]["latitude2"];
                var longitude2 = results[i]["longitude2"];
                var latitude3 = results[i]["latitude3"];
                var longitude3 = results[i]["longitude3"];
                var distance1 = getDistance(latitude1, longitude1, latitude2, longitude2);
                var distance2 = getDistance(latitude1, longitude1, latitude3, longitude3);
                var distance3 = getDistance(latitude2, longitude2, latitude3, longitude3);
                var dateObj = new Date(results[i]["date"]);
                if (distance1<=0.5 && distance2<=0.5 && distance3<=0.5) {
                    if ((latitude1 == latitude2 && longitude1 == longitude2) || (latitude1 == latitude3 && longitude1 == longitude3)) {
                        var finalObj = {user_id: results[i]["user"], latitude: latitude1, longitude: longitude1, day: dateObj.getDay(), hh: dateObj.getHours(), min: dateObj.getMinutes()};
                        finalArray.push(finalObj);
                    } else if (latitude2 == latitude3 && longitude2 == longitude3) {
                        var finalObj = {user_id: results[i]["user"], latitude: latitude2, longitude: longitude2, day: dateObj.getDay(), hh: dateObj.getHours(), min: dateObj.getMinutes()};
                        finalArray.push(finalObj);
                    } else {
                        var finalObj = {user_id: results[i]["user"], latitude: latitude1, longitude: longitude1, day: dateObj.getDay(), hh: dateObj.getHours(), min: dateObj.getMinutes()};
                        finalArray.push(finalObj);
                    }
                }
            }
            response.send({result: finalArray});
        });
    }
};
module.exports = api;

