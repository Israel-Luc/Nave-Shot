var bg, bgImg;

var nave, naveImg;
var naveShield, naveShieldImg;

var  enemy1Img, enemy1Group
var enemy2, enemy2Img, enemy2Group;
var enemy3, enemy3Img, enemy3Group;
var meteor, meteorImg;

var bullet, bulletImg, bulletGroup;
var missil, missilImg, missilGroup;

var heart, heartImg;
var heart2, heart2Img;
var heart3, heart3Img;
var shield, shieldImg;

var score=0, life=3, defence=1;

var PLAY, END;

function preload(){
  bgImg = loadImage("assets/background.jpg");
  naveImg = loadImage("assets/nave.png");
  naveShieldImg = loadImage("assets/nave-shield.png");
  enemy1Img = loadImage("assets/enemy1.png");
  enemy2Img = loadImage("assets/enemy2.png");
  enemy3Img = loadImage("assets/enemy3.png");
  meteorImg = loadImage("assets/meteor.png");

  missilImg = loadImage("assets/missil.png");
  bulletImg = loadImage("assets/bullet.png");

  heartImg = loadImage("assets/heart.png");
  heart2Img = loadImage("assets/heart2.png");
  heart3Img = loadImage("assets/heart3.png");
  shieldImg = loadImage("assets/shield.png");
}

function setup(){
  createCanvas(1366,655);

  bg = createSprite(900,600,20,20);
  bg.addImage(bgImg);
  bg.scale = 1;

   nave = createSprite(670, 580, 15, 15);
   nave.addImage(naveShieldImg);
   nave.scale = 0.9;

  heart = createSprite(1300, 70, 15, 15);
  heart.addImage(heartImg);
  heart.scale = 0.15;
  heart.visible = false;

  heart2 = createSprite(1280, 70, 15, 15);
  heart2.addImage(heart2Img);
  heart2.scale = 0.25;
  heart2.visible = false;

  heart3 = createSprite(1270, 70, 15, 15);
  heart3.addImage(heart3Img);
  heart3.scale = 0.25;
  heart3.visible = true;

  shield = createSprite(1300, 110, 15, 15);
  shield.addImage(shieldImg);
  shield.scale = 0.2;

  enemy1Group = new Group();
  enemy2Group = new Group();
  enemy3Group = new Group();
  meteorGroup = new Group();

  missilGroup = new Group();
  bulletGroup = new Group();
}

function draw(){
  background(0);

  textSize:20;
  fill:"white";
  stroke:"white";
  text("score:"+ score, 1260, 120, 15, 15);
 

  naveMovements();
  Enemys();
  Bullets();
  Damage();
  drawSprites();
}

function naveMovements(){
  if(keyDown(UP_ARROW)||touches.length>0){
    nave.y = nave.y -15;
  }
  if(keyDown(DOWN_ARROW)||touches.length>0){
    nave.y = nave.y +15;
  }
  if(keyDown(RIGHT_ARROW)||touches.length>0){
    nave.x = nave.x +15;
  }
  if(keyDown(LEFT_ARROW)||touches.length>0){
    nave.x = nave.x -15;
  }
}

function Bullets(){
  if(keyWentDown("X")){
    missil = createSprite(nave.x, nave.y, 15, 15);
    missil.velocityY = -15;
    missil.addImage(missilImg);
    missil.scale = 0.15;
  }
  if(keyWentDown("SPACE")){
    bullet = createSprite(nave.x, nave.y, 15, 15);
    bullet.velocityY = -15;
    bullet.addImage(bulletImg);
    bullet.scale = 0.15;
  }
}

function Enemys(){
  var enemy1;

  if(frameCount%60===0){
  enemy1 = createSprite(random(1360), random(100), 15, 15);
  enemy1.addImage(enemy1Img);
  enemy1.scale = 0.2;
  enemy1.velocityY = 3;
  enemy1.lifetime = 210;

  enemy2 = createSprite(random(1360), random(100), 15, 15);
  enemy2.addImage(enemy2Img);
  enemy2.scale = 0.2;
  enemy2.velocityY = 3;
  enemy2.lifetime = 210;

  enemy3 = createSprite(random(1360), random(100), 15, 15);
  enemy3.addImage(enemy3Img);
  enemy3.scale = 0.2;
  enemy3.velocityY = 3;
  enemy3.lifetime = 210;

  meteor = createSprite(random(1360), random(100), 15, 15);
  meteor.addImage(meteorImg);
  meteor.scale = 0.2;
  meteor.velocityY = 3;
  meteor.lifetime = 210;
  }
}

function Damage(){
  if(enemy1Group.isTouching(bullet)){
    for(var i=0; i<enemy1Group.length; i++);

    if(enemy1Group.isTouching(bulletGroup)){
      enemy1.destroyEach();
      bullet.destroyEach();
      //explosionSound.play();
      //score = score+1;
    }
  }

  if(nave.isTouching(enemy1Group)){
    enemy1Group.destroy();
    life = life-1;
    heart2.changeAnimation(heart2);
  }
}