import { config } from './config';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { GameScene } from './scenes/GameScene';
import Phaser from 'phaser';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        
        // Register scenes
        this.scene.add('BootScene', BootScene);
        this.scene.add('PreloadScene', PreloadScene);
        this.scene.add('MainMenuScene', MainMenuScene);
        this.scene.add('GameScene', GameScene);
        
        // Start with BootScene
        this.scene.start('BootScene');
    }
}

// Initialize the game when the window loads
window.onload = () => {
    new Game();
}; 