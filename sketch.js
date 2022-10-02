const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground,ground2,ground3;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;
var balloon,balloonimg;
var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;
var star,starimg;
var star2,star2img;
var starcounter0,starcounter1,starcounter2;
var starcounter0img,starcounter1img,starcounter2img;
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  starimg = loadImage("star.png");
  starcounter0img = loadImage("g_star1.png");
  starcounter1img = loadImage("one_star.png");
  starcounter2img = loadImage("stars.png");
  balloonimg = loadImage("balloonleft.png");
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

 // bk_song.play();
  //bk_song.setVolume(0.05);

  engine = Engine.create();
  world = engine.world;
  starcounter0 = createSprite(50,35,20,20);
  starcounter0.addImage (starcounter0img);
  starcounter0.scale = 0.1
  star = createSprite(50,300,20,20);
  star.addImage (starimg);
  star.scale = 0.01

  balloon = createSprite(400,300,20,20);
  balloon.addImage (balloonimg);
 balloon.scale = 0.25;
  star2 = createSprite(200,500,20,20);
  star2.addImage (starimg);
  star2.scale = 0.01
  //btn 1
  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(390,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:200,y:90});
   rope2 = new Rope(7,{x:400,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
 
  
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
funtion applyforce(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:-0.01,y:0});
}

