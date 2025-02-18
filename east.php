<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Soundboard: New York</title>
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
	
	<button onclick="checkWeatherNY()">Is it raining?</button>
	<p id="weather-status">Casting above...</p>
	<button onclick="rainDance()">Woohoo!!</button>

	<a href="index.php">
		<img src="arrow.png" alt="to Kansas" class="west-arrow">
	</a>
    <!--  <script src="https://sdk.scdn.co/spotify-player.js"></script>  -->
    <script src="tapstaps.js"></script>
    
</body>
</html>