<?php

if (isset($_POST["mail"]) && !empty($_POST["mail"])) 
{

    $f = fopen('mails.txt', 'a');
    fwrite($f, $_POST["mail"] . "\r\n");
    fclose($f);

}
else
{

}


?>
<!DOCTYPE html>
<html>
    <head>
        <title>Terrapke doen?</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="Demo project with jQuery">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!--<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.4.2/pure-min.css"> !-->
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
                <link rel="stylesheet" href="style.css">
                <link rel="stylesheet" href="scripts/nprogress.css">
    </head>
    <body>
        <div class="row">
        <div class="col-md-8">

        <p id="motivation" class="inhoudBlokje"></p>
        <div class="col-md-8"><p id="locatie" class="trager"> <span id="currentTemp"></span></p><canvas id="links" width="128" height="128"></canvas></div>
		<div class="col-md-8">
			<div id="rechts"></div>
		</div>
		</div>
		<div class="dummy"></div>
		</div>
		<div class="row">
			<div class="col-md-8 trager">
				<p>Ga je binnenkort verder studeren en wil jij net als ons niets liever doen dan knappe websites, mobile apps en webapplicaties bouwen? Dan ben jij een perfecte kandidaat voor onze opleiding <a href="http://www.weareimd.be/">Interactive Multimedia Design.</a></p>
				<br>
			</div>
			<div class="col-md-8 trager"><p>Kom mee een terraske doen aan onze <a href="http://www.thecreativitygym.be/">Creativity Gym</a> en neem meteen een kijkje in onze opleiding aan de Thomas More hogeschool in Mechelen.</p><br></div>

			<div class="col-md-8 tragerreverted"><p>Laat je emailadres achter en we mailen de exacte datum, locatie en tijdstip naar je door.</p><br></div>

		</div>

<!--<form> <knop> !-->
        <div class="dummy"></div>
        </div>
            <div class="row">
				<div class="col-md-12 trager">

            <form action="#" id="form1" method="post">
				<input type="text" name="mail" placeholder="je@email.com"><input type="submit" value="Inschrijvingen">
			</form>

				</div>
			</div>
		</div>
    </body>
	
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type='application/javascript' src='scripts/fastclick.js'></script>
    <script src="scripts/skycons.js"></script>
    <script src="scripts/nprogress.js"></script>
    <script src="scripts/app.js"></script>
</html>