var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "user_id": "string",
    "contact_id": "string",
    "event_id": "string",
    "method": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { id: "1", user_id: "1", contact_id: "2", event_id: "1", method: "phone"},
    { id: "2", user_id: "1", contact_id: "2", event_id: "2", method: "phone"},
    { id: "3", user_id: "1", contact_id: "2", event_id: "3", method: "phone"},
    { id: "4", user_id: "1", contact_id: "2", event_id: "-1", method: "phone"},
    { id: "5", user_id: "1", contact_id: "3", event_id: "4", method: "phone"},
    { id: "6", user_id: "1", contact_id: "3", event_id: "5", method: "phone"},
    { id: "7", user_id: "1", contact_id: "3", event_id: "-1", method: "phone"},
    { id: "8", user_id: "1", contact_id: "4", event_id: "6", method: "phone"},
    { id: "9", user_id: "1", contact_id: "3", event_id: "-1", method: "phone"},
    { id: "10", user_id: "1", contact_id: "5", event_id: "-1", method: "phone"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;