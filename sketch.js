let r, g, b;
let database;


function setup() {
  // Initialize Firebase
	var config = {
	apiKey: "AIzaSyCxG3ZkG_MesIAIL62EPjc9znnGevNQX4Y",
	authDomain: "fir-test-7a709.firebaseapp.com",
	databaseURL: "https://fir-test-7a709.firebaseio.com",
	projectId: "fir-test-7a709",
	storageBucket: "fir-test-7a709.appspot.com",
	messagingSenderId: "954618786053"
	};
	firebase.initializeApp(config);
	database = firebase.database();
	console.log(firebase);

	createCanvas(100, 100);
	r = floor(random(256));
	g = floor(random(256));
	b = floor(random(256));
	background(r, g, b);

	let buttons = [];
	buttons.push(createButton("Yellow"));
	buttons.push(createButton("Red"));
	buttons.push(createButton("Blue"));
	buttons.push(createButton("Orange"));
	buttons.push(createButton("Purple"));
	buttons.push(createButton("Green"));
	let button = createButton("generate!");
	button.mousePressed(generate);

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].mousePressed(sendData);
	}
}

function sendData() {
	let colorDatabase = database.ref("colors");		

	//make object to be sent to database
	var data = {
		r: r,
		g: g,
		b: b,
		label: this.html()
	}

	let color = colorDatabase.push(data, errorCheck);
	console.log("firebase generated key: " + color.key);
	function errorCheck(error) {
		if (error) {
			console.error(error);
		}
		else{
			r = floor(random(256));
			g = floor(random(256));
			b = floor(random(256));
			background(r, g, b);
		}
	}

	console.log(this.html());
}
//red: 1, 0.3, 0.5 if more green, orange if more blue, purple
//green: 0.7, 1, 0.7 if more blue, blue if more red, yellow
//blue: 0.3, 1, 1 if more red, purple
function guess(r, g, b) {
	var intensity = Math.max(r, g, b);
	if (r == intensity) {
		if (g > b) {
			if ( g/intensity > 0.4) {
				if (g/intensity > 0.8) {
					return "Yellow";
				}
				return "Orange";
			}
		}
		else {
			if (b/intensity > 0.5) {
				return "Purple";
			}
		}
		return "Red";
	}

	else if (g == intensity) {
		if (r > b) {
			if ( r/intensity > 0.6) {
				return "Yellow";
			}
		}
		else {
			if (b/intensity > 0.7) {
				return "Blue";
			}
		}
		return "Green";
	}

	else {
		if (r > g) {
			if ( r/intensity > 0.3) {
				return "Purple";
			}
		}
		return "Blue";
	}
}
function generate() {
	var colors = []
	for (let i = 0; i < 100; i++){
		r = floor(random(256));
		g = floor(random(256));
		b = floor(random(256));
		var label = guess(r, g, b);
		colors.push([r, g, b, label])
	}
	for (let i = 0; i < colors.length; i++) {
		console.log(i);
		console.log(colors[i]);
		sendColor(colors[i]);
	}
}

function sendColor(col) {
	let colorDatabase = database.ref("colors");
	var data = {
		r: col[0],
		g: col[1],
		b: col[2],
		label: col[3]
	}
	let color = colorDatabase.push(data, errorCheck);
	console.log("firebase generated key: " + color.key);
	function errorCheck(error) {
		if (error) {
			console.error(error);
		}
	}
	console.log(col);
}