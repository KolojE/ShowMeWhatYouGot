import Phaser from 'phaser'
import * as GameController from './GameController';

export const layers = new Object();
const gameState = {};

export default class GameMenu extends Phaser.Scene {
    constructor() {
      super( 'GameMenu' );
    }
  

 
 preload() {
  this.load.image('lab', 'TileMap/lab.png');
  this.load.tilemapTiledJSON('tilemapmenu', 'TileMap/menu.json');
  this.load.image('title','Assets/title.png');
  this.load.spritesheet('playBtn','Assets/playBtn.png',{frameWidth: 348, frameHeight:148});
  this.load.spritesheet('doofusrick','Assets/animation/rick.png',{ frameWidth: 370, frameHeight: 654  });
  this.load.spritesheet('idlePortal','Assets/animation/portal1.png',{frameWidth:310,frameHeight:350});
  this.load.audio('theme','Assets/audio/theme.mp3');
 }

 create()
 {
    const map = this.make.tilemap({ key: 'tilemapmenu' });
    const tileset = map.addTilesetImage('lab', 'lab');
    layers.Background = map.createLayer('BackGround',tileset);
    gameState.title = this.add.image(400,120,'title').setScale(0.8);
    gameState.playBtn = this.physics.add.sprite(400,600,'playBtn').setScale(0.5);
    gameState.playBtn.setInteractive();
   gameState.theme = this.sound.add('theme',{volume:0.15});

   gameState.theme.play();

    gameState.playBtn.on('pointerhover', ()=>
    {
      gameState.playBtn.setTexture('playBtn',1);

    });
    gameState.playBtn.on('pointerout',()=>
   {
      gameState.playBtn.setTexture('playBtn',0);
   });
    
    gameState.playBtn.on('pointerup', ()=>
    {
      this.scene.start('GameSceneLv1',{count:0});
      gameState.theme.stop();

    });


 }





 
}