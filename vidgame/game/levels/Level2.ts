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
        energyBar:EnergyBar;
        door1:any;
        tbots:any;
        Obots:any;   
        drones:any;
        comp1:any;
        comp2:any;
        map:any;
        map2:any;
        sensors:any;
        duckBot:any;
        sensors2:any;
        shipLayer:any;
        instructions:Phaser.Sprite;
        boril:any;
        Aldis:any;
        scientists:any;
        timer:any;
        siren:any;
        aliens:any;
        setOff:boolean;
        pause:Phaser.Button;
        resume:Phaser.Image;
        factoryBg:any;
        otherLayer:any;
        reset:Phaser.Image;
        cannons:any;
        retry:Phaser.Button;
        blasts:any;
        prevSetoff:boolean;
        inFacility:boolean;
        almostDone:boolean;
        elevators:any;
        tintI:any;
        will:Phaser.Image;
        door:Phaser.Sprite;
        talky1:DialogueBoxCasual;
        talky2:DialogueBoxUrgent;
        order:number;
        cryopod:Phaser.Sprite;
        warntalk:boolean;

        create(){
            levelOn = 2;
            if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                localStorage.setItem("clearedLevel", "1");
            }
            setUp(this,"lvl2");
                        this.factoryBg=this.game.add.image(0,0,"factoryBG");
            this.factoryBg.visible=false;

            this.player = new Player(this.game, 69, 160);
            this.game.camera.follow(this.player);
            this.setOff=false;
            this.prevSetoff=false;
            this.alarm=this.game.add.group();
            this.order=0;
            let alarm=new Alarm(this.game,384,160,"siren2",this.alarm,0);
            let alarm2=new Alarm(this.game,448,160,"siren2",this.alarm,0);
            this.warntalk = true;
            this.almostDone=false;
            let chain1=new Chain(this.game,3051,32);
            let chain2=new Chain(this.game,2922,32);
            let chain3=new Chain(this.game,3179,32);
            
            this.inFacility=false;
            this.map = this.add.tilemap("map2");
            this.map.addTilesetImage("Ship2 Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 3");
            this.map.setCollision([1,2,3,4,7,8,9,10,13,14,15,16,19,20,21,22,25,26,27,28]);
            this.player.layer=this.shipLayer;
            
            this.map2 = this.add.tilemap("facility");
            this.map2.addTilesetImage("Ship2 Tileset");
            this.otherLayer = this.map2.createLayer("Tile Layer 1");
            this.map2.setCollision([1,2,3,4,7,8,9,10,13,14,15,16,19,20,21,22,25,26,27,28]);
            
            this.door=this.game.add.sprite(3680,480,"door");
            this.game.physics.arcade.enable(this.door);
            this.door.animations.add("open", [0, 1, 2, 3, 4,5,6,7], 10);
            this.door.body.immovable=true;
            
            this.door1=this.game.add.sprite(3936,288,"door");
            this.game.physics.arcade.enable(this.door1);
            this.door1.animations.add("open", [0, 1, 2, 3, 4,5,6,7], 10);
            this.door1.body.immovable=true;
            
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
            this.level2End = this.game.add.sprite(3624,480,"levelEnd");
            this.game.physics.arcade.enable(this.level2End);
            
            this.level2End.body.collideWorldBounds = true;
            this.level2End.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level2End.animations.play("turn");
            this.level2End.body.immovable=true;
            this.level2End.body.gravity.y = 60;
            this.cryopod=this.game.add.sprite(3911,128,"cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable=true;
            this.cryopod.animations.add("will", [1,1,,1,8,9,10,11,12], 7);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;
            
            this.elevators= this.game.add.group();
            
            let elevator = new Elevator(this.game,160,256,480,this.elevators,1,"alienElevator");
            let elevator2 = new Elevator(this.game,1312,480,320,this.elevators,1,"alienElevator");
            let elevator3 = new Elevator(this.game,1952,234,110,this.elevators,1,"alienElevator");
            let elevator4 = new Elevator(this.game,2624,493,224,this.elevators,1,"alienElevator");
            let elevator5 = new Elevator(this.game,2816,366,492,this.elevators,-1,"alienElevator");
            let elevator6 = new Elevator(this.game,2016,480,288,this.elevators,1,"alienElevator");
            let elevator7 = new Elevator(this.game,3685,288,160,this.elevators,-1,"alienElevator");
            
            this.scientists=this.game.add.group();
            this.boril=new Alien2(this.game,3808,100,this.shipLayer,this.scientists);
            this.Aldis =new Alien2(this.game,3856,100,this.shipLayer,this.scientists);
            
            this.drones=this.game.add.group();
            let drone2= new Drone(this.game,1056,143,1248,this.drones,this.shipLayer);
            let drone3= new Drone(this.game,832,288,928,this.drones,this.shipLayer);
            let drone4= new Drone(this.game,1120,288,1024,this.drones,this.shipLayer);
            let drone5= new Drone(this.game,1120,440,992,this.drones,this.shipLayer);
            let drone6= new Drone(this.game,800,440,928,this.drones,this.shipLayer);
            let drone7= new Drone(this.game,2270,69,2660,this.drones,this.shipLayer);
            let drone8= new Drone(this.game,3398,256,3710,this.drones,this.shipLayer);

            this.drones.setAll("body.immovable",true);

            this.tbots = this.game.add.group();
            let tbot=new TBot(this.game,352,384,512,this.shipLayer,this.tbots,this.player);
            let tbot2=new TBot(this.game,2944,160,3136,this.shipLayer,this.tbots,this.player);
            this.energyBar = new EnergyBar(this.game);

            this.healthBar = new HealthBar(this.game);
            this.Obots=this.game.add.group();
      //      let obot = new Obot(this.game,850,64,950,this.Obots,this.shipLayer,this.player);
            
            this.retry=this.game.add.button(750,12,"retry");
            this.retry.fixedToCamera=true;
            this.retry.onInputDown.add(this.restart,this)
            
            this.sensors=this.game.add.group();
            let sensor=new Sensor(this.game,1852,384,1910,"",3,this.shipLayer,this.sensors);
            let sensor2=new Sensor(this.game,1376,128,160,"",0,this.shipLayer,this.sensors);
            let sensor3=new Sensor(this.game,2592,352,448,"",0,this.shipLayer,this.sensors);
            let sensor4=new Sensor(this.game,2144,352,448,"",2,this.shipLayer,this.sensors);
            let sensor5=new Sensor(this.game,3264,32,157,"",0,this.shipLayer,this.sensors);

            
            
            this.sensors2=this.game.add.group();
            let hSensor=new Sensor2(this.game,1824,448,1824,"",3,this.shipLayer,this.sensors2);
            let hSensor2=new Sensor2(this.game,1984,448,1984,"",3,this.shipLayer,this.sensors2);

            this.cannons=this.game.add.group();
            var c1=new Cannon(this.game,496,172,2,this.shipLayer,this.cannons);
            var c2=new Cannon(this.game,173,396,1,this.shipLayer,this.cannons);
            var c3=new Cannon(this.game,781,416,1,this.shipLayer,this.cannons);
            var c4=new Cannon(this.game,1328,140,2,this.shipLayer,this.cannons);
            var c5=new Cannon(this.game,1644,460,1,this.shipLayer,this.cannons);
            var c6=new Cannon(this.game,1740,108,1,this.shipLayer,this.cannons);
            var c7=new Cannon(this.game,2224,268,2,this.shipLayer,this.cannons);
            var c8=new Cannon(this.game,2580,384,3,this.shipLayer,this.cannons);
            var c9=new Cannon(this.game,2580,288,3,this.shipLayer,this.cannons);
            var c10=new Cannon(this.game,2764,352,1,this.shipLayer,this.cannons);
            var c11=new Cannon(this.game,3308,160,1,this.shipLayer,this.cannons);
            var c12=new Cannon(this.game,3840,76,2,this.shipLayer,this.cannons);

            this.blasts= this.game.add.group();
            for (let i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }
         //   let tbot=new TBot(this.game,550,404,660,this.shipLayer);
        //    this.tbots.add(tbot);
        //    this.tbots.add(tbot2);
            this.aliens=this.game.add.group();
            
            let alien= new Alien(this.game,410,256,512,this.shipLayer,this.aliens);
            let alien2= new Alien(this.game,1799,224,2000,this.shipLayer,this.aliens,[0,1,2,3,4,5,6,7,8,9]);
            let alien3= new Alien(this.game,2846,320,3136,this.shipLayer,this.aliens,[12]);

            this.talky1=new DialogueBoxCasual(this.game);
            this.talky2=new DialogueBoxUrgent(this.game);
            this.talky2.talk("Wow. This is quite different.jk it ","ehead","Ethan",1);
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.bgMusic = this.game.add.audio("second", 0.6, true);
            this.bgMusic.play();
            this.siren=this.game.add.audio("alarm", .5, false);
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
        }
        update(){
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.elevators,this.stopit);
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            this.game.physics.arcade.collide(this.scientists, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.player,this.alerted);
            this.game.physics.arcade.collide(this.shipLayer, this.level2End);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            let awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.overlap(this.blasts, this.player,this.harm);
            this.game.physics.arcade.collide(this.player, this.otherLayer);
            if(this.inFacility){
                this.game.physics.arcade.collide(this.player, this.otherLayer);
                this.game.physics.arcade.collide(this.aliens, this.otherLayer);
                this.game.physics.arcade.collide(this.scientists, this.otherLayer);
                
                if(this.boril.alive){
                    if(this.Aldis.x>4352&&this.Aldis.body.velocity.x!=0){
                        this.Aldis.body.velocity.x=0;
                        this.Aldis.animations.stop();
                        this.Aldis.frame=0;
                        this.boril.x=4220;
                        this.boril.y=448;
                        this.boril.animations.play("move")
                        this.boril.body.velocity.x=135;
                    }if(this.boril.x>4320&&this.boril.body.velocity.x>0){
                        this.boril.body.velocity.x=0;
                        this.boril.animations.stop();
                        this.boril.frame=0;
                        this.talky2.talk("Thats weird. The whole thing got shut off.","sciHead", "Aldis" ,22);
                    }if(this.boril.body.velocity.x<-10&&this.boril.x<=4270){
                        this.boril.kill();    
                        this.order=69;
                    }
                }else{
                    if(this.order==69){
                        this.order+=1;
                        this.talky2.talk("Well that didn't do much. I got the \naliens to come in here but one already \nwent back.","ehead", "Ethan" ,26);
                    }if(this.game.physics.arcade.collide(this.player, this.comp2)&&this.Aldis.x<4200){
                        this.talky2.talk("All right I'm entering the username \nand password you gave me.","ehead", "Ethan" ,30);
                    }
                }
                if(this.game.physics.arcade.collide(this.player, this.comp1)&&this.Aldis.x<4200){
                    this.talky2.talk("Well there is the off switch. I just \nhave to press it...","ehead", "Ethan" ,9000);
                 }
                 if(this.player.bottom<64){
                     this.goodbye();
                }
             
            }if(this.almostDone){
                this.door1.frame=7;
                this.level2End.alpha=1;
                if(awake&&this.cryopod.frame==0)this.cryopod.animations.play("will");
                console.log("frame: "+this.cryopod.frame+" order: "+this.order);
                if(this.cryopod.frame==12){
                    if(this.order==70){
                        
                        this.talky2.talk("What the- this looks nothing like our \nship, or where we put our cryopods.","whead", "Will" ,40);
                        this.order+=1;
                    }
                }
            if(this.game.physics.arcade.collide(this.player, this.level2End)){
                    if (this.order==71){
                        
                        this.bgMusic.stop();
                        if (parseInt(localStorage.getItem("clearedLevel")) < 2) {
                            localStorage.setItem("clearedLevel", "2");
                        }
                        this.game.state.start("level3");
                    
                    }else{
                        this.talky1.talk("I should rescue Will first.","ehead","Ethan",3);

                    }
                    

                }
            }else{
                this.level2End.alpha=0;
            }
            
            this.reset.alpha = 1;
            
             if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)){
                 this.player.x+=10;
             }if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
                 this.facility();
             }

            this.resume.alpha=0;
            if(this.cryopod.frame==12){
                this.game.add.sprite(200,30,"wull");
                
            }else{
            }if(this.order==0){
                 if(this.player.x>690){
                     this.order+=1;
                     this.talky2.talk("Hey, I found something interesting.","jhead","Janet",4); 
                 }
             }else if(this.order==1){
                 if(this.player.x>1472){
                     this.order+=1;
                     this.talky2.talk("Got anything else on our other crew \nmembers yet?","ehead","Ethan",9);
                 }
             }else if (this.order == 2){
                   if (this.player.x >= 2208){
                       this.order+=1;
                       this.talky2.talk("Wow thats a big gap. I can see a way over \nthis is but falling through looks \nincredibly dangerous...","ehead","Ethan",0);
                    }
             }else if(this.order==3){
                    if (this.player.x >= 2688){
                        this.order+=1;
                        this.talky2.talk("Wow, it looks like they are using the \ntoraxite crystals for lamps. Thats pretty \nfancy.","ehead","Ethan",17);
                    }
             }else if(this.order==4){
                    if (this.player.x >= 3296){
                        this.order+=1;
                        this.talky1.talk("I'm near the end of the ship, I should see will soon.","ehead","Ethan",2);
                    }
             }else if(this.order==5){
                    if (this.player.x >= 3744&&this.player.y<224){
                        this.order+=1;
                        this.talky2.talk("Well Janet, I see Will’s cryopod. \nUnfortunately it is being guarded by two\n Toraxians. ","ehead","Ethan",18);
                    }
             }
            this.diamologue();
            this.reset.alpha=0;
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
            if(this.drones.getAll("trampoline",true).length>0)this.player.flinch=true;
            else this.player.flinch=false
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)&&!this.player.lGrab&&this.player.energy>25&&!urgent&&this.player.body.velocity.y>10){
                if(this.player.scale.x==1){
                    console.log("whyya");
                    var Dronze = this.drones.getAll("grabLeft",true);
                    if(Dronze.length>0&&Dronze[0].body.velocity.x>0)this.player.drone=Dronze[0];
                }else{
                    var Dronze = this.drones.getAll("grabRight",true);
                    if(Dronze.length>0&&Dronze[0].body.velocity.x<0){
                        this.player.drone=Dronze[0];
                    }
                }
            }
            if(this.game.physics.arcade.collide(this.player, this.door)){
                if(this.door.frame==7){
                    this.facility();
                }else{
                    this.talky2.talk("Please enter password.","no","-----",404);
                }
                
            }
            
    	    let alAlert= this.aliens.getAll("isTriggered",true).length>0;
    	    let alDrone=this.drones.getAll("seesing",true).length>0;
    	    let alObot=this.Obots.getAll("seesing",true).length>0;
    	    var alSense=this.sensors.getAll("seesing",true).length>0;

    	    if(this.tbots.getAll("seesing",true).length>0||alAlert||alDrone||alObot||alSense){
                this.setOff=true;
                TSAGame.alarmsOn=true;
                this.cannons.setAll("Awaken",true);
             }if(this.prevSetoff==false&&this.setOff==true){
                 this.siren.play();
                 this.alarm.callAllExists("setOff",true);
                 this.tintI.alpha=0.1;
                if (this.warntalk)
                {
                    this.talky1.talk("I've been detected!","ehead","Ethan",2);
                    this.game.time.events.add(Phaser.Timer.SECOND * 2.25,function () {this.talky1.talk("Be careful!","jhead","Janet",2);},this);
                    this.warntalk = false;
                }
                this.timer = this.game.time.create(true);
                this.timer.add(16000, function pancake() {this.tintI.alpha = 0;
                    this.setOff=false;
                    alarmsOn=false;}, this);
                this.timer.start();
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
            this.sensors.setAll("blasts",this.blasts);
            this.drones.setAll("blasts",this.blasts);
            this.cannons.setAll("player",this.player);
            this.cannons.setAll("blasts",this.blasts);
            this.Obots.setAll("blasts",this.blasts);
            this.tbots.setAll("blasts",this.blasts);
            this.aliens.setAll("blasts",this.blasts);
            this.aliens.setAll("elevators",this.elevators);

    	    this.prevSetoff=this.setOff;
            this.instructions.alpha=0;

             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             
             this.healthBar.scale.x=this.player.health*.125;
             this.energyBar.scale.x = this.player.energy*.0625;

           this.tbots.callAllExists("updateLine",true,this.playerLine);
            this.aliens.callAllExists("updateLine",true,this.playerLine);
            this.drones.callAllExists("updateLine",true,this.playerLine);
            this.Obots.callAllExists("updateLine",true,this.playerLine);

        }pauseUpdate(){
            this.instructions.alpha=1;
            TSAGame.pauseU(this,this.resume,this.reset);
        }pauseGame(){
            
            this.game.paused=true;
        }
        alerted(player:any,Alien:any){
            Alien.triggered();
        }harm(player:any,blast:any){
            if(!player.shield){
                if(blast.key!="lightning bolt")player.health-=50;
                else player.zapped=1;
            }
            blast.kill();
        }stopit(player:any,elevator:any){
            if(player.body.touching.up&&elevator.moving)elevator.spriteStuck=true;
        }
        restart(){
            this.game.sound.stopAll();
            this.game.state.start("level2");

        }facility(){
            this.game.world.resize(4992, 600);
            this.game.camera.unfollow();
            this.game.camera.x=4992;
            this.player.x=4280;
            this.player.y=420;
            this.inFacility=true;
            this.player.layer=this.otherLayer;
            alarmsOn=false;
            this.factoryBg.visible=true;
            this.factoryBg.x=4200;
            this.aliens.removeAll(true);
            this.cannons.removeAll(true);
            let alien01= new Alien(this.game,4822,320,4932,this.otherLayer,this.aliens);
            
            this.comp1 = this.game.add.sprite(4224,88,"?button");
            this.game.physics.arcade.enable(this.comp1);
            this.comp1.body.immovable=true;
            
            this.comp2 = this.game.add.sprite(4928,534,"?button");
            this.game.physics.arcade.enable(this.comp2);
            this.comp2.body.immovable=true;
            this.comp2.scale.x=-1;
            this.duckBot=this.game.add.group();
            let duck1 = this.game.add.sprite(4448,328,"duckbot");
            
            let elevator = new Elevator(this.game,4896,64,0,this.elevators,1,"alienElevator");
            
            this.talky2.talk("So I guess I should just turn it all off. \nHopefully that will work without harming \nme.","ehead","Ethan",0);
        }shutDown(){
            this.Aldis.x=4220;
            this.Aldis.y=448;
            this.Aldis.animations.play("move");
            this.Aldis.body.velocity.x=135;
        }goodbye(){
            this.game.world.resize(4000, 600);
            this.scientists.removeAll(true);
            this.drones.callAllExists("removedd",true,this.playerLine);
            this.almostDone=true;
            this.player.x=3932;
            this.player.y=300;
            this.player.layer=this.shipLayer
        }
        diamologue(){
            switch (this.talky2.finish)
                {
                case 1 :
                    this.talky2.talk("Ooh, what does it look like? Are there a \nlot of aliens?","jhead","Janet",2);
                    break;
                case 2:                 
                    this.talky2.talk("Well, the entire thing is pretty much red \nand black, even the glass! It certainly \nis an interesting choice of decoration.","ehead","Ethan",21);
                    break;
                case 21:
                    this.talky2.talk("Fortunately, I don't see too many aliens.","ehead","Ethan",3);
                    break;
                case 3 :
                    this.talky2.talk("Well, I found a computer that was left \nbehind. I'm going to look at it and see \nwhat I can find out. ","jhead","Janet",0);
                    break;
                case 4 :
                    this.talky2.talk("Cool, what is it? ","ehead","Ethan",5);
                    break;
                case 5 :
                    this.talky2.talk("From what I can gather, they spotted the \nNova 90 near one of their own ships. ","jhead","Janet",6);
                    break;
                case 6 :
                    this.talky2.talk("They wanted to find out what it was doing\nthere, so they sent out their cheapest \nrobots, nicknamed the \"obots\".","jhead","Janet",7);
                    break;
                case 7 :
                    this.talky2.talk("Those must be those funny-looking robots \nthat I found when I woke up.","ehead","Ethan",71);
                    break;
                case 71 :
                    this.talky2.talk("Have you found anything about William or \nCaptain James yet?","ehead","Ethan",8);
                    break;
                case 8:
                    this.talky2.talk("Not yet. You should keep exploring.","jhead","Janet",0);
                    break;
                case 9:
                    this.talky2.talk("Actually, yes, a couple aliens found our \ncryopods after searching for a while.","jhead","Janet",10);
                    break;
                case 10:
                    this.talky2.talk("They used these devices to scan our minds\nand see if we knew anything useful to \nthem.","jhead","Janet",11);
                    break;
                case 11:
            this.talky2.talk("This says “Human 1, who appears to be \ntheir leader, has highly critical intel. \nWe should take it to the base.”","jhead","Janet",12);
                    break;
                    case 12:
            this.talky2.talk("Then it says, “Human 2 has some info we \nneed. Let's send it to our closest ship \nfor experimentation.” ","jhead","Janet",13);
                    break;
                    case 13:
            this.talky2.talk("And “Human 3 could be useful to our goal. \nBoril, why dont you take it somewhere \nelse on the ship to experiment.”","jhead","Janet",14);
                    break;
            case 14:
            this.talky2.talk("And finally, “Human 4 does not seem to \nhave anything useful for us. We might as \nwell just leave it here.”","jhead","Janet",15);
                    break;
            case 15:
            this.talky2.talk("So William should be somewhere in this \nship, right?","ehead","Ethan",16);
                    break;
            case 16:
                this.talky2.talk("Hopefully.","jhead","Janet",0);
                break;
            case 17:
                this.talky2.talk("It seems like they use those crystals \na lot.","jhead","Janet",0);
                break;
            case 18:
                this.talky2.talk("Ugh, this is so boring. All we are doing \nis just standing here waiting for the \nmachine to find new info from this human","sciHead"," ??? ",19);
                break;    
            case 19:
                this.talky2.talk("You know Aldis, it is better than being \nall alone on a ship, stuck with an alien \nwho hates you.","sciHead","Boril ",20);
                break;
            case 20:
                this.talky2.talk("Honestly I would be happier if human \nruined the drone facility we have below. \nAt least then I could do something.","sciHead","Aldis",420);
                break;
            case 420:
                this.talky2.talk("Hey I think I know how I can get rid of \nthese guys. I just need to find a drone \nfacility below.","ehead","Ethan",0);
                break;
            case 22:
                this.talky2.talk("I'm telling you that 4th human did it! I \nkept saying we should have taken it.","sciHead","Boril",23);
                break;
            case 23:
                this.talky2.talk("Well if it was that human then I will \nfind it.","sciHead","Aldis",24);
                break;
            case 24:
                this.talky2.talk("Do whatever you want but I'm leaving.","sciHead","Aldis",25);
                break;
                
            case 25:
                this.boril.body.velocity.x=-80;  
                this.boril.scale.x=-1;
                this.boril.animations.play("move");
                break;
            case 26:
                this.talky2.talk("Are there any other computers? There is \nanother password I can see on this \ncomputer.","jhead","Janet",27);
                break;
            case 27:
                this.talky2.talk("The username is: Gen. Zelek and the \npassword is t89u3ogivlk","jhead","Janet",28);
                break;
            case 28:
                this.talky2.talk("I think that is the leaders name! I bet I \ncan do a lot if I access that account!!\nJust need to find that computer...","ehead","Ethan",0);
                break;
            case 30:
                this.talky2.talk("Oh my I can do so much! This is \nincredible. Now I can definitely get rid \nof that Toraxian!","ehead","Ethan",0);
                break;
            case 40:
                this.talky2.talk("Well our cryopods got kidnapped by the \nnative Toraxians here. I just finally \nmanaged to rescue you.","ehead","Ethan",41);
                break;
            case 41:
                this.talky2.talk("Where are these Toraxians? Do I need to \nwatch out for them?!","whead","Will",42);
                break;
            case 42:
                this.talky2.talk("Actually I just scared them all off this \nship. I am going to go to there base \nto rescue James.","ehead","Ethan",43);
                break;
            case 43:
                this.talky2.talk("You basically have this whole ship for \nyourself to explore and find out \nmore on this situation.","ehead","Ethan",44);
                break;
            case 44:
                this.talky2.talk("Umm, ok. Are you sure you want to go to \nthe alien base by yourself?","whead","Will",45);
                break;
             case 45:
                this.talky2.talk("Well I pretty much have to. But hopefully \nyou can help me from in here.","ehead","Ethan",46);
                break; 
                case 46:
                this.talky2.talk("If that's what you want, I will stay here. \nGoodluck rescuing James.","whead","Will",0);
                break; 
            case 404:
                if(this.order!=6){
                    this.talky2.talk("Well, I don't know any passwords. I guess \nI should move on.","ehead","Ethan",0);
                }else{
                    this.order++;
                    this.talky2.talk("Any idea on how I can obtain the password?","ehead","Ethan",405);
                }this.player.x-=10;
                break;
            case 405:
                this.talky2.talk("Let me see if I can find it...             \nAhh here it is:9xWPXTF6gJU6Ftg9","jhead","Janet",406);
                break;
            case 406:
                this.talky2.talk("Thanks. \nEntering 9xWPXTF6gJU6Ftg9","ehead","Ethan",407);
                break;
            case 407:

                this.talky2.talk("Access granted. You may now enter the \nToraxian Reprogramming Facility.","no","-----",0);
                this.door.animations.play("open");
                break;
                case 9000:
                this.player.x+=10;
                this.shutDown();
                break;
                 default: break;
                }
                this.talky2.finish=0;
        }

    }
}