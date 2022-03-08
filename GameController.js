import GameOverScene from "./GameOverScene";


var playing = false;
  
export function gravityDirectionLeft(player,layers,scene)
{
  player.body.gravity.x = -1000;
  player.body.gravity.y =  0;

  if(!playing)
  {scene.sound.play('gravity');playing = true}
}
export function gravityDirectionRight(player,layers,scene)
{
  player.body.gravity.x = 1000;
  player.body.gravity.y =  0;

  if(!playing)
  {scene.sound.play('gravity');playing = true}
}
export function gravityDirectionUp(player,layers,scene)
{
  player.body.gravity.y = -1000;
  player.body.gravity.x = 0;

  if(!playing)
  {scene.sound.play('gravity');playing = true}
}
export function gravityDirectionDown(player,layers,scene)
{
  player.body.gravity.y = 1000;
         player.body.gravity.x = 0;
        
         if(!playing)
         {scene.sound.play('gravity');playing = true}
}
  //change player's gravity direction when player is overlap with arrow title
  export function gravityArrow(player,layers,scene){
    var UpArrow =  layers.Uplayer.getTileAtWorldXY(player.x, player.y);    
    if (UpArrow!=null) {
      gravityDirectionUp(player,layers,scene)
    }
    
    var DownArrow =  layers.Downlayer.getTileAtWorldXY(player.x, player.y);
    if (DownArrow!=null) {
      gravityDirectionDown(player,layers,scene)
    }
           
    var LeftArrow =  layers.Leftlayer.getTileAtWorldXY(player.x, player.y);         
    if (LeftArrow!=null) {
      gravityDirectionLeft(player,layers,scene)
         }
        
          
    var RightArrow =  layers.Rightlayer.getTileAtWorldXY(player.x, player.y);        
    if (RightArrow!=null) {
      gravityDirectionRight(player,layers,scene)
        }

        if(UpArrow==null&&DownArrow==null&&LeftArrow==null&&RightArrow==null&&playing ==true)
        {playing = false;}

   }
  //change player sprite direction when on difference gravity direction
  export  function flipPlayerSprite(player,gravityDirection){
  if(getplayerGravity(player,gravityDirection) == gravityDirection.down)
  { 
    player.flipY = false;
    player.angle = 0;
  }
  else if(getplayerGravity(player,gravityDirection) == gravityDirection.up)
  {
    player.flipY = true;
    player.angle = 0;
  }
  
  if(getplayerGravity(player,gravityDirection) == gravityDirection.left)
  {
  player.angle = 90;
  player.flipY = false;
  }
  else if(getplayerGravity(player,gravityDirection) == gravityDirection.right)
  {
    player.angle = -90;
    player.flipY = false;
  }
   }
  //getcurrentPlayerGravity
  export function getplayerGravity(player,gravityDirection)
   {
  if(player.body.gravity.x>0)
  return gravityDirection.right;
  else if(player.body.gravity.x<0)
  return gravityDirection.left;
  
  if(player.body.gravity.y>0)
  return gravityDirection.down;
  else if(player.body.gravity.y<0)
  return gravityDirection.up;
  
  return gravityDirection.none;
   }
   //player controller
  export function control(player,controller,gravityDirection)
   {
    if (controller.right.isDown) {
      if( getplayerGravity(player,gravityDirection)==gravityDirection.up||getplayerGravity(player,gravityDirection)==gravityDirection.down)
      { player.setVelocityX(160);console.log("set velocity x"); player.flipX = true; }
      else
      {player.setVelocityY(-160);console.log("set velocity Y"); if (getplayerGravity(player,gravityDirection)==gravityDirection.left) player.flipX = false; else  player.flipX = true;}
  
      player.anims.play('run', true);
  
      
    } else if (controller.left.isDown ) {
      if( getplayerGravity(player,gravityDirection)==gravityDirection.up||getplayerGravity(player,gravityDirection)==gravityDirection.down)
      {player.setVelocityX(-160);console.log("set velocity x"); player.flipX = false;}
      else 
     { player.setVelocityY(160);console.log("set velocity Y");  if (getplayerGravity(player,gravityDirection)==gravityDirection.left) player.flipX = true; else  player.flipX = false;}
  
      player.anims.play('run', true);
  
      
    } 
    else {
      if( getplayerGravity(player,gravityDirection)==gravityDirection.up||getplayerGravity(player,gravityDirection)==gravityDirection.down)
      player.setVelocityX(0);
      else
      player.setVelocityY(0);
      player.anims.play('idle', true);
    }
  
    if(isGrounded(player,gravityDirection)&&controller.up.isDown)
    {
      if(getplayerGravity(player,gravityDirection)==gravityDirection.down)
      {player.setVelocityY(-400); }
      else if (getplayerGravity(player,gravityDirection)==gravityDirection.up)
      {
        player.setVelocityY(400);
      }
      else if (getplayerGravity(player,gravityDirection)==gravityDirection.left)
     { player.setVelocityX(400);}
     else
     { player.setVelocityX(-400);}
  
    }
   }
   //check if the bottom of the player is on ground
   export function isGrounded(player,gravityDirection)
   {
     if( getplayerGravity(player,gravityDirection)!=gravityDirection.left&&getplayerGravity(player,gravityDirection)!=gravityDirection.right){
     if(player.body.blocked.down||player.body.blocked.up)
     {
       return true;
     }
     else
     return false;
    }
    else
    if(player.body.blocked.left||player.body.blocked.right)
    {
      return true;
    }
    else
    return false;
   }
  
   var leftButtonPressed = false;
   export function set(player,scene,arrow,mouse)
   {
    arrow.setPosition(player.x,player.y);
    arrow.setVisible(true);
    arrow.angle = Phaser.Math. Angle.Between(player.x,player.y,mouse.x,mouse.y)*180/3.142;
    leftButtonPressed = true;
   }

   export function fire(player,scene,arrow,sprite,mouse)
   {
     if(leftButtonPressed){
    var bullet = sprite.create(player.x,player.y,'red_btn');
    arrow.setVisible(false);
    leftButtonPressed = false;
    console.log("realse");

    bullet.setCollideWorldBounds(true);
    bullet.setScale(0.1);
    
    bullet.body.gravity.y = 1500;
    bullet.setVelocityY((player.y-mouse.y)*3);
    bullet.setVelocityX((player.x-mouse.x)*3);
    bullet.body.bounce.set(0.8);
    scene.time.addEvent({
      delay: 5000,
      callback: ()=>{
        bullet.destroy();
      },
      loop: false
  })
    console.log(((player.x-mouse.x)*3)+ "   " +((player.y-mouse.y)*3));
    scene.sound.play('throw');
  }
   
   }

   export function GameOver(scene,SceneName,mortyCount)
   {
    scene.start('GameOverScene',{scene:SceneName,mortyCount:mortyCount});
   }

