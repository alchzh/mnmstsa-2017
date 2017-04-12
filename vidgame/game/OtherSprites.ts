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
        spriteStuck:boolean;
        myNumber:number;
        reverse:boolean;
        callBack:Phaser.Sprite;
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
            this.myNumber=group.children.length;
            this.glass.scale.y = 6.4444;
            game.add.existing(this);
            this.moving = false;
            this.spriteStuck=false;
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
            if(scale==1){
                if(this.reverse) this.callBack=new Phaser.Sprite(game,x+40,y+14,type+"CallBack");
                else this.callBack=new Phaser.Sprite(game,x+40,y2+16,type+"CallBack");
            }else{
                if(this.reverse)this.callBack=new Phaser.Sprite(game,x+26,y+14,type+"CallBack");
                else this.callBack=new Phaser.Sprite(game,x+26,y2+16,type+"CallBack");
                this.callBack.scale.x*=-1;
            }
            this.callBack.maxHealth=500;
            this.callBack.health=420;
            group.add(this);
            group.add(this.glass);
            group.add(this.callBack);

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
            if(!x&&this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
                var cBack=this.callBack;
                if(this.playerX-cBack.x<15&&this.playerX-cBack.x>-5&&this.playerY-cBack.y>5&&this.playerY-cBack.y<60){
                    x=true;
                }
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
            if(this.spriteStuck)this.pauseMovement=true;
            if(this.frame==0) this.glass.x=this.x+46;
            if(this.frame==1)this.glass.x=this.x;
            this.glass.y=this.y;
            if(this.pauseMovement==true){
                this.body.velocity.y = 0;
            }else if(this.moving&&this.body.velocity.y==0){
                if(this.direction==-1){
                    this.body.velocity.y=120;
                }if(this.direction==1){
                    this.body.velocity.y=-120;
                }
            }
            if(!this.reverse){
                if (this.body.velocity.y == 120 && !(this.y <= this.y2)) {
                    this.body.velocity.y = 0;
                    this.y = this.y2;
                    this.moving = false;
                }
                else if (this.body.velocity.y== -120 && this.y <= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    this.callBack.y=this.y2+18;
                    this.moving = false;
                    
                }
            }else{
                if (this.body.velocity.y == -120 && !(this.y >= this.y2)) {
                    console.log(this.y2);
                    console.log(this.y);
                    console.log(this.body.velocity.y);
                    console.log("WHY")

                    this.body.velocity.y = 0;
                    this.direction=0;
                    this.y = this.y2+1;
                    this.moving = false;
                }
                else if (this.body.velocity.y== 120 && this.y >= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    this.moving = false;
                    console.log("f u 2");
                }
            }if(x && this.game.input.keyboard.isDown(Phaser.Keyboard.Z) &&  (!this.moving||this.prevPM>50)){
                this.move();
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
            this.spriteStuck=false;
        }

        move() {
            this.moving = true;
            console.log(this.left)
            console.log(this.game.camera.x);
            if(this.left<this.game.camera.x+800&&this.right>this.game.camera.x){
                this.sound.play();
            }
            if(!this.reverse){
                if (this.y == this.y2||this.prevPM>50) {
                    this.prevPM=0;
                    this.pauseMovement=false;
                    this.direction=1;
                    this.y-=3;
                    this.body.velocity.y = -120;
                }
                else {
                    this.direction=-1;
                    this.body.velocity.y = 120;
                }
            }else{
                if (this.y != this.y2+1) {
                    console.log("it is: " + this.y)
                    this.pauseMovement=false;
                    this.direction=1;
                    this.body.velocity.y = -120;
                }
                else {
                    this.y+=3;
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
        lasting:Phaser.Image;
        cooldown:Phaser.Image;

        constructor(game:Phaser.Game) {
            super(game,80, 20, "button1");
            game.add.existing(this);
            this.fixedToCamera = true;
            this.invis = false;
			this.animations.add('over', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12,11,10,9,8,7,6,5,4,3,2,1,0], 16);
            this.onInputOver.add(this.over, this);
            this.onInputUp.add(this.up, this);
//            this.onInputOut.add(this.out, this);
            this.time = game.time.create(false);
//            this.setFrames(0, 0, 9, 9);
            this.avail = game.time.create(false);
            this.lasting = new Phaser.Image(game, 80, 70, "lasting");
        //    this.lasting.alpha = 0;
            game.add.existing(this.lasting);
            this.lasting.scale.y=.2;
            this.lasting.scale.x=.1;
            this.lasting.fixedToCamera = true;
            this.cooldown = new Phaser.Image(game, 80, 20, "cooldown");
            this.cooldown.visible=false;
            game.add.existing(this.cooldown);
            this.cooldown.fixedToCamera = true;
            this.cooldown.animations.add('cooldown', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 4/3);
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
            this.cooldown.visible = true;
            this.cooldown.animations.play("cooldown", 4/3, true);
            this.cooldown.animations.frame = 0;
            this.invis = true;
            this.visible = false;
            this.exists = false;
            this.time.add(Phaser.Timer.SECOND * 4, this.finish, this);
			this.time.start(0);
            this.avail.add(Phaser.Timer.MINUTE * 0.5, () => {
                this.visible = true;
                this.exists = true;
                this.cooldown.visible = false;
                if (this.animations.frame) this.animations.frame = 0;
            })
			this.avail.start(0);
        }update(){
            if(this.invis){
                this.lasting.scale.x=(this.time.duration*.000025);
               this.lasting.visible=true;

            }
            else this.lasting.visible=false;

        }
    }
    export class Shield extends Phaser.Button {
        shield:boolean;
        time:Phaser.Timer;
        avail:Phaser.Timer;
        cooldown:Phaser.Image;
        lasting:Phaser.Image;

        constructor(game:Phaser.Game) {
            super(game,20, 20, "button2");
            this.shield = false;
            game.add.existing(this);
            this.fixedToCamera = true;
            this.onInputOver.add(this.over, this);
            this.onInputUp.add(this.up, this);
//            this.onInputOut.add(this.out, this);
            this.animations.add('over', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 16);
            this.time = game.time.create(false);
            this.avail = game.time.create(false);
            this.lasting = new Phaser.Image(game, 20, 70, "lasting");
        //    this.lasting.alpha = 0;
            game.add.existing(this.lasting);
            this.lasting.scale.y=.2;
            this.lasting.scale.x=.1;
            this.lasting.fixedToCamera = true;

            this.cooldown = new Phaser.Image(game, 20, 20, "cooldown");
            this.cooldown.visible=false;
            game.add.existing(this.cooldown);
            this.cooldown.fixedToCamera = true;
            this.cooldown.animations.add('cooldown', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 4/3);
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
            this.cooldown.visible = true;
            this.cooldown.animations.play("cooldown", 4/3, true);
            this.cooldown.animations.frame = 0;
            this.exists = false;
            this.shield = true;
            this.time.add(Phaser.Timer.SECOND * 4.5, this.finish, this);
			this.time.start(0);
			this.avail.add(Phaser.Timer.MINUTE * .5, () => {
                this.cooldown.visible = false;
                this.exists = true;
                if (this.animations.frame) this.animations.frame = 0;
            });
			this.avail.start(0);
        }update(){
            if(this.shield){
                this.lasting.scale.x=(this.time.duration*.000025);
               this.lasting.visible=true;

            }
            else this.lasting.visible=false;

        }
    }
    export class HealthBar extends Phaser.Image {
        playerHp:number;
        heart:any;
        maxhp:any;
        constructor(game:Phaser.Game) {
            super(game, 175, 15, "Laser");

            this.fixedToCamera = true;

 //           this.scale.x = 0.4;
            this.scale.y = 1.5;
            this.maxhp = game.add.sprite(175, 15, 'Laser');
            this.maxhp.fixedToCamera = true;
            this.maxhp.scale.y = 1.5;
            this.maxhp.scale.x = 25;
            this.maxhp.tint = 0xaaaaaa;
            game.add.existing(this);
            this.heart = game.add.sprite(150, 4, 'heart');
            this.heart.fixedToCamera = true;
            
        }

    }
    export class EnergyBar extends Phaser.Image{
        playerEp:number;
        bolt:any;
        far:any;
        constructor(game:Phaser.Game) {
            super(game, 175, 45, "xxx");

            this.fixedToCamera = true;

 //           this.scale.x = 0.4;
            this.scale.y = 1.5;
            this.far = game.add.sprite(175, 45, 'xxx');
            this.far.fixedToCamera = true;
            this.far.scale.y = 1.5;
            this.far.scale.x = 25;
            this.far.tint = 0xaaaaaa;
            game.add.existing(this);
            this.bolt = game.add.sprite(157, 39, 'energy');
            this.bolt.fixedToCamera = true;
            this.bolt.scale.x=2;
            this.bolt.scale.y=2;
        }

    }
    export class DialogueBoxCasual extends Phaser.Image{
        person:Phaser.Image;
        pName:Phaser.Text;
        text:Phaser.Text;
        time:Phaser.Timer;
        vis:boolean;
        constructor(game:Phaser.Game) {
            super(game, 100, 480, "talky box");
            game.add.existing(this);
            this.person=this.game.add.image(120,490,"ehead");
            this.vis = false;
            game.add.existing(this.person);
            this.scale.y=4;
            this.scale.x=4;
            this.person.scale.y=3;
            this.person.scale.x=3;
            this.time = game.time.create(false);
            this.pName= new Phaser.Text(game, 115, 545,"Ethan");
            game.add.existing(this.pName);
            this.pName.fixedToCamera=true;
            this.text= new Phaser.Text(game, 190, 490," ");
            game.add.existing(this.text);
            this.text.fixedToCamera=true;
            this.visible=false;
            this.pName.visible=false;
            this.text.visible=false;
            this.person.visible=false;
            this.person.fixedToCamera=true;
            this.fixedToCamera = true;
            this.text.fontSize = 20;
            this.pName.font = "courier new";
            this.pName.fontSize = 20;
            this.text.addColor('#ff0000', 0);
            this.pName.addColor('#ff0000', 0);
            this.text.font = "courier new";
            this.person.alpha=.75;
            this.alpha=.75;
            this.text.alpha=.75;
            this.pName.alpha=.75;
            this.text.stroke = '#000000';
            this.text.strokeThickness = 1;
            this.pName.stroke = '#000000';
            this.pName.strokeThickness = 1;
        }
        update(){
            if(urgent){this.visible=false;}else{if (this.vis){this.visible = true;}}
            this.pName.visible=this.visible;
            this.text.visible=this.visible;
            this.person.visible=this.visible;
        }
        talk(text:string,talker:string,talkerName:string,time:number){
            this.text.text=text;
            this.visible=true;
            this.vis = true;
            this.pName.text = talkerName;
            this.person.loadTexture(talker,0);

            this.time.add(Phaser.Timer.SECOND * time, this.expire, this);
			this.time.start(0);

        }
        expire(){
            this.visible =false;
            this.vis = false;
        }
        }
    export class DialogueBoxUrgent extends Phaser.Image{
        person:Phaser.Image;
        Z:Phaser.Image;
        pName:Phaser.Text;
        text:Phaser.Text;
        time:Phaser.Timer;
        realText:string;
        finish:number;
        finished:number;
        timer:number;
        prevZ:boolean;
        blip:any;
        selects:any

        constructor(game:Phaser.Game) {
            super(game, 100, 480, "talky box");
            game.add.existing(this);
            this.person=this.game.add.image(120,490,"ehead");
            game.add.existing(this.person);
            this.scale.y=4;
            this.timer=0;
            this.scale.x=4;
            this.person.scale.y=3;
            this.person.scale.x=3;
            this.blip = this.game.add.audio("blip", 0.2, false);
            this.prevZ=false;
            this.Z=this.game.add.image(668,548,"zee");
            this.Z.fixedToCamera=true;
            this.time = game.time.create(false);
            this.pName= new Phaser.Text(game, 115, 545,"HIHIHIHIHIHIH");
            game.add.existing(this.pName);
            this.pName.fixedToCamera=true;
            this.text= new Phaser.Text(game, 190, 490," ");
            game.add.existing(this.text);
            this.text.fixedToCamera=true;
            this.visible=false;
            this.Z.visible=false;
            this.pName.visible=false;
            this.text.visible=false;
            this.finish=0;
            this.person.visible=false;
            this.realText="blank";
            this.person.fixedToCamera=true;
            this.fixedToCamera = true;
            this.text.fontSize = 20;
            this.pName.font = "courier new";
            this.pName.fontSize = 20;
            this.text.addColor('#ff0000', 0);
            this.pName.addColor('#ff0000', 0);
            this.text.font = "courier new";
            this.selects = this.game.add.audio("talknext", 0.5, false);
            this.text.stroke = '#000000';
            this.text.strokeThickness = 1;
            this.pName.stroke = '#000000';this.pName.strokeThickness = 1;
        }
        update(){
            
            if(this.visible&&this.text.text!==this.realText){
                this.timer++;
                if(this.timer>3){
                    this.text.text+=this.realText[this.text.text.length];
                    this.timer=0;
                    this.blip.play();
                }
                this.Z.visible=false;
                if(!this.prevZ&&this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
                    this.text.text=this.realText;    
                }
            }
            else {
                this.Z.visible=this.visible;
                if(!this.prevZ&&this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
                    this.finish=this.finished;
                    if (this.visible)this.selects.play();
                    this.text.text=this.realText;
                    this.visible = false;
                    urgent = false;
                }
                
            }
            
            this.pName.visible=this.visible;
            this.text.visible=this.visible;
            this.person.visible=this.visible;
            this.prevZ=this.game.input.keyboard.isDown(Phaser.Keyboard.Z);
        }
        talk(text:string,talker:string,talkerName:string,finished=0){
            this.realText=text;
            this.text.text=text[0];
            this.visible=true;
            this.finished=finished;
            this.pName.text=talkerName;
            this.pName.visible=true;
            
            this.person.loadTexture(talker,0);
            if(talker=="no")this.person.alpha=0;
            else this.person.alpha=1;
            urgent=true;
        }
    }
    export class Alarm extends Phaser.Image{

        prevAlarms:boolean;
        lights:Phaser.Image;
        constructor(game:Phaser.Game,x:number,y:number,type:string,group:Phaser.Group,angle:number) {
            super(game,x,y,type);
            game.add.existing(this)
            group.add(this);
            this.prevAlarms=false;
            this.animations.add("strobe",[10,9,8,7,6,5,4,3,2,1,2,3,4,5,6,7,8,9,], 15,true);
            this.lights=game.add.image(x+16,y,"lights");
            this.lights.alpha=.3;
            this.lights.visible=false;
            this.angle = angle;
            this.lights.anchor.setTo(0.5, 0.5);
        }update(){

            if(!alarmsOn&&this.prevAlarms){
                console.log("hello");
                this.animations.stop();
                this.frame=0;
            this.lights.visible=false;

            }
            this.prevAlarms=alarmsOn;

        }
        setOff(){
            console.log("f");
            this.animations.play("strobe");
            this.lights.visible=true;
        }
        stop(){
            this.animations.stop();
            this.frame=0;
            this.lights.visible=false;
        }
    }
    export class Chain extends Phaser.Image{
        glow:any;
        constructor(game:Phaser.Game,x:number,y:number,show=false) {
            super(game,x,y,"chain");
            game.add.existing(this)
            this.glow=game.add.image(x-60,y+40,"lights");
            this.glow.alpha=.4;
            this.glow.scale.x=.5;
            this.glow.scale.y=.5
            if(show)this.glow.visible=false;
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
        seesing:boolean;
        blasts:any;
        detected:boolean;
        prevDetected:number;
        lTimer:Phaser.Timer;
        cantMove:boolean;
        blastSound:any;

        constructor(game:Phaser.Game,x:number,y:number,pos2:number,type:string,direction:number,layer:any,group:any) {
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
            this.cantMove= x==pos2;
            this.seesing=false;
            if(direction==1||direction==3)this.originPos=x-16;
            else this.originPos=y;
            group.add(this);
            this.canUse=true;
            this.direction=direction;
            this.direction2=1;
            this.lTimer = game.time.create(false);
            this.layer=layer;
            this.drones=undefined;
            this.pl=new Phaser.Line(0,0,0,0);
            this.triggered=false;
            this.detected=false;
            this.animations.add("shoot",[0,1,2,3,4,5,6,7],15);
            this.blastSound = this.game.add.audio("blast", 0.2, false);
            this.blasts=game.add.group();
        }
        update(){
        //    this.game.debug.body(this);
            this.seesing=false;
            if(this.direction===1||this.direction===3){
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
                }
                if(this.canUse){
                    if(this.direction==3){
                    this.laser.setTo(this.x, this.y,this.x+1, 600);
                    var done=false;
                    if(this.drones!=undefined){

                        var droneL=new Phaser.Line(0, 0, 0, 0);
                        for(var i =0; i<this.drones.children.length&&!done;i++){
                            var drone=this.drones.children[i];
                            droneL.setTo(drone.left,drone.top,drone.right,drone.top);
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
                    this.laser.setTo(this.x, this.y-6 , this.x+1, laserEnd);
    	            this.myLaser.scale.x=.125;
    	            this.myLaser.scale.y=this.laser.length * 0.125;
    	            this.myLaser.left = this.laser.x;
                    this.myLaser.top = this.laser.y;


                    }else{
                    this.laser.setTo(this.x , this.y,this.x+1, 0);
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
                    this.laser.setTo(this.x, this.y + 10, this.x+1, laserEnd);
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
                    var laserEnd=0;

                    if(this.drones!=undefined){

                        var droneL=new Phaser.Line(0, 0, 0, 0);
                        for(var i =0; i<this.drones.children.length; i++){
                            var drone=this.drones.children[i];
                            droneL.setTo(drone.x+24,drone.top,drone.x+24,drone.bottom);
                            if(droneL.intersects(this.laser, true)){
                                laserEnd=drone.x+24;
                            }
                        }
                    }
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;

                        for  (var i = 0; i < tilehits.length&&realTile===-1; i++) {

                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1 - i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            if(tilehits[realTile].worldX + 32>laserEnd)laserEnd = tilehits[realTile].worldX + 32;
                        }
                        else {
                            laserEnd = 0;
                        }

//                    console.log(realTile);
                    this.laser.setTo(this.x + 4, this.y, laserEnd, this.y);
    	            this.myLaser.scale.x=this.laser.length * 0.125;
    	            this.myLaser.scale.y=.125;
    	            this.myLaser.left = this.laser.x;
                    this.myLaser.top = this.laser.y;


                    }else{
                    this.laser.setTo(this.x - 4, this.y-1,4800, this.y+1);
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
                            laserEnd = 4800;
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
            if(this.frame==7){
                this.blastSound.play();
                if(this.direction==3)this.blasts.getFirstDead().addIn(this.x, this.y,0,1.6,this.direction*90,"lightning bolt");
                else if(this.direction==1)this.blasts.getFirstDead().addIn(this.x, this.y,0,-1.5,this.direction*90,"lightning bolt");
                else if(this.direction==0)this.blasts.getFirstDead().addIn(this.x, this.y,-1,0,this.direction*90,"lightning bolt");
                else this.blasts.getFirstDead().addIn(this.x, this.y,1,0,this.direction*90,"lightning bolt");
                this.frame=0;
                this.lTimer.add(Phaser.Timer.SECOND * 3, this.finish, this);
			    this.lTimer.start(0);
                this.canUse=false;
            }

        }
        if(this.pl.intersects(this.laser, true)){
            this.seesing=true;
            this.triggered=true;
            this.animations.play("shoot");
        }
        if(this.triggered){
    //        this.blast.player=this.pl;
     //       this.blast.udpate2();
        }
        if(this.cantMove)this.body.velocity.x=0;

    }finish(){
        this.canUse=true;
    }

    }
    export class Sensor2 extends Phaser.Sprite{
        tintI:Phaser.Image;
        laser:any;
        myLaser:Phaser.Image;
        direction:number;
        direction2:number;
        originPos:number;
        pos2:number;
        layer:any;
        seesing:boolean;
        drones:any;
        canUse:boolean;
        prevAlarms:boolean;
        pl:Phaser.Line;
        triggered:boolean;
        blasts:any;
        detected:boolean;
        prevDetected:number;
        lTimer:Phaser.Timer;
        blastSound:any;
        cantMove:boolean;

        constructor(game:Phaser.Game,x:number,y:number,pos2:number,type:string,direction:number,layer:any,group:any) {
            super(game,x-16,y+16,"hidden sensor");
            game.add.existing(this);
            game.physics.arcade.enableBody(this);

            this.anchor.setTo(0.5, 0.5);
            this.seesing=false;
            this.angle+= direction*90;
            this.laser = new Phaser.Line(0, this.y, 200, this.y);
			this.myLaser = this.game.add.image(this.x, this.y, 'Laser');
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.scale.y = 0.125;
            this.pos2=pos2;
            if(direction==1||direction==3)this.originPos=x-16;
            else this.originPos=y;
            group.add(this);
            this.canUse=true;
            this.direction=direction;
            this.cantMove= x==pos2;

            this.direction2=1;
            this.lTimer = game.time.create(false);
            this.layer=layer;
            this.drones=undefined;
            this.pl=new Phaser.Line(0,0,0,0);
            this.triggered=false;
            this.detected=false;
            this.prevAlarms=false;
            this.animations.add("shoot",[3,4,5,6,7,8],10);
            this.animations.add("open",[0,1,2,3],8);
            this.animations.add("close",[3,2,1,0],8);
            this.blastSound = this.game.add.audio("blast", 0.2, false);
            this.blasts=game.add.group();
        }
        update(){
            this.seesing=false;
            if(alarmsOn){
            if(!this.prevAlarms)this.animations.play("open");
            if(this.direction===1||this.direction===3){
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
                }
                if(this.originPos==this.pos2)this.body.velocity.x=0;
                if(this.canUse){
                    if(this.direction==3){
                    this.laser.setTo(this.x , this.y,this.x, 600);
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
                    this.laser.setTo(this.x , this.y-6 , this.x, laserEnd);
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
                    this.laser.setTo(this.x, this.y + 10, this.x, laserEnd);
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
                    var laserEnd=0;

                    if(this.drones!=undefined){

                        var droneL=new Phaser.Line(0, 0, 0, 0);
                        for(var i =0; i<this.drones.children.length; i++){
                            var drone=this.drones.children[i];
                            droneL.setTo(drone.right,drone.top,drone.right,drone.bottom);
                            if(droneL.intersects(this.laser, true)){
                                laserEnd=drone.right;
                            }
                        }
                    }
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;

                        for  (var i = 0; i < tilehits.length&&realTile===-1; i++) {

                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1) realTile = tilehits.length - 1 - i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            if(tilehits[realTile].worldX + 32>laserEnd)laserEnd = tilehits[realTile].worldX + 32;
                        }
                        else {
                            laserEnd = 0;
                        }

//                    console.log(realTile);
                    this.laser.setTo(this.x + 4, this.y, laserEnd, this.y);
    	            this.myLaser.scale.x=this.laser.length * 0.125;
    	            this.myLaser.scale.y=.125;
    	            this.myLaser.left = this.laser.x;
                    this.myLaser.top = this.laser.y;


                    }else{
                    this.laser.setTo(this.x - 4, this.y-1,4800, this.y+1);
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
                            laserEnd = 4800;
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

        if(this.frame>3){
            this.body.velocity.x=0;
            if(this.frame==8){
                this.blastSound.play();
                if(this.direction==3)this.blasts.getFirstDead().addIn(this.x, this.y,0,1.6,this.direction*90,"arrow");
                else if(this.direction==1)this.blasts.getFirstDead().addIn(this.x, this.y,0,-1.6,this.direction*90,"arrow");
                else if(this.direction==0)this.blasts.getFirstDead().addIn(this.x, this.y,-1.6,0,this.direction*90,"arrow");
                else this.blasts.getFirstDead().addIn(this.x, this.y,1.6,0,this.direction*90,"arrow");
                this.frame=3;
                this.lTimer.add(Phaser.Timer.SECOND * 3, this.finish, this);
			    this.lTimer.start(0);
                this.canUse=false;
            }

        }
        if(this.pl.intersects(this.laser, true)){
            this.triggered=true;
            this.seesing=true
            this.animations.play("shoot");
        }
        if(this.triggered){
    //        this.blast.player=this.pl;
     //       this.blast.udpate2();
        }
        }else{
            if(this.prevAlarms)this.animations.play("close");
            this.body.velocity.x=0;
            this.body.velocity.y=0;

            this.laser.setTo(0,0,0,0);
            this.myLaser.scale.x=.125;
    	    this.myLaser.scale.y=this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;

        }
        if(this.cantMove)this.body.velocity.x=0;

        this.prevAlarms=alarmsOn;
    }finish(){
        this.canUse=true;
    }

    }
    export class Cannon extends Phaser.Sprite{
       boom:any;
       Awaken:boolean;
       player:any;
       barrel:any;
       blasts:any;
       angel:number;
       rotatoin:number;
       constructor(game:Phaser.Game,x:number,y:number,direction:number,layer:any,group:any) {
           super(game,x,y,"cannonBase");
           this.barrel=game.add.image(x,y,"cannonBase");

           this.player=null;
           group.add(this);
           this.barrel.alpha=0;
           this.anchor.setTo(0.5, 0.8);
           this.barrel.anchor.setTo(0.5, 0.8);
           this.barrel.frame=4;
           this.Awaken=false;
           this.angel=0;
           this.rotatoin=direction*1.57;
           this.rotation=direction*1.57;
           this.barrel.rotation=direction*1.57;
            this.blasts=game.add.group();
           this.animations.add("awaken",[0,1,2,3,4,5,6,7],10);
           this.animations.add("chill",[7,7,7,6,5,4,3,2,1,0],10);
           this.animations.add("fire",[8,9,10,11,12,13,14,15,16,17],15);
           this.boom = this.game.add.audio("cannon", 0.25, false);
       }
       update(){
           if(this.Awaken){
               if(this.left<this.game.camera.x+800&&this.right>this.game.camera.x){
               
                    this.angel=1.57+this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
                    if(this.angel<1.57+this.rotatoin&&this.angel>-1.57+this.rotatoin){
                        this.animations.play("awaken");
                    }
               }
                else{
                    this.Awaken=false;
                }
           }
           if(this.frame==7&&this.Awaken){
               this.animations.stop();
               this.Awaken=false;
               this.frame=8;
               this.barrel.alpha=1;
               this.animations.play("fire");
           }
           if(this.barrel.alpha==1){
               this.angel=1.57+this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
               if(this.angel>1.57+this.rotatoin){
                   this.rotation=1.57+this.rotatoin;
               }else if(this.angel<-1.57+this.rotatoin){
                   this.rotation=-1.57+this.rotatoin;
               }else{
                this.rotation=this.angel;
               }
           }if(this.frame==0)this.rotation=this.rotatoin;
           if(this.frame==10)this.boom.play();
            if(this.animations.currentAnim.name=="awaken")this.rotation=this.rotatoin;
           if(this.frame==17)this.Fire();
       }
       ChillBruh(){
           this.rotation=this.rotatoin;
           this.barrel.alpha=0;
           this.animations.play("chill");
       }
       Fire(){
           this.frame=8;
           let vel= this.game.physics.arcade.velocityFromAngle(this.angle-90,1);
           this.blasts.getFirstDead().addIn(this.x, this.y,vel.x*2,vel.y*2.36,this.angle);
           this.ChillBruh();
       }
   }
   
}