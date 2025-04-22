import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
    private loadingText!: Phaser.GameObjects.Text;
    private progressBar!: Phaser.GameObjects.Graphics;
    private progressBox!: Phaser.GameObjects.Graphics;

    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Add loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Preparing Game...', {
            font: '20px monospace',
            color: '#ffffff'
        });
        this.loadingText.setOrigin(0.5, 0.5);
        
        // Create progress bar
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
            (this.loadingText as any).visible = false;
        });
        
        // Load any additional assets here
        // For now, we'll just add a small delay to simulate loading
        const scene = this as any;
        scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('MainMenuScene');
            },
            callbackScope: this
        });
    }

    create() {
        // Initialize any game systems here
        const scene = this as any;
        scene.sound.setVolume(0.5);
    }
} 