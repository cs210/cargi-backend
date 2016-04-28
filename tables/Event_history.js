var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "user_id": "string",
    "latitude": "number",
    "longitude": "number",
    "datetime": "date",
    "event_name": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { id: "1", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-02T11:00:00+00:00", event_name: "A"},
    { id: "2", user_id: "1", longitude: -122.165309, latitude: 37.425575, datetime: "2016-04-28T09:30:00+00:00", event_name: "b"},
    { id: "3", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-16T11:30:00+00:00", event_name: "C"},
    { id: "4", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-11T11:30:00+00:00", event_name: "E"},
    { id: "5", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-12T11:30:00+00:00", event_name: "F"},
    { id: "6", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-13T11:30:00+00:00", event_name: "G"},
    { id: "7", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-14T11:30:00+00:00", event_name: "H"},
    { id: "8", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-15T11:30:00+00:00", event_name: "I"},
    { id: "9", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-24T08:30:00+00:00", event_name: "J"},
    { id: "10", user_id: "1", longitude: -122.164089, latitude: 37.425421, datetime: "2016-04-17T11:30:00+00:00", event_name: "K"},
    { id: "11", user_id: "emjtang", longitude: -122.164089, latitude: 37.425421, datetime: "2016-01-18T19:00:00+00:00", event_name: "N"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;