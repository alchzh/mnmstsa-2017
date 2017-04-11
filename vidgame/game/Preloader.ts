namespace TSAGame {
    export var levelOn=0;
    export var firstselect = false;
    
    
    export class Preloader extends Phaser.State {
    preloadBar: Phaser.Sprite;
        preload() {
            
            var bgg = this.game.add.sprite(148,  250, "preloadBarBg");
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            this.preloadBar = this.game.add.sprite(148,  250, "preloadBar");
                    
            this.load.setPreloadSprite(this.preloadBar);
            this.load.spritesheet("ethan", "./assets/Ethan.png", 35, 62);
            this.load.spritesheet("shield", "./assets/EthanShield.png", 40, 62);
            this.load.spritesheet("grab", "./assets/The Meliks Ledge Grab.png", 27, 60);

            this.load.spritesheet("tbot", "./assets/NTbot.png", 40, 61);
            this.load.spritesheet("tbot2", "./assets/RTbot.png", 40, 61);
            this.load.spritesheet("alien", "./assets/Real Alien8.png", 37, 64);
            this.load.spritesheet("alien2", "./assets/Scientist dude.png", 37, 64);
            this.load.spritesheet("alien2v2", "./assets/Scientist Alien Teleport.png", 45, 64);

            this.load.spritesheet("obot", "./assets/Obot Right1.png", 36, 48);
            this.load.spritesheet("obot23", "./assets/Obot Left (1).png", 36, 48);

            this.load.spritesheet("alienElevator", "./assets/alivator.png", 66, 58);
            this.load.spritesheet("elevator", "./assets/HumanElevator.png", 66, 58);
            this.load.spritesheet("button1", "./assets/InvisibleGUI.png", 40, 40);
            this.load.spritesheet("button2", "./assets/ShieldGUI2.png", 40, 40);
            this.load.spritesheet("cooldown", "./assets/cooldown bar.png", 40, 40);
            this.load.spritesheet("blast", "./assets/State Blast (2).png", 46, 44);
            this.load.spritesheet("cannonBase", "./assets/cannonn for states.png", 32, 62);
            this.load.spritesheet("elevatorCallBack", "./assets/elevamatorButton.png", 16, 16);
            this.load.spritesheet("alienElevatorCallBack", "./assets/alienCallBack.png", 16, 16);
            this.load.image("fire", "./assets/blastf.png");
            this.load.image("lightning bolt", "./assets/Lightning attack 8.png");
            this.load.image("arrow", "./assets/Arrow-.png");
            this.load.image("blast2", "./assets/blast34.png");
            this.load.image("sciStar", "./assets/ScienceStar.png");
            this.load.image("cutscene-a","./assets/cutcece.png");
            this.load.image("cutscenez","./assets/Cutscene Icon-1.png");
            this.load.image("cutscene-b","./assets/cutscennenecnene2.png");
            this.load.image("cutscene-c","./assets/Cutscenen3.png");
           this.load.image("cutscene-d","./assets/Cutscene4 (1).png");
            this.load.image("cutscene-e","./assets/cutscene5.png");
            this.load.image("cutscene-f","./assets/cutscene6 (1).png");
            this.load.image("bigAlienElevator", "./assets/LargeElevator.png");
            this.load.image("sky", "./assets/lev1bg.png");
            this.load.image("lvl2", "./assets/levl2bg.png");
            this.load.image("lvl3", "./assets/the final background for level3.png");
            this.load.image("factoryBG","./assets/hello-1.png")
            this.load.image("lasting", "./assets/last.png");
            this.load.image("title", "./assets/titleScreen.png");
            this.load.image("wull", "./assets/will saved.png");
            this.load.image("jayant", "./assets/Jeanette Saved.png");
            this.load.image("jaems", "./assets/James.png");
            this.load.image("talky box", "./assets/the talky box.png");
            
            this.load.image("ehead", "./assets/EthanHead.png");
            this.load.image("sciHead", "./assets/sciHead.png");
            this.load.image("whead", "./assets/Wills Head.png");
            this.load.image("?hed", "./assets/unknownHead.png");
            this.load.image("jhead", "./assets/Jhead.png");

            this.load.image("suspicion", "./assets/alerted-1.png");
    
       //     this.load.image("lvl3", "./assets/lvl3.png");
            this.load.spritesheet("siren","./assets/alarm.png",32,32);
           this.load.spritesheet("siren2","./assets/alien alarm0.png",32,32);

            this.load.image("ground", "./assets/ground.png");
            this.load.image("fbpt", "./assets/Final boss.png");
            this.load.image("heart", "./assets/Heart.png");
            this.load.image("energy", "./assets/energy.png");
            this.load.image("?button", "./assets/mystery button.png");
            this.load.image("Ship Tileset", "./assets/Tile Sets/coolest most bestest tileset.png");
            this.load.image("Ship2 Tileset", "./assets/Tile Sets/State level2.png");
            this.load.image("Level 3 tileset", "./assets/Tile Sets/worst tileset.png");
            this.load.image("pauseButton", "./assets/pause.png");
            this.load.image("resume", "./assets/resume.png");
            this.load.image("reset", "./assets/main menu button.png");
            this.load.image("skip", "./assets/s kip.png");
            this.load.image("retry", "./assets/Retry.png");
            this.load.image("retry2", "./assets/retryNum2.png");

            this.load.image("arm", "./assets/alienArm.png");
            this.load.image("lights", "./assets/Glowy2.png");

            this.load.image("Laser", "./assets/Laser.png");
            this.load.image("xxx", "./assets/xxx.png");
            this.load.spritesheet("level1", "./assets/level1 states.png",80,100);
            this.load.spritesheet("level2", "./assets/level2 states.png",80,100);
            this.load.spritesheet("level3", "./assets/Lvl3Butt.png",80,100);
            this.load.image("lvlLock", "./assets/levelLocked1.png");
            this.load.image("lvlSelect", "./assets/Level Select Screen.png");
            this.load.image("gameover", "./assets/gamover (1).png");
            this.load.spritesheet("sensor", "./assets/Security Laser2.png",32,32);
            this.load.spritesheet("hidden sensor", "./assets/hidden sensor3.png",32,32);
            this.load.spritesheet("door", "./assets/door.png",32,64);

            this.load.image("done", "./assets/yayay.png");
            this.load.image("ethanCrouching", "./assets/ethancrouch.png");
            this.load.image("chain", "./assets/Chain.png");

            this.load.image("instruct", "./assets/instruct.png");
            this.load.image("instructions", "./assets/instruct1.png");
            this.load.image("instructions_paused", "./assets/pauseinstructions.png");
            this.load.image("play", "./assets/play button.png");
            this.load.image("zee", "./assets/Z (1).png");
            this.load.spritesheet("cryopod", "./assets/cryopod.png", 25, 80);
            this.load.spritesheet("duckbot", "./assets/Duckbot.png", 62, 56);

            this.load.spritesheet("drone", "./assets/drone.png", 48, 36);
            this.load.spritesheet("drone2", "./assets/drone clone.png", 48, 36);
            this.load.spritesheet("levelEnd", "./assets/AlienTeleporter.png", 34, 66);
            this.load.audio("first", "./assets/sound/first.mp3");
            this.load.audio("second", "./assets/sound/OLIVER's song.mp3");
            this.load.audio("1", "./assets/sound/Level 1 music (5) (1).wav");
            this.load.audio("third", "./assets/sound/fvlev3.mp3");
            this.load.audio("alarm", "./assets/sound/alarm1.mp3");
            this.load.audio("blip", "./assets/sound/Blip_Select.wav");
            this.load.audio("blast", "./assets/sound/blast.mp3");
            this.load.audio("deactivate", "./assets/sound/deactivate.mp3");
            this.load.audio("shock", "./assets/sound/zpa.wav");
            this.load.audio("cannon", "./assets/sound/cannon.mp3");
            this.load.audio("talknext", "./assets/sound/next.mp3");

            this.load.audio("elSound", "./assets/sound/elevator sound.mp3");
            this.load.tilemap('map', 'assets/Tile maps/Nova90.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map2', 'assets/Tile maps/4-6-17 Level2.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map3', 'assets/Tile maps/ActualAlienBase.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('facility', 'assets/Tile maps/Facility.json', null, Phaser.Tilemap.TILED_JSON);

        }

        create() {
            
            this.add.tween(this.preloadBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(() => this.game.state.start("titleScreen", true, false));

        }
        

    }
    export class titleScreen extends Phaser.State {
        play:any;
        instructions:Phaser.Button;
        bgMusic:any;
        image:Phaser.Image;
        
        create(){
            var bg = this.game.add.sprite(0, 0, "title");
        //    bg.scale.x=2;
        //    bg.scale.y=2;
            if (!parseInt(localStorage.getItem("cutscene"))) {
                localStorage.setItem("cutscene", "0");
            }

            var cutscenez = this.game.add.button(690, 500, "cutscenez");
            cutscenez.scale.x=2;
            cutscenez.scale.y=2;
            cutscenez.onInputDown.add(this.watch, this);
            this.play = this.game.add.button(bg.width / 2, 225, "play");
            this.play.x = bg.width / 2 - this.play.width / 2;
            this.play.onInputDown.add(this.playPress, this);
            this.instructions = this.game.add.button(bg.width / 2, 350, "instruct");
            this.instructions.x = bg.width / 2 - this.instructions.width / 2;
            this.instructions.onInputDown.add(this.instruct, this);
            this.bgMusic=this.game.add.audio("first", 0.6, true);
            this.bgMusic.play();
        }
        playPress(){
            this.game.sound.stopAll();
            if(parseInt(localStorage.getItem("cutscene")) > 0){
                this.game.state.start("levelSelect", true, false);
            }
            else{
                localStorage.setItem("cutscene", "1");
                this.game.state.start("intro", true, false);
            }
        }instruct(){
            this.image = this.game.add.image(0, 0, "instructions");
            this.image.inputEnabled = true;
            this.image.events.onInputDown.add(() => this.image.destroy(), this);
        }watch(){
            this.game.sound.stopAll();
            this.game.state.start("intro", true, false);
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

            this.reset = this.game.add.button(bg.width / 2, 445, "reset");
            this.reset.x = bg.width / 2 - this.reset.width;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.reset.onInputDown.add(this.rset, this);

            this.lvl1 = this.game.add.button(bg.width / 2 - 210, 175, "level1");
            this.lvl1.x = bg.width / 2 - 210 - this.lvl1.width;
            this.lvl1.scale.x = 2;
            this.lvl1.scale.y = 2;
            this.lvl1.onInputDown.add(this.levl1, this);
            this.lvl1.animations.add("anim",[0,1,2,3,4,5],12,true);
            this.lvl1.animations.play("anim");
            
            this.lvl2 = this.game.add.button(bg.width / 2, 175, "level2");
            this.lvl2.x = bg.width / 2 - this.lvl2.width;
            this.lvl2.scale.x = 2;
            this.lvl2.scale.y = 2;
            this.lvl2.animations.add("anim",[0,1,2,3,4,5],12,true);

            this.lvl3 = this.game.add.button(bg.width / 2 + 210, 175, "level3");
            this.lvl3.x = bg.width / 2 + 210 - this.lvl3.width;
            this.lvl3.scale.x = 2;
            this.lvl3.scale.y = 2;
            this.lvl3.animations.add("anim",[0,1,2,3,4,5],12,true);
            
            var tint = 0x777777;
            
            if (parseInt(localStorage.getItem("clearedLevel")) > 0) {
                this.lvl2.onInputDown.add(this.levl2, this);
                this.lvl2.animations.play("anim");

                if (parseInt(localStorage.getItem("clearedLevel")) > 1) {
                    this.lvl3.onInputDown.add(this.levl3, this);
                    this.lvl3.animations.play("anim");
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
                this.levelLock3.scale.x = 2;
                this.levelLock3.scale.y = 2;
            }
        }
        
        rset() {
            this.game.sound.stopAll();
            this.game.state.start("titleScreen", true, false);
        }
        
        levl1() {
            this.game.sound.stopAll();
            if (parseInt(localStorage.getItem("clearedLevel")) == 0) {
                this.game.state.start("intro", true, false);
            }
            else{
                this.game.state.start("level1", true, false);
            }
            levelOn = 1;
        }
        
        levl2(){
            this.game.sound.stopAll();
            this.game.state.start("level2", true, false);
            levelOn = 2;
        }
        
        levl3(){
            this.game.sound.stopAll();
            this.game.state.start("level3", true, false);
            levelOn = 3;
        }
        
        levlLocked() {
            
        }
        pauseUpdate(){
            this.game.paused=false;
        }
    }
    
    export class cutScenes extends Phaser.State{
        img1:any;
        img2:any;
        img3:any;
        img4:any;
        img5:any;
        img6:any;
        timer:any;
        reset:any;
        
        create(){
            this.img1 = this.game.add.sprite(0, 0, "cutscene-a");
            this.img2 = this.game.add.sprite(0, 0, "cutscene-b");
            this.img2.alpha = 0;
            this.img3 = this.game.add.sprite(0, 0, "cutscene-c");
            this.img3.alpha = 0;
            this.img4 = this.game.add.sprite(0, 0, "cutscene-d");
            this.img4.alpha = 0;
            this.img5 = this.game.add.sprite(0, 0, "cutscene-e");
            this.img5.alpha = 0;
             this.img6 = this.game.add.sprite(0, 0, "cutscene-f");
            this.img6.alpha = 0;
            this.reset = this.game.add.button(800, 600, "skip");
            this.reset.x -= this.reset.width + this.reset.height/2;
            this.reset.y -= this.reset.height * 1.5;
            this.reset.onInputDown.add(this.finish, this);
            //timerception
            this.timer = this.game.time.create(true);
            this.timer.add(Phaser.Timer.SECOND * 6, function addInput() {
                this.game.add.tween(this.img2).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                this.timer = this.game.time.create(true);
                this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                    this.game.add.tween(this.img3).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                    this.timer = this.game.time.create(true);
                    this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                            this.game.add.tween(this.img4).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                            this.timer = this.game.time.create(true);
                            this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                                this.game.add.tween(this.img5).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                                this.timer = this.game.time.create(true);
                                this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {this.game.add.tween(this.img6).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                                this.timer = this.game.time.create(true);
                                this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                                    this.img1.visible = false;
                                    this.img2.visible = false;
                                    this.img3.visible = false;
                                    this.img4.visible = false;
                                    this.img5.visible = false;
                                    this.game.add.tween(this.img6).to({alpha:0}, Phaser.Timer.SECOND, "Linear", true, 0);
                                    this.game.sound.stopAll();
                                    this.finish();
                                }, this);
                                this.timer.start();}, this);
                                this.timer.start();
                            }, this);
                            this.timer.start();
                    }, this);
                    this.timer.start();
                }, this);
                this.timer.start();
            }, this);
            this.timer.start();
        }
        finish()
        {
            this.game.state.start("level1", true, false);
        }
    }
    export class Win extends Phaser.State{
        img1:any;
        img2:any;
        img3:any;
        img4:any;
        img5:any;
        timer:any;
        reset:any;
        
        create(){
            this.img1 = this.game.add.sprite(0, 0, "gameover");
            this.img2 = this.game.add.sprite(0, 0, "sky");
            this.img2.alpha = 0;
            this.img3 = this.game.add.sprite(0, 0, "lvl2");
            this.img3.alpha = 0;
            this.img4 = this.game.add.sprite(0, 0, "lvl3");
            this.img4.alpha = 0;
            this.img5 = this.game.add.sprite(0, 0, "title");
            this.img5.alpha = 0;
            //timerception
            this.timer = this.game.time.create(true);
            this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                this.game.add.tween(this.img2).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                this.timer = this.game.time.create(true);
                this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                    this.game.add.tween(this.img3).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                    this.timer = this.game.time.create(true);
                    this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                            this.game.add.tween(this.img4).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                            this.timer = this.game.time.create(true);
                            this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                                this.game.add.tween(this.img5).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                                this.timer = this.game.time.create(true);
                                this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                                    let f=this.game.add.image(0,0,"done");
                                    f.scale.x=2;
                                    f.scale.y=2;
                                    this.reset = this.game.add.button(0, 480, "reset");
                                    this.reset.x = f.width/2 - this.reset.width;
                                    this.reset.scale.x = 2;
                                    this.reset.scale.y = 2;
                                    this.reset.tint = 0xCCCCCC;
                                    this.reset.onInputDown.add(this.rset, this);
                                }, this);
                                this.timer.start();
                            }, this);
                            this.timer.start();
                    }, this);
                    this.timer.start();
                }, this);
                this.timer.start();
            }, this);
            this.timer.start();
        }
        rset() {
            this.game.sound.stopAll();
            this.game.state.start("titleScreen", true, false);
        }
    }
   
    export class PlayerDeath extends Phaser.State {
        reset:any;
        timer:any;
        bgMusic:any;
        retry:any;
        
        create() {
                var bg = this.game.add.sprite(0, 0, "gameover");
                bg.alpha = 0;
                bg.scale.x=2;
                bg.scale.y=2;
                this.reset = this.game.add.image(bg.width / 2,485, "reset");
                this.reset.x = bg.width /2 - this.reset.width;
                this.reset.scale.x = 2;
                this.reset.scale.y = 2;
                this.reset.alpha = 0;
                this.reset.tint = 0xCCCCCC;
                this.game.add.tween(bg).to({alpha:1}, 750, "Linear", true, 0);
                this.game.add.tween(this.reset).to({alpha:0.5}, Phaser.Timer.SECOND, "Linear", true, 1000);
                this.retry = this.game.add.image(bg.width / 2,388, "retry2");
                this.retry.x = bg.width /2 - this.retry.width;
                this.retry.scale.x = 2;
                this.retry.scale.y = 2;
                this.retry.alpha = 0;
                this.retry.tint = 0xCCCCCC;
                this.game.add.tween(this.retry).to({alpha:0.5}, Phaser.Timer.SECOND, "Linear", true, 1000);
                
                
                this.timer = this.game.time.create(true);
                this.timer.add(Phaser.Timer.SECOND, function addInput() {
                        this.reset.alpha = 0;
                        this.reset = this.game.add.button(bg.width / 2, 485, "reset");
                        this.reset.x = bg.width /2 - this.reset.width;
                        this.reset.scale.x = 2;
                        this.reset.scale.y = 2;
                        this.reset.alpha = 0.5;
                        this.reset.tint = 0xCCCCCC;
                        this.reset.onInputDown.add(this.rset, this);
                        this.game.add.tween(this.reset).to({alpha:1}, Phaser.Timer.SECOND, "Linear", true, 0);
                    }, this);
                this.timer.start();
                
                this.timer = this.game.time.create(true);
                this.timer.add(Phaser.Timer.SECOND, function addInput() {
                        this.retry.alpha = 0;
                        this.retry = this.game.add.button(bg.width / 2, 388, "retry2");
                        this.retry.x = bg.width /2 - this.retry.width;
                        this.retry.scale.x = 2;
                        this.retry.scale.y = 2;
                        this.retry.alpha = 0.5;
                        this.retry.tint = 0xCCCCCC;
                        console.log(levelOn);
                        this.retry.onInputDown.add(this.resett, this);
                        this.game.add.tween(this.retry).to({alpha:0.8}, Phaser.Timer.SECOND, "Linear", true, 0);
                    }, this);
                this.timer.start();
                
                this.timer = this.game.time.create(true);
                this.timer.add(4000, function addInput() {this.game.add.tween(bg).to({alpha:0}, 3000, "Linear", true, 0);}, this);
                this.timer.start();
                
        }resett(){
            console.log(levelOn+"ho ho ho");
            if(levelOn==1){
                this.levl1();
            }else if(levelOn==2){
                this.levl2();
            }else if(levelOn==3){
                this.levl3();
            }
        }
        
        rset() {
            this.game.sound.stopAll();
            this.game.state.start("titleScreen", true, false);
        }
        levl1() {
            this.game.sound.stopAll();
            this.game.state.start("level1", true, false);
        }
        
        levl2() {
            this.game.sound.stopAll();
            this.game.state.start("level2", true, false);
        }
        
        levl3() {
            this.game.sound.stopAll();
            this.game.state.start("level3", true, false);
        }
    }
}