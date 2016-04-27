var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "user_id": "string",
    "contact_id": "string",
    "event_id": "string",
    "method": "string",
    "datetime": "date"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { id: "1", user_id: "1", contact_id: "2", event_id: "1", method: "phone", datetime: "2016-04-01T09:00:00+00:00"},
    { id: "2", user_id: "1", contact_id: "2", event_id: "2", method: "phone", datetime: "2016-04-08T09:25:00+00:00"},
    { id: "3", user_id: "1", contact_id: "2", event_id: "3", method: "phone", datetime: "2016-04-15T09:25:00+00:00"},
    { id: "4", user_id: "1", contact_id: "2", event_id: "-1", method: "phone", datetime: "2016-04-16T09:25:00+00:00"},
    { id: "5", user_id: "1", contact_id: "3", event_id: "4", method: "phone", datetime: "2016-04-17T09:25:00+00:00"},
    { id: "6", user_id: "1", contact_id: "3", event_id: "5", method: "phone", datetime: "2016-04-18T09:25:00+00:00"},
    { id: "7", user_id: "1", contact_id: "3", event_id: "-1", method: "phone", datetime: "2016-04-19T09:25:00+00:00"},
    { id: "8", user_id: "1", contact_id: "4", event_id: "6", method: "phone", datetime: "2016-04-20T09:25:00+00:00"},
    { id: "9", user_id: "1", contact_id: "3", event_id: "-1", method: "phone", datetime: "2016-04-21T09:25:00+00:00"},
    { id: "10", user_id: "1", contact_id: "5", event_id: "-1", method: "phone", datetime: "2016-04-21T07:25:00+00:00"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;