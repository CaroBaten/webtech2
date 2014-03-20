jQuery(function()
{
	console.log("jQuery loaded");
});

  var skycons = new Skycons({"color": "white"});

$(function() 
{
    FastClick.attach(document.body);
    console.log("FastClick werkt");
});

    var huidigePositie = '';
    var jsonResponse = '';
    var locatieResponse = '';

    function unixToHuman(tijd)
	{
        var cachedTijd = new Date(tijd*1000);
        return cachedTijd;
    }

    function getLocation()
    {
		if (navigator.geolocation)
        {
			navigator.geolocation.getCurrentPosition(showPosition, error);
			console.log("logo");
        }
		else{this.x.innerHTML = "Geolocation is not supported by this browser.";}
	}
	
    function showPosition(position)
    {
    huidigePositie = position;
		if(localStorage.jsonitem == null)
		{
			doAjax();
		}
		else
		{
			var jsonResponse = localStorage.getItem("jsonitem");
            console.log("Weer is gecached");
			var locatieResponse = localStorage.getItem("locatie");
            var nu = new Date();
			var cachedTijd = new Date(JSON.parse(jsonResponse).currently.time*1000);
			var t1 = new Date(0, 0, 0, cachedTijd.getHours(), cachedTijd.getMinutes(), 0, 0);
			var t2 = new Date(0, 0, 0, nu.getHours(), nu.getMinutes(), 0, 0);
            var dif = t2.getTime() - t1.getTime();
            var Seconds_from_T1_to_T2 = dif / 1000;
            var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

        if( Seconds_Between_Dates >= 3600)
		{
			console.log("Weer update nodig");
            var nu = new Date().getTime();
            doAjax();
        }
		else
		{
            console.log("Geen weerupdate nodig");
            gebruikResponse(JSON.parse(jsonResponse));
        }
	}
		}

    function error()
	{
		console.log("Error met het vinden van locatie")
    }
		getLocation();

function doAjax() 
{
    var jqxhr = $.ajax(
	{
    url: 'https://api.forecast.io/forecast/bd57f534e65a91f03c3d1f82735e435a/' + huidigePositie.coords.latitude + ',' + huidigePositie.coords.longitude + '?units=auto',
    type: 'GET',
    global: true,
    dataType: 'jsonp',
    })
	
        .done(function () 
		{

            console.log("success");
            jsonResponse = jqxhr.responseJSON;
            gebruikResponse(jsonResponse);
            localStorage.setItem("jsonitem", JSON.stringify(jsonResponse));
        })
            .fail(function () 
			{
				console.log("error");
			})
            .always(function () 
			{
            console.log("complete");
            });
    }

function getDagFromNumber(dag)
{
    switch(dag)
	{
            case 1:
                return "Mon";
            break;
            case 2:
                return "Tue";
            break;
            case 3:
                return "Wed";
            break;
            case 4:
                return "Thu";
            break;
            case 5:
                return "Fri";
            break;
            case 6:
                return "Sat";
            break;
            case 7:
                return "Sun";
            break;
	}
}

function getMotivation(summary)
{
	switch(summary)
	{
		case "clear-day":
			$("#motivation").append('Mooi weer, het is tijd om een terrapke te doen!');
		break;
		
		case "clear-night":
			$("#motivation").append("Tijd om te slapen.");
		break;
		
		case "rain":
			$("#motivation").append("Na regen komt zonneschijn!");
		break;
		
		case "snow":
			$("#motivation").append("Lekker rollebollen in de sneeuw!");
		break;
		
		case "sleet":
			$("#motivation").append('Pas op voor slippertjes!');
		break;
		
		case "wind":
			$("#motivation").append("Er waait een frisse wind, doe een trui of een jas aan.");
		break;
		
		case "fog":
			$("#motivation").append("Kijk uit je doppen, het is mistig!");
		break;
		
		case "cloudy":
			$("#motivation").append("Wolken in zicht, neem een trui of een jas mee.");
		break;
		
		case "partly-cloudy-day":
			$("#motivation").append('Een beetje wolken houdt ons niet tegen om een terrapke te doen!');
		break;
		
		case "partly-cloudy-night":
			$("#motivation").append("Lekker slapen!");
		break;
		
		default:
			$("#motivation").append("Tijd om een terrapke te doen!");
		break;
	}
}
function gebruikResponse(jsonResponse)
{
    var date = new Date(jsonResponse.currently.time*1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var formattedTime = hours + ':' + minutes + ':' + seconds;
    var conditie = jsonResponse.currently.icon;
    getIcon(conditie);
    getColor(conditie);
    $("#currentTemp").append(Math.round(jsonResponse.currently.temperature) + '°C');
    getMotivation(conditie);
    $("#forecast").append('<div class="dummy"></div>');
}

function getIcon(cond)
{
    switch(cond)
	{
		case "clear-day":
			skycons.add(document.getElementById("links"), Skycons.CLEAR_DAY);
		break;
		
		case "clear-night":
			skycons.add(document.getElementById("links"), Skycons.CLEAR_NIGHT);
		break;
		
		case "rain":
			skycons.add(document.getElementById("links"), Skycons.RAIN);
		break;
		
		case "snow":
			skycons.add(document.getElementById("links"), Skycons.SNOW);
		break;
		
		case "sleet":
			skycons.add(document.getElementById("links"), Skycons.SLEET);
		break;
		
		case "wind":
			skycons.add(document.getElementById("links"), Skycons.WIND);
		break;
		
		case "fog":
			skycons.add(document.getElementById("links"), Skycons.FOG);
		break;
		
		case "cloudy":
			skycons.add(document.getElementById("links"), Skycons.CLOUDY);
		break;
		
		case "partly-cloudy-day":
			skycons.add(document.getElementById("links"), Skycons.PARTLY_CLOUDY_DAY);
		break;
		
		case "partly-cloudy-night":
			skycons.add(document.getElementById("links"), Skycons.PARTLY_CLOUDY_NIGHT);
		break;
		
		default:
			skycons.add(document.getElementById("links"), Skycons.CLEAR_DAY);
		break;
		break;
    }
          skycons.play();
}

function getColor(bg)
{
    switch(bg)
	{
    case "clear-day":
        $( "body" ).css("background-color", "#f96700");
    break;
	
    case "clear-night":
        $( "body" ).css("background-color", "#080857");
    break;
			
    case "rain":
        $( "body" ).css("background-color", "#5742ad");
    break;
	
    case "snow":
        $( "body" ).css("background-color", "#f2cbee");
    break;
	
    case "sleet":
        $( "body" ).css("background-color", "#575757");
    break;
	
    case "wind":
        $( "body" ).css("background-color", "#54392f");
    break;
	
    case "fog":
        $( "body" ).css("background-color", "#9aa299");
    break;
	
    case "cloudy":
        $( "body" ).css("background-color", "#39445c");
    break;
	
    case "partly-cloudy-day":
        $( "body" ).css("background-color", "#c85b0f");
    break;
	
    case "partly-cloudy-night":
        $( "body" ).css("background-color", "#0b0b22");
    break;
	
    default:
        $( "body" ).css("background-color", "#48d94f");
    break;
        }
}