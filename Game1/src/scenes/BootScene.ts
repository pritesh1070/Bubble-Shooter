import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    private loadingText!: Phaser.GameObjects.Text;
    private progressBar!: Phaser.GameObjects.Graphics;
    private progressBox!: Phaser.GameObjects.Graphics;

    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '20px monospace',
            color: '#ffffff'
        });
        this.loadingText.setOrigin(0.5, 0.5);
        
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);
        
        // Update progress bar
        this.load.on('progress', (value: number) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });
        
        // Remove progress bar when complete
        this.load.on('complete', () => {
            this.progressBar.clear();
            this.progressBox.clear();
            this.loadingText.setText('');
        });
        
        // Load game assets
        this.load.image('player', 'assets/player.png');
        this.load.image('star', 'assets/star.png');
        this.load.audio('collect', 'assets/collect.mp3');
        this.load.audio('background', 'assets/background.mp3');
    }

    create() {
        // Start the preload scene
        this.scene.start('PreloadScene');
    }
} 