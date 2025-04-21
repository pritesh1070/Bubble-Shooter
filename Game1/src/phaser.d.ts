declare module 'phaser' {
    export = Phaser;
    export as namespace Phaser;
}

declare namespace Phaser {
    namespace Core {
        interface Config {
            type: number;
            width: number;
            height: number;
            parent?: string;
            backgroundColor?: string;
            physics?: {
                default: string;
                arcade?: {
                    gravity?: { y: number };
                    debug?: boolean;
                };
            };
            scale?: {
                mode: number;
                autoCenter: number;
            };
            scene: string[];
            pixelArt?: boolean;
            antialias?: boolean;
        }
    }

    class Scene {
        add: {
            graphics: () => Phaser.GameObjects.Graphics;
            text: (x: number, y: number, text: string, style: any) => Phaser.GameObjects.Text;
            image: (x: number, y: number, key: string) => Phaser.GameObjects.Image;
            group: () => Phaser.GameObjects.Group;
        };
        cameras: {
            main: {
                width: number;
                height: number;
            };
        };
        load: {
            image: (key: string, url: string) => void;
            audio: (key: string, url: string) => void;
            on: (event: string, callback: (value: number) => void) => void;
        };
        scene: {
            start: (key: string, data?: any) => void;
        };
        input: {
            on: (event: string, callback: Function, context?: any) => void;
        };
        physics: {
            collide: (obj1: any, obj2: any, callback?: Function, processCallback?: Function, callbackContext?: any) => void;
        };
        time: {
            addEvent: (config: { delay: number; callback: Function; callbackScope: any; loop: boolean }) => void;
        };
        sound: {
            add: (key: string, config?: { loop?: boolean; volume?: number }) => Phaser.Sound.BaseSound;
        };
        constructor(config: { key: string });
    }

    class Game {
        scene: {
            add: (key: string, scene: any) => void;
            start: (key: string) => void;
        };
        constructor(config: Core.Config);
    }

    namespace Sound {
        interface BaseSound {
            play(): void;
            stop(): void;
            isPlaying: boolean;
        }
    }

    namespace GameObjects {
        class GameObject {
            x: number;
            y: number;
        }

        interface Graphics {
            fillStyle(color: number, alpha?: number): void;
            fillRect(x: number, y: number, width: number, height: number): void;
            clear(): void;
        }

        interface Image extends GameObject {
            setOrigin(x: number, y?: number): void;
            setDisplaySize(width: number, height: number): void;
            setScale(scale: number): void;
            setVelocityY(velocity: number): void;
        }

        interface Text extends GameObject {
            setOrigin(x: number, y?: number): void;
            setInteractive(): void;
            setStyle(style: any): void;
            setText(text: string): void;
            on: (event: string, callback: () => void) => void;
        }

        interface Group {
            create(x: number, y: number, key: string): Phaser.GameObjects.Image;
        }
    }

    namespace Input {
        interface Pointer {
            x: number;
            y: number;
        }
    }

    namespace Math {
        function Clamp(value: number, min: number, max: number): number;
    }

    namespace Scale {
        const FIT: number;
        const CENTER_BOTH: number;
    }

    const AUTO: number;
} 