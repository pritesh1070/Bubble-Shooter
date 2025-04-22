import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    private player!: any;
    private cursors!: any;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private collectSound!: any;
    private backgroundMusic!: any;
    private particles!: any;
    private stars!: any;
    private gameOver: boolean = false;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load assets
        this.load.image('player', 'assets/player.png');
        this.load.image('star', 'assets/star.png');
        this.load.audio('collect', 'assets/collect.mp3');
        this.load.audio('background', 'assets/background.mp3');
    }

    create() {
        // Add background music
        this.backgroundMusic = this.sound.add('background', { loop: true, volume: 0.5 });
        this.backgroundMusic.play();

        // Add collect sound
        this.collectSound = this.sound.add('collect', { volume: 0.5 });

        // Create player with physics
        const physics = this.physics as any;
        this.player = physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);

        // Create stars group
        this.stars = physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        // Add physics to stars
        this.stars.children.iterate((child: any) => {
            const star = child;
            star.setBounceY(0.4 + Math.random() * 0.4);
        });

        // Add collision between player and stars
        physics.add.collider(this.player, this.stars, this.collectStar, undefined, this);

        // Add score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });

        // Add particle effects
        const add = this.add as any;
        this.particles = add.particles('star').createEmitter({
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000
        });

        // Add controls
        const input = this.input as any;
        this.cursors = input.keyboard.createCursorKeys();

        // Add game instructions
        const instructions = this.add.text(400, 16, 'Use arrow keys to move\nCollect stars to score points', {
            fontSize: '20px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            align: 'center'
        });
        instructions.setOrigin(0.5, 0);
    }

    update() {
        if (this.gameOver) {
            return;
        }

        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    private collectStar(player: any, star: any) {
        star.disableBody(true, true);

        // Play collect sound
        this.collectSound.play();

        // Add score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        // Create particle effect
        this.particles.emitParticle(10, star.x, star.y);

        // Check if all stars are collected
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child: any) => {
                const star = child;
                star.enableBody(true, star.x, 0, true, true);
            });
        }
    }
} 