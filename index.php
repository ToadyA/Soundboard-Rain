<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Soundboard: Topeka</title>
	<link rel="stylesheet" href="tap.css">
</head>
<body>
	<h1>Spotify Buttons</h1>
    <button id="togglePlay">Toggle Play</button>

	<div class="grid-container">
		<div class="grid-button" onclick="gridClick(1)">1</div>
		<div class="grid-button" onclick="gridClick(2)">2</div>
		<div class="grid-button" onclick="gridClick(3)">3</div>
		<div class="grid-button" onclick="gridClick(4)">4</div>
		<div class="grid-button" onclick="gridClick(5)">5</div>
		<div class="grid-button" onclick="gridClick(6)">6</div>
		<div class="grid-button" onclick="gridClick(7)">7</div>
		<div class="grid-button" onclick="gridClick(8)">8</div>
		<div class="grid-button" onclick="gridClick(9)">9</div>
	</div>
	
	<button onclick="checkWeatherTop()">Is it raining?</button>
	<p id="weather-status">Casting above...</p>
	<button onclick="rainDance()">Woohoo!!</button>
	
	<a href="west.php">
		<img src="images/arrow.png" alt="to Sacramento" class="west-arrow">
	</a>
	<a href="east.php">
		<img src="images/arrow.png" alt="to New York" class="east-arrow">
	</a>
	<a href="north.php">
		<img src="images/arrow.png" alt="to Bismarck" class="north-arrow">
	</a>
	<a href="south.php">
		<img src="images/arrow.png" alt="to Baton Rouge" class="south-arrow">
	</a>
	
    <!--  <script src="https://sdk.scdn.co/spotify-player.js"></script>  -->
    <script src="tapstaps.js"></script>
    
</body>
</html>