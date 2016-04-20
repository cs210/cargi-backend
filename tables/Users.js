var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "user_id": "string",
    "email": "string",
    "password": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { user_id: "kartiks2", email: "kartiks2@stanford.edu", password: "123"},
    { user_id: "emjtang", email: "emjtang@stanford.edu", password: "123"},
    { user_id: "edpark", email: "edpark@stanford.edu", password: "123"},
    { user_id: "ishitap", email: "ishitap@stanford.edu", password: "123"},
    { user_id: "mayanb", email: "mayanb@stanford.edu", password: "123"},
    { user_id: "taragb", email: "taragb@stanford.edu", password: "123"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;