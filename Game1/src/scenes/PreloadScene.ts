import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
    private loadingBar!: Phaser.GameObjects.Graphics;
    private progressBar!: Phaser.GameObjects.Graphics;

    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload(): void {
        // Create loading bar
        this.createLoadingBar();

        // Load game assets
        this.loadAssets();
    }

    create(): void {
        // Transition to main menu
        this.scene.start('MainMenuScene');
    }

    private createLoadingBar(): void {
        this.loadingBar = this.add.graphics();
        this.progressBar = this.add.graphics();

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Loading bar background
        this.loadingBar.fillStyle(0x222222, 0.8);
        this.loadingBar.fillRect(width / 4, height / 2 - 16, width / 2, 32);

        // Progress bar
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(width / 4, height / 2 - 16, 0, 32);

        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '20px Arial',
            color: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);

        // Update progress bar
        this.load.on('progress', (value: number) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(width / 4, height / 2 - 16, (width / 2) * value, 32);
        });
    }

    private loadAssets(): void {
        // Load game assets here
        this.load.image('background', 'assets/background.svg');
        this.load.image('bubble', 'assets/bubble.svg');
        this.load.image('shooter', 'assets/shooter.svg');
        this.load.image('logo', 'assets/logo.png');

        // Load audio files
        this.load.audio('backgroundMusic', 'assets/sounds/background.mp3');
        this.load.audio('popSound', 'assets/sounds/pop.mp3');
        this.load.audio('buttonClick', 'assets/sounds/button.mp3');
    }
} 