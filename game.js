var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var StartBtn = document.getElementById("startBtn")
var RestartBtn = document.getElementById("restartBtn")



startBtn.onclick = function (){
    startBtn.style.display ="none";
    paddle1= new Paddle (10)
    paddle2 = new Paddle (970)
    ball= new Ball ()
    
    window.requestAnimationFrame(draw)
}

// Score counter

    
// PADDLE
function Paddle(x) {


    this.color = "red";
    this.x = x;
    this.y = canvas.height/2 - 60;
    this.width = 20;
    this.height = 120;

}

Paddle.prototype.drawPaddle = function () {

// change here if you want it to be a different shape

ctx.fillStyle = this.color;
ctx.fillRect(this.x, this.y, this.width, this.height)

}



function Ball () {
    this.color = "blue" ;
    this.x = canvas.width/2 ;
    this.y = canvas.height/2 ;
    this.ballRadius=15;

    this.dx = 5.5;
    this.dy = 5.5;
    

}

Ball.prototype.drawBall = function () {
    ctx.beginPath ();
    ctx.arc (this.x, this.y, this.ballRadius, 0, Math.PI * 2)
    ctx.fill()

}

Ball.prototype.checkBorder = function () {
    if (this.y+ball.dy > canvas.height - this.ballRadius
    ||
    this.y + this.dy < ball.ballRadius) {
        this.dy = -this.dy
    }
    
}

Ball.prototype.checkLeftAndRight = function() {

    if(ball.x> canvas.width + 2 * ball.ballRadius
        ||
        ball.x < -2 * ball.ballRadius
        
        ){
           
            return true

        }

        return false
}




Paddle.prototype.hitPaddleTwo = function () {


    if(ball.x < paddle2.x+paddle2.width
        &&
        ball.x + ball.dx > paddle2.x 
        &&
        ball.y < paddle2.y+paddle2.height
        &&
        ball.y + ball.dy > paddle2.y
        ) {

            ball.dx = -ball.dx

        }
    }

Paddle.prototype.hitPaddleOne = function () {


    if(ball.x < paddle1.x+paddle1.width
        &&
        ball.x + ball.dx > paddle1.x 
        &&
        ball.y < paddle1.y+paddle1.height
        &&
        ball.y + ball.dy > paddle1.y
        ) {

            ball.dx = -ball.dx
        }

}

function draw() {
    
//clear the canvas on each frame
ctx.clearRect(0,0,canvas.width,canvas.height)

paddle1.drawPaddle()
paddle2.drawPaddle()

ball.drawBall()
ball.x += ball.dx;
ball.y += ball.dy
ball.checkBorder()

if (ball.checkLeftAndRight() === true) {
    
    restartBtn.style.display = "none"
}

paddle2.hitPaddleTwo()
paddle1.hitPaddleOne()



window.requestAnimationFrame(draw)

}


function keyDownHandler1 (event) {
// https://keycode.info/

    if(event.key === "z"
    && paddle1.y >= 0)

     {
    paddle1.y -= 50
    }
    else if (event.key === "s"
    && paddle1.y <= canvas.height - paddle1.height)
    
    {
        paddle1.y += 50
    }
    if(event.key === "ArrowUp"
    
    && paddle2.y >= 0)
    
    {
        paddle2.y -= 50
        }
    else if (event.key === "ArrowDown"
    && paddle2.y <= canvas.height - paddle2.height)
    
    
    {
            paddle2.y += 50
        }

}

document.onkeydown = keyDownHandler1 
