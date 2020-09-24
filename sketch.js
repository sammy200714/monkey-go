var PLAY = 1;
var OVER = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var ground;
var randomFruitY, randomObstacle;
var survivalTime = 0;
var jungleImage, jungle;
var bananas = 0;

function preload(){
  
  jungleImage = loadImage("jungle.jpeg");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_sad = loadAnimation("sad_monkey.png");
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
   jungle = createSprite(200,200,10,10);
  jungle.addImage(jungleImage);
  jungle.scale = 0.55;
    
  ground = createSprite(200,350,800,5);
  ground.shapeColor = "black";
  ground.visible = false;
  
  monkey = createSprite(50,325,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("sad",monkey_sad);
  monkey.scale = 0.1;
monkey.setCollider("rectangle",0,0,50,100);

  
   foodGroup = new Group();
   obstacleGroup = new Group();
}


function draw() {
background("teal");    
  
  foodGroup.setLifetimeEach(200);
  
  if(gameState == PLAY){
    if(keyDown("space")&& monkey.y >= 300) {
        monkey .velocityY = -12;
    }
     food();
       obstacles();
    
     jungle.velocityX = -(2 +  (survivalTime/30));
    if(jungle.x <0){
      jungle.x = 200;
    }
     if(frameCount%40 == 0){
       survivalTime = survivalTime+1;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(foodGroup)){
       foodGroup.destroyEach();
      bananas = bananas + 2; 
       }
    if(monkey.isTouching(obstacleGroup)){ 
      jungle.velocityX = 0;
      monkey.changeAnimation("sad",monkey_sad)
      gameState = OVER;
    } 
  
  } else if(gameState == OVER){
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    if(keyDown("r")){
      reset();
    }
  }
  
  
  monkey.collide(ground); 
drawSprites();
  if(gameState == OVER){
    textAlign(CENTER);
    fill("black");
     text("PRESS R TO RESTART",200,200);  
  }
  fill("yellow")
  textSize(15);
  textAlign(CENTER);
  text("Points for Bananas: "+bananas,200 ,50);
  fill("white");
  textSize(20);
  text("Survival Time: "+survivalTime,200,20);
   }
       
function food(){
  randomFruitY = round(random(200,300));
  if(frameCount % 80 == 0){
  banana = createSprite(410,randomFruitY,10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -(4 +  (survivalTime/30));
  banana.lifetime = 200;
  foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 150 == 0){
    obstacle = createSprite(400,350,10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.1; 
    obstacle.velocityX = -(4 +  (survivalTime/30)); 
    obstacle.lifetime = 200;8
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  monkey.changeAnimation("monkey",monkey_running); 
  gameState = PLAY;
  survivalTime = 0;
  bananas = 0;
  
}






