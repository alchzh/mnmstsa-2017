namespace TSAGame {
    

    export class FBoss extends Phaser.Sprite {
        
        constructor(game:Phaser.Game) {
            super(game, 50, 500, 'fbpt', 0);
        }
    }
    export class Alien extends Phaser.Sprite{
        x2:number;
        originX:number;
        direction:number;
        laser:Phaser.Line;
        laserEnd:number;
        myLaser:Phaser.Image;
        suspicious:boolean;
        troubleShoot:number;
        failure:number;
        prevSus:number;
        layer:any;
        playerX:number;
        playerY:number;
        prevSpot:number;
        suspicion:Phaser.Image;
        disrupted:boolean;
        arm:any;
        notSeen:number;

        constructor(game:Phaser.Game,x:number,y:number,x2:number,layer:any,group:any) {
            super(game,x, y, 'alien', 0);
    		this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            this.body.gravity.y = 400;
            this.originX = x;
            this.x2 = x2;
			game.add.existing(this);
			this.direction = -1;
			this.suspicious=false;

            this.laserEnd = 3200;
            this.disrupted=false;
			this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            this.myLaser.alpha=0;
            this.layer=layer;
            this.notSeen=0;
            this.troubleShoot=0;
            this.failure=0;
            group.add(this);
            this.body.immovable=true;
			this.animations.add('move',[1,2,3,4,5,6,7,8,9,10,11,12,13], 12, true);
			this.animations.add("stop",[0,0,0,0,1],3);
			this.animations.add('disrupt',[15,16,17,18,19,20,21,22], 7);
			this.animations.add('grab',[23,24,25,26], 5);
			this.animations.add('troubleShoot',[26,26,27,26,27,26,26,27,26,27,26], 4);
            this.animations.add('triggered',[28,29,30,31,29,30,31,29,30,31,14], 7);
            this.animations.add('suspicious',[14,0], 4);
            this.suspicion=game.add.image(this.x, this.y+5,"suspicion");
            this.arm=this.addChild((game.make.image(-11, 13, 'arm')));
            this.arm.alpha=0;
            this.arm.anchor.setTo(0.29, .1);
       //     this.suspicion.alpha=0;
			//this.animations.add('alerted',[14, 15, 16, 17, 18, 19], 10, true);
	//		this.animations.add('turn',[6, 7, 8, 9, 10, 11, 12, 13], 20);
//			this.animations.add('turnBack',[13,12,11,10,9,8,7,6,0], 20);
            this.playerY=0;
            this.playerX=0;
            this.animations.play("move");

        }
        updateLine(playerLine:Phaser.Line){
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 15 ) {
                if (this.direction == -1) {
                    this.laser.setTo(this.left +8 ,this.y + 5, 3200, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[i].index != -1 && realTile == -1) {
                            realTile = i;
                        }        
                    }
                    
                    if (tilehits.length1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = 3200;
                    }
                    
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction == 1) {
        	        this.laser.setTo(this.left + 8, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1 - i;
                    }
            
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
    	        }
//                this.laserEnd = tilehits[0].worldX;
                var point = playerLine.intersects(this.laser,true);
                
                if (point != null) {
                    var dTime=0.0;
                    if(this.game.time.fps>2){
                        dTime = 60/this.game.time.fps;
                    }else{
                        dTime=1;
                    }
                    this.suspicious=true;
                    this.prevSpot+=1*dTime;
                    if(this.notSeen<50)this.notSeen=0;
                    this.animations.play('suspicious');
                }else{
                    this.prevSpot=0;
                    if(this.suspicious){
                        var dTime=0.0;
                        if(this.game.time.fps>2){
                            dTime = 60/this.game.time.fps;
                        }else{
                            dTime=1;
                        }
                        this.notSeen+=dTime;
                    }else{
                        this.notSeen=0;
                    }
                }
            }
            else {
                this.laser.setTo(0,0,0,0);
            }
        }
        
        update(){
            var dTime=0.0;
            if(this.game.time.fps>2){
                dTime = 60/this.game.time.fps;
            }else{
                dTime=1;
            }
            this.body.velocity.x=0;
            if(this.animations.frame<14&&this.animations.frame>0){
               if(!this.suspicious)this.body.velocity.x=65;
               else this.body.velocity.x=140;
            }
            
            if (this.direction == -1) {
                
                if (this.animations.frame < 14&&this.animations.currentAnim.name!="stop") {
                	this.animations.play("move",12);
                	this.scale.x = 1;

                }
                if (this.x >= this.x2&&this.frame<15) {
        	        
                    this.animations.play('stop');
                    if(this.animations.frame==1){
                        this.direction=1;
                        this.scale.x=-1;
                        this.animations.play("move",12)
                    }
                }
            }
            else if (this.direction == 1) {
                
                if (this.animations.frame < 14&&this.animations.currentAnim.name!="stop") {
                    this.animations.play("move",12);
//                    this.body.velocity.x = this.rate * time;
                    this.body.velocity.x *=-1;
                }
                
                if (this.x <= this.originX&&this.frame<15) {
                    this.animations.play('stop');
                    if(this.animations.frame==1){
                        this.direction=-1;
                        this.scale.x=1;
                        this.animations.play("move",12);

                    }
                }
            }
          //  console.log(this.animations.currentAnim ); 
            if(this.frame==22)this.animations.play("grab");
            else if(this.frame==26)this.animations.play("troubleShoot");
            else if(this.animations.currentAnim.name=="move"&&this.suspicious)this.animations.play("move",16);
            else if(this.animations.currentAnim.name=="triggered"&&this.frame==14){
                this.suspicious=true;   
                this.animations.play("move",16);
            }
            if(this.suspicious){
                this.prevSus+=1*dTime;
                this.suspicion.alpha=1;
                this.suspicion.x=this.x-5;
                this.suspicion.y=this.top-35;
            }else{
                this.suspicion.alpha=0;
                this.prevSus=0;
            }if(this.prevSus>=120){
                this.animations.play("move",12);
                this.suspicious=false;
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)&&this.playerY==this.bottom){
                if(!this.disrupted){
                    if(this.direction==-1&&this.left-this.playerX<=60){
                        this.disrupt();
                    }if(this.direction==1&&this.playerX-40-this.right<=60&&this.game.input.keyboard.isDown(Phaser.Keyboard.X)){
                        this.disrupt();
                    }
                }
            }if(this.prevSpot>=60||(this.notSeen>=50&&this.prevSpot>0)){
                this.triggered();
            }
            if(this.animations.frame>27){
                this.arm.alpha=1;
            }else{
                this.arm.alpha=0;
            }
            if(this.animations.currentAnim.name=="troubleShoot")this.troubleShoot+=1*dTime;
            else this.troubleShoot=0;
            if(this.troubleShoot>=300)this.animations.play("move");}
        disrupt(){
            this.disrupted=true;
            this.animations.play("disrupt");

        }
        triggered(){
            if(this.frame<15){
                this.animations.play("triggered");
                var y=this.playerY+(this.y+13);
                var x=this.playerX-(this.x-11);
                var z=y/x;
                this.arm.rotation=Math.atan2(y,x);
            }
        }

}    export class TBot extends Phaser.Sprite {
        x2:number;
        originX:number;
        direction:number;
        laser:Phaser.Line;
        laserEnd:number;
        prevX:number;
        stuckX:number;
        myLaser:Phaser.Image;
        layer:any;
        constructor(game:Phaser.Game,x:number,y:number,x2:number,layer:any) {
            super(game,x, y, 'tbot', 0);
    		game.add.existing(this);
            game.physics.arcade.enableBody(this);

    		this.anchor.setTo(0.5, 0);    
    		this.body.gravity.y = 400;
            
        
            this.originX = x;
            this.x2 = x2;
			this.direction = -1;
		
            this.laserEnd = 3200;
			this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            
			this.animations.add('move',[0, 1, 2, 3, 4, 5], 12, true);
			this.animations.add('alerted',[14, 15, 16, 17, 18, 19], 10, true);
			this.animations.add('turn',[6, 7, 8, 9, 10, 11, 12, 13], 20);
			this.animations.add('turnBack',[13,12,11,10,9,8,7,6,0], 20);
			this.layer=layer;
        }
        updateLine(playerLine:Phaser.Line){
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 6 ) {
                if (this.direction == -1) {
                    this.laser.setTo(this.left - 8,this.y + 5, 3200, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for  (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile == -1) {
                            realTile = i;
                        }        
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = 3200;
                    }
                    
                    this.laser.setTo(this.left - 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction == 1) {
        	        this.laser.setTo(this.left + 8, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1 - i;
                    }
            
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
    	        }
//                this.laserEnd = tilehits[0].worldX;
//                this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                var point = playerLine.intersects(this.laser,true);
                
                if (point != null) {
                    var fx = this.game.add.audio('alarm', 1, false);
                    fx.play();
                    
                    if (this.animations.frame >= 6 && this.animations.frame <= 14) this.scale.x = -this.scale.x;
                    
                    this.animations.play('alerted');
                }
            }
            else {
                this.laser.setTo(0,0,0,0);
            }
        }
        update() {
    	    this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
            	    if (this.animations.frame < 6) {
            	        this.animations.play("move");
            	        this.scale.x = -1;
                        this.body.velocity.x = 50;
            	    }
            	    if (this.x >= this.x2) {
            	        this.animations.play('turn');
            	        
            	        if (this.animations.frame == 13) {
            	            this.scale.x = 1;
            	            this.animations.play('turnBack');
            	            this.direction = 1;
            	        }
            	    }
            }
            else if (this.direction == 1) {
                if (this.animations.frame < 6) {
                    this.animations.play("move");
                    this.scale.x = 1;
                    this.body.velocity.x = -50;
                }
                if (this.x <= this.originX) {
                    this.animations.play('turn');
                    if (this.animations.frame == 13) {
                        this.scale.x = -1;
                        this.animations.play('turnBack');
                        this.direction = -1;
                    }
                }
            }
        }
    }
    
    export class Obot extends Phaser.Sprite {
        rate:number;
        globalTime:Phaser.Timer;
        previousTime:number;
        x2:number;
        originX:number;
        direction:number;
        laser:Phaser.Line;
        laserEnd:number;
        myLaser:Phaser.Image;
        prevX:number;
        stuckX:number;
        layer:any;
        
    	constructor(game:Phaser.Game,x:number,y:number,x2:number,group:Phaser.Group,layer:any) {
    		super(game,x,y,'obot',0);
    		
    		this.anchor.setTo(0.5,0);
            this.game.physics.arcade.enableBody(this);
            this.body.gravity.y = 200;
            this.rate = 6000;
           // this.immovable=true;
			game.add.existing(this);
			this.globalTime = game.time.create(false);
			this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
			this.globalTime.start(0);
			this.direction = -1;
			this.originX = this.x;
			this.x2 = x2;
			this.prevX = x;
			this.stuckX=0;
		    group.add(this);
//			this.globalTime.start();
//			console.log(this.time);
			this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
			this.animations.add('moveBack', [8, 9, 10, 11, 12, 0], 5);
			this.animations.add('moveForward', [14, 15, 16, 17, 18, 0], 5);
			this.animations.add('alert', [19], 5);
			this.laserEnd = 3200;
			this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            this.body.offset = new Phaser.Point(12, 0);
            this.body.width =12;
            this.layer=layer;

    	}
    	
    	updateLine(playerLine:Phaser.Line,map:Phaser.Tilemap) {
            console.log(this.game.time.fps);
            
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 8 && this.inCamera) {
                
                if (this.direction == -1) {
                    this.laser.setTo(this.right - 8,this.y + 5, 3200, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[i].index != -1 && realTile == -1) {
                            realTile = i;
                        }        
                    }
                    
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = 3200;
                    }
                    
                    this.laser.setTo(this.right - 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction == 1) {
        	        this.laser.setTo(this.right + 8, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1 - i;
                    }
            
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.right + 8, this.y + 5, this.laserEnd, this.y + 5);
    	        }
//                this.laserEnd = tilehits[0].worldX;
//                this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                var point = playerLine.intersects(this.laser,true);
                
                if (point != null) {
                    
                    if (this.animations.frame >= 8 && this.animations.frame != 19) this.scale.x = -this.scale.x;
                    this.animations.play("alert");
                }
            }
            else {
                this.laser.setTo(0,0,0,0);
            }
        }
        
    	update() {
    	    this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            var dTime=0.0;
            if(this.game.time.fps>2){
                dTime = 60/this.game.time.fps;
            }else{
                dTime=1;
            }
        //    if (this.inCamera) {
            
                if (this.animations.frame < 8) this.animations.play('move');
            
                var time = this.previousTime - this.globalTime.seconds;
            
                this.body.velocity.x = 0;
                
                if (this.direction == -1) {
                
            	    if (this.animations.frame < 8) {
            	        this.scale.x = 1;
//            	        this.body.velocity.x = this.rate * -time;
            	        this.body.velocity.x = 85*dTime;
//                        this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
            	    }
            	    else {
            	        this.laser.setTo(0, 0, 0, 0);
            	    }
            	    
            	    if (this.x >= this.x2||this.stuckX>150) {
            	        this.animations.stop();
            	        this.animations.play('moveForward');
            	        this.direction = 1;
            	    }
                }
            	else if (this.direction == 1) {
                    
                    if (this.animations.frame < 8) {
                        this.scale.x = -1;
//                        this.body.velocity.x = this.rate * time;
                        this.body.velocity.x = -85*dTime;
//                        this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                    }
            	    else {
                        this.laser.setTo(0, 0, 0, 0);
            	    }
            	    
            	    if (this.x <= this.originX||this.stuckX>150){
                        this.animations.stop();
            	        this.animations.play('moveBack');
            	        this.direction = -1;
            	    }
                }if(this.prevX==this.x&&this.animations.frame<8){
                    this.stuckX++;
                }else{
                    this.stuckX=0;
                }
                this.prevX = this.x;

                this.previousTime = this.globalTime.seconds;
    	    }
    //	}

    }
    
    export class Drone extends Phaser.Sprite {       
        rate:number;
        globalTime:Phaser.Timer;
        previousTime:number;
        direction:number;
        x2:number;
        originX:number;
        laser:Phaser.Line;
        laserEnd:number;
        layer:any;
        myLaser:Phaser.Image;
        
    	constructor(game:Phaser.Game,x:number,y:number,x2:number,group:Phaser.Group,layer:any) {
    		super(game, x, y, 'drone', 0);
    		
    		this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            
            this.rate = 3000;
			game.add.existing(this);
			this.globalTime = game.time.create(false);
			this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
			this.globalTime.start(0);
			this.direction = -1;
			this.originX = this.x;
			group.add(this);
	//		this.scale.x = -0.6;
	//		this.scale.y = 0.6;
			this.x2 = x2;
			this.laserEnd = 3200;
//			this.globalTime.start();
//			console.log(this.time);
			this.animations.add('turn', [1, 2, 3, 4, 5, 6, 7, 0], 7.5, false);
//			this.animations.add('turn', [9, 10, 11, 12, 13, 14, 15, 16, 17])
			this.laser = new Phaser.Line(0,this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            this.layer=layer;
    	}
    	
    	updateLine(playerLine:Phaser.Line) {
    	    
            if (this.animations.frame == 0) {
                
                if (this.direction == -1) {
                    this.laser.setTo(this.left,this.y + 15, 3200, this.y + 15);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile == -1) realTile = i;
                    }
                    
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = 3200;
                    }
                    
//                    console.log(tilehits[realTile].index);
                    this.laser.setTo(this.left,this.y + 15, this.laserEnd,this.y + 15);
                }
                else if (this.direction == 1) {
                    this.laser.setTo(this.left, this.y + 15, 0, this.y + 15);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1- i;
                    }
                    
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    
                    this.laser.setTo(this.left, this.y + 15, this.laserEnd, this.y + 15);
        	    }
                if (this.animations.frame == 0) {
//                    this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                    var point = playerLine.intersects(this.laser, true);
                    
                    if (point != null) {
                        this.animations.frame = 9;
                    }
                }
            }
            else {
                this.laser.setTo(0, 0, 0, 0);
            }
        }
        
    	update() {
    	    var dTime=0.0;
            if(this.game.time.fps>2){
                dTime = 60/this.game.time.fps;
            }else{
                dTime=1;
            }
 //   	    this.myLaser.alpha = 1;
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            
            if (this.direction == -1) {
                this.scale.x = -1;
                
                if (this.animations.frame == 0) {
//                    this.body.velocity.x = this.rate * -time;
                    this.body.velocity.x = 75*dTime;
        	    }
        	    else {
        	        this.laser = new Phaser.Line(0, 0, 0, 0);    
//                    this.myLaser.alpha = 0;
//                    this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                }
                
                if (this.x >= this.x2) {
                    this.direction = 1;
                    this.animations.play('turn');
                }
            }
            else if (this.direction == 1) {
                this.scale.x = 1;
                
                if (this.animations.frame == 0) {
//                    this.laser.setTo(this.left, this.y + 15, 0, this.y + 15);
                    this.body.velocity.x = -75*dTime;
//    	            this.body.velocity.x = this.rate * time;
    	        }
    	        else {
                    this.laser = new Phaser.Line(0, 0, 0, 0);
//                    this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
//                    this.myLaser.alpha = 0;
    	        }
                
        	    if (this.x <= this.originX) {
                    this.direction = -1;
                    this.animations.play('turn');
                }
            }
            
    	    this.previousTime = this.globalTime.seconds;
    	}
    }
    
    function uselessfunction() {}
}