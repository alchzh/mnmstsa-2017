namespace TSAGame {
    export var alarmsOn=false;
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
        instructions:Phaser.Sprite;
        tintI:Phaser.Image;
        blasts:any;
        pause:Phaser.Button;
        resume:Phaser.Image;
        reset:Phaser.Image;
        retry:Phaser.Button;
        eCryo:Phaser.Sprite;
        will:Phaser.Image;
        cryopod:Phaser.Sprite;
        
        create() {
            setUp(this, "sky");
            this.player = new Player(this.game, 30, 284);
            this.game.camera.follow(this.player);
            this.game.world.resize(3200, 600);

           // this.platforms = this.game.add.group();
            //this.platforms.enableBody = true;
      //      var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
       //     ground.scale.setTo(8, 2);
         //   ground.body.immovable = true;
            this.map = this.add.tilemap("map");
            this.map.addTilesetImage("Ship Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.drones=this.game.add.group();
            let drone= new Drone(this.game,320,384,416,this.drones,this.shipLayer);
            let drone2= new Drone(this.game,2464,280,2784,this.drones,this.shipLayer);
            let drone3 = new Drone(this.game,1600,416,1888,this.drones,this.shipLayer);
            let drone4 = new Drone(this.game,1216,432,1280,this.drones,this.shipLayer);
            let drone5 = new Drone(this.game,576,192,832,this.drones,this.shipLayer);

            this.drones.setAll("body.immovable",true);
       //     this.shipLayer.debug = true;
            this.Obots=this.game.add.group();
            let obot = new Obot(this.game,350,500,460,this.Obots,this.shipLayer,this.player);
            let obot2 = new Obot(this.game,1600,224,1664,this.Obots,this.shipLayer,this.player);
            let obot3 = new Obot(this.game,1824,320,1952,this.Obots,this.shipLayer,this.player);
            let obot4 = new Obot(this.game,2160,480,2272,this.Obots,this.shipLayer,this.player);
            let obot5 = new Obot(this.game,2415,416,2560,this.Obots,this.shipLayer,this.player);

            this.healthBar = new HealthBar(this.game);
            this.elevators= this.game.add.group();
            let elevator = new Elevator(this.game,864,352,485,this.elevators,1,"elevator");
            let elevator2 = new Elevator(this.game,2592,352,182,this.elevators,1,"elevator");
            this.elevators.setAll("Obots",this.Obots);
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.alarm=this.game.add.group();
            let alarm=new Alarm(this.game,384,64,"siren",this.alarm);
            let alarm2=new Alarm(this.game,288,64,"siren",this.alarm);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            this.eCryo=this.game.add.sprite(0,270,"cryopod");
            this.game.physics.arcade.enable(this.eCryo);
            this.eCryo.body.collideWorldBounds = true;
            this.eCryo.body.gravity.y = 60;
            this.eCryo.body.immovable=true;
            this.eCryo.scale.x=-1;
            this.eCryo.frame=1;
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;
            this.sensors=this.game.add.group();
            let sensor=new Sensor(this.game,736,64,736,"",3,this.shipLayer,this.sensors);
            let sensor2=new Sensor(this.game,768,64,768,"",3,this.shipLayer,this.sensors);
            let sensor3=new Sensor(this.game,1504,128,320,"",0,this.shipLayer,this.sensors);
            let sensor4=new Sensor(this.game,1504,160,352,"",0,this.shipLayer,this.sensors);
            this.game.paused=false;

            this.blasts= this.game.add.group();
            for (let i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }

            this.setOff=false;
            this.prevSetoff=false;
            this.level1end = this.game.add.sprite(2900,300,"levelEnd");
            this.game.physics.arcade.enable(this.level1end);
            this.level1end.body.collideWorldBounds = true;
            this.level1end.animations.add("turn",[0,1,2,3,4],13,true);
            this.level1end.animations.play("turn");
            this.level1end.body.gravity.y=60;
            this.map.setCollision([1,2,4,5,6]);
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
            this.bgMusic=this.game.add.audio("1", 0.6, true);
            this.bgMusic.play();
            this.siren=this.game.add.audio("alarm", 1, false);
            this.cryopod=this.game.add.sprite(2920,64,"cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable=true;
            this.cryopod.animations.add("jayant", [1,1,1,1,1,1,1,1,1,1,1,3,4,5,6,7], 12);
            this.pause=this.game.add.button(700,12,"pauseButton");
            this.pause.fixedToCamera=true;
            this.pause.onInputDown.add(this.pauseGame,this);
            this.pause.scale.x=.5;
            this.pause.scale.y=.5;
            this.instructions=this.game.add.sprite(0,0,"instructions_paused");
            this.instructions.alpha=0;
            this.instructions.fixedToCamera=true;
            this.resume=this.game.add.image(50, 500,"resume");
            this.resume.fixedToCamera=true;//
            this.resume.alpha=0;
            this.reset=this.game.add.image(400, 500,"reset");
            this.reset.fixedToCamera=true;
            this.reset.alpha=0;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.retry=this.game.add.button(750,12,"retry");
            this.retry.fixedToCamera=true;
            this.retry.onInputDown.add(this.restart,this);
        }
        
        update(){
            //this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.eCryo);
            this.game.physics.arcade.collide(this.eCryo, this.shipLayer);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            let awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.alien, this.shipLayer);
            this.game.physics.arcade.collide(this.level1end, this.shipLayer);
        
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            //this.game.physics.arcade.collide(this.Obots, this.player);
            this.game.physics.arcade.overlap(this.blasts, this.player,this.harm);
         //   this.game.physics.arcade.collide(this.Obots, this.elevator.glass);
         //   this.game.physics.arcade.collide(this.elevator.glass,this.player );
            //var x = this.game.physics.arcade.collide(this.elevator.glass,this.player );
             this.resume.alpha=0;
             this.reset.alpha=0;
            this.instructions.alpha=0;

            if(this.Obots.getAll("frame",20).length>0||this.drones.getAll("frame",9).length>0||this.sensors.getAll("triggered",true).length>0){
                this.setOff=true;
             }if(this.prevSetoff==false&&this.setOff==true){
                 this.siren.play();
                 this.alarm.callAllExists("setOff",true);
                 this.tintI.alpha=0.1;
             }
            this.blasts.callAll("update2",null,this.player);
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
                this.pauseGame();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)&&this.button2.visible){
                this.button2.up();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)&&this.button1.visible){
                this.button1.up();
            }
            if(awake&&this.cryopod.frame==0)this.cryopod.animations.play("jayant");

            //w this.elevators.callAllExists("update");
           // if(this.tbots.animations.frame>=14){
            //     this.alarm.animations.play("strobe");
             //    this.alarm.tintI.alpha=.1;
              //   }
             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x = this.player.health*.125;
             //this.healthBar.scale.height = 2.5
             if(this.cryopod.frame==7){
                this.level1end.alpha=1;

            if(this.game.physics.arcade.collide(this.player, this.level1end)){
                console.log("congratulations, you beat level1");
                this.bgMusic.stop();
                if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                    localStorage.setItem("clearedLevel", "1");
                }
                this.game.state.start("level2");
            }
             }else{
                 this.level1end.alpha=0;
             }
            this.sensors.setAll("drones",this.drones);
            this.sensors.setAll("pl",this.playerLine);
            this.sensors.setAll("blasts",this.blasts);
            this.elevators.setAll("playerX",this.player.x);
            this.elevators.setAll("playerY",this.player.bottom);
            this.Obots.setAll("playerX",this.player.x);
            this.Obots.setAll("playerY",this.player.bottom);
            this.Obots.setAll("player",this.player);

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
           
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.B)){
                this.game.paused = true;
            }
    	    if(this.player.alpha==1){
    	        this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
    	    }else{
    	        this.playerLine.setTo(0.0,0,0,0);
    	    }
    	    this.prevSetoff=this.setOff;
           this.drones.callAllExists("updateLine",true,this.playerLine);
           this.Obots.callAllExists("updateLine",true,this.playerLine);
  //          this.tbots.updateLine(this.playerLine,this.map,this.shipLayer);
        }pauseUpdate(){
            console.log("Hi");
            this.instructions.alpha=1;
            TSAGame.pauseU(this,this.resume,this.reset);
        }pauseGame(){
            this.game.paused=true;
        }harm(player:any,blast:any){
            player.health-=67;
            blast.kill();
        }
        restart(){
            //if (window.confirm("Are you sure you want to restart this level?")){  // I beat them. I got detected, but I still beat 'em.
                this.game.sound.stopAll();
                this.game.state.start("level1");
            //}
        }
        
    }
}