namespace TSAGame{
    
    export var lose120 = false;
    export var canLose120=true;
    export class Player extends Phaser.Sprite {
        wait:any;
        playerScale:number;
        jumpV:number;
        shield:boolean;
        globalTime:Phaser.Timer;
        previousX:number;
        previousTime:number;
        invis:boolean;
        prevShield:boolean;
        hitPlatform:boolean;
        shock:Phaser.Sound;
        zapped:number;
        flinch:boolean;
        layer:any;
        drone:any;
        droneNumber:number;
        gravity:number;
        crouch:boolean;
        prevCrouch:boolean;
        prevLgrab:number;
        dGrab:boolean;
        lGrab:boolean;
        gX:number;
        gY:number;
        energy:number;
        
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "ethan", 0);
            game.add.existing(this);
            game.physics.arcade.enable(this);
//            game.time.desiredFps = 30;
            this.health = 200;
     //       this.zap = false;
       //     this.zap1 = true;
            this.wait = 0;
            this.anchor.setTo(0.5, 0);
            this.gravity = 7.5;
            this.globalTime = game.time.create(false);
			this.globalTime.add(Phaser.Timer.SECOND * 4, this.uselessfunction, this);
			this.globalTime.start(0);
            this.shock = this.game.add.audio("shock", 0.6);
            this.body.collideWorldBounds = true;
            this.body.mass=2;
            this.playerScale = 1;
            this.flinch=false;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
            this.hitPlatform = true;
            this.drone=null;
            this.dGrab=false;
            this.lGrab=false;
            this.zapped=0;
            this.prevLgrab=0;
            this.crouch=false;
            this.prevCrouch=false;
            this.energy=400;
            this.jumpV = 250;
            this.droneNumber=-1;
            this.animations.add("walk", [1,2,3,4,5,6,8,9,10,11,12,13,14,15], 14);
//            this.width = 48;
//            this.height = 96;
            this.body.offset = new Phaser.Point(8.75, 0);
            this.body.width = 14;
            this.shield = false;
            this.invis = false;
            this.prevShield = false;
        }
        uselessfunction(){
            
        }
        update() {
            if (lose120)
            {
                this.energy -= 100;
                lose120 = false;
            }
            if(this.energy>100)canLose120=true;
            else canLose120=false;
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.Q))
            {
                this.game.sound.stopAll();
                this.game.state.start("levelSelect", true, false);
            }
            
            if(this.health<=0){
                this.game.sound.stopAll();
                this.game.state.start("playerDeath");
            }
            
            let dTime=0.0;
            if(this.game.time.fps>5){
                dTime = (this.previousTime-this.globalTime.ms)/-16.666;
                if(dTime<1||isNaN(dTime))dTime=1;
            }else{
                dTime=1;
            }
            this.body.velocity.x = 0;
            if(this.lGrab==false&&this.crouch==false&&!urgent){
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                    this.body.velocity.x = -165*dTime;
                    this.animations.play("walk");
    
                    if (this.scale.x == this.playerScale) {
                        this.scale.x = -this.playerScale;
                    }
                }
            
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                    this.body.velocity.x += 165*dTime;
                    this.animations.play("walk");

                    if (this.scale.x == -this.playerScale) {
                        this.scale.x = this.playerScale;
                    }
                    if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                        this.animations.frame =0;
                    }
                }
                else if(!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
                   this.animations.frame = 0;
                }
                if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down || this.body.touching.down)) {
                    this.body.velocity.y = -this.jumpV;
                }
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)&&(this.body.blocked.down) ){
                this.crouch=true;
                this.body.velocity.x=0;
                this.body.velocity.y=0;
                this.gravity=0;
                this.x=this.previousX;
                if(!this.prevCrouch){
                     this.loadTexture("ethanCrouching",0);
                    this.y+=29;
                }
            }else if(!this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)&&this.crouch){
                this.crouch=false;
                if(this.prevCrouch){
                    this.y-=29;
                    this.loadTexture("ethan",0);
                    this.gravity=7.5;
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.height=62;
                }
            }
            this.body.velocity.y+=this.gravity;
       //     if(this.body.blocked.down || this.body.touching.down)console.log(this.body.velocity.y)
            if(this.drone!=null){
                this.droneNumber=this.drone.myNumber;
                this.dGrab=true;
                this.lGrab=true;
                
                if(this.drone.direction==-1){
                   console.log("yeems");
                    this.gX=this.drone.right+1;
                    this.gY=this.drone.top+5;
                }else{
                    this.gX=this.drone.right-6;
                    this.gY=this.drone.top+5;
                }
                
            }else{
                this.droneNumber=-1;
                this.dGrab=false;
            }
            if(this.zapped>0){
                this.body.velocity.x=0;
                if(this.body.velocity.y<0)this.body.velocity.y=0;
                this.animations.stop();
                this.animations.frame=0;
                if(this.zapped===1){
                    this.shock.play();
                    this.energy-=160;
                }
                else if(this.zapped===60)this.zapped=-1;
                this.zapped++;
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)&&!(this.lGrab)&&this.energy>25&&!urgent&&this.body.velocity.y>10){
  //              console.log(this.top);
//                conole.log(this.body.left);
  //              console.log(this.body.right);
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                    var num1=Math.floor(this.right/32)*32;
                    var num2=Math.floor(this.top/32)*32;
                    var omer = this.layer.getTiles(num1,num2,32,32);
                    var johnDun=this.layer.getTiles(num1,num2-32,32,32);
                    var hunter=this.layer.getTiles(num1-32,num2-32,32,32);

                    if(omer[0].index!=-1&&johnDun[0].index==-1&&hunter[0].index==-1){
                        this.lGrab=true;
                        this.gX=omer[0].worldX;
                        this.gY=omer[0].worldY-2;
                    }
                }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
                    var num1=Math.floor(this.right/32)*32;
                    var num2=Math.floor(this.top/32)*32;
                    var omer = this.layer.getTiles(num1,num2,32,32);
                    var johnDun=this.layer.getTiles(num1,num2-32,32,32);
                    var hunter=this.layer.getTiles(num1+32,num2-32,32,32);
                    if(omer[0].index!=-1&&johnDun[0].index==-1&&hunter[0].index==-1){
                        this.lGrab=true;
                        this.gX=omer[0].worldX+28;
                        this.gY=omer[0].worldY-2;

                    }
                }
            }
            if(this.flinch){
                if(!this.shield){
                    if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W))this.health-=50;
                    else this.health-=25;
                }
                this.body.velocity.y = -this.jumpV*.6;
            }
            if((!(this.body.blocked.down || this.body.touching.down)||(this.body.blocked.up || this.body.touching.up))&&!this.lGrab) {               
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
            
      //      this.game.debug.body(this);
            let debug=true;
            if(this.energy<0)this.energy=0;
            if(debug){
                    if(this.game.input.keyboard.isDown(Phaser.Keyboard.R)){
                    this.gravity+=.08;
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.F)){
                    this.gravity-=0.08;
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.T)){
                    this.jumpV+=5;    
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.G)){
                    this.jumpV-=5;    
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
                    console.log(this.jumpV);
                    console.log(this.gravity);
                }
            }
            if(this.shield!=this.prevShield){
                if(this.shield){
                    this.loadTexture("shield",0);
                }else{
                    this.loadTexture("ethan",0);
                }
            }if(this.invis){
                this.tint= 0x888888;
                this.alpha = 0.4;
            }else{
                this.alpha=1;
                this.tint=0xFFFFFF;
            }
            if(this.crouch){
                
    //            this.body.height=31;
            }
            else if(this.lGrab){
                this.wait = 50;
                this.loadTexture("grab",0);
                this.body.offset = new Phaser.Point(1, 3);
                console.log()
                this.body.width=22;
                this.body.height=56;
                this.prevLgrab+=1*dTime;
                if(this.prevLgrab>30){
                this.energy-=.75;
                }
                this.right=this.gX+2;
                this.y=this.gY+1;
                this.gravity=0;
                this.body.velocity.y=0;
                this.body.velocity.x=0; 
                var fall= this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)&&this.prevLgrab>30;
                if(!fall&&this.dGrab&&this.drone.frame!=0&&this.drone.frame!=9)fall=true;
                if(fall||this.energy<10){
                    this.lGrab=false;
                    this.gravity=7.5; 
                    this.body.velocity.y=60;
                    this.prevLgrab=0;
                    if(this.dGrab){
                        this.dGrab=false;
                        this.droneNumber=-1;
                        this.drone=null;
                    }
                    if(this.shield){
                        this.loadTexture("shield",0);
                    }else{
                        this.loadTexture("ethan",0);
                    }
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height=62;
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)&&this.prevLgrab>45){
                    this.lGrab=false;
                    this.prevLgrab=0;
                    this.gravity=7.5; 
                    this.body.velocity.y = -this.jumpV;
                    if(this.shield){
                        this.loadTexture("shield",0);
                    }else{
                        this.loadTexture("ethan",0);
                    }
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height=62;

                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&this.scale.x==1&&this.prevLgrab>37){
                    this.lGrab=false;
                    this.gravity=7.5; 
                    console.log("wfe");
                    this.body.velocity.x=-500;
                    this.scale.x=-1;
                    this.prevLgrab=0;
                    this.body.velocity.y = -this.jumpV*.5;
                    if(this.shield){
                        this.loadTexture("shield",0);
                    }else{
                        this.loadTexture("ethan",0);
                    }    
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height=62;

                }
                if(this.dGrab&&this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&this.drone.body.velocity.x>0)this.scale.x=1;
                if(this.dGrab&&this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&&this.drone.body.velocity.x<0)this.scale.x=-1;

                if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&&this.scale.x==-1&&this.prevLgrab>37){
                    this.lGrab=false;
                    this.gravity=7.5; 
                    this.body.velocity.x=500;
                    this.scale.x=1;
                    this.prevLgrab=0;
                    this.body.velocity.y = -this.jumpV*.5;
                    if(this.shield){
                        this.loadTexture("shield",0);
                    }else{
                        this.loadTexture("ethan",0);
                    }    
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height=62;

                }
            }
            if(urgent)this.animations.frame=0;
            --this.wait;
            if (this.wait < 0){this.wait = 0;}
            if (!this.lGrab && this.energy < 400 && this.wait == 0)this.energy += 0.25 * (this.health / 400);
            this.previousX=this.x;

    	    this.previousTime = this.globalTime.ms;

        this.prevCrouch=this.crouch;
            this.prevShield=this.shield;
        }
     //   flinch(){
       //     this.y+10;
        //    this.body.velocity.y = -this.jumpV*.6;
  //
  //this.health-=50;
//
 //       }
  //      hit(){
            
   //     }
    }
}