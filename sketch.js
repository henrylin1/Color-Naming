function setup() {
	createCanvas(100, 100);
	let r = floor(random(256));
	let g = floor(random(256));
	let b = floor(random(256));
	background(r, g, b);

	let dropdown = createRadio();
	dropdown.option("Yellow");
	dropdown.option("Red");
	dropdown.option("Blue");
	dropdown.option("Orange");
	dropdown.option("Purple");
	dropdown.option("Green");
	dropdown.option("Brown");

	let submit = createButton('submit');
	submit.mousePressed(sendData);

	function sendData() {
		pass;
	}
}