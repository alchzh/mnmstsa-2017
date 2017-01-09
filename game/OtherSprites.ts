namespace TSAGame {
    export class Elevator extends Phaser.Sprite {
        rate:number;
        globalTime:Phaser.Timer;
        previousTime:number;
        y1:number;
        y2:number;
        originX:number;
        direction:number;
        glass:any;
        moving:boolean;
        pauseMovement:boolean;
        reverse:boolean
        prevPM:number;
        playerX:number;
        playerY:number;
        Obots:any;
        sound:Phaser.Sound;
        
        constructor(game:Phaser.Game,x:number,y:number,y2:number,group:any,scale:number,type:string) {
            super(game,x,y,type);
            
            this.y2 = y2;
            this.y1 = y;
            this.glass = this.addChild((game.make.sprite(46, 0, 'Laser')));
            this.glass.scale.x = 2.75;
            this.glass.scale.y = 6.4444;
            game.add.existing(this);
            this.moving = false;    
            this.pauseMovement=false;
            this.reverse=(y-y2>0);
            game.physics.arcade.enableBody(this);
            game.physics.arcade.enableBody(this.glass);
            if(scale===-1)this.animations.frame=1;
            this.body.offset = new Phaser.Point(0, 49);
            this.body.height = 10.8;
            this.body.immovable = true;
            this.glass.body.immovable = true;
            this.playerX=0;
            this.playerY=0;
            group.add(this);
            group.add(this.glass);
            this.Obots=game.add.group();
            this.glass.alpha = 0;
            this.direction=0;
            this.sound = this.game.add.audio('elSound', 1, false);
        }
        
        update() {
            var x = false;
             
            if(this.frame==0){ 
            if((this.right-25)-(this.playerX)>=-5 && (this.right-25)-(this.playerX)<=5 && ((this.y+9)-(this.playerY-40)>=-2&&(this.y+9)-(this.playerY-40)<=2)){
                 x=true;
            }
            }else{
            if((this.left+25)-(this.playerX)>=-5 && (this.left+25)-(this.playerX)<=5 && ((this.y+9)-(this.playerY-40)>=-2&&(this.y+9)-(this.playerY-40)<=2)){
                 x=true;
            }
            }
            if(x && this.game.input.keyboard.isDown(Phaser.Keyboard.Z) &&  (!this.moving||this.prevPM>50)){
                this.move();
            }
            var obotA=this.Obots.children;
            for(var i=0;i<obotA.length;i++){
                var obot=obotA[i];
                if(this.moving==true&&this.direction==-1){
                    if(this.left-obot.left<=0&&this.right-obot.right>=0&&obot.direction==1){
                        if(this.bottom-obot.top<=1&&this.bottom-obot.top>=-3){
                            this.pauseMovement=true;
                        }
                    }else if(this.left-obot.right<=0&&this.right-obot.left>=0&&obot.direction==-1){
                        if(this.bottom-obot.top<=1&&this.bottom-obot.top>=-3){
                            this.pauseMovement=true;
                        }
                    }else{
                        if(i==0){
                            this.pauseMovement=false;
                        }
                    }
                }
            }
            
            if(this.frame==0) this.glass.x=this.x+46;
            if(this.frame==1)this.glass.x=this.x;
            this.glass.y=this.y;
//            this.debug.fps;
//            console.log(this.glass.body);
//            console.log("y2: " + this.y2 + " y" + this.y)
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.V)){
                this.pauseMovement=true;
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.J)){
                this.pauseMovement=false;
            }
            if(this.pauseMovement==true){
                this.body.velocity.y = 0;
            }else if(this.moving&&this.body.velocity.y==0){
                if(this.direction==-1){
                    this.body.velocity.y=120;
                }if(this.direction==1){
                    this.body.velocity.y=-120;
                }
            }
            console.log(this.reverse);

            if(!this.reverse){
                if (this.body.velocity.y == 120 && !(this.y < this.y2)) {
                    this.body.velocity.y = 0;
                    this.y = this.y2;
                    this.moving = false;
                }
                else if (this.body.velocity.y== -120 && this.y <= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    this.moving = false;
                }
            }else{
                if (this.body.velocity.y == -120 && !(this.y > this.y2)) {
                    this.body.velocity.y = 0;
                    this.y = this.y2;
                    console.log("f");
                    this.moving = false;
                }
                else if (this.body.velocity.y== 120 && this.y >= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    console.log("u");
                    this.moving = false;
                }
            }
/*            else if ((this.body.velocity.y == 120 && !(this.y < this.y2) || (this.body.velocity.y == -120 && this.y <= this.y1)) {
                this.body.velocity.y = 0;   
                
                if (this.y == this.y2) this.y = this.y2;
                
                this.moving = false;
            }*/
            if(this.pauseMovement){   
                this.prevPM+=1;
            }
            else{
                this.prevPM=0;
            } 
        }
        
        move() {
            this.moving = true;
            this.sound.play();
            if(!this.reverse){
                if (this.y == this.y2||this.prevPM>50) {
                    this.prevPM=0;
                    this.pauseMovement=false;
                    this.direction=1;
                    this.body.velocity.y = -120;
                }
                else {
                    this.direction=-1;
                    this.body.velocity.y = 120;
                }
            }else{
                if (this.y != this.y2) {
                   
                    this.pauseMovement=false;
                    this.direction=1;
                    this.body.velocity.y = -120;
                    console.log("happiness");
                }
                else {
                    
                     this.prevPM=0;
                    this.direction=-1;
                    this.body.velocity.y = 120;
                }
            }
        }
    }
    export class Invis extends Phaser.Button {
        time:Phaser.Timer;
        invis:boolean;
        avail:Phaser.Timer;

        constructor(game:Phaser.Game) {
            super(game,80, 20, "button1");
            game.add.existing(this);
            this.fixedToCamera = true;
            this.invis = false;
			this.animations.add('over', [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 0], 16);
            this.onInputOver.add(this.over, this);
            this.onInputUp.add(this.up, this);
//            this.onInputOut.add(this.out, this);
            this.time = game.time.create(false);
//            this.setFrames(0, 0, 9, 9);
            this.avail = game.time.create(false);

        }
        
        finish(){
            this.invis = false;
        }
        
        out() {
            this.animations.frame = 0;
        }
        
        over() {
            this.animations.play("over");
        }
        
        up() {
            this.invis = true;
            this.visible = false;
            this.exists = false;
            this.time.add(Phaser.Timer.SECOND * 2.5, this.finish, this);
			this.time.start(0);
            this.avail.add(Phaser.Timer.MINUTE, () => {
                this.visible = true;
                this.exists = true;
                if (this.animations.frame) this.animations.frame = 0;
            })
			this.avail.start(0);
        }
    }
    export class Shield extends Phaser.Button {
        shield:boolean;
        time:Phaser.Timer;
        avail:Phaser.Timer;
        
        constructor(game:Phaser.Game) {
            super(game,20, 20, "button2");
            
            game.add.existing(this);
            this.fixedToCamera = true;
            this.onInputOver.add(this.over, this);
            this.onInputUp.add(this.up, this);
//            this.onInputOut.add(this.out, this);
            this.animations.add('over', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0], 16);
            this.time = game.time.create(false);
            this.avail = game.time.create(false);
        }
        
        finish() {
            this.shield = false;
        }
        
        over() {
            this.animations.play("over");
        }
        
        out() {
            this.animations.frame = 0;
        }
        
        up() {
            this.visible = false;
            this.exists = false;
            this.shield = true;
            this.time.add(Phaser.Timer.SECOND * 3, this.finish, this);
			this.time.start(0);
			this.avail.add(Phaser.Timer.MINUTE, () => {
                this.visible = true;
                this.exists = true;
                if (this.animations.frame) this.animations.frame = 0;
            })
			this.avail.start(0);
        }
    }
    export class HealthBar extends Phaser.Image {
        playerHp:number;
        heart:any;
        constructor(game:Phaser.Game) {
            super(game, 525, 30, "Laser");
            
            this.fixedToCamera = true;
            
 //           this.scale.x = 0.4;
            this.scale.y = 1.5;
            game.add.existing(this);
            this.heart = game.add.sprite(496, 22, 'heart');
            this.heart.fixedToCamera = true;

        }
        
    }
    export class Alarm extends Phaser.Image{
        tintI:Phaser.Image;
        constructor(game:Phaser.Game,x:number,y:number,type:string,group:Phaser.Group) {
            super(game,x,y,type);
            game.add.existing(this)
            this.tintI=game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            group.add(this);
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;

            this.animations.add("strobe",[1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1], 15);
        }
        setOff(){
            this.animations.play("strobe");
        }
    }
    export class Sensor extends Phaser.Sprite{
        tintI:Phaser.Image;
        laser:any;
        myLaser:Phaser.Image;
        direction:number;
        direction2:number;
        originPos:number;
        pos2:number;
        layer:any;
        drones:any;
        canUse:boolean;
        pl:Phaser.Line;
        triggered:boolean;
        blasts:any;
        detected:boolean;
        prevDetected:number;
        lTimer:Phaser.Timer;
        
        constructor(game:Phaser.Game,x:number,y:number,pos2:number,type:string,direction:number,layer:any) {
            super(game,x-16,y+16,"sensor");
            game.add.existing(this);
            game.physics.arcade.enableBody(this);

            this.anchor.setTo(0.5, 0.5);
            this.angle+= direction*90;
            this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            this.pos2=pos2;
            if(direction==1||this.direction==3)this.originPos=x-16;
            else this.originPos=y;
            this.canUse=true;
            this.direction=direction;
            this.direction2=1;
            this.lTimer = game.time.create(false);
            this.layer=layer;
            this.drones=undefined;
            this.pl=new Phaser.Line(0,0,0,0);
            this.triggered=false;
            this.detected=false;
            this.animations.add("shoot",[0,1,2,3,4,5,6,7,8,9,0],30);
            this.blasts=game.add.group();
        }
        update(){
        //    this.game.debug.body(this);
            if(this.direction==1||this.direction==3){
                this.body.velocity.y=0;
                if(this.direction2==1){
                    if(this.x<this.pos2){
                        this.body.velocity.x=30;
                    }else{
                        this.x=this.pos2;
                        this.body.velocity.x=0;
                        this.direction2=-1;
                    }
                }else if(this.direction2==-1){
                     if(this.x>this.originPos){
                        this.body.velocity.x=-30;
                    }else{
                        this.x=this.originPos;
                        this.body.velocity.x=0;
                        this.direction2=1;
                    }
                }if(this.canUse){
                    if(this.direction==3){
                    this.laser.setTo(this.x + 16, this.y,this.x, 600);
                    var done=false;
                    if(this.drones!=undefined){

                        var droneL=new Phaser.Line(0, 0, 0, 0);
                        for(var i =0; i<this.drones.children.length&&!done;i++){
                            var drone=this.drones.children[i];
                            droneL.setTo(drone.left+10,drone.top,drone.right+10,drone.top);
                            if(droneL.intersects(this.laser, true)){
                                done=true;
                                laserEnd=drone.top;
                            }
                        }
                    }
                    if(!done){
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for  (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[i].index != -1 && realTile == -1) realTile = i;
                        }
                        var laserEnd=600.0;
                        if (tilehits.length > 1 && realTile != -1) {
                            laserEnd = tilehits[realTile].worldY;
                        }
                        else {
                            laserEnd = 600.0;
                        }
                        
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.x + 16, this.y-6 , this.x, laserEnd);
    	            this.myLaser.scale.x=.125;
    	            this.myLaser.scale.y=this.laser.length * 0.125;
    	            this.myLaser.left = this.laser.x;
                    this.myLaser.top = this.laser.y;
            
                    
                    }else{
                    this.laser.setTo(this.x + 16, this.y,this.x, 0);
                    var done=false;
                    if(this.drones!=undefined){

                        var droneL=new Phaser.Line(0, 0, 0, 0);
                        for(var i =0; i<this.drones.children.length&&!done;i++){
                            var drone=this.drones.children[i];
                            droneL.setTo(drone.left+10,drone.bottom,drone.right+10,drone.bottom);
                            if(droneL.intersects(this.laser, true)){
                                done=true;
                                laserEnd=drone.bottom;
                            }
                        }
                    }
                    if(!done){
                        
                    
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for  (var i = 0; i < tilehits.length; i++) {

                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1 - i;
                        }
                        var laserEnd=0.0;
                        if (tilehits.length > 1 && realTile != -1) {
    
                            laserEnd = tilehits[realTile].worldY+32;
                        }
                        else {
                            laserEnd = 0.0;
                        }
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.x + 16, this.y + 10, this.x, laserEnd);
    	            this.myLaser.scale.x=.125;
    	            this.myLaser.scale.y=this.laser.length * 0.125;
    	            this.myLaser.left = this.laser.x;
                    this.myLaser.top = this.laser.y;
                }
                    this.myLaser.alpha=1;
                }else{
                    this.laser.setTo(0,0,0,0);
                    this.myLaser.alpha=0;
                }
            }else{
                this.body.velocity.x=0;
                if(this.direction2==1){
                    if(this.y<this.pos2){
                        this.body.velocity.y=30;
                    }else{
                        this.y=this.pos2;
                        this.direction2=-1;
                    }
                }else if(this.direction2==-1){
                     if(this.y>this.originPos){
                        this.body.velocity.y=-30;
                    }else{
                        this.y=this.originPos;
                        this.direction2=1;
                    }
                    
                }
                if(this.canUse){
                    if(this.direction==0){
                    this.laser.setTo(this.x + 4, this.y+2,0, this.y-2);
                    var done=false;
                    var laserEnd=0;
                    if(this.drones!=undefined){

                        var droneL=new Phaser.Line(0, 0, 0, 0);
                        for(var i =0; i<this.drones.children.length&&!done;i++){
                            var drone=this.drones.children[i];
                            droneL.setTo(drone.right,drone.top,drone.right,drone.bottom);
                            if(droneL.intersects(this.laser, true)){
                                done=true;
                                laserEnd=drone.right;
                            }
                        }
                    }
                    if(!done){
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                    
                        for  (var i = 0; i < tilehits.length; i++) {
                        
                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1 - i;
                        }
            
                        if (tilehits.length > 1 && realTile != -1) {
                            laserEnd = tilehits[realTile].worldX + 32;
                        }
                        else {
                            laserEnd = 0;
                        }
                        
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.x + 4, this.y, laserEnd, this.y);
    	            this.myLaser.scale.x=this.laser.length * 0.125;
    	            this.myLaser.scale.y=.125;
    	            this.myLaser.left = this.laser.x;
                    this.myLaser.top = this.laser.y;
            
                    
                    }else{
                    this.laser.setTo(this.x - 4, this.y+2,4800, this.y-2);
                    var done=false;
                    var laserEnd=4800;
                    if(this.drones!=undefined){
                        var droneL=new Phaser.Line(0, 0, 0, 0);
                        for(var i =0; i<this.drones.children.length&&!done;i++){
                            var drone=this.drones.children[i];
                            droneL.setTo(drone.left,drone.top,drone.left,drone.bottom);
                            if(droneL.intersects(this.laser, true)){
                                done=true;
                                laserEnd=drone.left;
                            }
                        }
                    }
                    if(!done){
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for  (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[i].index != -1 && realTile == -1) {
                                realTile = i;
                            }        
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            laserEnd = tilehits[realTile].worldX;
                        }
                        else {
                            laserEnd = 3200;
                        }
                    }
//                    console.log(realTile);
                    this.laser.setTo(this.x -4, this.y, laserEnd, this.y);
              //      this.game.debug.geom(this.laser, "rgb(255, 255, 0)");

    	            this.myLaser.scale.x=this.laser.length * 0.125;
    	            this.myLaser.scale.y=.125;
    	            this.myLaser.left = this.laser.x;
                    this.myLaser.top = this.laser.y;
                }
                    this.myLaser.alpha=1;
                }else{
                    this.laser.setTo(0,0,0,0);
                    this.myLaser.alpha=0;
                }
            }
        
        if(this.frame>0){
            this.body.velocity.x=0;
            if(this.frame==9){
                if(this.direction==3)this.blasts.getFirstDead().addIn(this.x, this.y,0,1,this.direction);
                else if(this.direction==1)this.blasts.getFirstDead().addIn(this.x, this.y,0,-1,this.direction);
                else if(this.direction==0)this.blasts.getFirstDead().addIn(this.x, this.y,-1,0,this.direction);
                else this.blasts.getFirstDead().addIn(this.x, this.y,1,0,this.direction);
                this.frame=0;
                this.lTimer.add(Phaser.Timer.SECOND * 3, this.finish, this);
			    this.lTimer.start(0);
                this.canUse=false;

            }
            
        }
        if(this.pl.intersects(this.laser, true)){
            this.triggered=true;
            this.animations.play("shoot");
            
        } 
        if(this.triggered){
    //        this.blast.player=this.pl;
     //       this.blast.udpate2();
        }
    }finish(){
        this.canUse=true;
    }

    }
    
}