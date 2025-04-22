import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
    private title!: Phaser.GameObjects.Text;
    private startButton!: Phaser.GameObjects.Text;
    private particles!: any;
    private backgroundMusic!: any;

    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // Load assets
        this.load.image('star', 'assets/star.png');
        this.load.audio('background', 'assets/background.mp3');
    }

    create() {
        // Add background music
        this.backgroundMusic = this.sound.add('background', { loop: true, volume: 0.3 });
        this.backgroundMusic.play();

        // Add title with animation
        this.title = this.add.text(400, 200, 'Star Collector', {
            fontSize: '64px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 6,
            fontStyle: 'bold'
        });
        this.title.setOrigin(0.5);
        
        // Add title animation
        const scene = this as any;
        scene.tweens.add({
            targets: this.title,
            scale: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // Add start button
        this.startButton = this.add.text(400, 400, 'Start Game', {
            fontSize: '32px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });
        this.startButton.setOrigin(0.5);
        
        // Make button interactive
        this.startButton.setInteractive();
        
        // Add button hover effect
        this.startButton.on('pointerover', () => {
            this.startButton.setStyle({ color: '#ff0' });
        });
        
        this.startButton.on('pointerout', () => {
            this.startButton.setStyle({ color: '#fff' });
        });
        
        // Add click handler
        this.startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Add particle effects
        const add = this.add as any;
        this.particles = add.particles('star').createEmitter({
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 2000,
            frequency: 100
        });

        // Add instructions
        const instructions = this.add.text(400, 500, 'Use arrow keys to move\nCollect stars to score points', {
            fontSize: '20px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            align: 'center'
        });
        instructions.setOrigin(0.5);

        // Add copyright text
        const copyright = this.add.text(400, 580, '© 2024 Star Collector', {
            fontSize: '16px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });
        copyright.setOrigin(0.5);
    }

    update() {
        // Update particle emitter position
        this.particles.emitters.list[0].setPosition(
            Math.floor(Math.random() * 800),
            Math.floor(Math.random() * 600)
        );
    }
} 