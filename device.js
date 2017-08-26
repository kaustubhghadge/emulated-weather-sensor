/*

Emulating a IoT Device sending it's ID, Temperature in Farhenheit and Humidity in Percentage. 

*/



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


module.exports= {
	weatherInfo:weatherInfo
}