var bgImg
var fish1Img, fish2Img, fish3Img, fishDeadImg
var shoeImg, shoe2Img
var vacuumerImg
var wrapperImg, bagImg, bag2Img, bag3Img, fishingearImg, strawImg, bcapImg   
var jewelleryImg, treasureImg, coinImg
var logo
var startImg
var playButton

var player;

var obstaclesGroup;
var trashGroup;

var gameState = 0;
var score = 0;

function preload() {
  bgImg = loadImage("./assets/ocean.png")
  fish1Img = loadImage("./assets/fish.png")
  fish2Img = loadImage("./assets/fish2.png")
  fish3Img = loadImage("./assets/fish3.png")
  shoeImg = loadImage("./assets/shoe.jpeg")
  shoe2Img = loadImage("./assets/shoe2.png")
  vacuumerImg = loadImage("./assets/vacuumer.png")
  wrapperImg = loadImage("./assets/wrapper.png")
  bagImg = loadImage("./assets/plastic-bag.png")
  bag2Img = loadImage("./assets/bag2.png")
  bag3Img = loadImage("./assets/bag.png")
  fishingearImg = loadImage("./assets/fishingear.png")
  strawImg = loadImage("./assets/straw.png")
  bcapImg = loadImage("./assets/bcap.png")
  startImg  = loadImage("./assets/start.png")
  logo = loadImage("./assets/logo.png")
  fishDeadImg = loadImage("./assets/fishdead.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  playButton = createButton("Jogar")
  player = createSprite(width/2, height-300)
  player.addImage(vacuumerImg)
  player.scale = 0.25
  player.setVelocity(0,-2)

  obstaclesGroup = new Group();
  trashGroup = new Group();

  createObstacles()
  createTrash()
}

function draw() {
  background(startImg); 
   
 if(gameState === 0) {
  playButton.position(windowWidth/2, windowHeight/2)
  playButton.class("customButton")
  playButton.mousePressed(() => gameState = 1)
  imageMode(CENTER);
  image(logo, width/2, height/2-200, 900, 195)

  
 }
 
 if(gameState === 1) {
  image(bgImg, 0, -height*5, width, height*6)
  playButton.hide()

  if(keyIsDown(RIGHT_ARROW) && player.position.x<width-100) {
    player.position.x +=10
   }
   if(keyIsDown(LEFT_ARROW) && player.position.x>100) {
    player.position.x -=10
    
   }
   if(keyIsDown(UP_ARROW) && player.position.x>100) {
    player.position.y -=10
   }

   if(player.collide(obstaclesGroup)) {
    gameState = 2
    gameOver();
   }
    player.overlap(trashGroup,function(a,b) {
      b.remove();
      score+=5
    })

    if(player.position.y<-(height*5-300)) {
      gameState = 3
    }
    
   camera.position.y = player.position.y-100

  drawSprites()
 }
 if(gameState === 2) {
  obstaclesGroup.destroyEach();
  trashGroup.destroyEach();
 }

 if(gameState === 3){
  endGame() 
 }
}

function createObstacles() {
  for(var i = 0; i<8; i++) {
    var x = random(100, width-100)
    var y = random(-height*4.5, height-400)
    var obstacle = createSprite(x,y)
    var randoimg = Math.round(random(1,3))
    switch(randoimg) {
      case 1: obstacle.addImage(fish1Img); obstacle.scale = 0.35; 
      obstacle.setVelocity(2,0); break;
      case 2: obstacle.addImage(fish2Img);
       obstacle.scale = 0.07;
       obstacle.setVelocity(-2,0);
       break;
      case 3: obstacle.addImage(fish3Img); 
      obstacle.scale = 0.07;
      obstacle.setVelocity(-1,0); break;
    }
    obstacle.addToGroup(obstaclesGroup)
  }
}

function createTrash() {
  for(var i = 0; i<15; i++) {
    var x = random(100, width-100)
    var y = random(-height*4.5, height-400)
    var xvelo = random(-2, 2)
    var trash = createSprite(x,y)
    trash.setVelocity(xvelo,2)
    var randotrash = Math.round(random(1,7))
    switch(randotrash) {
      case 1: trash.addImage(bagImg); trash.scale = 0.1; break;
      case 2: trash.addImage(bag2Img); trash.scale = 0.1; break;
      case 3: trash.addImage(bcapImg); trash.scale = 0.07; break;
      case 4: trash.addImage(fishingearImg); trash.scale = 0.27; break;
      case 5: trash.addImage(bag3Img); trash.scale = 0.27; break;
      case 6: trash.addImage(shoe2Img); trash.scale = 0.05; break;
      case 7: trash.addImage(strawImg); trash.scale = 0.27; break;
    }
    trash.addToGroup(trashGroup)
  }
}

function gameOver() {
  swal({
    title: "Fim de jogo",
    text: "Você matou um peixe :(",
    imageUrl: "./assets/fishdead.png",
    imageSize: "100x100",
    confirmButtonText: "Jogar de novo"
  }, function(clicked) {if(clicked) {
    location.reload()
  }})
}

function endGame() {
  swal({
    title: "Fim de jogo",
    text: "Você venceu! Parabéns",
    imageUrl: "./assets/vacuumer.png",
    imageSize: "100x100",
    confirmButtonText: "Jogar de novo"
  }, function(clicked) {if(clicked) {
    location.reload()
  }})
}