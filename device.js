/*

Emulating a IoT Device sending it's ID, Temperature in Farhenheit and Humidity in Percentage. 

*/

var env = process.env.NODE_ENV || 'development',
    config = require('./env')[env];

//get random values for temperature and humidity
function getRandomValues(min,max){

		var min=min,
			max=max;

		//generate random number 
		function getRandomArbitrary(min, max) {
		  return Math.random() * (max - min) + min;
		}

		var randomNumber = getRandomArbitrary(min,max);

		//get value upto only two decimal places
		function floorFigure(figure, decimals){
		    if (!decimals) decimals = 2;
		    var d = Math.pow(10,decimals);
		    return (parseInt(figure*d)/d).toFixed(decimals);
		};
		return floorFigure(randomNumber);

}

//compose weather information
function weatherInfo(){

	var	 deviceId="1234ABCD",
		 temperature = getRandomValues(60,80),
		 humidity = getRandomValues(30,60);


	var weather = {
		deviceId: deviceId,
		temperature: temperature,
		humidity: humidity
	}

	return (weather);
}

//initiating websockets
const WebSocket = require('ws');

//starting a websockets server at defined port
const wss = new WebSocket.Server({ port: config.port });

//getting the weather data as an object
weatherData=weatherInfo();

//opening the ws connection and sending the data in string format
wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify(weatherData));
});
