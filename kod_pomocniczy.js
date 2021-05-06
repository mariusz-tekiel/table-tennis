const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const ballSize = 20;
let ballX = cw / 2 - ballSize / 2
let ballY = ch / 2 - ballSize / 2

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 4;
let ballSpeedY = 4;

function player() {
	ctx.fillStyle = '#7FFF00';
	ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai() {
	ctx.fillStyle = 'yellow';
	ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

function ball() {
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(ballX, ballY, ballSize, ballSize);

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballY <= 0 || ballY + ballSize >= ch) {
		ballSpeedY = -ballSpeedY;
		speedUp()
	}
	if (ballX <= 0 || ballX + ballSize >= cw) {
		ballSpeedX = -ballSpeedX;
		speedUp()
	}
}

function table() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, cw, ch);

	for (let linePosition = 20; linePosition < ch; linePosition += 30) {
		ctx.fillStyle = "gray"
		ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
	}

}

topCanvas = canvas.offsetTop;
console.log(topCanvas)

function playerPosition(e) {
	playerY = e.clientY - topCanvas - paddleHeight / 2;

	if (playerY >= ch - paddleHeight) {
		playerY = ch - paddleHeight
	}

	if (playerY <= 0) {
		playerY = 0;
	}
	//aiY = players;
}

function speedUp() {
	if (ballSpeedX > 0 && ballSpeedX < 16) {
		ballSpeedX += .2;
	} else if (ballSpeedX < 0 && ballSpeedX > -16) {
		ballSpeedX -= .2;
	}

	if (ballSpeedY > 0 && ballSpeedY < 16) {
		ballSpeedY += .2;
	} else if (ballSpeedY < 0 && ballSpeedY > -16) {
		ballSpeedY -= .2;
	}

	console.log(ballSpeedX + ", " + ballSpeedY)
}

/*-----------ARTIFICIAL INTELIGENCE---------*/

function aiPosition() {
	// The function called by function game() (60 times per second in our case)
	// The purpose of this function is set position the pat, so it is then drawn by the function ai().
	// It is just a simple variation that uses following factors - ball position, pat position and relationship between them.
	// We can modify our ai adding other parameters like ball speed, playing time etc. 

	
	const middlePaddle= aiY + paddleHeight / 2 ;
	//aiY + paddleHeight / 2 - coordinates of middle of paddle's height
	
	const middleBall = ballY + ballSize / 2;
	//ballY + ballSize/2 - actual coordinates of ball (middle of height on canvas)  
	
	
	if (ballX > 500) { 		
		//ball will be located on the right side of canvas ( canvas 0-1000, in our case bigger area 500-1000 )
	
		//Condition 1 - ball center far from paddle center more then 200px  
		if (middlePaddle - middleBall > 200) {
			
			// The paddle motion into ball direction ( value describes speed). We reduce speed on Y-axis between ball and paddle 
			aiY -= 24;
			
			//If the condition is not met, we check the second one specified in the else if block. If the first is true, the second is not executed.
		} else if (middlePaddle - middleBall > 50) {
			aiY -= 10;
		}
	
		// Here is a very similar condition. We only check if the ball center is not closer to the paddle center.
		// If distance is less or eqaul 50px from the center then do nothing.
		// If it is greater than 50px (and less than 200 by default), then move it by -6px towards the ball.

	
		//Oposite case as above (ball is under paddle)
		else if (middlePaddle - middleBall < -200) {
			aiY += 24;
		} else if (middlePaddle - middleBall < -50) {
			aiY += 10;
		}
	}
	
	
	// Ball is positioned on the left side of table. 100 < ball position <= 500  
	if (ballX <= 500 && ballX > 100) {
		if (middlePaddle - middleBall > 100) {
			aiY -= 3;
		} 
		if (middlePaddle - middleBall < -100) {
				aiY += 3;
		}
	}

	//Case when the paddle is trying to cross bottom border of canvas
	if (aiY >= ch - paddleHeight) {
		aiY = ch - paddleHeight
	}

	//Case when the paddle is trying to cross top border of canvas
	if (aiY <= 0) {
		aiY = 0;
	}
}

canvas.addEventListener("mousemove", playerPosition)

function game() {
	table()
	ball()
	player()
	ai()
	aiPosition()
}

setInterval(game, 1000 / 60)
