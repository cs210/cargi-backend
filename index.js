var express = require("express");
var app = express();
var http = require('http').Server(app);
var path = require("path");

var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");

var port = process.env.PORT || 5000;



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/scrape', function(req, res){  
  res.sendFile(path.join(__dirname+'/scrape.html'));
  url = "http://www.gasbuddy.com";
  //request call: URL, callback fn with error, response status, and html
  request(url, function(error, response, html){
  	if(!error){
  		//cheerio for jQuery functionality on returned html
  		var $ = cheerio.load(html);
  		//define vars to capture
  		var title, release, rating;
  		var json = {title : "", release : "", rating : ""};
  		//use unique header class as starting point
  		$('table').find("a").each(function() {
  			var data = $(this);
  			//title is first child of header
  			// title = data.children().first().text();
  			title = data.text();
  			console.log(title);
  			if (title != null) {
  				link = data.attr('href');
  				if (link != "http://www.toptiergas.com/") {
  					console.log(link);
  				}
  			}
  			// release = data.children().last().children().text();
  			json.title = title;
  			// json.release = release;
  		})

  		$('.gb-price').each(function() {
  			//////WHY IS THE PRICE NOT SHOWING UP???
  			console.log("asdfghsadfhsadhjgadfs");
  			var data = $(this);
  			//title is first child of header
  			// title = data.children().first().text();
  			console.log("price");
  			title = data.text();
  			console.log(title);
  			// release = data.children().last().children().text();
  			json.title = title;
  			// json.release = release;
  		})
  	}

	  	// To write to the system we will use the built in 'fs' library.
	// In this example we will pass 3 parameters to the writeFile function
	// Parameter 1 :  output.json - this is what the created filename will be called
	// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
	// Parameter 3 :  callback function - a callback function to let us know the status of our function
	console.log("jsontest")
	console.log(json.title)
	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
	    console.log('File successfully written! - Check your project directory for the output.json file');
	})
  })

});



http.listen(port, function(){
  console.log('listening on *:5000');
});
// app.listen(port);