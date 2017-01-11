namespace TSAGame {
    
    export class bullet extends Phaser.Sprite {
        
    }
    
    export class Blast extends Phaser.Sprite {
        player:Player;
        layer:any;
        
        constructor(game:Phaser.Game,type:number,rotation:number,layer:any){
            super(game,0,0,"blast");
            this.anchor.setTo(0.5,0);

            this.frame=type;
            this.rotation=rotation;
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.exists = false;
            this.layer=layer;
            this.alive=false;
            this.animations.add("p",[0,1,2,3,4,5,6,7],30);
            this.animations.play("p");
            this.scale.x = 0.5;
            this.scale.y = 0.5;
     //       this.outOfCameraBoundsKill =true;
            
        }
        
        update(){
           // this.game.debug.body(this);
            if(this.game.physics.arcade.collide(this.layer, this)){
                console.log("was?");
                this.kill(); 
            }
       //     else if(this.game.physics.arcade.collide(this, this.player)){
        //        console.log("KILL");
         //       this.player.health-=50;
          //  }
        }
        update2(player:Phaser.Sprite){
            // console.log("hi");
       //     if(this.game.physics.arcade.collide(player, this)){
        //        console.log("KILL");
         //       player.health-=50;
          //  }
        }
        addIn(x:number,y:number,xVelMultiplier:number,yVelMultiplier:number,rotation:number){
            this.reset(x, y);
                        
            this.game.physics.arcade.enable(this);
            this.autoCull =true;
            console.log(x, y);
            this.rotation=rotation*Math.PI/2+1.57;
            this.body.velocity.y=650*yVelMultiplier;
            this.body.velocity.x=550*xVelMultiplier;

        }
    }
}