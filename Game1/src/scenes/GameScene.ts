import Phaser from 'phaser';

interface GameData {
    mode: 'classic' | 'timeAttack' | 'zen';
}

export class GameScene extends Phaser.Scene {
    private bubbles!: Phaser.GameObjects.Group;
    private shooter!: Phaser.GameObjects.Image;
    private currentBubble!: Phaser.GameObjects.Image;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private timerText!: Phaser.GameObjects.Text;
    private gameMode: string = 'classic';
    private timeLeft: number = 60; // 60 seconds for time attack mode
    private popSound!: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: 'GameScene' });
    }

    init(data: GameData) {
        this.gameMode = data.mode;
    }

    create() {
        // Add background
        const background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Initialize sound
        this.popSound = this.sound.add('popSound', { volume: 0.3 });

        // Create bubble group
        this.bubbles = this.add.group();

        // Add shooter
        this.shooter = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            'shooter'
        );
        this.shooter.setScale(0.5);

        // Create current bubble
        this.createNewBubble();

        // Add score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            font: '24px Arial',
            color: '#ffffff'
        });

        // Add timer text if in time attack mode
        if (this.gameMode === 'timeAttack') {
            this.timerText = this.add.text(
                this.cameras.main.width - 16,
                16,
                `Time: ${this.timeLeft}`,
                {
                    font: '24px Arial',
                    color: '#ffffff'
                }
            );
            this.timerText.setOrigin(1, 0);

            // Start timer
            this.time.addEvent({
                delay: 1000,
                callback: this.updateTimer,
                callbackScope: this,
                loop: true
            });
        }

        // Set up input
        this.input.on('pointermove', this.moveShooter, this);
        this.input.on('pointerdown', this.shootBubble, this);
    }

    private createNewBubble() {
        this.currentBubble = this.add.image(
            this.shooter.x,
            this.shooter.y - 30,
            'bubble'
        );
        this.currentBubble.setScale(0.5);
    }

    private moveShooter(pointer: Phaser.Input.Pointer) {
        this.shooter.x = Phaser.Math.Clamp(
            pointer.x,
            50,
            this.cameras.main.width - 50
        );
        this.currentBubble.x = this.shooter.x;
    }

    private shootBubble() {
        const bubble = this.bubbles.create(
            this.currentBubble.x,
            this.currentBubble.y,
            'bubble'
        );
        bubble.setScale(0.5);
        bubble.setVelocityY(-300);

        // Create new bubble
        this.createNewBubble();
    }

    private updateTimer() {
        this.timeLeft--;
        this.timerText.setText(`Time: ${this.timeLeft}`);

        if (this.timeLeft <= 0) {
            this.gameOver();
        }
    }

    private gameOver() {
        // TODO: Implement game over logic
        this.scene.start('MainMenuScene');
    }

    update() {
        // Check for bubble collisions
        this.physics.collide(this.bubbles, this.bubbles, this.handleBubbleCollision, undefined, this);
    }

    private handleBubbleCollision(bubble1: Phaser.GameObjects.Image, bubble2: Phaser.GameObjects.Image) {
        // Play pop sound
        this.popSound.play();

        // TODO: Implement bubble collision logic
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
    }
} 