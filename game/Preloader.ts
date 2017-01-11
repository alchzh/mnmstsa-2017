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
            this.load.spritesheet("obot", "./assets/obot last version.png", 36, 48);
            this.load.spritesheet("alienElevator", "./assets/alivator.png", 66, 58);
            this.load.spritesheet("elevator", "./assets/HumanElevator.png", 66, 58);
            this.load.spritesheet("button1", "./assets/InvisibleGUI.png", 40, 40);
            this.load.spritesheet("button2", "./assets/ShieldGUI2.png", 40, 40);
            this.load.spritesheet("blast", "./assets/blastf.png", 47, 47);
            this.load.image("fire", "./assets/blastf.png");
            this.load.image("blast2", "./assets/blast34.png");
            this.load.image("bigAlienElevator", "./assets/LargeElevator.png");
            this.load.image("sky", "./assets/lev1bg.png");
            this.load.image("lvl2", "./assets/levl2bg.png");
            this.load.image("lvl3", "./assets/bg33.png");
            this.load.image("title", "./assets/title screen.png");
            this.load.image("wull", "./assets/will saved.png");
            this.load.image("jayant", "./assets/Jeanette Saved.png");
            this.load.image("jaems", "./assets/James.png");
            

            this.load.image("suspicion", "./assets/suspicious.png");

       //     this.load.image("lvl3", "./assets/lvl3.png");
            this.load.spritesheet("siren","./assets/alarm.png",32,32);
           this.load.spritesheet("siren2","./assets/alien alarm0.png",32,32);

            this.load.image("ground", "./assets/ground.png");
            this.load.image("fbpt", "./assets/Final boss.png");
            this.load.image("heart", "./assets/Heart.png");
            this.load.image("Ship Tileset", "./assets/Tile Sets/best Tileset.png");
            this.load.image("Ship2 Tileset", "./assets/Tile Sets/ship2 tileset.png");
            this.load.image("Level 3 tileset", "./assets/Tile Sets/Level 3.png");
            this.load.image("pauseButton", "./assets/pause.png");
            this.load.image("resume", "./assets/resume.png");//tell me how you like lvl3s music
            this.load.image("reset", "./assets/main menu button.png");
            this.load.image("retry", "./assets/Retry.png");

            this.load.image("arm", "./assets/alienArm.png");

            this.load.image("Laser", "./assets/Laser.png");
            this.load.image("level1", "./assets/level1 button.png");
            this.load.image("level2", "./assets/level2 button.png");
            this.load.image("level3", "./assets/lvl3 button.png");
            this.load.image("lvlLock", "./assets/levelLocked.png");
            this.load.image("lvlSelect", "./assets/Level Select Screen.png");
            this.load.image("gameover", "./assets/gamover.png");
            this.load.spritesheet("sensor", "./assets/Security Laser2.png",32,32);

            this.load.image("instruct", "./assets/instruct.png");
            this.load.image("instructions", "./assets/instruct1.png");
            this.load.image("instructions_paused", "./assets/pauseinstructions.png");
            this.load.image("play", "./assets/play button.png");
            this.load.spritesheet("cryopod", "./assets/cryopod.png", 25, 80); 

            this.load.spritesheet("drone", "./assets/drone.png", 47.875, 36); 
//            this.load.spritesheet("drone", "./assets/DroneFinal.png", 24, 18);
            this.load.spritesheet("levelEnd", "./assets/AlienTeleporter.png", 34, 66);
//            this.load.spritesheet("obot", "./assets/TankDroneThing2.png", 40, 61);
            this.load.audio("first", "./assets/sound/first.mp3");
            this.load.audio("second", "./assets/sound/OLIVER's song.mp3");
            this.load.audio("1", "./assets/sound/TheLevel1.mp3");
            this.load.audio("third", "./assets/sound/lel3.mp3");

            this.load.audio("alarm", "./assets/sound/alarm1.mp3");
            this.load.audio("blast", "./assets/sound/blast.mp3");
            this.load.audio("deactivate", "./assets/sound/deactivate.mp3");
            
            this.load.audio("elSound", "./assets/sound/elevator sound.mp3");
            this.load.tilemap('map', 'assets/Tile maps/TheHumanShip.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map2', 'assets/Tile maps/alienShip.json', null, Phaser.Tilemap.TILED_JSON);// 
            this.load.tilemap('map3', 'assets/Tile maps/TheToBase.json', null, Phaser.Tilemap.TILED_JSON);// not level 1 ill look at the error
        }
// in the assets
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
        image:Phaser.Image;
        
        create(){
            var bg = this.game.add.sprite(0, 0, "title");
        //    bg.scale.x=2;
        //    bg.scale.y=2;
            this.play = this.game.add.button(this.game.world.centerX, 225, "play");
            this.play.x = this.game.world.centerX - this.play.width / 2;
            this.play.onInputDown.add(this.playPress, this);
            this.instructions = this.game.add.button(this.game.world.centerX, 350, "instruct");
            this.instructions.x = this.game.world.centerX - this.instructions.width / 2;
            this.instructions.onInputDown.add(this.instruct, this);
            this.bgMusic=this.game.add.audio("first", 0.6, true);
            this.bgMusic.play();  
        }//it will be overrun by aliens and robots
        playPress(){
            this.bgMusic.stop();

            this.game.state.start("select", true, false);
        }instruct(){
            this.image = this.game.add.image(0, 0, "instructions");
            this.image.inputEnabled = true;
            this.image.events.onInputDown.add(() => this.image.destroy(), this);
        }
    }
    export class LevelSelect extends Phaser.State {
        lvl1:Phaser.Button;
        lvl2:any;
        lvl3:any;
        levelLock2:any;
        levelLock3:any;
        reset:Phaser.Button;
        
        create() {
            var bg = this.game.add.sprite(0, 0, "lvlSelect");
            if (!parseInt(localStorage.getItem("clearedLevel"))) {
                localStorage.setItem("clearedLevel", "0");
            }
            
            this.reset = this.game.add.button(this.game.world.centerX,445, "reset");
            this.reset.x -= this.reset.width;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.reset.onInputDown.add(this.rset, this);
            
            this.lvl1 = this.game.add.button(this.game.world.centerX - 210, 175, "level1");
            this.lvl1.x = this.game.world.centerX - 210 - this.lvl1.width;
            this.lvl1.scale.x = 2; // cool. There should be a sound effect, tho. I'll try to make one. Emphasis on try.
            this.lvl1.scale.y = 2;//have you pressed z behind an alien yet? do it. lol
            this.lvl1.onInputDown.add(this.levl1, this);
            //  ok
            //dont play level3 for a while.
            this.lvl2 = this.game.add.button(this.game.world.centerX, 175, "level2");
            this.lvl2.x = this.game.world.centerX - this.lvl2.width;
            this.lvl2.scale.x = 2;
            this.lvl2.scale.y = 2;
            
            this.lvl3 = this.game.add.button(this.game.world.centerX + 210, 175, "level3");
            this.lvl3.x = this.game.world.centerX + 210 - this.lvl3.width;
            this.lvl3.scale.x = 2;
            this.lvl3.scale.y = 2;
            
            var tint = 0x777777;
            
            if (parseInt(localStorage.getItem("clearedLevel")) > 0) {
                this.lvl2.onInputDown.add(this.levl2, this);
                
                if (parseInt(localStorage.getItem("clearedLevel")) > 1) {
                    this.lvl3.onInputDown.add(this.levl3, this);
                }
                else{
                    this.lvl3.onInputDown.add(this.levlLocked, this);
                    this.lvl3.tint = tint;
                    this.levelLock3=this.game.add.image(this.lvl3.x, this.lvl3.y, "lvlLock");
                    this.levelLock3.scale.x = 2;
                    this.levelLock3.scale.y = 2;
                }
            }
            else{
                this.lvl2.onInputDown.add(this.levlLocked, this);
                this.lvl2.tint = tint;
                this.levelLock2=this.game.add.image(this.lvl2.x, this.lvl2.y, "lvlLock");
                this.levelLock2.scale.x = 2;
                this.levelLock2.scale.y = 2;
                this.lvl3.onInputDown.add(this.levlLocked, this);
                this.lvl3.tint = tint;
                this.levelLock3=this.game.add.image(this.lvl3.x, this.lvl3.y, "lvlLock");
                this.levelLock3.scale.x = 2;//tyler it was unable to decode your audio data...
                this.levelLock3.scale.y = 2;
            }
        }
        
        rset() {
            this.game.state.start("titleScreen", true, false);
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
        
        levlLocked() {
            
        }
    }
    
    export class PlayerDeath extends Phaser.State {
        reset:Phaser.Button;
        text:any;
        timer:any;
        
        create() {
                var bg = this.game.add.sprite(0, 0, "gameover");

                this.reset = this.game.add.button(this.game.world.centerX,445, "reset");
                //this.reset.x = this.game.world.centerX - this.reset.width;
                this.reset.scale.x = 2;
                this.reset.scale.y = 2;
                this.reset.onInputDown.add(this.rset, this);
                //this.reset.alpha = 0;
                
                // the "game over"?
                //it needs to fade out or something.
                //this.game.add.tween(this.reset).to({alpha:1}, 2000, "Linear", true, 2000);
        }
        
        rset() {
            this.game.state.start("titleScreen", true, false);
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
        
        levlLocked() {
            
        }
    }
}