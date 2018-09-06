const draw = (function () {
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	var brickRowCount = 3;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	var bricks = (() => {
		var ret = [];
		for (var i = 0; i < brickColumnCount; i += 1) {
			ret[i] = [];
			for (var j = 0; j < brickRowCount; j += 1) {
				ret[i][j] = { x: 0, y: 0, status: 1, };
			}
		}
		return ret;
	})();

	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width - paddleWidth) / 2;
	var leftPressed = false;
	var rightPressed = false;

	var ballRadius = 10;
	var x = canvas.width / 2;
	var y = canvas.height - 30;
	var dx = 2;
	var dy = -2;

	var lives = 3;
	var score = 0;

	document.addEventListener('keydown', function(e) {
		if (e.keyCode === 39) {
			rightPressed = true;
		} else if (e.keyCode === 37) {
			leftPressed = true;
		}
	}, false);
	document.addEventListener('keyup', function(e) {
		if (e.keyCode === 39) {
			rightPressed = false;
		} else if (e.keyCode === 37) {
			leftPressed = false;
		}
	}, false);
	document.addEventListener('mousemove', function(e) {
		var relativeX = e.clientX - canvas.offsetLeft;
		if (0 < relativeX && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth / 2;
		}
	}, false);

	const drawBall = function(ctx, radius, x, y) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	const drawPaddle = function(ctx, x, y) {
		ctx.beginPath();
		ctx.rect(x, y, paddleWidth, paddleHeight);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	const drawBricks = function(ctx) {
		for (var i = 0; i < brickColumnCount; i += 1) {
			for (var j = 0; j < brickRowCount; j += 1) {
				if (bricks[i][j].status !== 1) {
					continue;
				}
				bricks[i][j] = Object.assign(
					bricks[i][j],
					{
						x: i * (brickWidth + brickPadding) + brickOffsetLeft,
						y: j * (brickHeight + brickPadding) + brickOffsetTop,
					},
				);
				ctx.beginPath();
				ctx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
				ctx.fillStyle = '#0095DD';
				ctx.fill();
				ctx.closePath()
			}
		}
	}

	const collisionDetection = function() {
		for (var i = 0; i < brickColumnCount; i += 1) {
			for (var j = 0; j < brickRowCount; j += 1) {
				var b = bricks[i][j];
				if (b.status === 1 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score += 1;
				}
			}
		}
	}

	const drawScore = function(ctx) {
		ctx.font = '16px Arial';
		ctx.fillStyle = '#0095DD';
		ctx.fillText('Score: ' + score, 8, 20);
	}

	const draseLives = function(ctx) {
		ctx.font = '16px Arial';
		ctx.fillStyle = '#0095DD';
		ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
	}

	return function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		collisionDetection();
		drawScore(ctx);
		draseLives(ctx);
		drawBricks(ctx);
		drawBall(ctx, ballRadius, x, y);
		drawPaddle(ctx, paddleX, canvas.height - paddleHeight);

		if (y + dy < ballRadius) {
			dy = -dy;		
		} else if (y + dy > canvas.height - ballRadius) {
			if (paddleX < x && x < paddleX + paddleWidth) {
				dy = -dy;
			} else {
				--lives;
				if (!lives) {
					alert("GAME OVER");
					document.location.reload();
				} else {
					x = canvas.width / 2;
					y = canvas.height - 30;
					dx = 2;
					dy = -2;
					paddleX = (canvas.width - paddleWidth) / 2;
				}
			}
		}
		if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
			dx = -dx;
		}

		x += dx;
		y += dy;

		if (rightPressed && paddleX < canvas.width - paddleWidth) {
			paddleX += 7;
		} else if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		}
	}
})();

setInterval(draw, 10);