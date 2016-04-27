var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "user_id": "string",
    "called": "boolean",
    "duration": "number",
    "end_datetime": "date",
    "messaged": "boolean",
    "navigated": "boolean",
    "start_datetime": "date"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;