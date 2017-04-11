namespace TSAGame {
    
    
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
            this.animations.add("p",[0,1,2,3],8);
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
        addIn(x:number,y:number,xVelMultiplier:number,yVelMultiplier:number,rotation:number,type="blast"){
            
            this.reset(x, y);
            if(this.key!==type)this.loadTexture(type);            
            this.game.physics.arcade.enable(this);
            this.autoCull =true;
            this.angle=rotation+90;
            this.body.velocity.y=650*yVelMultiplier;
            this.body.velocity.x=550*xVelMultiplier;

        }
    }    
    export class ScienceStar extends Phaser.Sprite {
        attached:boolean;
        layer:any;
        crash:boolean;
        
        constructor(game:Phaser.Game,x:number,y:number,layer:any){
            super(game,x,y,"sciStar");
            this.attached=true;
            this.layer=layer;
            this.crash=false;
            
        }update(){
            this.crash = this.game.physics.arcade.collide(this, this.layer);
            this.alpha=1;
            if(this.crash){
                this.attached=true;
            }
            if(this.attached){
                this.alpha=0;
                this.body.gravity.y=0;
                this.body.velocity.y=0;
            }
        }launch(yvel:number,y:number,gravity:number){
            this.body.velocity.x=yvel;
            this.body.velocity.y-=20;
            this.body.gravity.y=gravity;
            this.y=y;
        }
    }

}