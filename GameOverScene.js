import Phaser, { Scene } from 'phaser'

var SceneName;
var lifeCount =3 ;
export default class GameOverScene extends Phaser.Scene {
    constructor() {
      super( 'GameOverScene' );
    }
  

init(data)
{
  SceneName = data.scene;

}
 
 preload() {
  this.load.image('background', 'Assets/gameOverBackground.png');
  this.load.image('gameOverText','Assets/gameOverText.png')
  this.load.spritesheet('miniMorty','Assets/animation/MiniMorty.png',{frameWidth:33,frameHeight:55});
 }

 create()
 {
    var backGround = this.add.image(100,100,'background').setOrigin(0.125,0.125);
    backGround.displayWidth = this.sys.canvas.width;
    backGround.displayHeight = this.sys.canvas.height;

    var text = this.add.image(400,400,'gameOverText').setScale(0.8);
    lifeCount --;
    this.add.image(400,500,'miniMorty');
    this.add.text(420,505,"life Remaining " + lifeCount);
  
    


 }
 update()
 {
    if (this.input.mousePointer.leftButtonDown())
    {
    if(lifeCount>0)
    this.scene.start(SceneName);
    else
   { this.scene.start('GameMenu'); lifeCount = 3;}

    console.log(SceneName);
   
    } 
 }
}