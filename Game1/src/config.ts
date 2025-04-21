import Phaser from 'phaser';

export const config: Phaser.Core.Config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: ['BootScene', 'PreloadScene', 'MainMenuScene', 'GameScene'],
    pixelArt: false,
    antialias: true
}; 