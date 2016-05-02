var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "contact_id": "string",
    "event_id": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { id: "1", contact_id: 2, event_id: "1"},
    { id: "2", contact_id: "7", event_id: "2"},
    { id: "3", contact_id: "2", event_id: "3"},
    { id: "4", contact_id: "2", event_id: "4"},
    { id: "5", contact_id: "2", event_id: "5"},
    { id: "6", contact_id: "3", event_id: "6"},
    { id: "7", contact_id: "3", event_id: "7"},
    { id: "8", contact_id: "3", event_id: "8"},
    { id: "9", contact_id: "4", event_id: "9"},
    { id: "10", contact_id: "3", event_id: "10"},
    { id: "11", contact_id: "5", event_id: "11"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;