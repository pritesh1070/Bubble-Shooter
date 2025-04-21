import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload(): void {
        // Load minimal assets needed for the loading screen
        this.load.image('logo', 'assets/logo.png');
    }

    create(): void {
        this.scene.start('PreloadScene');
    }
} 