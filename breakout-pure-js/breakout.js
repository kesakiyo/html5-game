const draw = (function () {
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

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

	return function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall(ctx, ballRadius, x, y);
		drawPaddle(ctx, paddleX, canvas.height - paddleHeight);

		if (y + dy < ballRadius) {
			dy = -dy;		
		} else if (y + dy > canvas.height - ballRadius) {
			if (paddleX < x && x < paddleX + paddleWidth) {
				dy = -dy;
			} else {
				alert("GAME OVER");
				document.location.reload();
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