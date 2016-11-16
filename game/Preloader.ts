namespace TSAGame {
    export class Preloader extends Phaser.State {


        preloadBar: Phaser.Sprite;
        
        preload(){
            this.preloadBar = this.game.add.sprite(200, 250, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);

            // this.load.image('titlepage', './assets/titlepage.jpg');
            this.load.image("logo", "./assets/logo.gif");
            this.load.spritesheet("Ethan","./assets/EthanWak.png",40,62);
            this.load.spritesheet("Shield","./assets/EthanShield.png",40,62);
            this.load.spritesheet("TankDroneThing2","./assets/TankDroneThing2.png",40,61);
            this.load.image("sky","./assets/space.png");
            this.load.image("ground","./assets/ground.png");
            this.load.image("fbpt","./assets/Final boss.png")
            this.load.image("Ship Tileset","./assets/Tile Sets/Ship Tileset.png");
            this.load.spritesheet("drone","./assets/DroneFinal.png",24,18);
            this.load.spritesheet("obot","./assets/Obot3.png",12,24);
            //this.load.spritesheet("obot","./assets/TankDroneThing2.png",40,61);
            this.load.audio("first","./assets/Music/OLIVER's song.mp3");
            this.load.tilemap('map', 'assets/Tile maps/ship.json', null, Phaser.Tilemap.TILED_JSON);

          //  this.load.image("","");
            //this.player = Player();
            // this.load.audio('music', './assets/title.mp3', true);
            // this.load.spritesheet('simon', './assets/simon.png', 58, 96, 5);
            // this.load.image('level1', './assets/level1.png');
        }

       create() {
            var fx = this.game.add.audio('first',0.6,true);
            fx.play();
            this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000,
                Phaser.Easing.Linear.None, true).onComplete.add(
                    () => this.game.state.start("PlayerState", true, false)
                );
                
        }
        update(){
            
            //console.log("updating now");
        }
    }
}