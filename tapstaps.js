
const generateRandomString = (length) => {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
const codeVerifier = generateRandomString(64);

const sha256 = async (plain) => {
	const encoder = new TextEncoder()
	const data = encoder.encode(plain)
	return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
	return btoa(String.fromCharCode(...new Uint8Array(input)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}
const generateCodeChallenge = async (codeVerifier) => {
	const hashed = await sha256(codeVerifier)
	return base64encode(hashed);
}

(async () => {
	const codeChallenge = await generateCodeChallenge(codeVerifier);

	const clientId = 'bad5de23f78743e9b487f995c310da5b';
	const redirectUri = 'https://open.spotify.com/';
	const scope = 'user-read-private user-read-email';
	const authUrl = new URL("https://accounts.spotify.com/authorize");

	window.localStorage.setItem('code_verifier', codeVerifier);

	const params = {
		response_type: 'code',
		client_id: clientId,
		scope,
		code_challenge_method: 'S256',
		code_challenge: codeChallenge,
		redirect_uri: redirectUri
	}

	authUrl.search = new URLSearchParams(params).toString();
	//window.location.href = authUrl.toString();

	const urlParams = new URLSearchParams(window.location.search);
	let code = urlParams.get('code');

	const getToken = async code =>{
		let codeVerifier = localStorage.getItem('code_verifier');
		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: clientId,
				grant_type: 'authorization_code',
				code,
				redirect_uri: redirectUri,
				code_verifier: codeVerifier
			})
		}
		const body = await fetch('https://accounts.spotify.com/api/token', payload);
		const response = await body.json();
		
		localStorage.setItem('access_token', response.access_token);
		if(response.refresh_token){
			localStorage.setItem('refresh_token', response.refresh_token);
		}
	}
	
	if(code){
		await getToken(code);
	}
	else{
		console.error('No authorization code found in URL');
	}
})();

const getRefreshToken = async () => {

 const refreshToken = localStorage.getItem('refresh_token');
 const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    })
  }
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.accessToken);
  if (response.refreshToken) {
    localStorage.setItem('refresh_token', response.refreshToken);
  }
}

let player;

window.onSpotifyWebPlaybackSDKReady = () => {
	const token = localStorage.getItem('access_token');
	player = new Spotify.Player({
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

function turtles(clipURI, start, length){
	player.options.getOAuthToken(access_token => {
		fetch(`https://api.spotify.com/v1/me/player/play`, {
			method: 'PUT',
			body: JSON.stringify({
				uris: [clipURI],
				position_ms: (start * 1000)
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`
			}
		});
	});
	
	setTimeout(() =>{
		player.pause();
	}, (length * 1000));
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
	
	if(n == 1){
		let clipURI = 'spotify:track:https://open.spotify.com/track/3okyNQZyc5ATl4eXMxp3mU?si=5e9064bcaf374435';
		turtles(clipURI, 8, 7);
		//SHOW TIME
		// https://open.spotify.com/track/3okyNQZyc5ATl4eXMxp3mU?si=5e9064bcaf374435
		// 0:08 - 0:15
	}
	else if(n == 2){
		let clipURI = 'https://open.spotify.com/track/5ShQqpkmtVHGksr34Lb8jv?si=81db13aef18848cf';
		turtles(clipURI, 31, 7);
		//Interrogation Song
		// https://open.spotify.com/track/5ShQqpkmtVHGksr34Lb8jv?si=81db13aef18848cf
		// 0:31 - 0:38
	}
	else if(n == 3){
		let clipURI = 'https://open.spotify.com/track/6FFsYY9vTy7xZ3Yl9uK7Xh?si=2ae249e14b184e6a';
		turtles(clipURI, 51, 8);
		//One Piece Rap
		// https://open.spotify.com/track/6FFsYY9vTy7xZ3Yl9uK7Xh?si=2ae249e14b184e6a
		// 0:51 - 0:59
	}
	else if(n == 4){
		let clipURI = 'https://open.spotify.com/track/683hRieVmYdAhVA1DkjSAk?si=4c1e7f98565f411e';
		turtles(clipURI, 57, 4);
		//Space Jam
		// https://open.spotify.com/track/683hRieVmYdAhVA1DkjSAk?si=4c1e7f98565f411e
		// 0:57 - 1:01
	}
	else if(n == 5){
		let clipURI = 'https://open.spotify.com/track/0aB0v4027ukVziUGwVGYpG?si=3acf4f8470fe4f8f';
		turtles(clipURI, 124, 5);
		//tv off
		// https://open.spotify.com/track/0aB0v4027ukVziUGwVGYpG?si=3acf4f8470fe4f8f
		// 2:04 - 2:09
	}
	else if(n == 6){
		let clipURI = 'https://open.spotify.com/track/1WB1zhaxW3fIZKq032iCjw?si=214f0967d09b4a28';
		turtles(clipURI, 33, 11);
		//Underground
		// https://open.spotify.com/track/1WB1zhaxW3fIZKq032iCjw?si=214f0967d09b4a28
		// 0:33 - 0:44
	}
	else if(n == 7){
		let clipURI = 'https://open.spotify.com/track/1ZKyWVtzTbOt0uA1gqsuMh?si=7a64d9b439d94f62';
		turtles(clipURI, 61, 8);
		//Yummy Yummy
		// https://open.spotify.com/track/1ZKyWVtzTbOt0uA1gqsuMh?si=7a64d9b439d94f62
		// 1:01 - 1:09
	}
	
	else if(n == 8){
		let clipURI = 'https://open.spotify.com/track/2FcJ4XgKF7GbcZ6Sk6Z7Cu?si=92f5bf58a79b49d5';
		turtles(clipURI, 102, 10);
		//Rappin' Drakken
		// https://open.spotify.com/track/2FcJ4XgKF7GbcZ6Sk6Z7Cu?si=92f5bf58a79b49d5
		// 1:42 - 1:52 
	}
	else{
		let clipURI = 'https://open.spotify.com/track/18tgx070tbAM4TKxEwzWaG?si=3946232d29d14e38';
		turtles(clipURI, 202, 4);
		//Root Down
		// https://open.spotify.com/track/18tgx070tbAM4TKxEwzWaG?si=3946232d29d14e38
		// 3:22 - 3:26
	}
}