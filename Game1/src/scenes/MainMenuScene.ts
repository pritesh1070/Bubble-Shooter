import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.Image;
    private logo!: Phaser.GameObjects.Image;
    private title!: Phaser.GameObjects.Text;
    private buttons: Phaser.GameObjects.Text[] = [];
    private backgroundMusic!: Phaser.Sound.BaseSound;
    private buttonClickSound!: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create(): void {
        // Add background
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Initialize sounds
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
        this.buttonClickSound = this.sound.add('buttonClick', { volume: 0.3 });

        // Play background music if not already playing
        if (!this.backgroundMusic.isPlaying) {
            this.backgroundMusic.play();
        }

        // Add logo
        this.logo = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height * 0.15,
            'logo'
        );
        this.logo.setOrigin(0.5);
        // Scale the logo to an appropriate size (adjust the scale factor as needed)
        this.logo.setScale(0.5);

        // Add title
        this.title = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height * 0.3,
            'Bubble Nebula Rush',
            {
                font: '48px Arial',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6
            }
        );
        this.title.setOrigin(0.5);

        // Create menu buttons
        this.createMenuButtons();
    }

    private createMenuButtons(): void {
        const buttonTexts = ['Play', 'Time Attack', 'Zen Mode', 'Multiplayer', 'Settings'];
        const buttonSpacing = 60;

        buttonTexts.forEach((text, index) => {
            const button = this.add.text(
                this.cameras.main.width / 2,
                this.cameras.main.height * 0.4 + (index * buttonSpacing),
                text,
                {
                    font: '32px Arial',
                    color: '#ffffff',
                    backgroundColor: '#4a4a4a',
                    padding: { x: 20, y: 10 }
                }
            );
            button.setOrigin(0.5);
            button.setInteractive();

            // Button hover effects
            button.on('pointerover', () => {
                button.setStyle({ backgroundColor: '#666666' });
            });
            button.on('pointerout', () => {
                button.setStyle({ backgroundColor: '#4a4a4a' });
            });

            // Button click handlers
            button.on('pointerdown', () => {
                this.buttonClickSound.play();
                this.handleButtonClick(text);
            });

            this.buttons.push(button);
        });
    }

    private handleButtonClick(buttonText: string): void {
        switch (buttonText) {
            case 'Play':
                this.scene.start('GameScene', { mode: 'classic' });
                break;
            case 'Time Attack':
                this.scene.start('GameScene', { mode: 'timeAttack' });
                break;
            case 'Zen Mode':
                this.scene.start('GameScene', { mode: 'zen' });
                break;
            case 'Multiplayer':
                // TODO: Implement multiplayer
                break;
            case 'Settings':
                // TODO: Implement settings
                break;
        }
    }
} 