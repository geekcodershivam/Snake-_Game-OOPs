function init() {
    canvas = document.getElementById("canvas");
    pen = canvas.getContext("2d");
    W = canvas.width = 800;
    H = canvas.height = 800;
    cs = 85;
    game_over=false;  
    food=getRandomFood();  
    // image 
    food_img=new Image();
    food_img.src="./apple_types.png";
    trophy=new Image();
    trophy.src="./trophy_types.png";
    score=0;
    
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake: function () {
            for (let i = this.init_len; i > 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                })
            }
        },
        drawSnake: function () {
            this.cells.forEach(function (cell) {
                pen.fillStyle = snake.color;
                pen.fillRect(cell.x * cs, cell.y * cs, cs - 2, cs - 2);
            });

        },
        updateSnake: function () {
            //   console.log('snake-updated');

            //check if the snake has eatenfood, increase the length of the snake and
            //generate new food object
            let headX = this.cells[0].x;
            let headY = this.cells[0].y;

            if(headX==food.x && headY==food.y){
                // over-lap food
                food=getRandomFood();
                score+=2;
            }
            else{
                //pop last cells of snake.
            this.cells.pop();
            }
            
            //added to snake cells front-side.
            // let X=headX=headX+1;
            // let Y=headY=headY;

            //snake according to the direction property
            let nextX, nextY;
            if (this.direction == 'right') {
                nextX = headX + 1
                nextY = headY;
            } else if (this.direction == 'left') {
                nextX = headX - 1
                nextY = headY;
            } else if (this.direction == 'down') {
                nextX = headX;
                nextY = headY + 1;
            } else if(this.direction == 'up') {
                nextX = headX;
                nextY = headY - 1;
            } else {
                nextX = headX + 1
            }

            this.cells.unshift({
                x: nextX,
                y: nextY
            })
             /* prevents snake from going out */
     var last_x=Math.round(W/cs);
     var last_y=Math.round(H/cs);
     if(this.cells[0].y<'0'|| this.cells[0].x <'0'|| this.cells[0].x>last_x || this.cells[0].y>last_y){
        alert("GameOver");
        game_over = true;
    
}
        }
       
    };

    snake.createSnake();
    //Add a Eventlistener 
    function keyPressed(e) {
        if (e.key == 'ArrowRight') {
            snake.direction = 'rigth';
        } else if (e.key == 'ArrowLeft') {
            snake.direction = 'left';
        } else if (e.key == 'ArrowDown') {
            snake.direction = 'down';
        } else if(e.key == 'ArrowUp') {
            snake.direction = 'up';
        } else{
            snake.direction = 'rigth';
        }
    }
    document.addEventListener('keydown', keyPressed);
     

};

function draw() {
    //erase the old frame 
    pen.clearRect(0, 0, W, H)
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs)
    pen.drawImage(trophy,21.5,20,cs,cs);
    pen.fillStyle="blue";
    pen.font="20px Roboto"
    pen.fillText(score,50,50)
}

function update() {
    snake.updateSnake();
}

function getRandomFood(){
    let foodX=Math.round(Math.random()*(W-cs)/cs);
    let foodY=Math.round(Math.random()*(H-cs)/cs);
    const food={
        x:foodX,
        y:foodY,
        color:'red'
    }
    return food;
}

function gameloop() {
    
    draw();
    update();
    if(game_over==true){
        clearInterval(f);
        alert('Game-Over');
    }
}


init();
var f = setInterval(gameloop, 100);

 