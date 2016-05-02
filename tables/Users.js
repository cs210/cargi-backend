var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "name": "string",
    "email": "string",
    "device_id": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    {id: "1", device_id: "F35C076A-EB8D-45F0-A968-50D23BA209F9", name: "Kartik Sawhney", email: "kartiks2@stanford.edu"},
    {id: "2", device_id: "F35C076A-EB8D-45F0-A968-50D23BA219F9", name: "Emily Tang", email: "emjtang"},
    {id: "3", device_id: "F35C076A-EB8D-45F0-A968-50D23BA229F9", name: "Edwin Park", email: "edpark@stanford.edu"},
    {id: "4", device_id: "F35C076A-EB8D-45F0-A968-50D23BA239F9", name: "Ishita Prasad", email: "ishitap@stanford.edu"},
    {id: "5", device_id: "F35C076A-EB8D-45F0-A968-50D23BA249F9", name: "Maya Balakrishnan", email: "mayan@stanford.edu"},
    {id: "6", device_id: "F35C076A-EB8D-45F0-A968-50D23BA259F9", name: "Tara Balakrishnan", email: "taragb@stanford.edu"},
    {id: "7", device_id: "F35C076A-EB8D-45F0-A968-50D23BA269F9", name: "Ramon Tuason", email: "rtuason@stanford.edu"},
    {id: "8", device_id: "F35C076A-EB8D-45F0-A968-50D23BA279F9", name: "Isaac Caswell", email: "icaswell@stanford.edu"},
    {id: "9", device_id: "F35C076A-EB8D-45F0-A968-50D23BA289F9", name: "Vivek Choksi", email: "vivek@stanford.edu"},
    {id: "10", device_id: "F35C076A-EB8D-45F0-A968-50D23BA299F9", name: "Roshan Shankar", email: "roshankar@gmail.com"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;