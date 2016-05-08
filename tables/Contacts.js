var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "name": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    { id: "1", user_id: "1", name: "Kartik Sawhney"},
    { id: "2", user_id: "1", name: "Edwin Park"},
    { id: "3", user_id: "1", name: "Maya Balakrishnan"},
    { id: "4", user_id: "1", name: "Tara Balakrishnan"},
    { id: "5", user_id: "1", name: "Ishita Prasad"},
    { id: "6", user_id: "1", name: "Emily Tang"},
    { id: "7", user_id: "1", name: "Vivek Choksi"},
    { id: "8", user_id: "9", name: "Kartik Sawhney"}
];

module.exports = table;