namespace TSAGame {
    export var alarmsOn=false;
    export var urgent=false;
    export class Level1 extends Phaser.State{
        player: TSAGame.Player;
        platform69s: any;
        drones: any;
        Obots:any;
        map:any;
        shipLayer:any;
        playerLine: Phaser.Line;
        level1end:Phaser.Sprite;
        ended:boolean;
        elevators:any;
        elevatorX:number[];
        button1:Invis;
        button2:Shield;
        healthBar:HealthBar;
        energyBar:EnergyBar;
        alarm:Phaser.Group;
        sensors:any;
        sensors2:any;
        cannons:any;
        setOff:boolean;
        prevSetoff:boolean;
        siren:Phaser.Sound;
        bgMusic:Phaser.Sound;
        alien:Alien;
        order:number;
        invisifore:boolean;
        sheildbefore:boolean;
        instructions:Phaser.Sprite;
        alien2:Alien2;
        tintI:Phaser.Image;
        blasts:any;
        pause:Phaser.Button;
        resume:Phaser.Image;
        reset:Phaser.Image;
        retry:Phaser.Button;
        eCryo:Phaser.Sprite;
        will:Phaser.Image;
        selfDstr:Phaser.Sprite;
        cryopod:Phaser.Sprite;
        timer:any;
        talky1:DialogueBoxCasual;
        talky2:DialogueBoxUrgent;
        setoff1:boolean;
        talk1:boolean;
        shake:boolean;
        sfdestrt:boolean;
        lastZdown:boolean;

        create(){
            levelOn = 1;
            setUp(this, "sky");
            this.elevators= this.game.add.group();
            this.shake = false;
            let elevator = new Elevator(this.game,768,512,352,this.elevators,1,"elevator");
            let elevator2 = new Elevator(this.game,2688,384,224,this.elevators,1,"elevator");
            let elevator3 = new Elevator(this.game,1920,417,224,this.elevators,1,"elevator");
            let elevator4 = new Elevator(this.game,2976,384,267,this.elevators,1,"elevator");
            let elevator5 = new Elevator(this.game,1888,238,96,this.elevators,1,"elevator");
            this.elevators.setAll("Obots",this.Obots);
            this.order=0;
            this.setoff1 = true;
            this.game.camera.bounds.bottom=600;
            this.player = new Player(this.game,60, 98);
            this.game.camera.follow(this.player);
            this.game.world.resize(3200, 600);
            this.sfdestrt = true;
            this.alarm=this.game.add.group();
            let alarm=new Alarm(this.game,512,64,"siren",this.alarm,90);
            let alarm2=new Alarm(this.game,800, 96,"siren",this.alarm,-90);
            let alarm3 = new Alarm(this.game,1376, 64,"siren",this.alarm,0);
            let alarm4 = new Alarm(this.game,1888, 64,"siren",this.alarm,-90);
            this.game.time.advancedTiming =true;
            this.invisifore=false;
            this.sheildbefore=false;
            this.map = this.add.tilemap("map");
            this.map.addTilesetImage("Ship Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.drones=this.game.add.group();
            let drone= new Drone(this.game,300,434,416,this.drones,this.shipLayer);
            let drone2= new Drone(this.game,2144,416,2400,this.drones,this.shipLayer);
     //       let drone4 = new Drone(this.game,1216,432,1280,this.drones,this.shipLayer);
            let drone5 = new Drone(this.game,960,66,1232,this.drones,this.shipLayer);
            this.drones.setAll("body.immovable",true);
       //     this.shipLayer.debug = true;
            this.alien2=new Alien2(this.game,3040,300,this.shipLayer,null);

            this.Obots=this.game.add.group();
            let obot = new Obot(this.game,160,288,385,this.Obots,this.shipLayer,this.player);
            //let obot2 = new Obot(this.game,1408,224,1526,this.Obots,this.shipLayer,this.player);
            let obot2 = new Obot(this.game,1546,224,1664,this.Obots,this.shipLayer,this.player);
            let obot4 = new Obot(this.game,2160,224,2272,this.Obots,this.shipLayer,this.player);
            let obot5 = new Obot(this.game,2287,224,2400,this.Obots,this.shipLayer,this.player);
            let obot6 = new Obot(this.game,2696,472,2847,this.Obots,this.shipLayer,this.player);
            this.healthBar = new HealthBar(this.game);
            this.energyBar = new EnergyBar(this.game);
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            
            this.cannons=this.game.add.group();
            //var c0=new Cannon(this.game,192,384,0,this.shipLayer,this.cannons);
            /*var c8=new Cannon(this.game,192,288,2,this.shipLayer,this.cannons);
            var c9=new Cannon(this.game,192 + 64,384,1,this.shipLayer,this.cannons);
            var c10=new Cannon(this.game,192 + 64,288,3,this.shipLayer,this.cannons);*/
            //var c1=new Cannon(this.game,468,460,3,this.shipLayer,this.cannons);
            var c2=new Cannon(this.game,1548,207,1,this.shipLayer,this.cannons);
            var c3=new Cannon(this.game,1620,428,3,this.shipLayer,this.cannons);
            var c4=new Cannon(this.game,2512,396,2,this.shipLayer,this.cannons);
            var c5=new Cannon(this.game,2240,204,2,this.shipLayer,this.cannons);
            var c6=new Cannon(this.game,2860,271,1,this.shipLayer,this.cannons);
            var c7=new Cannon(this.game,3156,300,3,this.shipLayer,this.cannons);

            this.eCryo=this.game.add.sprite(57,80,"cryopod");
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
            let sensor2=new Sensor(this.game,2177,368,2336,"",3,this.shipLayer,this.sensors);
            let sensor3=new Sensor(this.game,1568,384,1625,"",3,this.shipLayer,this.sensors);

        //    let sensor3=new Sensor(this.game,1504,128,320,"",0,this.shipLayer,this.sensors);
          ///  let sensor4=new Sensor(this.game,1504,160,352,"",0,this.shipLayer,this.sensors);
            this.sensors2=this.game.add.group();
  //          let sensor=new Sensor(this.game,736,64,736,"",3,this.shipLayer,this.sensors);
            let hiddenSensor=new Sensor2(this.game,356,368,356,"",3,this.shipLayer,this.sensors2);
            let hiddenSensor2=new Sensor2(this.game,2150,368,2150,"",3,this.shipLayer,this.sensors2);
            let hiddenSensor3=new Sensor2(this.game,2370,368,2370,"",3,this.shipLayer,this.sensors2);

            this.blasts= this.game.add.group();
            for (let i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }
            this.retry=this.game.add.button(750,12,"retry");
            this.retry.fixedToCamera=true;
            this.retry.onInputDown.add(this.restart,this);
            this.setOff=false;
            this.prevSetoff=false;
            this.selfDstr = this.game.add.sprite(2816,56,"?button");
            this.game.physics.arcade.enable(this.selfDstr);
            this.selfDstr.body.immovable=true;
            this.level1end = this.game.add.sprite(3136,300,"levelEnd");
            this.game.physics.arcade.enable(this.level1end);
            this.level1end.body.collideWorldBounds = true;
            this.level1end.animations.add("turn",[0,1,2,3,4],13,true);
            this.level1end.animations.play("turn");
            this.level1end.body.gravity.y=60;
          //  this.level1end.visible=false;
            this.map.setCollision([1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.body.top,this.player.right-11*this.player.scale.x,this.player.body.bottom);
            this.bgMusic=this.game.add.audio("1", 1, true);
            this.bgMusic.play();

            this.siren=this.game.add.audio("alarm", .5, false);
            this.cryopod=this.game.add.sprite(3144,160,"cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable=true;
            this.cryopod.animations.add("jayant", [1,2,3,4,5,6,7], 12);
            this.talky1=new DialogueBoxCasual(this.game);
            this.talky2=new DialogueBoxUrgent(this.game);
            this.talky2.talk("That's odd... The other crew members are \nmissing, and so are their cryopods.\n[Press [z] to continue]] ","ehead","Ethan",1);

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
            this.player.layer=this.shipLayer;

            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.timer = 0;
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
            this.game.physics.arcade.collide(this.alien2, this.shipLayer);
            this.game.physics.arcade.collide(this.level1end, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.alien2,this.alerted);
            
            this.game.physics.arcade.collide(this.player, this.elevators,this.stopit);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            //this.game.physics.arcade.collide(this.Obots, this.player);
            this.game.physics.arcade.overlap(this.blasts, this.player,this.harm);
         //   this.game.physics.arcade.collide(this.Obots, this.elevator.glass);
         //   this.game.physics.arcade.collide(this.elevator.glass,this.player );
            //var x = this.game.physics.arcade.collide(this.elevator.glass,this.player );
             this.resume.alpha=0;
             this.reset.alpha=0;
            this.instructions.alpha=0;
            let droneCaught=this.drones.getAll("seesing",true).length>0
            let alienCaught=this.alien2.caught;
            let sensor2Caught=this.sensors2.getAll("seesing",true).length>0
            if(this.Obots.getAll("seesing",true).length>0||droneCaught||this.sensors.getAll("seesing",true).length>0||alienCaught||sensor2Caught){
                this.setOff=true;
                console.log("alarms were set off right now");
                this.cannons.setAll("Awaken",true);
                TSAGame.alarmsOn=true;
             }
             if (this.setOff && this.setoff1)
             {
                 this.talky1.talk("I should definitely avoid those lasers!","ehead","Ethan",2);
                 this.setoff1 = false;
             }
             
             if(this.alien2.spawned||!this.alien2.alive){
                 this.level1end.alpha=1;
                 if(this.game.physics.arcade.collide(this.alien2, this.level1end)){
                     this.talky2.talk("Well, that was easy. ","ehead","Ethan",0);

                     this.alien2.kill();
                 }
                
                 if(this.game.physics.arcade.collide(this.player, this.level1end)){
                    if (this.cryopod.frame == 7&&!this.shake){
                        console.log("congratulations, you beat level1");
                        this.bgMusic.stop();
                        if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                            localStorage.setItem("clearedLevel", "1");
                        }
                        this.game.state.start("level2");
                    }
                    else if(this.shake){
                        this.talky2.talk("It would be a good idea to press the \nself destruct button to cancel the self \ndestruct sequence. ","ehead","Ethan",666);
                        this.player.x -=5;
                    }else{
                        this.talky2.talk("I should find out who is in the cryopod \nbefore going through the teleporter.","ehead","Ethan",0);
                        this.player.x -=5;

                    }
                    
                }
                
             }else{
                 this.level1end.alpha=0;
             }
             if(this.order==0){
                 if(this.player.x<432&&this.player.y>224){
                     this.order=1;
                     this.talky2.talk("That's a strange looking robot. Who \nwould design it that way?","ehead","Ethan",2); 
                 }
             }else if(this.order==1){
                 if(this.player.x<164&&this.player.y>384){
                     this.order+=1;
                     this.talky2.talk("Hey, that’s one of our drones! It is \nclearly behaving strangely, so I should \nprobably avoid that laser as well.","ehead","Ethan",69);
                 }
             }else if (this.order == 2){
                   if (this.player.x >= 841){
                        if (this.player.y > 290 && !this.talk1){
                            this.talk1 = true;
                            this.talky2.talk("I definitely can't get across the gap \nthis way. I should use the elevator to \nget up to that ledge.","ehead","Ethan",0);
                        }
                        else if (this.player.y <= 290){
                            this.talky2.talk("I can't jump that high, so I'll have to \ngrab onto that ledge by jumping and \nholding [SHIFT].","ehead","Ethan",0);
                            this.order+=1;
                        }
                    }
             }
             else if(this.order==3){
                 if(this.player.x>900&&this.player.y<320){
                     this.order+=1;
                     this.talky2.talk("Hmmm… I definitely cannot make that jump.","ehead","Ethan",3);
                 }
             }else if(this.order==4){
                 if(this.player.x>2772){
                     this.order+=1;
                     this.talky2.talk("Hey, I think I see another cryopod!","ehead","Ethan",4);
                 }
             }else if (this.order == 5){
                 this.order +=1;
             }else if(this.order==6){
                 if(this.player.x>2954){
                     this.order+=1;
                     this.talky2.talk("I need to get this alien out of the ship \nbefore doing anything else. I don't know \nwhat could happen if I don't","ehead","Ethan",0);
                 }
             }else if(this.order==7){
                 if(this.player.x>3120 && this.player.y <= 194){
                     if(this.alien2.alive){
                        this.talky2.talk("I should probably find a way to get rid \nof the alien before opening the cryopod.","ehead","Ethan",7);
                        this.player.x-=8;
                     }else if(this.shake){
                         this.talky2.talk("I should turn off the self-destruct \nsequence first.","ehead","Ethan",0);
                        this.player.x-=8;
                     }
                     else{
                         this.order+=1;                                                                     
                        this.talky2.talk("I wonder who is in this cryopod. It must \nbe either Janet, William, or Capt. James","ehead","Ethan",0);
                     }
                     
                 }
             }else if(this.order==8){
                 if(this.cryopod.frame==7){
                     this.order+=1;
                     this.talky2.talk("Whoah, we finally woke up. Wait... this \nisn't where we were―and Ethan, why are \nyou already awake?","jhead","Janet",8);
                 }
             }
             if(this.shake&&this.alien2.x==3040){
                 this.alien2.x+=1;
              this.talky2.talk("HELP! This is Agent Boril Reporting to \nbase. The self-destruct sequence in the \nship has been activated! What do I do?!","sciHead","Boril",9);
             }
             if(this.talky2.finish>0){
                 this.diamologue();
             }
            if(this.drones.getAll("trampoline",true).length>0)this.player.flinch=true;
            else this.player.flinch=false;
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)&&!this.player.lGrab&&this.player.energy>25&&!urgent&&this.player.body.velocity.y>10){
                if(this.player.scale.x==1){
                    var Dronze = this.drones.getAll("grabLeft",true);
                    if(Dronze.length>0&&Dronze[0].body.velocity.x>0)this.player.drone=Dronze[0];
                }else{
                    var Dronze = this.drones.getAll("grabRight",true);
                    if(Dronze.length>0&&Dronze[0].body.velocity.x<0){
                        console.log("right")
                        this.player.drone=Dronze[0];
                    }
                }
            }
             if(this.prevSetoff==false&&this.setOff==true){
                this.siren.play();
                console.log("78945614")
                this.alarm.callAllExists("setOff",true);
                
                this.tintI.alpha=0.1;

                this.timer = this.game.time.create(true);
                alarmsOn=true;
                this.timer.add(16000, function pancake() {
                    this.tintI.alpha = 0;
                    this.setOff=false;
                    this.prevSetoff=false;
                    alarmsOn=false;
            //        this.alarm.callAllExists("stop",true);
                }, this);
                    this.timer.start();
            }

            this.blasts.callAll("update2",null,this.player);
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
                this.pauseGame();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)&&this.button2.visible){
                this.button2.up();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)&&this.button1.visible){
                this.button1.up();
            }
            if(awake&&this.cryopod.frame==0&&true)this.cryopod.animations.play("jayant");

            //w this.elevators.callAllExists("update");
           // if(this.tbots.animations.frame>=14){
            //     this.alarm.animations.play("strobe");
             //    this.alarm.tintI.alpha=.1;
              //   }
             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x = this.player.health*.125;
             this.energyBar.scale.x = this.player.energy*.0625;
            if(!this.sheildbefore&&this.player.shield){
                this.sheildbefore=true;
                this.talky1.talk("My shield still works! Thats good to know!","ehead","Ethan",2);
            }if(!this.invisifore&&this.player.invis){
                this.invisifore=true;
                this.talky1.talk("My invisbility still works! That should \nhelp!.","ehead","Ethan",2);
            }

            
                 if(this.game.physics.arcade.collide(this.player, this.selfDstr)){
                     if (this.sfdestrt){
                        this.talky2.talk("I'm not sure I should mess with the self \ndestruct button. I know I can cancel it, \nbut it's scary when the ship shakes.","ehead", "Ethan" ,0);
                        this.sfdestrt = false;
                     }
                     if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){//gtg
                        if (!this.lastZdown){
                            this.game.time.events.add(Phaser.Timer.SECOND * 60, function () {if (this.shake){this.player.health = this.player.health;}}, this);
                            this.shake = !this.shake;
                        }
                     }
                 }
             
             
             
             if (this.shake)
             {
                 this.setOff = true;
                 this.game.camera.shake(0.0025,50);
             }
             
            this.sensors.setAll("drones",this.drones);
            this.sensors.setAll("pl",this.playerLine);
            this.sensors.setAll("blasts",this.blasts);
            this.sensors2.setAll("drones",this.drones);
            this.sensors2.setAll("pl",this.playerLine);
            this.sensors2.setAll("blasts",this.blasts);
            this.cannons.setAll("player",this.player);
            this.cannons.setAll("blasts",this.blasts);
            this.elevators.setAll("playerX",this.player.x);
            this.elevators.setAll("playerY",this.player.bottom);
            this.Obots.setAll("playerX",this.player.x);
            this.Obots.setAll("playerY",this.player.bottom);
            this.Obots.setAll("player",this.player);
            this.drones.setAll("blasts",this.blasts);
            this.Obots.setAll("blasts",this.blasts);

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
            
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
                this.game.paused = true;
            }

    	    if(this.player.alpha==1){
    	        if(!this.player.crouch)this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.body.top,this.player.right-11*this.player.scale.x,this.player.body.bottom);
    	        else this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.body.top,this.player.right-11*this.player.scale.x,this.player.body.top+31);
    	    }else{
    	        this.playerLine.setTo(0.0,0,0,0);
    	    }
    	    this.prevSetoff=this.setOff;
           this.drones.callAllExists("updateLine",true,this.playerLine);
           this.Obots.callAllExists("updateLine",true,this.playerLine);
           this.lastZdown = this.game.input.keyboard.isDown(Phaser.Keyboard.Z)
           
           
  //          this.tbots.updateLine(this.playerLine,this.map,this.shipLayer);
        }pauseUpdate(){
            this.instructions.alpha=1;
            TSAGame.pauseU(this,this.resume,this.reset);
        }pauseGame(){
            this.reset.alpha = 0;
            this.game.paused=true;
        }
        alerted(player:any,Alien:any){
            Alien.triggered();
        }stopit(player:any,elevator:any){
            if(player.body.touching.up&&elevator.moving)elevator.spriteStuck=true;
        }
        restart(){
            this.game.sound.stopAll();
            this.game.state.start("level1");

        }callBack(ethan:any,button:any){
            button.health=69;
        }
        
        
        harm(player:any,blast:any){
            if(!player.shield){
                if(blast.key!="lightning bolt"){
                    player.health-=50;
                }
                else player.zapped=1;
            }
            blast.kill();
        }
        diamologue(){
            switch (this.talky2.finish)
                {
                case 69:
                    this.talky2.talk("I know I won't be able to disable this \none with [z].","ehead","Ethan",0);
                    break;
                case 1 :
                    this.talky2.talk("Perhaps I should go farther and \ninvestigate.","ehead","Ethan",0);
                    break;
                case 2:                                                                           
                    this.talky2.talk("I think it's wise to avoid its laser. \nMaybe I can get behind and disable the \nrobot with [z] to avoid it.","ehead","Ethan",0);
                    break;
                case 3:
                    this.talky2.talk("Perhaps I can try grabbing the drone \nwith [SHIFT] to ride it to where I need \nto go.","ehead","Ethan",0);
                    break;
                case 4:
                    this.talky2.talk("It looks like some sort of alien \ncreature is guarding it.","ehead","Ethan",5);
                    break;
                case 5:
                    this.talky2.talk("Could that thing be responsible for \nall of this?","ehead","Ethan",0);
                    break;
                case 6:
                    this.talky2.talk("SHUT UP!!! 凸(`д´)凸 IT'S ARROGANT PEOPLE \nLIKE YOU THAT ARE THE REASON I NEED \nCOUNSELING!!!","sciHead","Boril",0);
                    break;
                case 7:
                    this.talky2.talk("He doesn't look like he's ever been in\ncombat. I bet he is easily scared.","ehead","Ethan",0);
                    break;
                case 8:
                    this.talky2.talk("Well, it's a strange story. I woke up by\nmyself only to find a security system \nthat was set up in by a bunch of aliens.","ehead","Ethan",13);
                    break;
                case 9:
                this.talky2.talk("Ugh. You're so incompetent, Boril! I \nspecifically told you not to press any\nbuttons if you dont know what they do!","?hed"," ??? ",10);
                    break;
                case 10:
                this.talky2.talk("General Zelek, I swear, it was that last\nhuman that we left. I told you we \nshould've taken it like the others.","sciHead","Boril",11);
                    break;
                case 11:
                    this.talky2.talk("Just use your teleporter and leave. I \nmade sure we didn't put anything \nimportant on that ship, anyway.","?hed","Zelek",12);
                    break;
                case 12:
                    this.alien2.leave1();
                    break;
                case 13:
                  this.talky2.talk("So I kept exploring the ship and found \nyour cryopod here. There was an alien\nthat I managed to scare off.","ehead","Ethan",14);
                    break;
                case 14:
                  this.talky2.talk("Hmm. Strange.","jhead","Janet",144);
                    break;
                case 144:
                    this.talky2.talk("What do we do now?","jhead","Janet",15);
                    break;
                case 15:
                this.talky2.talk("The alien brought a teleporter, which is \nhow it left. I think I'll go through it \nand possibly find the others.","ehead","Ethan",16);
                    break;
                case 16:
                    this.talky2.talk("You can stay and try to find out more \nabout what is going on.","ehead","Ethan",0);
                    break;
                case 666://
                    this.talky2.talk("I need to turn off the self destruct \nsequence. This might be our only way \nback.","ehead","Ethan",0);
                    break;
                 default: break;
                }
                this.talky2.finish=0;
        }

    }
}