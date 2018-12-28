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
	buttons.push(createButton("Brown"));

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