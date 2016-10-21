namespace TSAGame {
    /*export class Enemy extends Phaser.Sprite {
        
        constructor(game: Phaser.Game, x: number, y: number,name:string) {
            super(game, x,y,name,0);
            this.anchor.setTo(0.5,0);
            this.game.physics.arcade.enableBody(this);

			game.add.existing(this);

        }
        update() 
        {
		}
    }*/
    export class Obot extends Phaser.Sprite{       
        rate:number;
        globalTime:Phaser.Timer;
        previousTime:number;
        x2:number;
        y2:number;
        originX:number;
        direction:number;
    
    	constructor(game:Phaser.Game,x:number,y:number,x2:number,y2:number){
    		super(game,x,y,'obot',0);
    		this.anchor.setTo(0.5,0);
            this.game.physics.arcade.enableBody(this);
            this.body.gravity.y = 200;
            
            this.rate = 1000;
			game.add.existing(this);
			this.globalTime = game.time.create(false);this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
			this.globalTime.start(0);
			this.direction = -1;
			this.originX=this.x;//hello
			this.scale.x=2;
			this.scale.y=2;
		//	this.globalTime.start();
			//console.log(this.time);
			this.animations.add('move',[0,1,2,3,4,5,6,7],10,true);
    	}
    	update(){
    	    this.body.velocity.x = 80;
    	    this.animations.play('move');
    	}
        
    }
    export class Drone extends Phaser.Sprite{       
        rate:number;
        globalTime:Phaser.Timer;
        previousTime:number;
        direction:number;
        x2:number;
        y2:number;
        originX:number;

    	constructor(game:Phaser.Game,x:number,y:number,x2:number,y2:number){
    		super(game,x,y,'drone',0);
    		this.anchor.setTo(0.5,0);
            this.game.physics.arcade.enableBody(this);

            
            this.rate = 2000;
			game.add.existing(this);
			this.globalTime = game.time.create(false);this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
			this.globalTime.start(0);
			this.direction = -1;
			this.originX=this.x;
			this.scale.x=-2;
			this.scale.y=2;
			this.x2 = x2;
		//	this.globalTime.start();
			//console.log(this.time);
			this.animations.add('turn',[0,1,2,3,4,5,6,7,0],7.5,false);
    	}
    	update(){
    	 // this.globalTime.update();
    	    var time = this.previousTime -this.globalTime.seconds;
            this.body.velocity.x = 0;
    	 if(this.direction==-1){
    	    this.scale.x = -2;
    	    if(this.animations.frame==0){
    	        this.body.velocity.x = this.rate*-time;
    	    }
    	    console.log(this.x2);
    	    if(this.x>=this.x2){
    	        console.log("hallo");
    	        this.animations.play('turn');
    	        this.direction=1;
    	    }
    	        
    	 }else if(this.direction==1){
    	     this.scale.x=2;
    	     if(this.animations.frame==0){
    	        this.body.velocity.x = this.rate*time;
    	     }
    	     if(this.x<=this.originX){
    	        this.animations.play('turn');
    	        this.direction=-1;
    	    }
    	 }

    	    this.previousTime = this.globalTime.seconds;
    	}
    
    }
    function uselessfunction(){}
}