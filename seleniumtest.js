
// var webdriverio = require('webdriverio');
// var options = { desiredCapabilities: { browserName: 'chrome' } };
// var client = webdriverio.remote(options);

// client
//     .init()
//     .url('https://duckduckgo.com/')
//     .setValue('#search_form_input_homepage', 'WebdriverIO')
//     .click('#search_button_homepage')
//     .getTitle().then(function(title) {
//         console.log('Title is: ' + title);

//         // outputs:
//         // "Title is: WebdriverIO (Software) at DuckDuckGo"
//     })
//     .end();

var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

var client = webdriverio.remote(options);

client
    .init()
    .url('https://news.ycombinator.com/')
    .selectorExecute('//div', function(inputs, message){
        return inputs.length + ' ' + message;
    }, 'divs on the page')
    .then(function(res){
        console.log(res);
    })
    .end();

// var webdriver = require('selenium-webdriver'),
//     By = require('selenium-webdriver').By,
//     until = require('selenium-webdriver').until;

// var driver = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

// driver.get('http://www.google.com');
// driver.findElement(By.name('q')).sendKeys('webdriver');
// driver.findElement(By.name('btnG')).click();
// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();