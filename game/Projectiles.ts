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
     //       this.outOfCameraBoundsKill =true;
            
        }
        
        update(){
           // this.game.debug.body(this);
            if(this.game.physics.arcade.overlap(this.layer, this)){
                this.kill(); 
                this.body.enable=false;
                this.exists=false;
                this.autoCull =false;
            }
       //     else if(this.game.physics.arcade.collide(this, this.player)){
        //        console.log("KILL");
         //       this.player.health-=50;
          //  }
            if(this.alive === false)this.exists=false;
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