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
    export class FBoss extends Phaser.Sprite{
        constructor(game:Phaser.Game){
            super(game,50,500,'fbpt',0);
            
            
        }
        
    }
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
            
            this.rate = 6000;
			game.add.existing(this);
			this.globalTime = game.time.create(false);this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
			this.globalTime.start(0);
			this.direction = -1;
			this.originX=this.x;//hello
			this.scale.x=2;
			this.scale.y=2;
			this.x2=x2;
		//	this.globalTime.start();
			//console.log(this.time);
			this.animations.add('move',[0,1,2,3,4,5,6,7],10,true);
			this.animations.add('moveBack',[8,9,10,8,9,10,0],5);
			this.animations.add('moveForward',[11,12,13,11,12,13,0],5);
    	}
    	update(){
    	    if(this.animations.frame<8)this.animations.play('move');
    	    var time = this.previousTime -this.globalTime.seconds;
            this.body.velocity.x = 0;
    	 if(this.direction==-1){
    	    if(this.animations.frame<8){
    	        this.scale.x = 2;
    	        this.body.velocity.x = this.rate*-time;
    	    }
    	    if(this.x>=this.x2){
    	        this.animations.stop();
    	        this.animations.play('moveForward');
    	        this.direction=1;
    	    }
    	        
    	 }else if(this.direction==1){
    	     if(this.animations.frame<8){
    	        this.scale.x=-2;
    	        this.body.velocity.x = this.rate*time;
    	         
    	     }
    	     if(this.x<=this.originX){
    	        this.animations.stop();
    	        this.animations.play('moveBack');
    	        this.direction=-1;
    	    }
    	 }

    	    this.previousTime = this.globalTime.seconds;
    	
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
        laser:Phaser.Line;
        laserEnd:number;
        
    	constructor(game:Phaser.Game,x:number,y:number,x2:number,y2:number){
    		super(game,x,y,'drone',0);
    		this.anchor.setTo(0.5,0);
            this.game.physics.arcade.enableBody(this);

            
            this.rate = 3000;
			game.add.existing(this);
			this.globalTime = game.time.create(false);this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
			this.globalTime.start(0);
			this.direction = -1;
			this.originX=this.x;
			this.scale.x=-2;
			this.scale.y=2;
			this.x2 = x2;
			this.laserEnd=3200;
		//	this.globalTime.start();
			//console.log(this.time);
			this.animations.add('turn',[1,2,3,4,5,6,7,0],7.5,false);
		//	this.animations.add('turn',[9,10,11,12,13,14,15,16,17])
			this.laser = new Phaser.Line(0,275,200,275);

    	}
    	updateLine(playerLine:Phaser.Line,map:Phaser.Tilemap,layer:any){
            
            if(this.direction==-1){
                this.laser.setTo(this.left,this.y+15,3200,this.y+15);
                var tilehits = layer.getRayCastTiles(this.laser, 4, false, false);
                var realTile = -1;
                for(var i=0;i<tilehits.length;i++){
                    if(tilehits[i].index!=-1&&realTile==-1) realTile = i;
                }
            
                if(tilehits.length>1)this.laserEnd= tilehits[realTile].worldX;
                console.log(tilehits[realTile].index);
                this.laser.setTo(this.left,this.y+15,this.laserEnd,this.y+15);
            }
    	    else if(this.direction==1){
    	        this.laser.setTo(this.left,this.y+15,0,this.y+15);
                var tilehits = layer.getRayCastTiles(this.laser, 4, false, false);
                var realTile = -1;
                for(var i=0;i<tilehits.length;i++){
                    if(tilehits[tilehits.length-1-i].index!=-1&&realTile==-1) realTile = tilehits.length-1-i;
                }
            
                if(tilehits.length>1)this.laserEnd= tilehits[realTile].worldX+32;
                console.log(realTile);
                this.laser.setTo(this.left,this.y+15,this.laserEnd,this.y+15);
    	    }
//            this.laserEnd= tilehits[0].worldX;
            if(this.animations.frame==0){
                this.game.debug.geom(this.laser, "rgb(255,0,0)");
                var point = playerLine.intersects(this.laser,true);
                if(point!=null){
                    this.animations.frame=9;
                }
            }
        }
    	update(){
    	 // this.globalTime.update();
    //	    if (this.inCamera){
    //	        this.laser = new Phaser.Line(0,275,200,275);
    //	        this.laser.setTo(-1,-1,-1,-1);
    //	        this.game.debug.geom(this.laser, "rgb(0,0,0)");
    //	    }
    	//    else{
    	  //      this.laser = new Phaser.Line(0,0,0,0);
    	//      }
    	    var time = this.previousTime -this.globalTime.seconds;
            this.body.velocity.x = 0;
    	 if(this.direction==-1){
    	    this.scale.x = -2;
    	    if(this.animations.frame==0){
    	        this.body.velocity.x = this.rate*-time;
    	    }else{
    	        this.laser = new Phaser.Line(0,0,0,0);
                this.game.debug.geom(this.laser, "rgb(255,0,0)");

    	    }
    	    if(this.x>=this.x2){
    
    	        this.animations.play('turn');
    	        this.direction=1;
    	    }
    	        
    	 }else if(this.direction==1){
    	     this.scale.x=2;
    	     if(this.animations.frame==0){
    	        this.laser.setTo(this.left,this.y+15,0,this.y+15);

    	        this.body.velocity.x = this.rate*time;
    	     }else{
    	        this.laser = new Phaser.Line(0,0,0,0);
    	        this.game.debug.geom(this.laser, "rgb(255,0,0)");

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