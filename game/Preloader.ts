namespace TSAGame {
    var levelOn:number;
    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite;
        
        preload() {
            levelOn=1;

            this.preloadBar = this.game.add.sprite(200,  250, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);
//            this.load.image('titlepage', './assets/titlepage.jpg');
//            this.load.image("logo", "./assets/logo.gif");
            this.load.spritesheet("ethan", "./assets/Ethan.png", 35, 62);
            this.load.spritesheet("shield", "./assets/EthanShield.png", 40, 62);
            this.load.spritesheet("tbot", "./assets/last Tbot.png", 40, 61);
            this.load.spritesheet("alien", "./assets/Real Alien8.png", 37, 64);
            this.load.spritesheet("obot", "./assets/last Obot.png", 36, 48);
            this.load.spritesheet("alienElevator", "./assets/alivator.png", 66, 58);
            this.load.spritesheet("elevator", "./assets/HumanElevator.png", 66, 58);
            this.load.spritesheet("button1", "./assets/InvisibleGUI.png", 40, 40);
            this.load.spritesheet("button2", "./assets/ShieldGUI2.png", 40, 40);
            this.load.image("bigAlienElevator", "./assets/LargeElevator.png");
            this.load.image("sky", "./assets/lev1bg.png");
            this.load.image("lvl2", "./assets/levl2bg.png");
            this.load.image("lvl3", "./assets/bg33.png");
            this.load.image("title", "./assets/t.png");

            this.load.image("suspicion", "./assets/suspicious.png");

       //     this.load.image("lvl3", "./assets/lvl3.png");
            this.load.spritesheet("siren","./assets/alarm.png",32,32);
            this.load.spritesheet("siren2","./assets/alien alarm0.png",32,32);

            this.load.image("ground", "./assets/ground.png");
            this.load.image("fbpt", "./assets/Final boss.png");
            this.load.image("heart", "./assets/Heart.png");
            this.load.image("Ship Tileset", "./assets/Tile Sets/tileset.png");
            this.load.image("Ship2 Tileset", "./assets/Tile Sets/ship2 tileset.png");
            this.load.image("Level 3 tileset", "./assets/Tile Sets/Level 3.png");
            this.load.image("pauseButton", "./assets/pause.png");
            this.load.image("resume", "./assets/resume.png");
            this.load.image("reset", "./assets/Reset Button.png");

            this.load.image("arm", "./assets/alienArm.png");

            this.load.image("Laser", "./assets/Laser.png");
            this.load.image("level1", "./assets/level1 button.png");
            this.load.image("level2", "./assets/level2 button.png");
            this.load.image("level3", "./assets/lvl3 button.png");
            this.load.spritesheet("sensor", "./assets/SecurityLaser.png",32,32);
            this.load.spritesheet("blast", "./assets/blast34.png",47,47);

            this.load.image("instruct", "./assets/instruct.png");
            this.load.image("play", "./assets/play button.png");

            this.load.spritesheet("drone", "./assets/drone.png", 47.875, 36); 
//            this.load.spritesheet("drone", "./assets/DroneFinal.png", 24, 18);
            this.load.spritesheet("levelEnd", "./assets/AlienTeleporter.png", 34, 66);
//            this.load.spritesheet("obot", "./assets/TankDroneThing2.png", 40, 61);
            this.load.audio("first", "./assets/sound/first.mp3");
            this.load.audio("second", "./assets/sound/OLIVER's song.mp3");
            this.load.audio("1", "./assets/sound/TheLevel1.mp3");
            this.load.audio("alarm", "./assets/sound/alarm1.mp3");
            
            
            this.load.audio("elSound", "./assets/sound/elevator sound.mp3");
            this.load.tilemap('map', 'assets/Tile maps/ship3.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map2', 'assets/Tile maps/alien ship.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map3', 'assets/Tile maps/alienBase.json', null, Phaser.Tilemap.TILED_JSON);

//            this.player = Player();
        }

        create() {
            
            this.add.tween(this.preloadBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(() => this.game.state.start("titleScreen", true, false));
/*            var button = game.add.button(95, 95, 'button', down, this, 2, 1, 0);
            button.onInputOver.add(over, this);
            button.onInputOut.add(out, this);
            button.onInputUp.add(up, this);*/
        }
        
//        console.log("updating now");
//        function over{}
//        function out{}
//        function down{}
    
    }export class titleScreen extends Phaser.State {
        play:any;
        instructions:Phaser.Button;
        bgMusic:any;
        
        create(){
            var bg = this.game.add.sprite(0, 0, "title");
        //    bg.scale.x=2;
        //    bg.scale.y=2;
            this.play = this.game.add.button(313, 190, "play");
            this.play.onInputDown.add(this.playPress, this);
            this.instructions = this.game.add.button(154, 330, "instruct");
            this.instructions.onInputDown.add(this.instruct, this);
            this.bgMusic=this.game.add.audio("first", 0.6, true);
            this.bgMusic.play();
        }
        playPress(){
            this.bgMusic.stop();

            this.game.state.start("select", true, false);
        }instruct(){
            this.game.state.start("select", true, false);
        }
    }
    export class LevelSelect extends Phaser.State {
        lvl1:Phaser.Button;
        lvl2:any;
        lvl3:any;
        
        create() {
            if (!parseInt(localStorage.getItem("clearedLevel"))) {
                localStorage.setItem("clearedLevel", "0");
            }
            this.lvl1 = this.game.add.button(200, 100, "level1");
            if (parseInt(localStorage.getItem("clearedLevel")) > 0) {
                this.lvl2 = this.game.add.button(400, 100, "level2");
                this.lvl2.onInputDown.add(this.levl2, this);
                if (parseInt(localStorage.getItem("clearedLevel")) > 1) {
                    this.lvl3 = this.game.add.button(600, 100, "level3");
                    this.lvl3.onInputDown.add(this.levl3, this);
                }    
            }
            this.lvl1.onInputDown.add(this.levl1, this);
        }
        
        levl1() {
            this.game.state.start("level1", true, false);
        }
        
        levl2() {
            this.game.state.start("level2", true, false);
        }
        
        levl3() {
            this.game.state.start("level3", true, false);
        }
    }
}