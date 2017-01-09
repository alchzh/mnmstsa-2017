namespace TSAGame {
    export class Player extends Phaser.Sprite {
        checkpointX:number;
        checkpointY:number;
        playerScale:number;
        jumpV:number;
        shield:boolean;
        invis:boolean;
        prevShield:boolean;
        hitPlatform:boolean;
        
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "ethan", 0);
            console.log("Added ");
            game.add.existing(this);
            game.physics.arcade.enable(this);
//            game.time.desiredFps = 30;
            this.health = 200;
            this.anchor.setTo(0.5, 0);
            this.body.gravity.y = 450;
            this.body.collideWorldBounds = true;
            this.body.mass=2;
            this.playerScale = 1;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
            this.hitPlatform = true;
            this.jumpV = 250;
            this.animations.add("walk", [4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17], 14);
//            this.width = 48;
//            this.height = 96;
            this.body.offset = new Phaser.Point(8.75, 0);
            this.body.width *= 0.4;
            this.shield = false;
            this.invis = false;
            this.prevShield = false;
        }

        public update() {
            if(this.health<0.01){
                this.game.state.start("select");
            }
            let dTime=0.0;
            if(this.game.time.fps>2){
                dTime = 60/this.game.time.fps;
            }else{
                dTime=1;
            }
//            this.animations.play("walk");
            
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = -165*dTime;
                this.animations.play("walk");

                if (this.scale.x == this.playerScale) {
                    this.scale.x = -this.playerScale;
                }
            }
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {

                this.body.velocity.x += 165*dTime;
                this.animations.play("walk");

                if (this.scale.x == -this.playerScale) {
                    this.scale.x = this.playerScale;
                }
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                    this.animations.frame =0;
                }
            }else if(!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))){
                this.animations.frame=0;
            }
            else if(!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
               this.animations.frame = 0;
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down || this.body.touching.down)) {
                this.body.velocity.y = -this.jumpV;
            }

            if(this.body.velocity.y >=.9||this.body.velocity.y <=-.9) {               
                this.animations.stop(null, true);
                if (this.body.velocity.x != 0)
                {this.animations.frame = 3;}
                else{this.animations.frame = 0;}
            }//else if (this.body.velocity.y <=-.9)
            //{
            //  
             //   this.animations.stop(null, true);
            ///    if (this.body.velocity.x != 0)
              //  {this.animations.frame = 2;}
            //    else{this.animations.frame = 1;}
            //}
            
//            this.game.debug.body(this);
            let debug=true;
            
            if(debug){
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
            }
            if(this.shield!=this.prevShield){
                if(this.shield){
                    this.loadTexture("shield",0);
                }else{
                    this.loadTexture("ethan",0);
                }    
            }if(this.invis){
                this.tint= 0x666666;
                this.alpha = 0.2;
            }else{
                this.alpha=1;
                this.tint=0xFFFFFF;
            }//if(this.game.input.keyboard.isDown(Phaser.Keyboard.N)){
             //   this.game.paused = true;
        //    }
            this.prevShield=this.shield;
        }
  //      hit(){
            
   //     }
    }
}