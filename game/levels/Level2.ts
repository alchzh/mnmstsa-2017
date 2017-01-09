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
        siren:any;
        aliens:any;
        setOff:boolean;
        pause:Phaser.Button;
        resume:Phaser.Image;
        prevSetoff:boolean;
        elevators:any;
        tintI:any;

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
            console.log("yo person what is up. How was your day? M");
            this.level2End = this.game.add.sprite(3000,300,"levelEnd");
            this.game.physics.arcade.enable(this.level2End);
            this.level2End.body.collideWorldBounds = true;
            this.level2End.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level2End.animations.play("turn");
            this.level2End.body.gravity.y = 60;
            this.alarm=this.game.add.group();
            
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;
            let alarm=new Alarm(this.game,384,224,"siren2",this.alarm);
            let alarm2=new Alarm(this.game,448,224,"siren2",this.alarm);
            this.elevators= this.game.add.group();
            let elevator = new Elevator(this.game,672,480,224,this.elevators,1,"alienElevator");
            let elevator2 = new Elevator(this.game,736,192,92,this.elevators,-1,"alienElevator");

            this.drones=this.game.add.group();
            let drone= new Drone(this.game,256,320,448,this.drones,this.shipLayer);
            let drone2= new Drone(this.game,832,180,928,this.drones,this.shipLayer);
            let drone3= new Drone(this.game,1184,320,1344,this.drones,this.shipLayer);

            this.drones.setAll("body.immovable",true);

            this.tbots = this.game.add.group();
            let tbot2=new TBot(this.game,212,404,660,this.shipLayer,this.tbots,this.player);

            this.Obots=this.game.add.group();
            let obot = new Obot(this.game,850,64,950,this.Obots,this.shipLayer,this.player);
            
            this.sensors=this.game.add.group();
            let sensor=new Sensor(this.game,1152,192,1376,"",3,this.shipLayer);
            
            this.pause=this.game.add.button(750,12,"pauseButton");
            this.pause.fixedToCamera=true;
            this.pause.onInputDown.add(this.pauseGame,this);
            this.pause.scale.x=.5;
            this.pause.scale.y=.5;
            this.resume=this.game.add.image(313, 150,"resume");
            this.resume.fixedToCamera=true;
            this.resume.alpha=0;
         //   let tbot=new TBot(this.game,550,404,660,this.shipLayer);
        //    this.tbots.add(tbot);
        //    this.tbots.add(tbot2);
            this.aliens=this.game.add.group();
            
            let alien= new Alien(this.game,410,400,524,this.shipLayer,this.aliens);
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.healthBar = new HealthBar(this.game);
            this.bgMusic = this.game.add.audio("second", 0.6, true);
            this.bgMusic.play();
            this.siren=this.game.add.audio("alarm", 1, false);
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
            let moveOn = this.game.physics.arcade.collide(this.player, this.level2End);
            this.resume.alpha=0;
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
    	    }
    	    let alAlert= this.aliens.getAll("isTriggered",true).length>0;
    	    let alDrone=this.drones.getAll("frame",9).length>0;
    	    let alObot=this.Obots.getAll("frame",19).length>0;
            this.sensors.setAll("drones",this.drones);
            this.sensors.setAll("pl",this.playerLine);
    	    if(this.tbots.getAll("frame",19).length>0||alAlert||alDrone||alObot){
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

    	    this.prevSetoff=this.setOff;

             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;
           this.tbots.callAllExists("updateLine",true,this.playerLine);
            this.aliens.callAllExists("updateLine",true,this.playerLine);
            this.drones.callAllExists("updateLine",true,this.playerLine);
            this.Obots.callAllExists("updateLine",true,this.playerLine);

        }pauseUpdate(){
            TSAGame.pauseU(this,this.resume);

        }pauseGame(){
            this.game.paused=true;
        }
        alerted(player:any,Alien:any){
            Alien.triggered();
        }
    }
}