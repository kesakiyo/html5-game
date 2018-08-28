const getRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const draw = (function () {
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	var ballRadius = 10;
	var ballColor = getRandomColor();
	var x = canvas.width / 2;
	var y = canvas.height - 30;
	var dx = 2;
	var dy = -2;

	const drawBall = function(ctx, color, radius, x, y) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}

	return function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall(ctx, ballColor, ballRadius, x, y);

		if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
			dy = -dy;
			ballColor = getRandomColor();			
		}
		if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
			dx = -dx;
			changedDirection = true;
			ballColor = getRandomColor();
		}

		x += dx;
		y += dy;
	}
})();

setInterval(draw, 10);