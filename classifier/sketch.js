var data;
var start;
let labelList = ["Yellow", "Red", "Blue", "Orange", "Purple", "Green"];
let model;
let x;
let y;
let lossP;
let labelP;
let rSlider;
let gSlider; 
let bSlider;

function gotData(results) {
	let inputData = results.val();
	let outputData = {
		colors: []
	};

	let keys = Object.keys(inputData);
	for (let key of keys) {
		let record = inputData[key];
		outputData.colors.push(record);
	}
	data = outputData;
}

async function setup() {
	createCanvas(100, 100).parent("#canvas");
	lossP = createP("loss:").parent("#loss");
	labelP = createP("Label:").parent("#label");
	rSlider = createSlider(0, 255, 0).parent("#slider1");
	gSlider = createSlider(0, 255, 0).parent("#slider2");
	bSlider = createSlider(0, 255, 0).parent("#slider3");
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
	let ref = database.ref('colors');
	start = ref.once('value', gotData);
	await start;
	let colors = [];
	let labels = [];
	for (let record of data.colors) {
		let col = [record.r/255, record.g/255, record.b/255];
		colors.push(col);
		labels.push(labelList.indexOf(record.label));
	}

	x = tf.tensor2d(colors);

	let labelsTensor =tf.tensor1d(labels, "int32");

	y = tf.oneHot(labelsTensor, 6);
	labelsTensor.dispose();

	model = tf.sequential();

	let hidden = tf.layers.dense({
		units: 15,
		activation: "sigmoid",
		inputDim: 3
	});

	let output = tf.layers.dense({
		units: 6,
		activation: "softmax"
	})
	model.add(hidden);
	model.add(output);

	const optimizer = tf.train.sgd(0.2);

	model.compile({
		optimizer: optimizer,
		loss: "categoricalCrossentropy",
	});
	train().then(results => {
		console.log(results.history.loss);
	});
}

async function train() {
	const options = {
		epochs: 50,
		validationSplit: 0.2,		
		shuffle: true,
		callbacks: {
			onTrainBegin: () => console.log("training started"),
			onTrainEnd: () => console.log("training complete"),
			onBatchEnd: tf.nextFrame,
			onEpochEnd: (num, log) => {
				console.log("Epoch: " + num);
				lossP.html("Loss: " + log.loss.toFixed(2));
			}
		}
	}
	return await model.fit(x, y, options);
}

async function draw() {
	await start;
	let r = rSlider.value();
	let g = gSlider.value();
	let b = bSlider.value();
	background(r,g,b);

	tf.tidy( () => {
		const x = tf.tensor2d([
			[r/255, g/255, b/255]
		]);
		let results = model.predict(x);
		let index = results.argMax(1).dataSync()[0];
		labelP.html("Label: " + labelList[index]);
	});
}