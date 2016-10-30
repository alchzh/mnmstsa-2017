namespace TSAGame {
    
    export class Player extends Phaser.Sprite {

        checkpointX:number;
        checkpointY:number;
        playerScale:number;
        
        hitPlatform:boolean;
        
        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'Ethan', 0);

            this.anchor.setTo(0.5, 0);

            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
    
            game.add.existing(this);

            game.physics.arcade.enable(this);

            this.body.bounce.y = 0.1;
            this.body.gravity.y = 275;
            this.body.collideWorldBounds = true;
            this.playerScale = 1;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
           // this.width = 48;
            //this.height = 96;
        }

        public update() {

            
            this.body.velocity.x = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)||this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {

                this.body.velocity.x = -170;
                this.animations.play('walk');

                if (this.scale.x == this.playerScale) {
                    this.scale.x = -this.playerScale;
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)||this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                
                this.body.velocity.x += 170;
                this.animations.play('walk');

                if (this.scale.x == -this.playerScale) {
                    this.scale.x = this.playerScale;
                }
            }
            else {
                this.animations.frame = 0;
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP)||this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && this.body.touching.down/* && this.hitPlatform*/)
            {
                this.body.velocity.y = -250;
            }


        }

    }
    export class GameState extends Phaser.State{
        player: TSAGame.Player;
        platforms: any;
        drone: Drone;
        Obots:Obot;
        preload() {
            
        }

        create() {
            
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.resize(3200, 600);
            this.game.add.sprite(0, 0, 'sky');
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            
            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;
        
            this.drone = new Drone(this.game,400,375,500,185);
            this.drone.body.immovable= true;
            this.Obots = new Obot(this.game,550,404,660,468);
            var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
            ground.scale.setTo(8, 2);
            ground.body.immovable = true;
    
        }
        update(){
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.player, this.drone);
            this.game.physics.arcade.collide(this.Obots, this.platforms);

            //this.player.update();
        }
    }

}