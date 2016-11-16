namespace TSAGame {
    
    export class Player extends Phaser.Sprite {

        checkpointX:number;
        checkpointY:number;
        playerScale:number;
        jumpV:number;
        
        hitPlatform:boolean;
        
        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'Ethan', 0);

            this.anchor.setTo(0.5, 0);

      //      this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
    
            game.add.existing(this);

            game.physics.arcade.enable(this);

            this.body.bounce.y = 0.1;
            this.body.gravity.y = 450;
            this.body.collideWorldBounds = true;
            this.playerScale = 1;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
            this.hitPlatform=true;
            this.jumpV=275;
            this.animations.add('walk',[1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17], 14);
           // this.width = 48;
            //this.height = 96;
            this.body.offset = new Phaser.Point(8.75,0);
            console.log("player "+this.left+" body "+this.body.x);
            this.body.width *= 0.4;
        }

        public update() {

            this.body.velocity.x = 0;
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)||this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {

                this.body.velocity.x = -165;
                this.animations.play('walk');

                if (this.scale.x == this.playerScale) {
                    this.scale.x = -this.playerScale;
                }
            }
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)||this.game.input.keyboard.isDown(Phaser.Keyboard.D)){

                this.body.velocity.x += 165;
                this.animations.play('walk');

                if (this.scale.x == -this.playerScale) {
                    this.scale.x = this.playerScale;
                }
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)||this.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.animations.frame =0;
            }
            else if(!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)||this.game.input.keyboard.isDown(Phaser.Keyboard.A))){
                this.animations.frame = 0;
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP)||this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down||this.body.touching.down) )
            {
                this.body.velocity.y = -this.jumpV;
            }
            //this.game.debug.body(this);
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.R)){
                this.body.gravity.y+=5;
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.F)){
                this.body.gravity.y-=5;
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.T)){
                this.jumpV+=5;    
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.G)){
                this.jumpV-=5;    
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
                console.log(this.jumpV);
                console.log(this.body.gravity.y);
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
                this.loadTexture("Shield",0);
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.L)){
                this.loadTexture("Ethan",0);
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)){
                this.alpha = 0.2;
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
                this.alpha=1;
            }
        //    if (false){
          //  console.log(this.body.velocity.y);
           // }
            
            if (this.body.velocity.y < 0){
            //    this.animations.stop('walk');
            }
        }

    }
    export class GameState extends Phaser.State{
        player: TSAGame.Player;
        platforms: any;
        drone: Drone;
        Obots:Obot;
        map:any;
        shipLayer:any;
        playerLine: Phaser.Line;
        boss: FBoss;
        create() {
            
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.resize(3200, 600);
            this.game.add.sprite(0, 0, 'sky');
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.boss = new FBoss(this.game);
           // this.platforms = this.game.add.group();
            //this.platforms.enableBody = true;
        
            this.drone = new Drone(this.game,200,275,300,185);
            this.drone.body.immovable= true;
            this.Obots = new Obot(this.game,550,404,660,468);
      //      var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
       //     ground.scale.setTo(8, 2);
         //   ground.body.immovable = true;
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('Ship Tileset');
            this.shipLayer = this.map.createLayer('Tile Layer 1');
       //     this.shipLayer.debug = true;
            this.map.setCollision(1);
            this.playerLine = new Phaser.Line(this.player.left,this.player.top,this.player.right,this.player.bottom);
        }
        update(){
            //this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.player, this.drone);
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
    	    this.playerLine.setTo(this.player.left,this.player.top,this.player.right,this.player.bottom);
            this.drone.updateLine(this.playerLine,this.map,this.shipLayer);
           // for(var i = 0; i < tilehits.length;i++){
            //    tilehits[i].debug=true;
            // ///   console.log(tilehits[i].worldX);
            ///}//  console.log(tilehits.length);
            //this.player.update();
        }
    }
}