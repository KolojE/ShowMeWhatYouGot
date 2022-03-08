import Phaser from 'phaser'
import GameSceneLv1 from './GameSceneLv1'
import GameSceneLv2 from './GameSceneLv2'
import GameSceneLv3 from './GameSceneLv3'
import GameSceneLv4 from './GameSceneLv4'
import GameMenu from './GameMenu'
import GameOverScene from './GameOverScene'
import resultScene from './resultScene'







 var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          enableBody: true,
        }
      },
      autoCenter: true,
    scene: [GameMenu,GameSceneLv1,GameSceneLv2,GameSceneLv3,GameSceneLv4,GameOverScene,resultScene]
 };
 
 export var game = new Phaser.Game(config);
