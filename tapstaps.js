
window.onSpotifyWebPlaybackSDKReady = () => {
	const token = 'BQACXYk4I-5egO2S5QARqpd5nl9PYQEPEGu_BXbBlvlK7FVi6xX58DmnSfSQnYknTcHESIlomXLKMzEZ1wvbcvMHCVw30YaMBu4Ld99Rlnb3s-53HJIY5x7rxksdIzZAe58XWrQfvPO2ImYvTQqBZ6NFg3PwC1P9f8fOT_bqs64IaN2rOWrM0N9ac-OSAyUovMUIfI6rFCKknxhBzK6WwnHJlLTlQHRf35D7ttYzoXmKmpgRvW4foLa1o8Gz';
	const player = new Spotify.Player({
		name: 'The Rain',
		getOAuthToken: cb => { cb(token); },
		volume: 0.5
	});

	// Ready
	player.addListener('ready', ({ device_id }) => {
		console.log('Ready with Device ID', device_id);
	});

	// Not Ready
	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
	});

	player.addListener('initialization_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('authentication_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('account_error', ({ message }) => {
		console.error(message);
	});

	document.getElementById('togglePlay').onclick = function() {
		player.togglePlay();
	};

	player.connect();
}

function gridClick(n){
	let m = (n % 3);
	let p = 1;
	if(n >= 3){
		p = (1 + ((n - m) / 3));
	}
	if(m == 0){
		m = 3;
		p --;
	}
	alert('Grid ' + p + ', ' + m + ' clicked, or number ' + n + '.');
}