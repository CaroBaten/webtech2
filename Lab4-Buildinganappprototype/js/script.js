var Weather = function(weathernow, daily)
{
	this.weathernow = weathernow
	this.daily = daily;
	this.temp = this.weathernow.find('.temp');
	this.icon = this.weathernow.find('.curr-icon');
	this.hour = this.weathernow.find('.time');
	this.init();
}

Weather.prototype.init = function() 
{
	var latitude = localStorage.getItem("latitude");
	var longitude = localStorage.getItem("longitude");
	var forecastData = localStorage.getItem("forecastData");

	if(latitude === null || longitude === null)
	{
		this.getLocation();
	}
	else if(forecastData === null)
	{
		this.getForecast();
	}
	else
	{
		var localData = JSON.parse(forecastData);
		var localDataTime = localData.currently.time;
		var currentTime = Math.round((new Date()).getTime() / 1000);
		if(currentTime-localDataTime >= 3600)
		{
			this.getLocation();
		}
		else
		{
			this.setForecast();
		}
	}
}

Weather.prototype.getForecast = function()
{
	var _this = this;
	var latitude = localStorage.getItem("latitude");
	var longitude = localStorage.getItem("longitude");
	var apiKey = "f3d97dc91a8745e48f568b059ce4e819";
	var apiOptions = "?units=si";
	var apiUrl = "https://api.forecast.io/forecast/"+apiKey+"/"+latitude+","+longitude+""+apiOptions+"";

	$.ajax(apiUrl, {dataType: "jsonp"})
	.done(function(data)
	{
		localStorage.setItem("forecastData", JSON.stringify(data));
		_this.setForecast();
	})
	.fail(function()
	{
		console.log("fail");
	});
}

Weather.prototype.setForecast = function() 
{
	var forecastData = localStorage.getItem("forecastData");
	var localData = JSON.parse(forecastData);

	var formattedTime = this.getFormattedTime (localData.hourly.data[0].time);
	var latitude = localStorage.getItem("latitude");
	var longitude = localStorage.getItem("longitude");

	this.temp.text(Math.round(localData.currently.temperature)+"°");
	this.icon.text(localData.currently.icon);
	this.hour.text(formattedTime);

	var daily = localData.daily.data;

	for(var i = 0; i < daily.length-3; i++) 
	{
		$('.days:eq(0)')
			.clone()
			.find('.day').text(this.getFormattedTime(localData.daily.data[i].time, true)).end()
			.find('.daily-icon').text(localData.daily.data[i].icon).end()
			.find('.daytemp').text( Math.round(localData.daily.data[i].temperatureMax)+"°" ).end()
			.appendTo('.daily');
	}
	$('.days:eq(0)').hide();
}

Weather.prototype.getFormattedTime  = function(time, nextdays) 
{
	var date = new Date(time * 1000);
	var hours = date.getHours() == 0 ? "12" : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
	var day = date.toDateString().substr(0,3);
    var ampm = date.getHours() < 12 ? "am" : "pm";
    var formattedTime = hours + ":" + minutes + " " + ampm;
	
	
	if(nextdays == true)
	{
		return day;
	}
    return formattedTime;
}