var Square = function () {

	// 方块数据
	this.data = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	// 原点
	this.origin = {
		x: 0,
		y: 0
	};

	this.dir = 0;
}

Square.prototype.canDown = function(isValid) {
	var test = {};
	test.x = this.origin.x + 1;
	test.y = this.origin.y;
	return isValid(test, this.data);
}

Square.prototype.down = function() {
	this.origin.x++;
}

Square.prototype.canLeft = function(isValid) {
	var test = {};
	test.x = this.origin.x;
	test.y = this.origin.y - 1;
	return isValid(test, this.data);
}

Square.prototype.left = function() {
	this.origin.y--;
}

Square.prototype.canRight = function(isValid) {
	var test = {};
	test.x = this.origin.x;
	test.y = this.origin.y + 1;
	return isValid(test, this.data);
}

Square.prototype.right = function() {
	this.origin.y++;
}

Square.prototype.canRotate = function(isValid) {
	var d = (this.dir + 1) % 4;
	var test = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	test = this.rotateDate[d];
	return isValid(this.origin, test);
}

Square.prototype.rotate = function(num) {
	if(!num) {
		num = 1;
	}
	this.dir = (this.dir + num) % 4;
	this.data = this.rotateDate[this.dir];
}