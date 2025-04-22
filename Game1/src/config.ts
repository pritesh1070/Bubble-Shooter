import Phaser from 'phaser';

// Get the window dimensions
const getGameSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calculate the game size while maintaining aspect ratio
    const targetWidth = Math.min(width, 800);
    const targetHeight = Math.min(height, 600);
    
    return {
        width: targetWidth,
        height: targetHeight
    };
};

export const config: Phaser.Core.Config = {
    type: Phaser.AUTO,
    width: getGameSize().width,
    height: getGameSize().height,
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