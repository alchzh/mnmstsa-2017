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
            
        }update(){
           // this.game.debug.body(this);
            if(this.game.physics.arcade.collide(this.layer, this)){
                this.kill(); 
                this.body.enable=false;
                this.exists=false;
                this.autoCull =false;

            }
            else if(this.game.physics.arcade.collide(this.player, this)){
                console.log("KILL");
                this.player.health-=50;
            }
            if(this.alive==false)this.exists=false;
        }
        addIn(x:number,y:number){
            this.reset(x, y);
                        
            this.game.add.existing(this);
            this.game.physics.arcade.enable(this);
            this.autoCull =true;
            
            this.body.velocity.y=650;
    
        }
    }
}