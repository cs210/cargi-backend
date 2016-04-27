var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

// Defines the list of columns
table.columns = {
    "phone_number": "string",
    "device_id": "string"
};
// Turns off dynamic schema
table.dynamicSchema = false;

// Seed data into the table
table.seed = [
    {id: "1", phone_number: "5107663419", device_id: "F35C076A-EB8D-45F0-A968-50D23BA209F9"},
    {id: "2", phone_number: "5107663420", device_id: "F35C076A-EB8D-45F0-A968-50D23BA219F9"},
    {id: "3", phone_number: "5107663422", device_id: "F35C076A-EB8D-45F0-A968-50D23BA229F9"},
    {id: "4", phone_number: "5107663423", device_id: "F35C076A-EB8D-45F0-A968-50D23BA239F9"},
    {id: "5", phone_number: "5107663424", device_id: "F35C076A-EB8D-45F0-A968-50D23BA249F9"},
    {id: "6", phone_number: "5107663425", device_id: "F35C076A-EB8D-45F0-A968-50D23BA259F9"},
    {id: "7", phone_number: "5107663426", device_id: "F35C076A-EB8D-45F0-A968-50D23BA269F9"},
    {id: "8", phone_number: "5107663427", device_id: "F35C076A-EB8D-45F0-A968-50D23BA279F9"},
    {id: "9", phone_number: "5107663428", device_id: "F35C076A-EB8D-45F0-A968-50D23BA289F9"},
    {id: "10", phone_number: "5107663429", device_id: "F35C076A-EB8D-45F0-A968-50D23BA299F9"}
];

// Read-only table - turn off write operations
table.update.access = 'disabled';
table.delete.access = 'disabled';

module.exports = table;