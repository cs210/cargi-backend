var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { id: "1", user_id: "1", first_name: "Kartik", last_name: "Sawhney", phone_number: "1234567890"},
    { id: "2", user_id: "1", first_name: "Emily", last_name: "Tang", phone_number: "1244567890"},
    { id: "3", user_id: "1", first_name: "Maya", last_name: "Balakrishnan", phone_number: "1245567890"},
    { id: "4", user_id: "1", first_name: "Tara", last_name: "Balakrishnan", phone_number: "1246567890"},
    { id: "5", user_id: "1", first_name: "Ishita", last_name: "Prasad", phone_number: "1247567890"},
    { id: "6", user_id: "1", first_name: "Edwin", last_name: "Park", phone_number: "1248567890"}
];

module.exports = table;