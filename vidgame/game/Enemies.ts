namespace TSAGame {
    
    export class Alien extends Phaser.Sprite{
        x2:number;
        originX:number;
        direction:number;
        laser:Phaser.Line;
        laser2:Phaser.Line;
        laserEnd:number;
        stuckX:number;
        laserEnd0:number;
        suspicious:boolean;
        troubleShoot:number;
        failure:number;
        prevSus:number;
        layer:any;
        playerX:number;
        playerY:number;
        prevSpot:number;
        elevNum:number;
        elevators:any;
        prevGtouch:boolean;
        prevEtouch:boolean;
        glass:boolean;
        possibleElevators:number[];
        isTriggered:boolean;
        suspicion:any;
        disrupted:boolean;
        blasts:any;
        arm:any;
        prevX:number;
        laserEnd1:number;
        laserEnd2:number;
        laserEndY:number;
        laserEnd3:number;
        laserEnd4:number;
        notSeen:number;
        playerS:any;
        blastSound:any;

        constructor(game:Phaser.Game,x:number,y:number,x2:number,layer:any,group:any,elevators = [-1]) {
            super(game,x, y, 'alien', 0);
    		this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            this.body.gravity.y = 400;
            this.originX = x;
            this.x2 = x2;
            this.stuckX=0;
			game.add.existing(this);
			this.direction = -1;
			this.suspicious=false;
            this.blasts=this.game.add.group();
            this.laserEnd = 3200;
            this.laserEnd0 = 3200;
            this.disrupted=false;
			this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.laser2 = new Phaser.Line(0, this.y, 200, this.y);
            this.isTriggered=false;
            this.glass=false;
            this.layer=layer;
            this.laserEnd1=-1;
            this.laserEnd2=-1;
            this.laserEnd3=-1;
            this.prevEtouch=false;
            this.elevators=undefined;
            this.prevGtouch=false;
            this.prevX;
            this.possibleElevators=elevators;
            this.elevNum=-1;
            this.laserEnd4=-1;
            this.laserEndY=this.y;
           //his.body.offset = new Phaser.Point(0, 1);
          //  /is.body.heigh = 63;

            this.notSeen=0;
            this.troubleShoot=0;
            this.failure=0;
            group.add(this);
            this.playerS=this.game.add.sprite(this.playerX,this.playerY,"laser");
            this.playerS.alpha=0;
       //     this.body.immovable=true;
			this.animations.add('move',[1,2,3,4,5,6,7,8,9,10,11,12,13], 10.5, true);
			this.animations.add("stop",[0,0,0,0,1],3);
			this.animations.add('disrupt',[15,16,17,18,19,20,21,22], 7);
			this.animations.add('grab',[23,24,25,26], 5);
			this.animations.add('troubleShoot',[26,26,27,26,27,26,26,27,26,27,26], 4);
            this.animations.add('triggered',[28,29,30,31,29,30,31,29,30,31,14], 7);
            this.animations.add('suspicious',[14,0], 2);
            this.suspicion=this.addChild((game.make.image(-5, -37,"suspicion")));
            this.arm=this.addChild((game.make.image(-11, 13, 'arm')));
            this.arm.alpha=0;
            console.log(this.body);

			//this.animations.add('alerted',[14, 15, 16, 17, 18, 19], 10, true);
	//		this.animations.add('turn',[6, 7, 8, 9, 10, 11, 12, 13], 20);
//			this.animations.add('turnBack',[13,12,11,10,9,8,7,6,0], 20);
            this.playerY=0;
            this.playerX=0;
            this.animations.play("move");
            this.blastSound = this.game.add.audio("blast", 0.2, false);
        }
        updateLine(playerLine:Phaser.Line){
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 15 ) {
                if (this.direction=== -1) {
                    if(this.laserEnd1==-1||this.laserEndY!=this.y){
                    this.laser.setTo(this.left + 8,this.y + 5, this.game.world.width, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for  (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile=== -1) {
                            realTile = i;
                        }        
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = this.game.world.width;
                    }
                    this.laserEndY=this.y;
                    this.laserEnd1=this.laserEnd;
                    }else{
                        this.laserEnd=this.laserEnd1;
                    }if(this.laserEnd3==-1||this.laserEndY!=this.y){
                    this.laser2.setTo(this.left + 8,this.y + 40, this.game.world.width, this.y + 40);
                    var tilehits = this.layer.getRayCastTiles(this.laser2, 4, false, false);
                    var realTile = -1;
                    for  (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile=== -1) {
                            realTile = i;
                        }        
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd0 = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd0 = this.game.world.width;
                    }
                    this.laserEndY=this.y;
                    this.laserEnd3=this.laserEnd0;
                    }else{
                        this.laserEnd0=this.laserEnd3;
                    }
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                    this.laser2.setTo(this.left + 8, this.y + 40, this.laserEnd0, this.y + 40);

                }
                else if (this.direction=== 1) {
        	        if(this.laserEnd2==-1||this.laserEndY!=this.y){

        	        this.laser.setTo(this.left, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile=== -1) realTile = tilehits.length - 1 - i;
                    }
            
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    this.laserEndY=this.y;
                    this.laserEnd2=this.laserEnd;

                        
                    }else{

                        this.laserEnd=this.laserEnd2;
                    }
                    if(this.laserEnd4==-1||this.laserEndY!=this.y){

        	        this.laser2.setTo(this.left, this.y + 40, 0, this.y + 40);
                    var tilehits = this.layer.getRayCastTiles(this.laser2, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile=== -1) realTile = tilehits.length - 1 - i;
                    }
            
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd0 = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd0 = 0;
                    }
                    this.laserEndY=this.y;
                    this.laserEnd4=this.laserEnd0;

                        
                    }else{

                        this.laserEnd0=this.laserEnd4;
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.left, this.y + 5, this.laserEnd, this.y + 5);
                    this.laser2.setTo(this.left, this.y + 40, this.laserEnd0, this.y + 40);

    	        }
//                this.laserEnd = tilehits[0].worldX;
                var point = playerLine.intersects(this.laser,true);
                if(!point)point= playerLine.intersects(this.laser2,true);


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
                this.laser2.setTo(0,0,0,0);
            }
        }
        
        update(){
            var dTime=0.0;
            if(this.game.time.fps>2){
                dTime = 60/this.game.time.fps;
            }else{
                dTime=1;
            }            
            if(alarmsOn&&!this.suspicious){
                this.suspicious=true;
                this.animations.play('suspicious');

            }
        //this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
       // this.game.debug.geom(this.laser2, "rgb(255, 255, 0)");
            this.body.velocity.x=0;
            if(this.animations.frame<14&&this.animations.frame>0&&!this.glass){
               if(!this.suspicious)this.body.velocity.x=65;
               else this.body.velocity.x=140;
            }
            if (this.direction=== -1&&!this.prevGtouch) {
                if (this.animations.frame < 14&&this.animations.currentAnim.name!="stop") {
                	this.animations.play("move",10.5);
                	this.scale.x = 1;

                }
                if ((this.x >= this.x2||this.stuckX>6)&&this.frame<14) {
        	        
                    this.animations.play('stop');
                    if(this.animations.frame==1){
                        this.direction=1;
                        this.scale.x=-1;
                        this.animations.play("move",10.5)
                    }
                }
            }
            else if (this.direction=== 1&&!this.prevGtouch) {
                
                if (this.animations.frame < 14&&this.animations.currentAnim.name!="stop") {
                    this.animations.play("move",10.5);
//                    this.body.velocity.x = this.rate * time;
                    this.body.velocity.x *=-1;
                }
                
                if ((this.x <= this.originX||this.stuckX>6)&&this.frame<14) {
                    this.animations.play('stop');
                    if(this.animations.frame==1){
                        this.direction=-1;
                        this.scale.x=1;
                        this.animations.play("move",10.5);

                    }
                }
            }if(this.animations.currentAnim.name=="triggered")this.isTriggered=true;
            else this.isTriggered=false;

            if(this.frame==22)this.animations.play("grab");
            else if(this.frame==26)this.animations.play("troubleShoot");
            else if(this.animations.currentAnim.name=="move"&&this.suspicious)this.animations.play("move",17);
            else if(this.isTriggered&&this.frame==14){
                this.suspicious=true;   
                this.animations.play("move",17);
            }
            
            if(this.suspicious){
                this.prevSus+=1*dTime;
                this.suspicion.alpha=1;
            }else{
                this.suspicion.alpha=0;
                this.prevSus=0;
            }if(this.prevSus>=600){
                this.animations.play("move",10.5);
                this.suspicious=false;
                this.prevSus=0;
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)&&this.playerY==this.bottom){
                if(!this.disrupted&&this.animations.frame<15){
                    if(this.direction==-1&&this.left-this.playerX<=60&&this.left-this.playerX>=0){
                        this.disrupt();
                    }if(this.direction==1&&this.playerX-40-this.right<=60&&this.playerX-40-this.right>=0){
                        this.disrupt();
                    }
                }
            }if(this.prevSpot>=60||(this.notSeen>=50&&this.prevSpot>0)){
                this.triggered();
            }
     //       if(this.x==this.prevX&&this.animations.currentAnim.name!="stop"&&this.frame<14)this.stuckX++;
       //     else this.stuckX=0;

            //if(this.possibleElevators[0]!=-1)console.log(this.animations.currentAnim.name);
            if(this.elevNum==-1){
                this.body.gravity.y = 400;
            this.prevGtouch=false;
                this.prevEtouch=false;
                if(this.body.velocity.y<0)this.body.velocity.y=0;
                if(this.possibleElevators[0]!==-1){
                    for(var i = 0;i<this.possibleElevators.length;i++){
                        this.game.physics.arcade.collide(this, this.elevators.children[this.possibleElevators[i]],this.elevT);
                    }
                }

            }else{
                var elemavators=this.elevators.children[this.elevNum];
                var glasses= this.elevators.children[this.elevNum+1];
                let g= this.game.physics.arcade.collide(this, glasses);
                this.glass=g;
                this.bottom=elemavators.bottom-9;
                this.body.gravity.y = 0;
                if(g){
                    if(elemavators.frame===0&&this.direction===-1){
                        
                        if(!elemavators.moving){
                            if(!this.prevGtouch){
                            elemavators.move();
                            this.prevGtouch=true;
                            this.x+=2;
                            this.animations.play("stop")
                            this.animations.frame=0;
                            }    
                            else{
                                this.frame=0;
                            this.direction=1;
                            this.prevGtouch=false;

                            this.scale.x=-1;
                            this.animations.play("move",10.5);
                            this.body.velocity.y=0;
                            this.x-=10;
                            }
                        }else{
                            this.prevGtouch=true;
                        }
                    }
                    if(elemavators.frame===1&&this.direction===1){
                        console.log(this.prevGtouch);
                        if(!elemavators.moving){
                            if(!this.prevGtouch){
                            elemavators.move();
                            this.prevGtouch=true;
                            this.x-=2;
                            this.animations.play("stop")
                            this.animations.frame=0;
                            }    
                            else{
                                this.frame=0;
                            this.direction=-1;
                            this.prevGtouch=false;

                            this.scale.x=1;
                            this.animations.play("move",10.5);
                            this.body.velocity.y=0;
                            this.x+=10;
                            }
                        }else{
                  /*          this.frame=0;
                            this.direction=-1;
                            this.prevGtouch=false;

                            this.scale.x=1;
                            this.animations.play("move",10.5);
                            this.body.velocity.y=0;
                            this.x+=10;*/
                            this.prevGtouch=true;
                        }
                    }
                }else if(!this.game.physics.arcade.collide(this, elemavators)){
                    this.elevNum=-1;
                }
                
            }

            if(this.animations.frame>27){
                this.arm.alpha=1;
            }else{
                this.arm.alpha=0;
            }
            if(this.animations.currentAnim.name=="troubleShoot")this.troubleShoot+=1*dTime;
            else this.troubleShoot=0;
            if(this.troubleShoot>=300)this.animations.play("move");
            this.prevX=this.x;
        }disrupt(){
            this.disrupted=true;
            this.animations.play("disrupt");
        }
        triggered(){
            if(this.frame<15){
                
                this.animations.play("triggered");
                this.blastSound.play();
                this.blasts.getFirstDead().addIn(this.x, this.y+12,this.scale.x,0,0);
                this.arm.rotation = 0;
            }
        }
        elevT(me:any,elevators:any){
            if(me.body.touching.up&&elevators.moving){
                console.log("hei");
                elevators.spriteStuck=true;
            }else if(me.y-elevators.y<-5){
            if(elevators.key!=="Laser"){
                me.elevNum=elevators.myNumber;
            }
            
       /*     if(me.stuckX>5){
                me.direction*=-1;
                me.scale.x*=-1;
                this.elevNum=-1;
                me.x-=10*me.direction;
                me.animations.play("move",10.5);
            }*/
            this.prevEtouch=true;
            }
       /*     if(g){
                if(elevators.frame===0&&me.direction===-1){
                    if(!elevators.moving){
                        elevators.move();
                        this.direction=1;
                        
                    }else{
            //            me.y=elevators.y-14;
                    }
                }if(elevators.frame===1&&me.direction===1&&!elevators.moving){
                    elevators.move();
                }
            }*/
        }
    }
    export class Alien2 extends Phaser.Sprite{
        
        caught:boolean;
        laserEnd:number;
        laserEndY:number;
        spawned:boolean;
        spawning:boolean;
        star:TSAGame.ScienceStar;
        
        
        constructor(game:Phaser.Game,x:number,y:number,layer:any,group:any){
            super(game,x, y, 'alien2', 0);
            game.add.existing(this);
    //		this.anchor.setTo(0.5, 0);
    		this.caught=false;
    		this.star=new ScienceStar(game,x,y,layer);
    		game.add.existing(this.star);
    		this.spawning=false;
            this.game.physics.arcade.enableBody(this);
            this.game.physics.arcade.enableBody(this.star);
            this.body.gravity.y = 400;
            this.animations.add('move',[2,3,4,5,6,7,8,9,10,11,12,13], 10.5, true);

            this.animations.add("spawn",[0,1,2,3,4],6);
            this.spawned=false;
            this.body.immovable=true;
            if(group!=null)group.add(this);
        }triggered(){
            this.caught=true;
        }update(){
            this.caught=false;
            if(this.spawning&&this.frame==4){
                this.star.attached=false;
                this.frame=0;
                this.loadTexture("alien2",0);
                this.spawning=false;
                this.star.launch(100,this.y+20,189);
            }
            if(this.star.attached){
                this.star.x=this.x+28;
                this.star.y=this.y+14;
            }
            if(this.star.crash){
                this.spawned=true;
                this.animations.play('move');

                this.body.velocity.x=60;
                
            }
        }leave1(){
            this.loadTexture("alien2v2",0);
            this.spawning=true;
            this.animations.play("spawn");
        }
    } 
    export class Drone extends Phaser.Sprite {       
        rate:number;
        globalTime:Phaser.Timer;
        previousTime:number;
        direction:number;
        beenTriggered:boolean;
        x2:number;
        originX:number;
        laser:Phaser.Line;
        seesing:boolean;
        cooldown:number;
        laserEnd:number;
        laserEnd1:number;
        myNumber:number;
        laserEnd2:number;
        laserEndY:number;
        grabLeft:boolean;
        grabRight:boolean;
        trampoline:boolean;
        reverse:boolean;
        layer:any;
        blasts:any;
        myLaser:Phaser.Image;
        angry:boolean;
        nine:number;
        blastSound:any;
        
    	constructor(game:Phaser.Game,x:number,y:number,x2:number,group:Phaser.Group,layer:any) {
    		super(game, x, y, 'drone2', 0);
    		
    		this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            
            this.rate = 3000;
			game.add.existing(this);
			this.globalTime = game.time.create(false);
			this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
			this.globalTime.start(0);
			
			this.myNumber=group.children.length;
			this.originX = this.x;
			group.add(this);
			
			this.beenTriggered=false;
	//		this.scale.x = -0.6;
	//		this.scale.y = 0.6;
			this.x2 = x2;
			this.seesing=false;
			this.cooldown;
			this.grabLeft=false;
			this.grabRight=false;
			this.trampoline=false;
			this.angry=false;
			this.laserEnd1=-1;
			this.laserEnd2=-1;
			this.laserEndY=y + 1;
			this.laserEnd = 3200;
	//		this.globalTime.start();
	        if(x2>x){
	            this.reverse=false;
			    this.direction = -1;
			}
			else {
			    this.x2=x;
			    this.originX=x2;
			    this.direction=1;
			}
//			console.log(this.time)
            this.blasts=game.add.group();
            
			this.animations.add('turn', [1, 2, 3, 4, 5, 6, 7, 0], 7.5, false);
//			this.animations.add('turn', [9, 10, 11, 12, 13, 14, 15, 16, 17])
			this.laser = new Phaser.Line(0,this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            this.layer=layer;
            this.blastSound = this.game.add.audio("blast", 0.2, false);
    	}
        removedd(){
            this.myLaser.visible=false;
            this.kill();
        }
    	updateLine(playerLine:Phaser.Line) {
    	    this.seesing=false;
            if (this.animations.frame=== 0||(this.animations.frame=== 9&&!this.angry)) {
                
                if (this.direction=== -1) {
                    if(this.laserEnd1==-1||this.laserEndY!=this.y){

                    this.laser.setTo(this.left,this.y + 19, this.game.camera.bounds.right, this.y + 19);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile=== -1) realTile = i;
                    }
                    
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = this.game.camera.bounds.right;
                    }this.laserEndY=this.y
                    this.laserEnd1=this.laserEnd;
                    }else{
                        this.laserEnd=this.laserEnd1;
                    }
//                    console.log(tilehits[realTile].index);
                    this.laser.setTo(this.left,this.y + 19, this.laserEnd,this.y + 19);
                }
                else if (this.direction=== 1) {
                    if(this.laserEnd2==-1||this.laserEndY!=this.y){
                    this.laser.setTo(this.left, this.y + 19, 0, this.y + 19);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile=== -1) realTile = tilehits.length - 1- i;
                    }
                    
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                     this.laserEndY=this.y;
                    this.laserEnd2=this.laserEnd;

                        
                    }else{

                        this.laserEnd=this.laserEnd2;
                    }
                    this.laser.setTo(this.left, this.y + 19, this.laserEnd, this.y + 19);
        	    }
                if (this.animations.frame=== 0||(this.animations.frame=== 9&&!this.angry)) {
//                    this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                    var point = playerLine.intersects(this.laser, true);
                    
                    if (point != null) {
                        this.seesing=true;
                        this.angry=true;
                        this.beenTriggered=true;
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
            
            if(this.angry){
                this.nine+=1*dTime;
            }else{
                this.nine=0;
            }if(this.nine>=1){
                if(this.blasts!=null){
                    this.nine=-44;
                    this.blastSound.play();
                    this.blasts.getFirstDead().addIn(this.x-(24*this.scale.x), 20 + this.y,-this.scale.x,0,0);
                    this.angry=false;
                }
            }
            if(this.beenTriggered&&this.frame==0)this.frame=9;
            this.trampoline=this.body.touching.up;
            this.grabLeft=this.body.touching.left;
            this.grabRight=this.body.touching.right;
            if(this.grabLeft)console.log("yeeee");
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            var time = this.previousTime - this.globalTime.ms;
            this.body.velocity.x = 0;

            if (this.direction=== -1) {
                this.scale.x = -1;
                
                if (this.animations.frame=== 0||(this.animations.frame=== 9&&!this.angry)) {
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
                    this.loadTexture("drone");
                    this.animations.play('turn');
                }
            }
            else if (this.direction=== 1) {
                this.scale.x = 1;
                
                if (this.animations.frame=== 0||(this.animations.frame=== 9&&!this.angry)) {
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
                    this.loadTexture("drone2");
                    this.animations.play('turn');
                }
            }
            if(alarmsOn)this.body.velocity.x*=1.75;
    	    this.previousTime = this.globalTime.ms;
    	    
    	}
    }
    export class TBot extends Phaser.Sprite {
        x2:number;
        originX:number;
        direction:number;
        laser:Phaser.Line;
        laserEnd:number;
        prevX:number;
        stuckX:number;
        myLaser:Phaser.Image;
        layer:any;
        within:boolean;
        shutDown:boolean;
        disrupted:boolean;
        seesing:boolean;
        playerX:number;
        playerY:number;
        player:any;
        blasts:any;
        laserEnd1:number;
        laserEnd2:number;
        laserEndY:number;
        angry:number;
        deactivateS:any;
        blastSound:any;
        
        constructor(game:Phaser.Game,x:number,y:number,x2:number,layer:any,group:any,player:any) {
            super(game,x, y, 'tbot2', 0);
    		game.add.existing(this);
            game.physics.arcade.enableBody(this);

    		this.anchor.setTo(0.5, 0);    
    		this.body.gravity.y = 400;
            group.add(this);
            this.seesing=false;
            this.angry=0;
            this.originX = x;
            this.x2 = x2;
			this.direction = -1;
			this.shutDown=false;
		    this.playerX=player.x
		    this.player=player;
		    this.within=true;
		    this.playerY=player.y;
            this.laserEnd = 3200;
			this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125; 
            this.myLaser.scale.y = 0.125;
            this.laserEnd1=-1;
            this.laserEnd2=-1;
            this.laserEndY=this.y;
                    //    tis.body.immovable=true;
            this.stuckX=0;
            this.prevX=x;
			this.animations.add('crash',[23,22,21,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,0], 6, true);
			this.animations.add('reboot',[20,21,22,23,0], 6, true);
			this.animations.add('move',[0, 1, 2, 3, 4, 5], 12, true);			
			this.animations.add('angry',[14], 10, false);
			this.animations.add('alerted',[15, 16, 17, 18, 19], 6, false);
			this.animations.add('turn',[6, 7, 8, 9, 10, 11, 12, 13], 20,false);
			this.animations.add('turnBack',[12,11,10,9,8,7,6,5,5], 20,false);
			this.layer=layer;
			this.blasts=this.game.add.group();
		    this.deactivateS = this.game.add.audio("deactivate", 0.2, false);
		    this.blastSound = this.game.add.audio("blast", 0.2, false);
        }
        updateLine(playerLine:Phaser.Line){
            this.seesing=false;
            if(this.frame==0&&this.animations.currentAnim.name=="crash")this.animations.play("reboot");
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 6 ) {
                if (this.direction=== -1) {
                    this.within=this.game.camera.x+800>this.x
                    if(this.within){
                    if(this.laserEnd1==-1||this.laserEndY!=this.y){
                    this.laser.setTo(this.left - 8,this.y + 5, this.game.world.width, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for  (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile=== -1) {
                            realTile = i;
                        }        
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = this.game.world.width;
                    }
                    this.laserEndY=this.y
                    this.laserEnd1=this.laserEnd;
                    }else{
                        this.laserEnd=this.laserEnd1;
                    }
                    this.laser.setTo(this.left - 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                }
                else if (this.direction=== 1) {
                    this.within=this.game.camera.x<this.x;
                    if(this.within){
                    if(this.laserEnd2==-1||this.laserEndY!=this.y){
        	        this.laser.setTo(this.left + 8, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile=== -1) realTile = tilehits.length - 1 - i;
                    }
            
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    this.laserEndY=this.y;
                    this.laserEnd2=this.laserEnd;

                        
                    }else{

                        this.laserEnd=this.laserEnd2;
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
    	        }
//                this.laserEnd = tilehits[0].worldX;
                var point = playerLine.intersects(this.laser,true);
                
                if (point != null) {
                    
         //           if (this.animations.frame >= 6 && this.animations.frame <= 14) this.scale.x = -this.scale.x;
                    this.seesing=true;
                    this.animations.play('angry');
                }
            }
            else {
                this.laser.setTo(0,0,0,0);
            }
            
            if (this.animations.frame <= 2)
            {
                this.myLaser.top -= 100;
            }
            else if (this.animations.frame >=3 && this.animations.frame <= 5)
            {
                this.myLaser.top += 100;
            }
        }
        update() {
            
            
            if(!this.within)this.laser.setTo(0,0,0,0);
    	    this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            if (this.animations.frame == 0 || this.animations.frame == 1 ||this.animations.frame == 2)
            {
                this.myLaser.top -= 1;
            }
            
            if(this.animations.frame<20){
                this.game.physics.arcade.collide(this, this.player);
            }
            this.body.velocity.x = 0;

            if(this.frame==19){
                this.blastSound.play();
                this.blasts.getFirstDead().addIn(this.x+(24*this.scale.x), this.y+12,-this.scale.x,0,0);
                
                this.angry++;
                this.animations.stop();
                this.frame=14;
                if(this.angry>=2)this.animations.play("move");
                else this.animations.play("alerted");
            }else if(this.animations.currentAnim.name!="alerted"){
                this.angry=0;
            }
            if(this.frame==14)this.animations.play("alerted");
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)&&this.playerY==this.bottom){
                   
                if(!this.shutDown){

                    if((this.direction==-1||this.animations.currentAnim.name=="turnBack"||this.animations.currentAnim.name=="turn")&&this.x-this.playerX-16<=40&&this.x-this.playerX-16>=0){
                        this.break();
                    }

                    if((this.direction==-1||this.animations.currentAnim.name=="turn"||this.animations.currentAnim.name=="turnBack")&&this.playerX-16-this.x<=40&&this.playerX-16-this.x>=0){
                        this.break();
                    }
                }
            }

            if (this.direction=== -1&&this.animations.frame<20) {
                if (this.animations.frame < 6) {

                    this.animations.play("move");
                    this.scale.x=-1;
                    this.body.velocity.x = 50;
        	    }
        	    
                if (this.x >= this.x2||this.stuckX>150) {
        	        this.animations.play('turn');
        	    }if (this.animations.frame === 13) {  
        	        this.frame=12;
                    this.scale.x = 1;
                    this.loadTexture("tbot");
    	            this.animations.play('turnBack');
    	            this.direction = 1;
               }
            }
            else if (this.direction=== 1&&this.animations.frame<20) {
                if (this.animations.frame < 6) {
                    this.animations.play("move");
                    this.scale.x=1;
                    this.body.velocity.x = -50;
                }
                if (this.x < this.originX||this.stuckX>150) {
                    this.loadTexture("tbot");
                    this.animations.play('turn');
                }if (this.animations.frame === 13) {
        	        this.frame=12;
                    this.scale.x = -1;
                    this.loadTexture("tbot2");
    	            this.animations.play('turnBack');
    	            this.direction = -1;
               }
                  
            }if(alarmsOn)this.body.velocity.x*=1.75;
            if(this.prevX==this.x&&this.animations.frame<6){
                this.stuckX++;
            }else{
                this.stuckX=0;
            }
            this.prevX=this.x;
            if(this.x <= this.originX)this.x=this.originX;
            else if(this.x >= this.x2)this.x=this.x2;

        }break(){
            if(canLose120){
                lose120 = true;
                this.deactivateS.play();
                this.shutDown=true;
                this.animations.stop();
                this.animations.frame=20;
                this.animations.play("crash");
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
        laserEnd1:number;
        laserEnd2:number;
        laserEndY:number;
        seesing:boolean;
        shutDown:boolean;
        playerX:number;
        playerY:number;
        blasts:any;
        player:any;
        layer:any;
        deactivateS:any;
        blastSound:any;
        
    	constructor(game:Phaser.Game,x:number,y:number,x2:number,group:Phaser.Group,layer:any,player:any) {
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
			this.shutDown=false;
            this.blasts=game.add.group();
			this.player=player;
			this.playerX=player.x;
			this.playerY=player.bottom;
			this.prevX = x;
			this.stuckX=0;
			this.seesing=false;
		    group.add(this);
//			this.globalTime.start();
//			console.log(this.time);
            console.log("2r");
            this.laserEnd1=-1;
            this.laserEnd2=-1;
            this.laserEndY=this.y;

			this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
			this.animations.add('moveBack', [13,12,11,10,9,0], 7.5);
			this.animations.add('moveForward', [13,12,11,10,9,0], 7.5);
			this.animations.add('alert', [14,15,16,24], 11);
			this.animations.add('sad', [24,24,24,0], 5);
			this.animations.add('crash', [23,22,21,20,19,18,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,24], 6);
			this.animations.add('boot up', [18,19,20,21,22,23,0], 6.5);
            /*
            this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
			this.animations.add('moveBack', [14, 13, 12, 11, 10, 9,0], 7.5);
			this.animations.add('moveForward', [15,16,17,18,19, 0], 5);
			this.animations.add('alert', [20,21,22,24], 11);
			this.animations.add('sad', [30,30,30,0], 5);
			this.animations.add('crash', [23,23,23,23,23,23,24], 1);
			this.animations.add('boot up', [24,25,26,27,28,29,0], 6.5);
			*/

			this.laserEnd = 3200;
			this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            this.body.offset = new Phaser.Point(12, 0);
            this.body.width =12;
            this.layer=layer;
            this.deactivateS = this.game.add.audio("deactivate", 0.2, false);
            this.blastSound = this.game.add.audio("blast", 0.2, false);

    	}
    	
    	updateLine(playerLine:Phaser.Line,map:Phaser.Tilemap) {
  //          console.log(this.game.time.fps);
            this.seesing=false;
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 8) {
                
                if (this.direction=== -1) {
                    if(this.laserEnd1==-1||this.laserEndY!=this.y){

                    this.laser.setTo(this.right - 10,this.y + 5, this.game.world.width, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[i].index != -1 && realTile=== -1) {
                            realTile = i;
                        }        
                    }
                    
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = this.game.world.width;
                    }
                   
                   this.laserEndY=this.y;
                    this.laserEnd1=this.laserEnd;
                    }else{

                        this.laserEnd=this.laserEnd1;
                    }
                    this.laser.setTo(this.right - 10, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction=== 1) {
                    
                    if(this.laserEnd2==-1||this.laserEndY!=this.y){

        	        this.laser.setTo(this.left - 26, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    
                    for  (var i = 0; i < tilehits.length; i++) {
                        
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile=== -1) realTile = tilehits.length - 1 - i;
                    }
            
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    this.laserEndY=this.y;
                    this.laserEnd2=this.laserEnd;

                        
                    }else{

                        this.laserEnd=this.laserEnd2;
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.left - 26, this.y + 5, this.laserEnd, this.y + 5);
    	        }
                var point = playerLine.intersects(this.laser,true);
                
                if (point != null) {
                    this.seesing=true;
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
            if(this.frame==24&&this.animations.currentAnim.name=="alert"){
                this.blastSound.play();
                this.blasts.getFirstDead().addIn(this.x+(24*this.scale.x), this.y+18,this.direction*-1,0,0);
                this.animations.play("sad");
            }
            if(this.animations.frame<14){
                this.game.physics.arcade.collide(this, this.player);

            }
            if(this.frame==24&&this.animations.currentAnim.name=="crash")this.animations.play("boot up");
            if(alarmsOn)this.body.velocity.x*=1.75;
      //      if (this.inCamera) this.body.gravity.y=0;
        //    else this.body.gravity.y=200;
                if (this.animations.frame < 8) this.animations.play('move');
            
                var time = this.previousTime - this.globalTime.seconds;
            
                this.body.velocity.x = 0;
                
                if (this.direction=== -1) {
            	        this.scale.x = 1;
            	    if (this.animations.frame < 8) {
//            	        this.body.velocity.x = this.rate * -time;
            	        this.body.velocity.x = 85*dTime;
//                        this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
            	    }
            	    else {
            	        this.laser.setTo(0, 0, 0, 0);
            	    }
            	    
            	    if (this.x >= this.x2||this.stuckX>150) {
            	        this.animations.stop();
            	        this.loadTexture("obot23");
            	        this.animations.play('moveForward');

            	        this.direction = 1;
            	  //      this.scale.x=-1;
            	    }
                }
            	else if (this.direction=== 1) {
            	        this.scale.x = -1;

                    if (this.animations.frame < 8) {
//                        this.body.velocity.x = this.rate * time;
                        this.body.velocity.x = -85*dTime;
//                        this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                    }
            	    else {
                        this.laser.setTo(0, 0, 0, 0);
            	    }
            	    
            	    if (this.x <= this.originX||this.stuckX>150){
                        this.animations.stop();
            	        this.loadTexture("obot");

            	        this.animations.play('moveBack');
            	        this.direction = -1;
            	       // this.scale.x=1;
            	    }
                }if(this.prevX==this.x&&this.animations.frame<8){
                    this.stuckX++;
                }else{
                    this.stuckX=0;
                }
                this.prevX = this.x;
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)&&this.playerY==this.bottom){
                if(!this.shutDown){
                    if((this.direction==-1||this.animations.currentAnim.name=="moveForward"||this.animations.currentAnim.name=="moveBack")&&this.x-this.playerX-16<=30&&this.x-this.playerX-16>=-5){
                        this.break();
                    }
                    if((this.direction==1||this.animations.currentAnim.name=="moveBack"||this.animations.currentAnim.name=="moveForward")&&this.playerX-16-this.x<=30&&this.playerX-16-this.x>=-5){
                        this.break();
                    }
                }
            }
             //if(this.frame==12)this.scale.x=1;
            // else if(this.frame==18)
                this.previousTime = this.globalTime.seconds;
    	    }
    	    break(){
    	        if(canLose120){
    	            lose120 = true;
                    this.shutDown=true;
    	            this.deactivateS.play();
    	            this.animations.play("crash");
    	        }
    	    }
    //	}

    }
    
    function uselessfunction() {}
}