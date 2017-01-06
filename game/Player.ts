namespace TSAGame {
    
    export class Player extends Phaser.Sprite {
        checkpointX:number;
        checkpointY:number;
        playerScale:number;
        jumpV:number;
        shield:boolean;
        invis:boolean;
        prevShield:boolean;
        hitPlatform:boolean;
        
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'ethan', 0);
            
            game.add.existing(this);
            game.physics.arcade.enable(this);
//            game.time.desiredFps = 30;
            this.health = 200;
            this.anchor.setTo(0.5, 0);
            this.body.gravity.y = 450;
            this.body.collideWorldBounds = true;
            this.playerScale = 1;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
            this.hitPlatform = true;
            this.jumpV = 250;
            this.animations.add('walk', [4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17], 14);
//            this.width = 48;
//            this.height = 96;
            this.body.offset = new Phaser.Point(8.75, 0);
            this.body.width *= 0.4;
            this.shield = false;
            this.invis = false;
            this.prevShield = false;
        }

        public update() {
            if(this.health<0.01){
                this.game.state.start("select");
            }
            var dTime=0.0;
            if(this.game.time.fps>2){
                dTime = 60/this.game.time.fps;
            }else{
                dTime=1;
            }
//            this.animations.play("walk");
            
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = -165*dTime;
                this.animations.play('walk');

                if (this.scale.x == this.playerScale) {
                    this.scale.x = -this.playerScale;
                }
            }
            
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {

                this.body.velocity.x += 165*dTime;
                this.animations.play('walk');

                if (this.scale.x == -this.playerScale) {
                    this.scale.x = this.playerScale;
                }
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                    this.animations.frame =0;
                }
            }else if(!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))){
                this.animations.frame=0;
            }
            else if(!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
               this.animations.frame = 0;
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down || this.body.touching.down)) {
                this.body.velocity.y = -this.jumpV;
            }

            if(this.body.velocity.y >=.9||this.body.velocity.y <=-.9) {               
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
            
//            this.game.debug.body(this);
            var debug=true;
            
            if(debug){
                    if(this.game.input.keyboard.isDown(Phaser.Keyboard.R)){
                    this.body.gravity.y+=5;
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.F)){
                    this.body.gravity.y-=5;
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.T)){
                    this.jumpV+=5;    
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.G)){
                    this.jumpV-=5;    
                }if(this.game.input.keyboard.isDown(Phaser.Keyboard.K)){
                    console.log(this.jumpV);
                    console.log(this.body.gravity.y);
                }
            }
            if(this.shield!=this.prevShield){
                if(this.shield){
                    this.loadTexture("shield",0);
                }else{
                    this.loadTexture("ethan",0);
                }    
            }if(this.invis){
                this.tint= 0x666666;
                this.alpha = 0.2;
            }else{
                this.alpha=1;
                this.tint=0xFFFFFF;
            }//if(this.game.input.keyboard.isDown(Phaser.Keyboard.N)){
             //   this.game.paused = true;
        //    }
            this.prevShield=this.shield;
        }
  //      hit(){
            
   //     }
    }
    export class Level1 extends Phaser.State{
        
        player: TSAGame.Player;
        platform69s: any;
        drones: any;
        Obots:any;
        map:any;
        shipLayer:any;
        playerLine: Phaser.Line;
        boss: FBoss;
        level1end:Phaser.Sprite;
        ended:boolean;
        elevators:any;
        elevatorX:number[];
        button1:Invis;
        button2:Shield;
        healthBar:HealthBar;
        alarm:Phaser.Group;
        sensors:any;
        setOff:boolean;
        prevSetoff:boolean;
        siren:Phaser.Sound;
        bgMusic:Phaser.Sound;
        alien:Alien;
        tintI:Phaser.Image;
        blasts:any;
        pause:Phaser.Button;
        unPause:Phaser.Button;
        create() {
            this.ended=false;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.resize(3200, 600);
            this.game.add.sprite(0, 0, 'sky');
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.boss = new FBoss(this.game);
            this.game.time.advancedTiming = true;

           // this.platforms = this.game.add.group();
            //this.platforms.enableBody = true;
      //      var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
       //     ground.scale.setTo(8, 2);
         //   ground.body.immovable = true;
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('Ship Tileset');
            this.shipLayer = this.map.createLayer('Tile Layer 1');
            this.drones=this.game.add.group();
            var drone= new Drone(this.game,150,240,300,this.drones,this.shipLayer);
            this.drones.setAll("body.immovable",true);
       //     this.shipLayer.debug = true;
            this.Obots=this.game.add.group();
                var obot = new Obot(this.game,550,404,660,this.Obots,this.shipLayer);
            var obot2 = new Obot(this.game,520,420,650,this.Obots,this.shipLayer);
            
            this.elevators= this.game.add.group();
            var elevator = new Elevator(this.game,576,310,493,this.elevators,1);
            var elevator2 = new Elevator(this.game,850,310,542,this.elevators,-1);
            this.elevators.setAll("Obots",this.Obots);
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.healthBar = new HealthBar(this.game);
            this.alarm=this.game.add.group();

            var alarm=new Alarm(this.game,384,64,"siren",this.alarm);
            var alarm2=new Alarm(this.game,288,64,"siren",this.alarm);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;
            this.pause=this.game.add.button(750,12,"pauseButton");
            this.pause.fixedToCamera=true;
            this.pause.onInputDown.add(this.pauseGame,this);
            this.unPause=this.game.add.button(750,12,"pauseButton");
            this.unPause.fixedToCamera=true;
            this.unPause.onInputDown.add(this.unpauseGame,this);
            this.sensors=this.game.add.group();
            var sensor=new Sensor(this.game,256,64,384,"",3,this.shipLayer);
       //     var sensor2=new Sensor(this.game,288,64,416,"",3,this.shipLayer);
    //        var sensor3=new Sensor(this.game,320,64,448,"",3,this.shipLayer);
           // this.sensors.add(sensor2);
          //  this.sensors.add(sensor3);
          this.blasts= this.game.add.group();
            for (var i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }

            this.setOff=false;
            this.prevSetoff=false;
            this.sensors.add(sensor);
            this.level1end = this.game.add.sprite(3000,300,"levelEnd");
            this.game.physics.arcade.enable(this.level1end);
            this.level1end.body.collideWorldBounds = true;
            this.level1end.animations.add('turn',[0,1,2,3,4],13,true);
            this.level1end.animations.play('turn');
            this.level1end.body.gravity.y=60;
            this.map.setCollision(1);
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
            this.bgMusic=this.game.add.audio('first', 0.6, true);
            this.bgMusic.play();
            this.siren=this.game.add.audio('alarm', 1, false);
        }
        
        update(){
            //this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.alien, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            
            this.game.physics.arcade.collide(this.blasts, this.player);
         //   this.game.physics.arcade.collide(this.Obots, this.elevator.glass);
         //   this.game.physics.arcade.collide(this.elevator.glass,this.player );
            //var x = this.game.physics.arcade.collide(this.elevator.glass,this.player );
             this.unPause.input.enabled=false;
             this.pause.input.enabled=true;
            if(this.Obots.getAll('frame',19).length>0||this.drones.getAll('frame',9).length>0||this.sensors.getAll('triggered',true).length>0){
                this.setOff=true;
             }if(this.prevSetoff==false&&this.setOff==true){
                 this.siren.play();
                 this.alarm.callAllExists('setOff',true);
                 this.tintI.alpha=0.1;
             }
            this.blasts.callAllExists('update2',true);

            //w this.elevators.callAllExists("update");
           // if(this.tbots.animations.frame>=14){
            //     this.alarm.animations.play("strobe");
             //    this.alarm.tintI.alpha=.1;
              //   }
             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x = this.player.health*.125;
             //this.healthBar.scale.height = 2.5;
            var moveOn = this.game.physics.arcade.collide(this.player, this.level1end);
            if(moveOn){
                this.bgMusic.stop();
                console.log("Congragulations, you beat level1");
                this.game.state.start("level2");

            }
            this.sensors.setAll("drones",this.drones);
            this.sensors.setAll("pl",this.playerLine);
            this.sensors.setAll("blasts",this.blasts);
            this.elevators.setAll("playerX",this.player.x);
            this.elevators.setAll("playerY",this.player.bottom);
            this.elevators.setAll("Obots",this.Obots);
      /*      if(this.elevator.moving==true&&this.elevator.direction==-1){
                if(this.elevator.left-this.Obots.left<=0&&this.elevator.right-this.Obots.right>=0&&this.Obots.direction==1){
                    if(this.elevator.bottom-this.Obots.top<=1&&this.elevator.bottom-this.Obots.top>=-3){
                        this.elevator.pauseMovement=true;
                    }
                }else if(this.elevator.left-this.Obots.right<=0&&this.elevator.right-this.Obots.left>=0&&this.Obots.direction==-1){
                    if(this.elevator.bottom-this.Obots.top<=1&&this.elevator.bottom-this.Obots.top>=-3){
                        this.elevator.pauseMovement=true;
                    }
                }else{
                    this.elevator.pauseMovement=false;
                }
            }*/
            this.player.health-=.2;
           if(this.game.physics.arcade.collide(this.player, this.level1end)){
                console.log("congratulations, you beat level1");
                this.bgMusic.stop();
                if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                    localStorage.setItem("clearedLevel", "1")
                }
                this.game.state.start("level2");
            }
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.B)){
                this.game.paused = true;
            }
    	    if(this.player.alpha==1){
    	        this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
    	    }else{
    	        this.playerLine.setTo(0.0,0,0,0);
    	    }
    	    this.prevSetoff=this.setOff;
           this.drones.callAllExists('updateLine',true,this.playerLine);
           this.Obots.callAllExists('updateLine',true,this.playerLine);
  //          this.tbots.updateLine(this.playerLine,this.map,this.shipLayer);
        }pauseUpdate(){
            this.unPause.input.enabled=true;
             this.pause.input.enabled=false;
        }pauseGame(){
            this.game.paused=true;
        }unpauseGame(){
            this.game.paused=false;
        }

        
    }
    
    export class Level2 extends Phaser.State{
        player: TSAGame.Player;
        level2End:Phaser.Sprite;
        button1:Invis;
        button2:Shield;
        playerLine: Phaser.Line;
        alarm:Phaser.Group;
        healthBar:HealthBar;
        bgMusic:Phaser.Sound;
        tbots:any;
        map:any;
        shipLayer:any;
        aliens:any;
        elevators:any;

        create(){
            if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                localStorage.setItem("clearedLevel", "1");
            }
            this.game.add.sprite(0, 0, 'lvl2');
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.game.world.resize(3200, 600);
            this.game.time.advancedTiming = true;

            this.map = this.add.tilemap('map2');
            this.map.addTilesetImage('Ship2 Tileset');
            this.shipLayer = this.map.createLayer('Tile Layer 3');
            this.map.setCollision(1);
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
            console.log("yo pers0n what is up.");
            this.level2End = this.game.add.sprite(3000,300,"levelEnd");
            this.game.physics.arcade.enable(this.level2End);
            this.level2End.body.collideWorldBounds = true;
            this.level2End.animations.add('turn', [0, 1, 2, 3, 4], 13, true);
            this.level2End.animations.play('turn');
            this.level2End.body.gravity.y = 60;
            this.alarm=this.game.add.group();

            var alarm=new Alarm(this.game,384,224,"siren2",this.alarm);
            var alarm2=new Alarm(this.game,448,224,"siren2",this.alarm);
            this.tbots = this.game.add.group();
            var tbot=new TBot(this.game,550,404,660,this.shipLayer);
            var tbot2=new TBot(this.game,300,404,660,this.shipLayer);
            this.tbots.add(tbot);
            this.tbots.add(tbot2);
            this.aliens=this.game.add.group();
            
            var alien= new Alien(this.game,300,400,600,this.shipLayer,this.aliens);
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.healthBar = new HealthBar(this.game);
            this.bgMusic = this.game.add.audio('second', 0.6, true);
            this.bgMusic.play();
        }
        update(){
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.player,this.alerted);

            var moveOn = this.game.physics.arcade.collide(this.player, this.level2End);
            if(moveOn){
                this.bgMusic.stop();
                console.log("Congratulations, you beat level2");
                if (parseInt(localStorage.getItem("clearedLevel")) < 2) {
                    localStorage.setItem("clearedLevel", "2");
                }
                this.game.state.start("level3");

            }if(this.player.alpha==1){
    	        this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
    	    }else{

    	        this.playerLine.setTo(0.0,0,0,0);
    	    }if(this.tbots.getAll('frame',19).length>0){
                this.alarm.callAllExists('setOff',true);
                 this.alarm.setAll("tintI.alpha",0.1/this.alarm.children.length);
             }
            //this.elevators.setAll("playerX",this.player.x);
        //    this.elevators.setAll("playerY",this.player.bottom);
            this.aliens.setAll("playerX",this.player.right);
            this.aliens.setAll("playerY",this.player.bottom);
            

             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;
           this.tbots.callAllExists('updateLine',true,this.playerLine);
            this.aliens.callAllExists('updateLine',true,this.playerLine);

        }
        alerted(player:any,Alien:any){
            Alien.triggered();
        }
    }
    export class Level3 extends Phaser.State{
        player: TSAGame.Player;
        level3End:Phaser.Sprite;
        goOn:boolean;
        button1:Invis; 
        button2:Shield;
        healthBar:HealthBar;
        bgMusic:Phaser.Sound;
        map:any;
        shipLayer:any;
        aliens:any;
        elevators:any;
        tbots:any;
        
        create(){
            this.game.add.sprite(0, 0, 'lvl3');
            console.log("hi");
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.game.world.resize(3200, 600);
            this.game.time.advancedTiming = true;

            this.level3End = this.game.add.sprite(3000,300,"bigAlienElevator");
            this.game.physics.arcade.enable(this.level3End);
            this.level3End.body.collideWorldBounds = true;
            this.level3End.body.gravity.y=60;
            
            this.map = this.add.tilemap('map3');
            this.map.addTilesetImage('Level 3 tileset');
            this.shipLayer = this.map.createLayer('Tile Layer 1');
            this.map.setCollision(1);

            this.button1=new Invis(this.game);
            this.button2=new Shield(this.game);
            this.healthBar=new HealthBar(this.game);
            this.bgMusic=this.game.add.audio('third', 0.6, true);
            this.bgMusic.play();


        }
        update(){
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);

        //    this.game.physics.arcade.collide(this.tbots, this.shipLayer);

            var moveOn = this.game.physics.arcade.collide(this.player, this.level3End);
            if(moveOn){
                console.log("congratulations, you have made it to the final boss!");
                this.game.state.start("finalBoss");
            }
            this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;

        }
    }
    export class FinalBoss extends Phaser.State{
        player: TSAGame.Player;
        gameEnd:Phaser.Sprite;
        button1:Invis;
        button2:Shield;
        healthBar:HealthBar;
        create(){   
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.game.world.resize(1600,600);
            this.gameEnd = this.game.add.sprite(1400,300,"levelEnd");
            this.gameEnd.animations.add('turn',[0,1,2,3,4],13,true);
            this.gameEnd.animations.play('turn');
            this.game.physics.arcade.enable(this.gameEnd);
            this.gameEnd.body.collideWorldBounds = true;
            this.gameEnd.body.gravity.y=60;
            this.game.world.resize(1600, 600);
            this.button1=new Invis(this.game);
            this.button2=new Shield(this.game);
            this.healthBar=new HealthBar(this.game);

        }
        update(){
            var moveOn = this.game.physics.arcade.collide(this.player, this.gameEnd);
            if(moveOn){
                this.game.sound.mute = true;
                console.log("congratulations, you beat the game");
             //   this.game.paused=true;
                this.game.state.start("select");

            }
             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;

        }
    }
}