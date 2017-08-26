
/*
	REST API serving information from emulated IoT Device
*/


var restify = require('restify');
var device=require('./device');

//create a restify server
var server = restify.createServer();

//get information from emulated IoT device
function deviceReportedInfo(req,res,next){
	var weather=device.weatherInfo();

	//sending the information onto a webpage
	res.send("Current temperature reported by device ID " +weather.deviceId+ " is " +weather.temperature+"F"+" and humidity is "+weather.humidity+"%");
}



//serve the data over weather endpoint
server.get('/weather', deviceReportedInfo );

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});