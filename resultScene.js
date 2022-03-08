import Phaser, { Scene } from 'phaser'

var score=0;
export default class resultScene extends Phaser.Scene {
    constructor() {
      super( 'resultScene' );
    }
  

init(data)
{
  score = data.score;

}
 
 preload() {
  this.load.image('background', 'Assets/gameOverBackground.png');
  this.load.spritesheet('miniMorty','Assets/animation/MiniMorty.png',{frameWidth:33,frameHeight:55});
 }

 create()
 {
    var backGround = this.add.image(100,100,'background').setOrigin(0.125,0.125);
    backGround.displayWidth = this.sys.canvas.width;
    backGround.displayHeight = this.sys.canvas.height;


    this.add.image(400,500,'miniMorty');
    this.add.text(350,555,"Your Score : " + score);
  
    


 }
 update()
 {
    if (this.input.mousePointer.leftButtonDown())
    {
    this.scene.start('GameMenu');}


   
    } 
 }
