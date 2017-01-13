namespace TSAGame {
    export class Level3 extends Phaser.State{
        player: TSAGame.Player;
        level3End:Phaser.Sprite;
        goOn:boolean;
        button1:Invis; 
        button2:Shield;
        healthBar:HealthBar;
        bgMusic:Phaser.Sound;
        map:any;
        Obots:any;
        shipLayer:any;
        aliens:any;
        cryopod:any;
        pause:Phaser.Button;
        resume:Phaser.Image;
        reset:Phaser.Image;
        retry:Phaser.Button;
        elevators:any;
        level3end:any;
        setOff:boolean;
        prevSetoff:boolean;
        siren:any;
        alarm:any;
        tintI:Phaser.Image;
        playerLine:any;
        blasts:any;
        instructions:any;
        tbots:any;
        sensors:any;
        timer:any;
        
        
        create(){
            setUp(this,"lvl3");
            // console.log("hi");
            this.player = new Player(this.game, 128, 0);
            this.game.camera.follow(this.player);
            this.game.world.resize(4800, 600);
            console.log("hopefully this is the");
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);

            this.map = this.add.tilemap("map3");
            this.map.addTilesetImage("Level 3 tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.map.setCollision([1,2,3]);
            this.healthBar = new HealthBar(this.game);
            this.elevators=this.game.add.group();
            let elevator = new Elevator(this.game,4352,528,400,this.elevators,1,"alienElevator");
            
            this.Obots=this.game.add.group();
            let obot = new Obot(this.game,736,192,928,this.Obots,this.shipLayer,this.player);
            let obot2 = new Obot(this.game,1952,480,2112,this.Obots,this.shipLayer,this.player);
            let obot3 = new Obot(this.game,2624,416,2816,this.Obots,this.shipLayer,this.player);
            let obot4 = new Obot(this.game,3872,448,4128,this.Obots,this.shipLayer,this.player);

            this.aliens=this.game.add.group();
            var alien=new Alien(this.game,10,128,320,this.shipLayer,this.aliens);
            var alien2=new Alien(this.game,1330,128,1380,this.shipLayer,this.aliens);
            var alien3=new Alien(this.game,1280,400,1330,this.shipLayer,this.aliens);
            var alien4=new Alien(this.game,3600,256,3680,this.shipLayer,this.aliens);
            var alien5=new Alien(this.game,4192,160,4288,this.shipLayer,this.aliens);
            var alien5=new Alien(this.game,3860,320,3934,this.shipLayer,this.aliens);

            this.tbots=this.game.add.group();
            let tbot=new TBot(this.game,872,384,1024,this.shipLayer,this.tbots,this.player);
            let tbot2=new TBot(this.game,1430,160,1504,this.shipLayer,this.tbots,this.player);
            let tbot3=new TBot(this.game,1920,320,2176,this.shipLayer,this.tbots,this.player);
            let tbot4=new TBot(this.game,2528,320,2688,this.shipLayer,this.tbots,this.player);
            let tbot5=new TBot(this.game,3220,400,3424,this.shipLayer,this.tbots,this.player);

            this.sensors=this.game.add.group();
            let sensor=new Sensor(this.game,1408,264,448,"",0,this.shipLayer,this.sensors);
            let sensor2=new Sensor(this.game,1280,264,448,"",2,this.shipLayer,this.sensors);
            let sensor3=new Sensor(this.game,1408,328,512,"",0,this.shipLayer,this.sensors);
            let sensor4=new Sensor(this.game,1280,328,512,"",2,this.shipLayer,this.sensors);
            let sensor5=new Sensor(this.game,2496,128,2816,"",3,this.shipLayer,this.sensors);
            let sensor6=new Sensor(this.game,4000,64,4288,"",3,this.shipLayer,this.sensors);

            this.level3end = this.game.add.sprite(4640,300,"levelEnd");
            this.game.physics.arcade.enable(this.level3end);
            this.level3end.body.collideWorldBounds = true;
            this.level3end.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level3end.animations.play("turn");
            this.level3end.body.gravity.y = 60;
            this.cryopod=this.game.add.sprite(4704,416,"cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable=true;
            this.cryopod.animations.add("james", [1,1,1,13,14,15,16,17], 7);
            
            this.blasts= this.game.add.group();
            for (let i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }
            this.button1=new Invis(this.game);
            this.button2=new Shield(this.game);
            this.bgMusic=this.game.add.audio("third", 0.6, true);
            this.bgMusic.play();
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
            this.siren=this.game.add.audio("alarm", 1, false);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;

            this.reset.scale.y = 2;
            this.retry=this.game.add.button(750,12,"retry");
            this.retry.fixedToCamera=true;
            this.retry.onInputDown.add(this.restart,this)
        }
        update(){
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.overlap(this.blasts, this.player,this.harm);
            this.game.physics.arcade.collide(this.aliens, this.player,this.alerted);
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.shipLayer, this.level3end);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            let awake = this.game.physics.arcade.collide(this.player, this.cryopod);

            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
                
            
            if(this.player.alpha==1){
    	        this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
    	    }else{

    	        this.playerLine.setTo(0.0,0,0,0);
    	    }
            if(awake&&this.cryopod.frame==0)this.cryopod.animations.play("james");

    	    let alAlert= this.aliens.getAll("isTriggered",true).length>0;
    	    let alObot=this.Obots.getAll("frame",20).length>0;
    	    var alSense=this.sensors.getAll("triggered",true).length>0;

    	    if(this.tbots.getAll("frame",19).length>0||alAlert ||alObot||alSense){
                this.setOff=true;
                TSAGame.alarmsOn=true;
             }if(this.prevSetoff==false&&this.setOff==true){
                 console.log("hi");
                 this.siren.play();
                 this.alarm.callAllExists("setOff",true);
                 this.tintI.alpha=0.1;
                this.timer = this.game.time.create(true);
                this.timer.add(16000, function pancake() {this.tintI.alpha = 0;}, this);
                this.timer.start();
             }
        //    this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.resume.alpha=0;
            this.reset.alpha=0;
            this.instructions.alpha = 0;
            
            if(this.cryopod.frame==17){
                this.level3end.alpha=1;
                let moveOn = this.game.physics.arcade.collide(this.player, this.level3end);
                if(moveOn){
                    this.bgMusic.stop();
                    console.log("Congratulations, you beat the game");
                    if (parseInt(localStorage.getItem("clearedLevel")) < 3) {
                        localStorage.setItem("clearedLevel", "3");
                    }
                    this.game.state.start("WIN");

                }
            }else{
                this.level3end.alpha=0;
            }
            
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
                this.pauseGame();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)&&this.button2.visible){
                this.button2.up();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)&&this.button1.visible){
                this.button1.up();
            }
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
            this.sensors.setAll("pl",this.playerLine);
            this.sensors.setAll("blasts",this.blasts);
            this.Obots.setAll("blasts",this.blasts);
            this.tbots.setAll("blasts",this.blasts);
            this.aliens.setAll("blasts",this.blasts);

            this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;
             this.tbots.callAllExists("updateLine",true,this.playerLine);
            this.aliens.callAllExists("updateLine",true,this.playerLine);
            this.Obots.callAllExists("updateLine",true,this.playerLine);

        }pauseUpdate(){
            TSAGame.pauseU(this,this.resume,this.reset);
            this.instructions.alpha = 1;

        }pauseGame(){
            this.game.paused=true;
        }
        restart(){
            this.game.sound.stopAll();
            this.game.state.start("level3");
            
        }alerted(player:any,Alien:any){
            Alien.triggered();
        }
        harm(player:any,blast:any){
            if(!player.shield){
                player.health-=40;
            }
            blast.kill();
        }
        }
        

    }
