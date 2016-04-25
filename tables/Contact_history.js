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
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-01T09:00:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-08T09:25:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-15T09:25:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-16T09:25:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-17T09:25:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-18T09:25:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-19T09:25:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-20T09:25:00+00:00"},
    { user_id: "kartiks2", contact_id: "emjtang", event_id: "1", method: "phone", datetime: "2016-04-21T09:25:00+00:00"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;