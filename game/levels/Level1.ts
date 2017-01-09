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
        tintI:Phaser.Image;
        blasts:any;
        pause:Phaser.Button;
        resume:Phaser.Image;
        reset:Phaser.Image;
        
        create() {
            setUp(this, "sky");
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);

           // this.platforms = this.game.add.group();
            //this.platforms.enableBody = true;
      //      var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
       //     ground.scale.setTo(8, 2);
         //   ground.body.immovable = true;
            this.map = this.add.tilemap("map");
            this.map.addTilesetImage("Ship Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.drones=this.game.add.group();
            let drone= new Drone(this.game,150,240,300,this.drones,this.shipLayer);
            this.drones.setAll("body.immovable",true);
       //     this.shipLayer.debug = true;
            this.Obots=this.game.add.group();
            let obot = new Obot(this.game,550,404,660,this.Obots,this.shipLayer,this.player);
            let obot2 = new Obot(this.game,520,420,650,this.Obots,this.shipLayer,this.player);
            
            this.elevators= this.game.add.group();
            let elevator = new Elevator(this.game,576,310,493,this.elevators,1,"elevator");
            let elevator2 = new Elevator(this.game,850,310,542,this.elevators,-1,"elevator");
            this.elevators.setAll("Obots",this.Obots);
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.healthBar = new HealthBar(this.game);
            console.log("why");
            this.alarm=this.game.add.group();
            let alarm=new Alarm(this.game,384,64,"siren",this.alarm);
            let alarm2=new Alarm(this.game,288,64,"siren",this.alarm);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;
            this.pause=this.game.add.button(750,12,"pauseButton");
            this.pause.fixedToCamera=true;
            this.pause.onInputDown.add(this.pauseGame,this);
            this.pause.scale.x=.5;
            this.pause.scale.y=.5;
            this.resume=this.game.add.image(313, 150,"resume");
            this.resume.fixedToCamera=true;
            this.resume.alpha=0;
            this.reset=this.game.add.image(313, 150,"reset");
            this.reset.fixedToCamera=true;
            this.reset.alpha=0;
            this.sensors=this.game.add.group();
            let sensor=new Sensor(this.game,640,413,510,"",0,this.shipLayer);
       //     var sensor2=new Sensor(this.game,288,64,416,"",3,this.shipLayer);
    //        var sensor3=new Sensor(this.game,320,64,448,"",3,this.shipLayer);
           // this.sensors.add(sensor2);
          //  this.sensors.add(sensor3);
          this.blasts= this.game.add.group();
            for (let i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }

            this.setOff=false;
            this.prevSetoff=false;
            this.sensors.add(sensor);
            this.level1end = this.game.add.sprite(3000,300,"levelEnd");
            this.game.physics.arcade.enable(this.level1end);
            this.level1end.body.collideWorldBounds = true;
            this.level1end.animations.add("turn",[0,1,2,3,4],13,true);
            this.level1end.animations.play("turn");
            this.level1end.body.gravity.y=60;
            this.map.setCollision(1);
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
            this.bgMusic=this.game.add.audio("1", 0.6, true);
            this.bgMusic.play();
            this.siren=this.game.add.audio("alarm", 1, false);
        }
        
        update(){
            //this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.alien, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            //this.game.physics.arcade.collide(this.Obots, this.player);
            this.game.physics.arcade.overlap(this.blasts, this.player,this.harm);
         //   this.game.physics.arcade.collide(this.Obots, this.elevator.glass);
         //   this.game.physics.arcade.collide(this.elevator.glass,this.player );
            //var x = this.game.physics.arcade.collide(this.elevator.glass,this.player );
             this.resume.alpha=0;
            if(this.Obots.getAll("frame",19).length>0||this.drones.getAll("frame",9).length>0||this.sensors.getAll("triggered",true).length>0){
                this.setOff=true;
             }if(this.prevSetoff==false&&this.setOff==true){
                 this.siren.play();
                 this.alarm.callAllExists("setOff",true);
                 this.tintI.alpha=0.1;
             }
            this.blasts.callAll("update2",null,this.player);
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
                this.pauseGame();
            }
            //w this.elevators.callAllExists("update");
           // if(this.tbots.animations.frame>=14){
            //     this.alarm.animations.play("strobe");
             //    this.alarm.tintI.alpha=.1;
              //   }
             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x = this.player.health*.125;
             //this.healthBar.scale.height = 2.5;
            let moveOn = this.game.physics.arcade.collide(this.player, this.level1end);
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
           if(this.game.physics.arcade.collide(this.player, this.level1end)){
                console.log("congratulations, you beat level1");
                this.bgMusic.stop();
                if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                    localStorage.setItem("clearedLevel", "1");
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
           this.drones.callAllExists("updateLine",true,this.playerLine);
           this.Obots.callAllExists("updateLine",true,this.playerLine);
  //          this.tbots.updateLine(this.playerLine,this.map,this.shipLayer);
        }pauseUpdate(){
            TSAGame.pauseU(this,this.resume,this.reset);
            
        }pauseGame(){
            this.game.paused=true;
        }harm(player:any,blast:any){
            player.health-=50;
            blast.kill();
        }

        
    }
}