var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "user_id": "string",
    "action": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

module.exports = table;