var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

var client = webdriverio.remote(options);

client
    .init()
    .url('https://gasbuddy.com/')
    .timeoutsImplicitWait(5000).then(.executeScript("return window.stop();"))
    .setValue('*[id="search-text"]','98052')
    .click('*[id="search-btn"]')
    .pause(1000)
    .getTitle().then(function(title) {
        console.log(title);
    })
    .end();
   