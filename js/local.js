var Local = function() {
	// 游戏对象
	var game;
	// 时间间隔
	var INTERVAL = 200;
	// 定时器
	var timer = null;
	// 时间计数器
	var timeCount = 0;
	// 游戏时间
	var time = 0;

	// 绑定键盘事件
	var bindKeyEvent = function() {
		document.onkeydown = function(e) {
			if(e.keyCode == 38) {  // up
				game.rotate();
			}
			else if(e.keyCode == 39) {  // right
				game.right();
			}
			else if(e.keyCode == 40) {  // down
				game.down();
			}
			else if(e.keyCode == 37) {  // left
				game.left();
			}
			else if(e.keyCode == 32) {  // space
				game.fall();
			}
		}
	}
	
	// 移动
	var move = function() {
		timeFunc();
		if(!game.down()) {
			game.fixed();
			var line = game.checkClear();
			if(line != 0) {
				game.addScore(line);
			}
			var gameOver = game.checkGameOver();
			if(gameOver) {
				game.gameover(false);
				stop();
			}
			else {
				game.performNext(generateType(), generateDir());
			}
		}
	}

	// 随机生成干扰行
	var generateBottomLine = function(lineNum) {
		var lines = [];
		for(var i = 0; i < lineNum; i++) {
			var line = [];
			for(var j = 0; j < 10; j++) {
				line.push(Math.ceil(Math.random() * 2) - 1);
			}
			lines.push(line);
		}
		return lines;
	}
	// 随机生成一个方块种类
	var generateType =  function() {
		var type = Math.ceil(Math.random() * 7);
		return type;
	}

	// 随机生成一个旋转方向
	var generateDir =  function() {
		var dir = Math.ceil(Math.random() * 4);
		return dir;
	}

	// 计算游戏时间
	var timeFunc = function() {
		timeCount++;
		if(timeCount == 5) {
			timeCount = 0;
			time++;
			game.setTime(time);
			if(time % 10 == 0) {
				game.addTailLine(generateBottomLine(1));
			}
		}
	}
	// 开始方法
	var start = function() {
		var doms = {
			gameDiv: document.getElementById('game'),
			nextDiv: document.getElementById('next'),
			timeDiv: document.getElementById('time'),
			scoreDiv: document.getElementById('score'),
			resultDiv: document.getElementById('gameover')
		};

		game = new Game();
		game.init(doms, generateType(), generateDir());

		game.performNext(generateType(), generateDir());
		bindKeyEvent();
		timer = setInterval(move, INTERVAL);
	};

	// 结束
	var stop = function() {
		if(timer) {
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
	}

	// 导出API
	this.start = start;
}