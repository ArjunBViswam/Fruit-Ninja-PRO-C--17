//creating gameSate
var PLAY = 1;
var END = 0;
var gameState = 1;

//defined score Board
var score;

//defined objects
var background, sword, fruit1, fruit2, fruit3, fruit4, germs;

//defined Animations and Images
var backgroundImage, swordImage, fruit_1Image, fruit_2Image, fruit_3Image, fruit_4Image, germsImage;

//add some sound
var gameoverSound, knifeSound;

//defined Groups for fruits and germs
var fruitGroup, germsGroup;

//defined Gameover
var gameover, gameoverImage;

function preload() {
  //load animations and images for better perfomance
  backgroundImage = loadImage("background.jfif");
  swordImage = loadImage("sword.png");
  fruit_1Image = loadImage("fruit1.png");
  fruit_2Image = loadImage("fruit2.png");
  fruit_3Image = loadImage("fruit3.png");
  fruit_4Image = loadImage("fruit4.png");
  germsImage = loadAnimation("alien1.png", "alien2.png");
  gameoverImage = loadImage("gameover.png");

  gameoverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwooshSound.mp3");
}

function setup() {
  createCanvas(610, 470);

  //creating sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.6;

  //creating Groups
  fruitGroup = new Group();
  germsGroup = new Group();

  //score board
  score = 0;

  //gameover statement
  gameover = createSprite(305, 235, 20, 20)
  gameover.addImage(gameoverImage)
  gameover.scale = 1.5

}

function draw() {
  //display background
  background(backgroundImage);

  //displaying score
  textSize(25)
  stroke("green")
  text("score:" + score, 40, 40);

  //work of gameState
  if (gameState === PLAY) {
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    fruits();
    Enemy();
    gameover.visible = false

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 2;
      knifeSound.play();
    } else if (gameState === END) {
      fruitGroup.velocityX = 0
      germsGroup.velocityX = 0

      fruitGroup.setLifetimeEach(0);
      germsGroup.setLifetimeEach(0);
    }
    if (sword.isTouching(germsGroup)) {
      germsGroup.destroyEach();
      gameState = END
      gameoverSound.play();
      fruitGroup.destroyEach();
      germsGroup.setVelocityXEach(0);
      fruitGroup.setVelocityXEach(0);
      gameover.visible = true
    }
  }

  drawSprites();

}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(610, 470, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug=true
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit_1Image);
    } else if (r == 2) {
      fruit.addImage(fruit_2Image);
    } else if (r == 3) {
      fruit.addImage(fruit_3Image);
    } else {
      fruit.addImage(fruit_4Image);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -7;
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    germs = createSprite(610, 470, 20, 20);
    germs.addAnimation("moving", germsImage);
    germs.y = Math.round(random(100, 300));
    germs.velocityX = -9;
    germs.setLifetime = 50;
    germsGroup.add(germs);
  }
}