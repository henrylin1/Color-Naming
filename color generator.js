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
	colors = [[1,2,3,"blue"], [2,3,4,"green"]];
	let button = createButton("generate!");
	button.mousePressed(send(colors));
	send(colors);
}

function send(colors) {
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

	for (let i = 0; i < colors.length; i++) {
		sendColor(colors[i]);
	}

}
function sendColor(color) {
	let colorDatbase = database.ref("colors");
	var data = {
		r: color[0],
		g: color[1],
		b: color[2],
		label: color[3]
	}
	let color = colorDatabase.push(data, errorCheck);
	console.log("firebase generated key: " + color.key);
	function errorCheck(error) {
		if (error) {
			console.error(error);
		}
	}
	console.log(color);
}