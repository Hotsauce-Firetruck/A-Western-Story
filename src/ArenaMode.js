import { ArenaLevel } from "./levels/ArenaLevel.js";
import { ArenaDeathScene } from "./interfaces/ArenaDeathScene.js";
import { PreloaderArena } from "./interfaces/PreloaderArena.js";
import { Connection } from "./components/Connection.js";
import { ServerSelect } from "./interfaces/ServerSelect.js";

export class ArenaMode 
{
    constructor() 
    {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;
        this.isMobile = false;

        //Detecting the Device's Size and Set Max
        let maxWidth = 1200;
        let maxHeight = 600;
        
        let scaleWidth = window.innerWidth / maxWidth;
        let scaleHeight = window.innerHeight / maxHeight;
        this.scale = Math.min(scaleWidth, scaleHeight);
        
        let modifiedWidth = maxWidth * this.scale;
        let modifiedHeight = maxHeight * this.scale;

        if (this.scale < 1) 
        {
            maxHeight = modifiedHeight;
            maxWidth = modifiedWidth;
        } else 
        {
            this.scale = 1;
        }

        //Initializing Level
        let preloader = new PreloaderArena(this);
        let serverList = new ServerSelect(this);
        let levelarena = new ArenaLevel(this, serverList.getServer());
        let death = new ArenaDeathScene(this);

        //Initializing Config
        this.config = {
            type: Phaser.AUTO,
            width: maxWidth,
            height: maxHeight,
            parent: 'phaser-game',
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            pixelArt: true,
            activePointers: 4,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 1.3}
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            fps: {
                target: 60
            },
            plugins: {
                scene: [
                    {
                        plugin: rexvirtualjoystickplugin,
                        key: "rexVirtualJoyStick",
                        mapping: "rexVirtualJoyStick"
                    },
                    {
                        plugin: PhaserMatterCollisionPlugin,
                        key: "matterCollision",
                        mapping: "matterCollision"
                    },
                    {
                        plugin: PhaserInput
                    }
                ]
            },
         
            scene: [preloader, serverList, levelarena, death]

        };

        let game = new Phaser.Game(this.config);

        if (game.device.os.android || 
            game.device.os.iOS || 
            game.device.os.iPad || 
            game.device.os.iPhone ||
            game.device.os.windowsPhone)
        {
            this.isMobile = true;
            ScreenOrientation.lock("landscape");
        }
    }
}

let A_Western_Story = new ArenaMode();

