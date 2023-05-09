//GAME PROJECT FINAL.

var gameChar_x;
var gameChar_y;
var floorPos_y;

//Position of game character variables.
var isLeft;
var isRight;
var isPlummeting;
var isFalling;

//Position of scenery variables.
var collectable;
var trees_x;
var treePos_y;
var cloud;
var mountain;

//Variable for scrolling.
var cameraPosX;

//Collectables variable.
var collectables;

//Canyon variables.
var canyons;

//Scrore count
var game_score;

//Flagpole for level reached.
var flagpole;

//Live count
var lives;

var tempoKey;
var tempoKey1;

//Sounds.
var jumpSound;
var backgroundSound;
var coinSound;
var footstepsSound;

//Obstacles.
var platforms;
var isOnPlatform;
var enemies;

function preload(){
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    backgroundSound = loadSound('assets/background.wav');
    backgroundSound.setVolume(0.1);
    coinSound = loadSound('assets/coin.wav');
    coinSound.setVolume(0.1);
    footstepsSound = loadSound('assets/footsteps.wav');
    footstepsSound.setVolume(0.1);
}


function setup(){
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	
    //Live count.
    lives = 3;
    
    backgroundSound.loop();
    
    startGame();
}


function draw(){
    //Get camera position to center of the screen.
    cameraPosX = gameChar_x - 288;
    
	//DRAWING CODE

    //Background of the sky.
	background(100,155,255); 

    //Ground.
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
    
    //Write score count.
    fill(197, 250, 7);
    noStroke();
    textSize(23);
    textFont('Georgia');
    text("Score: " + game_score, 20, 20);
    textSize(18);
    
    //Write live count.
    fill(197, 250, 7);
    noStroke();
    textSize(23);
    textFont('Georgia');
    text("Lives: " + lives, 20, 50);
    textSize(18);
    
    push();
    translate(-cameraPosX,0);
    
    //Mountains.
    for(var i = 0; i < mountain.length; i++){
    drawMountains(mountain[i]);
    }
    
    //Clouds.
    for(var i = 0; i < cloud.length; i++){
        drawClouds(cloud[i]);
    }
    
    //Trees.
    drawTrees();
    
	//Draw the canyon.
    for(var i = 0; i < canyons.length; i++){
        drawCanyon(canyons[i]);
        //Detect if game charater is over the canyon.
        checkCanyon(canyons[i]);  
    }
    
    //Draw platforms.
    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
    }
    
    //collectable item.
     for(var i = 0; i < collectables.length; i++){
        if(!collectables[i].isFound){ 
        drawCollectable(collectables[i])
        //Check collectable.
        checkCollectable(collectables[i]);
        }
     } 
    
	//The game character.
	if(isLeft && isFalling){
		// add your jumping-left code
        //Head.
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 60, 20);
        //Body
        fill(0);
        ellipse(gameChar_x, gameChar_y - 32, 25, 40);
        //Legs.
        stroke(10);
        line(gameChar_x + 17, gameChar_y - 17,
             gameChar_x - 6, gameChar_y - 15);
        line(gameChar_x + 20, gameChar_y - 20,
             gameChar_x + 6, gameChar_y - 15);
        //Shoes
        fill(68,188,216);
        ellipse(gameChar_x + 17, gameChar_y - 17, 6);
        ellipse(gameChar_x + 20, gameChar_y - 20, 6);
	}
    
	else if(isRight && isFalling){
		// add your jumping-right code
        //Head.
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 60, 20);
        //Body
        fill(0);
        ellipse(gameChar_x, gameChar_y - 32, 25, 40);
        //Legs.
        stroke(10);
        line(gameChar_x - 20, gameChar_y - 20,
             gameChar_x - 6, gameChar_y - 15);
        line(gameChar_x - 17, gameChar_y - 17,
             gameChar_x + 6, gameChar_y - 15);
        //Shoes
        fill(68,188,216);
        ellipse(gameChar_x - 20, gameChar_y - 20, 6);
        ellipse(gameChar_x - 17, gameChar_y - 17, 6);
	}
    
	else if(isLeft){
		// add your walking left code
        //Head.
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 60, 20);
        //Body
        fill(0);
        ellipse(gameChar_x, gameChar_y - 32, 18, 40);
        //Legs.
        stroke(10);
        line(gameChar_x - 15, gameChar_y - 5,
             gameChar_x - 6, gameChar_y - 17);
        line(gameChar_x + 4, gameChar_y,
             gameChar_x + 4, gameChar_y - 17);
        //Shoes
        fill(68,188,216);
        ellipse(gameChar_x - 15, gameChar_y - 5, 6);
        ellipse(gameChar_x + 4, gameChar_y, 6);
	}
    
	else if(isRight){
		// add your walking right code
        //Head.
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 60, 20);
        //Body
        fill(0);
        ellipse(gameChar_x, gameChar_y - 32, 18, 40);
        //Legs.
        stroke(10);
        line(gameChar_x - 4, gameChar_y,
             gameChar_x - 4, gameChar_y - 15);
        line(gameChar_x + 15, gameChar_y - 5,
             gameChar_x + 5, gameChar_y - 15);
        //Shoes
        fill(68,188,216);
        ellipse(gameChar_x - 4, gameChar_y, 6);
        ellipse(gameChar_x + 15, gameChar_y - 5, 6);
	}
    
	else if(isFalling || isPlummeting){
		//Add your jumping facing forwards code
        //Head.
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 60, 20);
        //Body
        fill(0);
        ellipse(gameChar_x, gameChar_y - 32, 25, 40);
        //Legs.
        stroke(10);
        line(gameChar_x - 20, gameChar_y - 30,
             gameChar_x - 6, gameChar_y - 15);
        line(gameChar_x + 20, gameChar_y - 30,
             gameChar_x + 6, gameChar_y - 15);
        //Shoes
        fill(68,188,216);
        ellipse(gameChar_x - 20, gameChar_y - 30, 6);
        ellipse(gameChar_x + 20, gameChar_y - 30, 6);
	}
    
	else{
		// add your standing front facing code
        //Head.
        fill(255,0,0);
        ellipse(gameChar_x, gameChar_y - 60, 20);
        //Body
        fill(0);
        ellipse(gameChar_x, gameChar_y - 32, 25, 40);
        //Legs.
        stroke(10);
        line(gameChar_x - 6, gameChar_y,
             gameChar_x - 6, gameChar_y - 15);
        line(gameChar_x + 6, gameChar_y,
             gameChar_x + 6, gameChar_y - 15);
        //Shoes
        fill(68,188,216);
        ellipse(gameChar_x - 6, gameChar_y, 6);
        ellipse(gameChar_x + 6, gameChar_y, 6);
	}
    
    //Render the flagpole.
    renderFlagpole();
    
    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();
        var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if(isContact){
            if(lives > 0){
                lives -= 1;
                startGame();
                break;
            }    
        }
    }
    
    pop();
    
    if(lives == 0){
        //Game over text.
        fill(247, 2, 2);
        noStroke();
        textSize(30);
        textFont('Georgia');
        text("GAME OVER!", gameChar_x + 50, 240);
        textSize(20);
        text("Press space to continue.", gameChar_x + 40, 260);
        textSize(18);
        tempoKey += 32;
        isLeft = false;
        isRight = false;
    }
    
    if(flagpole.isReached == true){
        fill(198, 247, 2);
        noStroke();
        textSize(30);
        textFont('Georgia');
        text("LEVEL COMPLETE!", gameChar_x + 50, 240);
        textSize(20);
        text("Press space to continue.", gameChar_x + 60, 260);
        textSize(18);
        tempoKey1 += 32;
        footstepsSound.stop();
    }
    
    //Adding gravity.
    if (gameChar_y < floorPos_y){
        for(var i = 0; i < platforms.length; i++){
            if(platforms[i].checkContact(gameChar_x, gameChar_y) == true){
                isOnPlatform = true;
                break;
            }
            else{
                isOnPlatform = false;
            }
        }
        if(isOnPlatform == false){
            //gameChar_y += 5;
            isFalling = true;
        }
        
    }
    else{
        isFalling = false; 
    }
    
	//INTERACTION CODE
    
	//Conditional statements to move the game character below here.
    
    if(isLeft == true){
        gameChar_x -= 5;
    }
    
    if (isRight == true){
         gameChar_x += 5;  
    }
    
    if(isFalling == true){
        gameChar_y += 5;
    }
    
    if(isPlummeting == true){
         gameChar_y += 7;   
    } 
    
    //Check if game charater has reached flagpole.
    if(flagpole.isReached == false){
        checkFlagpole();
    }
    
    //Checks if player is dead.
    checkPlayerDie();
    
    
}

function keyPressed(){
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    if (keyCode == 37 && gameChar_y <= floorPos_y){
        isLeft = true;
        footstepsSound.play();
    }
    else if (keyCode == 39 && gameChar_y <= floorPos_y){
        isRight = true;
        footstepsSound.play();
    }
    else if (keyCode == 32 && (gameChar_y == floorPos_y || isOnPlatform == true)){  
        //Prevents double jump.
        gameChar_y -= 100;
        jumpSound.play();
        footstepsSound.stop();
    }
    
    else if(keyCode == 32 && (lives < 1 || flagpole.isReached == true)){
        startGame();
        lives = 3;
        flagpole.isReached = false;
    }
}

function keyReleased(){
	// if statements to control the animation of the character when
	// keys are released.
    if (keyCode == 37){
        isLeft = false;
        footstepsSound.stop();
    }
    else if (keyCode == 39){
        isRight = false;
        footstepsSound.stop();
    }
}

function drawClouds(t_cloud){
    //Cloud.
    fill(255, 255, 255, 240);
    ellipse(t_cloud.x_pos - 20, t_cloud.y_pos + 10,
            t_cloud.width, t_cloud.height);
    ellipse(t_cloud.x_pos + 120, t_cloud.y_pos + 20,
            t_cloud.width, t_cloud.height);
    ellipse(t_cloud.x_pos + 40, t_cloud.y_pos + 30,
            t_cloud.width, t_cloud.height);
}

function drawMountains(t_mountain){
    //Mountain.
    fill(94, 78, 64);
    triangle(t_mountain.x_pos - 70, t_mountain.y_pos - 180,
             t_mountain.x_pos + 30, t_mountain.y_pos - 3,
             t_mountain.x_pos - 170, t_mountain.y_pos - 3);
    fill(104, 95, 64);
    triangle(t_mountain.x_pos + 30, t_mountain.y_pos - 285,
            t_mountain.x_pos + 130, t_mountain.y_pos - 3,
            t_mountain.x_pos - 70, t_mountain.y_pos - 3);
    fill(120, 100, 60);
    triangle(t_mountain.x_pos + 30, t_mountain.y_pos - 285,
            t_mountain.x_pos + 130, t_mountain.y_pos - 3,
            t_mountain.x_pos + 80, t_mountain.y_pos - 3);
    
}

function drawTrees(){
    for(var i= 0; i< trees_x.length; i++){
       //Tree.
       fill(74, 47, 23);
       rect(trees_x[i], treePos_y - 100, 35, 100);
       fill(50, 104, 33, 220);
       ellipse(trees_x[i], treePos_y - 100, 100, 100);
       ellipse(trees_x[i] + 30, treePos_y - 100, 100, 100);
       ellipse(trees_x[i], treePos_y - 150, 100, 100);
       fill(0, 51, 0, 200);
       ellipse(trees_x[i] + 30, treePos_y - 150, 100, 100);
       ellipse(trees_x[i] + 30, treePos_y - 190, 80, 80);
       ellipse(trees_x[i], treePos_y - 200, 80, 80);
       ellipse(trees_x[i] + 15, treePos_y - 240, 40, 50); 
    }
}

function drawCollectable(t_collectable){
    if(dist(t_collectable.x_pos - 40, t_collectable.y_pos 
            + 310, gameChar_x, gameChar_y) < 25){
        t_collectable.isFound = true;
        coinSound.play();
        //Inrement game score if collectable is found.
        game_score += 1;
    }
}

function drawCanyon(t_canyon){
    fill(18, 39, 78);
    rect(t_canyon.x_pos + 100, 430, t_canyon.width - 30, 150)
}

function checkCollectable(t_collectable){
    if(t_collectable.isFound == false){
        fill(255);
	    fill(237, 227, 33);
        ellipse(t_collectable.x_pos - 40,
                t_collectable.y_pos + 310, t_collectable.size);
        fill(168, 161, 27);
        text("100", t_collectable.x_pos - 53,
             t_collectable.y_pos + 315);
	    noStroke();
    }
}

function checkCanyon(t_canyon){
    if(gameChar_x > t_canyon.x_pos + 115 &&
       gameChar_x < t_canyon.x_pos + 100 + (t_canyon.width - 45)&&
       gameChar_y == floorPos_y){
        isPlummeting = true;
        isLeft = false;
        isRight = false;
    }  
}

function renderFlagpole(){
    push();
    strokeWeight(5);
    stroke(0);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 230)
    fill(255, 0, 0);
    noStroke();
    
    if(flagpole.isReached){
    triangle(flagpole.x_pos, floorPos_y - 230,
             flagpole.x_pos + 70, floorPos_y - 190,
             flagpole.x_pos, floorPos_y - 150);
    }
    else{
       triangle(flagpole.x_pos, floorPos_y - 85,
             flagpole.x_pos + 70, floorPos_y - 45,
             flagpole.x_pos, floorPos_y - 5); 
    }
}

function checkFlagpole(){
    //Use distance function to check distance between flagpole and game character.
    var distance = abs(gameChar_x - flagpole.x_pos);
    
    if(distance < 10){
        flagpole.isReached = true;
    }
    else{
       flagpole.isReached = false; 
    }
}

function checkPlayerDie(){
    if(gameChar_y > height + 10 && gameChar_y < height + 20){
        lives -= 1;
        if(lives > 0){
        startGame();
        }     
    }
}

function createPlatforms(x, y, length){
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function(){
            fill(51, 25, 0);
            rect(this.x, this.y, this.length, 20);
            rect(this.x + 20, this.y - 20 , 5, 30);
            fill(250, 255, 153);
            ellipse(this.x, this.y + 10, 20, 20);
            ellipse(this.x + 22.5, this.y - 18, 5, 5);
        },
        checkContact: function(gameChar_x, gameChar_y){
                          if(gameChar_x > this.x && gameChar_x < this.x + this.length){
                              var d = this.y - gameChar_y;
                              if(d >= 0 && d < 5){
                                  return true;
                              }
                          }return false;
                      }
    }
    
    return p;
}

function enemy(x, y, range){
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.current_x = x;
    this.increment = 1;
    
    this.update = function(){
                      this.current_x += this.increment;
                      
                      if(this.current_x >= this.x + this.range){
                          this.increment = random(-2,0);
                      }
                      else if(this.current_x < this.x){
                              this.increment = random(0, 2);
                      }
                  }
    this.draw = function(){
                    this.update()
                    fill(255, 0, 0);
                    ellipse(this.current_x, this.y, 30, 30);
                    fill(255, 128, 0, 100);
                    triangle(this.current_x - 15, this.y + 10,
                           this.current_x + 15, this.y + 10,
                           this.current_x, this.y - 30);
                }
    this.checkContact = function(gameChar_x, gameChar_y){
                            var d = dist(gameChar_x, gameChar_y, this.current_x, this.y);
                            if(d < 20){
                                return true;
                            }
                            else{
                            return false;
                            }
                        }
    
}

function startGame(){
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    //Set game character positions to false.
    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    isOnPlatform = false;
    
    //Object for scenery.
    collectables = [{x_pos: 100, y_pos: 100, size: 50, isFound: false},
                    {x_pos: 900, y_pos: 100, size: 50, isFound: false},
                    {x_pos: 1400, y_pos: 100, size: 50, isFound: false},
                    {x_pos: 1450, y_pos: 100, size: 50, isFound: false},
                    {x_pos: 1500, y_pos: 100, size: 50, isFound: false}];
    
    canyons = [{x_pos: 0, width: 95},
               {x_pos: 500, width: 280},
               {x_pos: 1100, width: 120}];
    
    cloud = [{x_pos: 300, y_pos: 100, width: 100, height: 70},
             {x_pos: 600, y_pos: 60, width: 100, height:70},
             {x_pos: 1000, y_pos: 120, width: 100, height:70},
             {x_pos: 1200, y_pos: 60, width: 100, height:70},
             {x_pos: 1900, y_pos: 120, width: 100, height:70}];
    
    mountain = [{x_pos: 400, y_pos: 435},
                {x_pos: 1200, y_pos: 435},
                {x_pos: 1600, y_pos: 435},
                {x_pos: 1800, y_pos: 435},
                {x_pos: 2100, y_pos: 435}]
    
    //Arrays for tree, cloud and mountain positions.
    trees_x = [300, 350, 1000, 1150];
    treePos_y = floorPos_y;
    
    //Inisialise cameraPosX to 0.
    cameraPosX = 0;
    
    //Initialise game_score.
    game_score = 0;
    
    //Create flagpole object.
    flagpole = {isReached: false, x_pos: 2300};
    
    //Platforms.
    platforms = [];
    platforms.push(createPlatforms(580, floorPos_y - 100, 300));
    platforms.push(createPlatforms(1000, floorPos_y - 100, 80));
    platforms.push(createPlatforms(1690, floorPos_y - 100, 200));
   
    //Enemies.
    enemies = [];
    enemies.push(new enemy(200, floorPos_y - 10, 100));
    enemies.push(new enemy(990, floorPos_y - 10, 100));
    enemies.push(new enemy(1010, floorPos_y - 10, 100));
    enemies.push(new enemy(1030, floorPos_y - 10, 100));
    enemies.push(new enemy(1700, floorPos_y - 10, 100));
    enemies.push(new enemy(1720, floorPos_y - 10, 100));
    enemies.push(new enemy(1730, floorPos_y - 10, 100));
    enemies.push(new enemy(1740, floorPos_y - 10, 100)); 
}
