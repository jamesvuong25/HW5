    /* JAMES VUONG
    CPSC 332
    HW5
    Modified from https://github.com/end3r/Gamedev-Canvas-workshop */


var color1 = "#0095DD";

window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;
    var brickColumnCount = 3;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var lives = 3;

    var bricks = [];

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        }
        else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    function collisionDetection() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            //TODO: draw message on the canvas
                            ctx.font = "65px Arial";
                            ctx.fillText("YOU LOST! BETTER LUCK NEXT TIME!", 155, 165, canvas.width - 300, canvas.height - 275);
                            //TODO: pause game instead of reloading
                            document.location.save();
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.closePath(); 
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.closePath();
    } 

    function drawBricks() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = color1;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = color1;
        ctx.fillText("Score: " + score, 60, 20);
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = color1;
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawHighScore();
        drawLives();
        collisionDetection();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if (lives <= 0) {
                    //TODO: draw message on the canvas
                    ctx.font = "65px Arial";
                    ctx.strokeText("YOU LOST! BETTER LUCK NEXT TIME!", 155, 165, canvas.width - 300, canvas.height - 275);
                    
                    //TODO: pause game instead of reloading
                    document.location.save();
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        //TODO: adjust speed
        // adjustGameSpeed();
        x += dx * x slider.value;
        y += dy;


        //TODO: pause game check

        requestAnimationFrame(draw);
    }

    /*
        Additions to starter code
    */

    //Additional variables used to help make dimensions/locations easier to reuse :           
    //controls game speed            
    //pause game variable            
    pauseButton = document.getElementById("pauseButton");
    //high score tracking variables

    //other variables?            

    //event listeners added
    //game speed changes handler            
    //pause game event handler            
    //start a new game event handler            
    //continue playing
    //reload click event listener            

    //Drawing a high score
    function drawHighScore() {
        ctx.fillStyle = color1;
        ctx.fillText("High Score:" + score, 175, 20, canvas.width - 300, canvas.height - 275);
    }; 

    //draw the menu screen, including labels and button
    function drawMenu() {
        //draw the rectangle menu backdrop
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "cornflowerblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "goldenrod";
        ctx.fillRect(25, 25, (canvas.width - 50), (canvas.height - 50));

        // ctx.fillStyle = "black";
        // ctx.fillRect(90, 45, canvas.width - 200, canvas.height - 250);
        ctx.fillStyle = "white";
        ctx.font = "27px Arial";
        ctx.fillText("BREAKOUT", 165, 85, canvas.width - 300, canvas.height - 275);

        //draw the menu header
        

        //start game button area
        ctx.fillStyle = "red";
        ctx.fillRect(140, 140, canvas.width - 290, canvas.height - 265);
        ctx.fillStyle = "white";
        ctx.fillText("Start Game!", 160, 175, canvas.width - 300, canvas.height - 275);

        //event listener for clicking start
        setShadow();
        startGameClick();
        //need to add it here because the menu should be able to come back after 
        //we remove the it later                
    };

    //function used to set shadow properties
    function setShadow() {
        ctx.shadowColor = "black";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;
        // var box = document.getElementById("canvas").style.boxShadow = "5px 10px 15px lightblue";
    };

    //function used to reset shadow properties to 'normal'
    function resetShadow() {        
        ctx.shadowColor = "";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    };

    //function to clear the menu when we want to start the game
    function clearMenu() {
        //remove event listener for menu, 
        //we don't want to trigger the start game click event during a game   
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();             
    };

    //function to start the game
    //this should check to see if the player clicked the button
    //i.e., did the user click in the bounds of where the button is drawn
    //if so, we want to trigger the draw(); function to start our game
    function startGameClick(event) {
        let startGameButton = document.addEventListener("click", function(e) {
            const xCoord = e.offsetX;
            const yCoord = e.offsetY;

            // if user clicks anywhere in the "Start Breakout" rectangle
            if (xCoord > 140)
                if (xCoord < 320)
                    if (yCoord > 140)
                        if (yCoord < 320)
                            clearMenu();
        });
    };

    //function to handle game speed adjustments when we move our slider
    function adjustGameSpeed() {
        //update the slider display                
        //update the game speed multiplier    
        xSlider.addEventListener("input", function() {
            xScaleElem.innerHTML = xSlider.value;
        })            
    };

    //function to toggle the play/paused game state
    function togglePauseGame() {
        //toggle state         
        // pause = !pause;       
        //if we are not paused, we want to continue animating (hint: zyBook 8.9)

    };

    //function to check win state
    //if we win, we want to accumulate high score and draw a message to the canvas
    //if we lose, we want to draw a losing message to the canvas
    function checkWinState() {

    };

    //function to clear the board state and start a new game (no high score accumulation)
    function startNewGame(resetScore) {

    };

    //function to reset the board and continue playing (accumulate high score)
    //should make sure we didn't lose before accumulating high score
    function continuePlaying() {

    };

    //function to reset starting game info
    function resetBoard(resetLives) {
        //reset paddle position
        //reset bricks               
        //reset score and lives               
    };

    //draw the menu.
    //we don't want to immediately draw... only when we click start game 
    drawMenu();         

};//end window.onload function