/*

Emulating a IoT Device sending it's ID, Temperature in Farhenheit and Humidity in Percentage. 

*/

var env = process.env.NODE_ENV || 'development',
    config = require('./env')[env];


var max_temperature = config.max_temperature,
	min_temperature=config.min_temperature,
	max_humidity=config.max_humidity,
	min_humidity=config.min_humidity;


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
		 temperature = getRandomValues(min_temperature,max_temperature),
		 humidity = Math.round(getRandomValues(min_humidity,max_humidity));


	var weather = {
		deviceId: deviceId,
		temperature: temperature,
		humidity: humidity,
		time:Date.now()
	}

	//returning data in string format
	return (JSON.stringify(weather));
}

//initiating websockets
const WebSocket = require('ws');

//starting a websockets server at defined port
const wss = new WebSocket.Server({ port: config.port });


//opening the ws connection and sending the data
wss.on('connection', function connection(ws) {
  ws.send(weatherInfo());
  setInterval(function(){ws.send(weatherInfo())},config.interval)
});
