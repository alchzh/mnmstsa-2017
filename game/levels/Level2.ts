namespace TSAGame {
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
        Obots:any;
        drones:any;
        map:any;
        sensors:any;
        shipLayer:any;
        instructions:Phaser.Sprite;

        siren:any;
        aliens:any;
        setOff:boolean;
        pause:Phaser.Button;
        resume:Phaser.Image;
        reset:Phaser.Image;
        blasts:any;
        prevSetoff:boolean;
        elevators:any;
        tintI:any;
        will:Phaser.Image;

        cryopod:Phaser.Sprite;

        create(){
            if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                localStorage.setItem("clearedLevel", "1");
            }
            setUp(this,"lvl2");
            
            this.player = new Player(this.game, 30, 284);
            this.game.camera.follow(this.player);
            this.setOff=false;
            this.prevSetoff=false;
            this.map = this.add.tilemap("map2");
            this.map.addTilesetImage("Ship2 Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 3");
            this.map.setCollision([1,2,4,5,6]);
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
            this.level2End = this.game.add.sprite(3488,260,"levelEnd");
            this.game.physics.arcade.enable(this.level2End);
            this.level2End.body.collideWorldBounds = true;
            this.level2End.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level2End.animations.play("turn");
            this.level2End.body.gravity.y = 60;
            this.alarm=this.game.add.group();
            this.cryopod=this.game.add.sprite(3142,128,"cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable=true;
            this.cryopod.animations.add("will", [1,1,1,1,1,1,1,1,1,1,1,3,4,5,6,7], 12);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;
            
            let alarm=new Alarm(this.game,384,224,"siren2",this.alarm);
            let alarm2=new Alarm(this.game,448,224,"siren2",this.alarm);
            this.elevators= this.game.add.group();
            let elevator = new Elevator(this.game,672,480,228,this.elevators,1,"alienElevator");
            let elevator2 = new Elevator(this.game,736,188,92,this.elevators,-1,"alienElevator");
            let elevator3 = new Elevator(this.game,1696,480,160,this.elevators,1,"alienElevator");

            this.drones=this.game.add.group();
            let drone= new Drone(this.game,256,320,448,this.drones,this.shipLayer);
            let drone2= new Drone(this.game,820,176,940,this.drones,this.shipLayer);
            let drone3= new Drone(this.game,1224,320,1344,this.drones,this.shipLayer);
            let drone4= new Drone(this.game,2600,448,2848,this.drones,this.shipLayer);

            this.drones.setAll("body.immovable",true);

            this.tbots = this.game.add.group();
            let tbot=new TBot(this.game,150,404,290,this.shipLayer,this.tbots,this.player);
            let tbot2=new TBot(this.game,1810,350,1900,this.shipLayer,this.tbots,this.player);
            let tbot3=new TBot(this.game,2656,352,2816,this.shipLayer,this.tbots,this.player);

            this.healthBar = new HealthBar(this.game);
            this.Obots=this.game.add.group();
            let obot = new Obot(this.game,850,64,950,this.Obots,this.shipLayer,this.player);
            
            this.sensors=this.game.add.group();
            let sensor=new Sensor(this.game,1152,192,1376,"",3,this.shipLayer,this.sensors);
            let sensor2=new Sensor(this.game,2304,256,416,"",0,this.shipLayer,this.sensors);

            this.blasts= this.game.add.group();
            for (let i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }
         //   let tbot=new TBot(this.game,550,404,660,this.shipLayer);
        //    this.tbots.add(tbot);
        //    this.tbots.add(tbot2);
            this.aliens=this.game.add.group();
            
            let alien= new Alien(this.game,410,400,524,this.shipLayer,this.aliens);
            let alien2= new Alien(this.game,2710,256,2784,this.shipLayer,this.aliens);

            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.bgMusic = this.game.add.audio("second", 0.6, true);
            this.bgMusic.play();
            this.siren=this.game.add.audio("alarm", 1, false);
            this.pause=this.game.add.button(750,12,"pauseButton");
            this.pause.fixedToCamera=true;
            this.pause.onInputDown.add(this.pauseGame,this);
            this.pause.scale.x=.5;
            this.pause.scale.y=.5;
            this.instructions=this.game.add.sprite(0,0,"instructions");
            this.instructions.alpha=0;
            this.resume=this.game.add.image(50, 500,"resume");
            this.resume.fixedToCamera=true;
            this.resume.alpha=0;
            this.reset=this.game.add.image(400, 500,"reset");
            this.reset.fixedToCamera=true;
            this.reset.alpha=0;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
        }
        update(){
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.player,this.alerted);
            this.game.physics.arcade.collide(this.shipLayer, this.level2End);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            let awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.overlap(this.blasts, this.player,this.harm);

            
            
            this.resume.alpha=0;
            if(this.cryopod.frame==12){
                this.level2End.alpha=1;
                this.game.add.sprite(200,30,"wull");
                let moveOn = this.game.physics.arcade.collide(this.player, this.level2End);
                if(moveOn){
                    this.bgMusic.stop();
                    console.log("Congratulations, you beat level2");
                    if (parseInt(localStorage.getItem("clearedLevel")) < 2) {
                        localStorage.setItem("clearedLevel", "2");
                    }
                    this.game.state.start("level3");

                }
            }else{
                this.level2End.alpha=0;
            }
            this.reset.alpha=0;
            if(awake&&this.cryopod.frame==0)this.cryopod.animations.play("will");
            if(this.player.alpha==1){
    	        this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
    	    }else{

    	        this.playerLine.setTo(0.0,0,0,0);
    	    }if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
                this.pauseGame();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)&&this.button2.visible){
                this.button2.up();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)&&this.button1.visible){
                this.button1.up();
            }
    	    let alAlert= this.aliens.getAll("isTriggered",true).length>0;
    	    let alDrone=this.drones.getAll("frame",9).length>0;
    	    let alObot=this.Obots.getAll("frame",20).length>0;
    	    var alSense=this.sensors.getAll("triggered",true).length>0;

    	    if(this.tbots.getAll("frame",19).length>0||alAlert||alDrone||alObot||alSense){
                this.setOff=true;
                TSAGame.alarmsOn=true;
             }if(this.prevSetoff==false&&this.setOff==true){
                 this.siren.play();
                 this.alarm.callAllExists("setOff",true);
                 this.tintI.alpha=0.1;
             }
            //this.elevators.setAll("playerX",this.player.x);
        //    this.elevators.setAll("playerY",this.player.bottom);
            this.aliens.setAll("playerX",this.player.right);
            this.aliens.setAll("playerY",this.player.bottom);
            this.tbots.setAll("playerX",this.player.x);
            this.tbots.setAll("playerY",this.player.bottom);
            this.tbots.setAll("player",this.player);
            this.Obots.setAll("playerX",this.player.x);
            this.Obots.setAll("playerY",this.player.bottom);
            this.Obots.setAll("player",this.player);
            this.elevators.setAll("playerX",this.player.x);
            this.elevators.setAll("playerY",this.player.bottom);
            this.elevators.setAll("Obots",this.Obots);
            this.sensors.setAll("drones",this.drones);
            this.sensors.setAll("pl",this.playerLine);
            this.sensors.setAll("blasts",this.blasts);

    	    this.prevSetoff=this.setOff;
            this.instructions.alpha=0;

             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;
           this.tbots.callAllExists("updateLine",true,this.playerLine);
            this.aliens.callAllExists("updateLine",true,this.playerLine);
            this.drones.callAllExists("updateLine",true,this.playerLine);
            this.Obots.callAllExists("updateLine",true,this.playerLine);

        }pauseUpdate(){
            TSAGame.pauseU(this,this.resume,this.reset);
            this.instructions.alpha=1;

        }pauseGame(){
            this.game.paused=true;
        }
        alerted(player:any,Alien:any){
            Alien.triggered();
        }harm(player:any,blast:any){
            if(player.shield===false){
                player.health-=50;
            }
            console.log(player.shield);
            blast.kill();
        }
            restart(){
            if (window.confirm("Are you sure you want to restart this level?")){
                this.game.state.start("level2");
            }
    }
}}