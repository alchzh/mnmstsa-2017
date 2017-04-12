namespace TSAGame {
    export class Level3 extends Phaser.State{
        
        player: TSAGame.Player;
        level3End:Phaser.Sprite;
        goOn:boolean;
        button1:Invis; 
        button2:Shield;
        order:number;
        healthBar:HealthBar;
        bgMusic:Phaser.Sound;
        energyBar:EnergyBar;
        map:any;
        Obots:any;
        shutoff:number;
        shipLayer:any;
        aliens:any;
        cryopod:any;
        pause:Phaser.Button;
        cannons:any;
        resume:Phaser.Image;
        reset:Phaser.Image;
        retry:Phaser.Button;
        elevators:any;
        factoryBg:any;
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
        instr:number;
        talky1:DialogueBoxCasual;
        talky2:DialogueBoxUrgent;

        
        create(){
            levelOn = 3;
            setUp(this,"lvl3");
            this.factoryBg=this.game.add.image(0,0,"factoryBG");
            this.factoryBg.visible=false;
            this.player = new Player(this.game, 128, 0);
            this.game.camera.follow(this.player);
            this.game.world.resize(4800, 600);
            this.playerLine = new Phaser.Line(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);

            this.map = this.add.tilemap("map3");
            this.map.addTilesetImage("Level 3 tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.map.setCollision([1,2,3,4,5,6,7,8,9,10,11,12]);
            this.healthBar = new HealthBar(this.game);
            this.shutoff=0;
            this.player.layer=this.shipLayer;
            this.elevators=this.game.add.group();
            let elevator = new Elevator(this.game,1632,520,32,this.elevators,-1,"alienElevator");
            let elevator2 = new Elevator(this.game,2432,360,168,this.elevators,-1,"alienElevator");
            let elevator3 = new Elevator(this.game,2784,168,360,this.elevators,1,"alienElevator");
            let elevator4 = new Elevator(this.game,4672,160,0,this.elevators,1,"alienElevator");
            let elevator5 = new Elevator(this.game,4064,170,364,this.elevators,1,"alienElevator");
            let elevator6 = new Elevator(this.game,3744,492,170,this.elevators,-1,"alienElevator");
            
            this.alarm=this.game.add.group();
            

            this.prevSetoff=false;
            this.setOff=false;
            this.Obots=this.game.add.group();
            let obot = new Obot(this.game,736,238,910,this.Obots,this.shipLayer,this.player);
            let obot2 = new Obot(this.game,1216,224,1344,this.Obots,this.shipLayer,this.player);
            let obot3 = new Obot(this.game,2272,256,2316,this.Obots,this.shipLayer,this.player);
            let obot4 = new Obot(this.game,3872,448,4128,this.Obots,this.shipLayer,this.player);
            let obot5 = new Obot(this.game,3104,224,3200,this.Obots,this.shipLayer,this.player);
            let obot6 = new Obot(this.game,4192,160,4352,this.Obots,this.shipLayer,this.player);

            this.aliens=this.game.add.group();
            var alien=new Alien(this.game,65,128,320,this.shipLayer,this.aliens);
            var alien2=new Alien(this.game,640,480,768,this.shipLayer,this.aliens);
            var alien3=new Alien(this.game,800,480,864,this.shipLayer,this.aliens);
            var alien4=new Alien(this.game,438,64,524,this.shipLayer,this.aliens);
            //var alien5=new Alien(this.game,4192,160,4352,this.shipLayer,this.aliens);
            var alien6=new Alien(this.game,3770,320,4040,this.shipLayer,this.aliens,[12,15]);
            var alien7=new Alien(this.game,2456,128,2815,this.shipLayer,this.aliens,[3,6]);
            var alien8=new Alien(this.game,2456,320,2815,this.shipLayer,this.aliens,[3,6]);
            //ar alien9=new Alien(this.game,2456,128,2815,this.shipLayer,this.aliens,[3,6]);
            //var alien10=new Alien(this.game,2456,320,2815,this.shipLayer,this.aliens,[3,6]);

            this.tbots=this.game.add.group();
         //   let tbot=new TBot(this.game,872,384,1024,this.shipLayer,this.tbots,this.player);
            let tbot1=new TBot(this.game,1332,128,1415,this.shipLayer,this.tbots,this.player);
            let tbot2=new TBot(this.game,2048,210,2144,this.shipLayer,this.tbots,this.player);
            let tbot8 = new TBot(this.game,4192,96,4352,this.shipLayer,this.tbots,this.player);
            let tbot3=new TBot(this.game,3220,400,3424,this.shipLayer,this.tbots,this.player);
            let tbot4=new TBot(this.game,3136,320,3328,this.shipLayer,this.tbots,this.player);


            this.sensors=this.game.add.group();
            let sensor=new Sensor(this.game,1088,320,512,"",2,this.shipLayer,this.sensors);
 ///           let sensor2=new Sensor(this.game,1280,264,448,"",2,this.shipLayer,this.sensors);
   //         let sensor3=new Sensor(this.game,1408,328,512,"",0,this.shipLayer,this.sensors);
     //       let sensor4=new Sensor(this.game,1280,328,512,"",2,this.shipLayer,this.sensors);
       //     let sensor5=new Sensor(this.game,2496,128,2816,"",3,this.shipLayer,this.sensors);
         //   let sensor6=new Sensor(this.game,4000,64,4288,"",3,this.shipLayer,this.sensors);
                
            this.cannons=this.game.add.group();
            var c1=new Cannon(this.game,816,332,2,this.shipLayer,this.cannons);
            var c2=new Cannon(this.game,848,172,2,this.shipLayer,this.cannons);
            var c3=new Cannon(this.game,1428,130,3,this.shipLayer,this.cannons);
            var c4=new Cannon(this.game,1428,386,3,this.shipLayer,this.cannons);
            var c5=new Cannon(this.game,2128,140,2,this.shipLayer,this.cannons);
            var c6=new Cannon(this.game,2836,130,3,this.shipLayer,this.cannons);
            var c7=new Cannon(this.game,2444,320,1,this.shipLayer,this.cannons);
            var c8=new Cannon(this.game,3296,204,2,this.shipLayer,this.cannons);
            var c9=new Cannon(this.game,2956,244,1,this.shipLayer,this.cannons);
            var c10=new Cannon(this.game,4480,76,2,this.shipLayer,this.cannons);
            var c11=new Cannon(this.game,3692,76,2,this.shipLayer,this.cannons);

            this.order=0;
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
            this.cryopod.visible=false;
            this.blasts= this.game.add.group();
            for (let i = 0; i < 32; i++)
            {
                this.blasts.add(new Blast(this.game,0,0,this.shipLayer), true);
            }
            this.talky1=new DialogueBoxCasual(this.game);
            this.talky2=new DialogueBoxUrgent(this.game);
            this.talky2.talk("Wow this is going to be hard.  ","ehead","Ethan",0);
            this.button1=new Invis(this.game);
            this.button2=new Shield(this.game);
            this.bgMusic=this.game.add.audio("third", 1, true);
            this.bgMusic.play();
            this.pause=this.game.add.button(700,12,"pauseButton");
            this.pause.fixedToCamera=true;
            this.pause.onInputDown.add(this.pauseGame,this);
            this.pause.scale.x=.5;
            this.pause.scale.y=.5;
            this.retry=this.game.add.button(750,12,"retry");
            this.retry.fixedToCamera=true;
            this.retry.onInputDown.add(this.restart,this)
            this.energyBar = new EnergyBar(this.game);

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
            this.siren=this.game.add.audio("alarm", .5, false);
            this.tintI=this.game.add.image(0,0,"Laser");
            this.tintI.alpha=0;
            this.tintI.scale.x=100;
            this.tintI.scale.y=300;
            this.tintI.fixedToCamera = true;

            this.reset.scale.y = 2;
        }
        update(){
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.overlap(this.blasts, this.player,this.harm);
            this.game.physics.arcade.collide(this.aliens, this.player,this.alerted);
            this.game.physics.arcade.collide(this.player, this.elevators,this.stopit);
            this.game.physics.arcade.collide(this.shipLayer, this.level3end);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            let awake = this.game.physics.arcade.collide(this.player, this.cryopod);
    
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
                
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)){
                 this.player.x+=10;
             }if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
                 this.factory();
             }
            if(this.player.alpha==1){
    	        this.playerLine.setTo(this.player.left+11*this.player.scale.x,this.player.top,this.player.right-11*this.player.scale.x,this.player.bottom);
    	    }else{

    	        this.playerLine.setTo(0.0,0,0,0);
    	    }
            if(awake&&this.cryopod.frame==0)this.cryopod.animations.play("james");

    	    let alAlert= this.aliens.getAll("isTriggered",true).length>0;
    	    let alObot=this.Obots.getAll("seesing",true).length>0;
    	    var alSense=this.sensors.getAll("seesing",true).length>0;
            
            
    	    if(this.tbots.getAll("seesing",true).length>0||alAlert ||alObot||alSense){
                this.setOff=true;
                TSAGame.alarmsOn=true;
                this.cannons.setAll("Awaken",true);

             }
             if(this.prevSetoff==false&&this.setOff==true){
                 console.log("QWEQE");
                 this.siren.play();
                 this.alarm.callAllExists("setOff",true);
                 this.tintI.alpha=0.1;
                this.timer = this.game.time.create(true);
                this.timer.add(16000, function pancake() {this.tintI.alpha = 0;
                    this.setOff=false;
                    alarmsOn=false;}, this);
                this.timer.start();
             }if(this.order==0){
                 if(this.player.x<970&&this.player.x>920&&this.player.y<320){
                     this.order+=1;
                     this.talky2.talk("OH YEAH! I just found a giant computer \nthat has a ton of data. I even have a map \nof the entire base that you are on.","whead","Will",1); 
                 }
             }else if(this.order==1){
                 if(this.player.x>1376&&this.player.y>448){
                     this.order+=1;
                     this.talky2.talk("Hey Will, to me it sounded like the \nToraxians needed some specific info from \nus. Any idea what that is?","jhead","Janet",4);
                 }
             }else if (this.order == 2){
                   if (this.player.x >= 1888){
                       this.order+=1;
                       this.talky2.talk("Ethan, it looks like whatever this big \nplan is, you made it a lot harder by \nremoving them from the drone facility.","whead","Will",5);
                    }
             }else if(this.order==3){
                    if (this.player.x >= 2880){
                        this.order+=1;
                        this.talky2.talk("Man the Toraxite is really cool. They \nare using it for almost everything.","whead","Will",10);
                    }
             }else if(this.order==4){
                    if (this.player.x >= 3680){
                        this.order+=1;
                        this.talky2.talk("Your destination is very close Ethan! \nYou can do it.","whead","Will",0);
                    }
             }else if(this.order==5){
                    if (this.player.x >= 4544){
                        this.order+=1;
                        this.talky2.talk("Alright Ethan, You are really close to \nJames. There is just one problem... ","whead","Will",13);
                    }
             }else if(this.order==6){
                    if (this.player.x >= 4600&&this.player.y<60){
                        this.order+=1;
                        this.factory();
                    }
             }if(this.factoryBg.visible){
                 if(this.shutoff==2){
                     this.talky2.talk("Alright Ethan, You are really close to \nJames. There is just one problem... ","whead","Will",0);
                     this.shutoff=3;
                 }
                 if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)){
                     this.player.x+=10;
                }
                 if(this.game.input.keyboard.isDown(Phaser.Keyboard.J)){
                    this.finalRoom();
                 }
             }
            this.diamologue();
        //    this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.resume.alpha=0;
            this.reset.alpha=0;
            this.instructions.alpha = 0;
             this.energyBar.scale.x = this.player.energy*.0625;

            if(this.cryopod.frame==17){
                this.level3end.alpha=1;
                let moveOn = this.game.physics.arcade.collide(this.player, this.level3end);
                if(moveOn){
                    this.bgMusic.stop();
                    console.log("Congratulations, you beat the game u loser. go do something better with ur life");
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
            this.cannons.setAll("player",this.player);
            this.aliens.setAll("elevators",this.elevators);
            this.cannons.setAll("blasts",this.blasts);
            this.tbots.setAll("blasts",this.blasts);
            this.aliens.setAll("blasts",this.blasts);
    	    this.prevSetoff=this.setOff;

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
        }stopit(player:any,elevator:any){
            if(player.body.touching.up&&elevator.moving)elevator.spriteStuck=true;
        }
        harm(player:any,blast:any){
            if(!player.shield){
                if(blast.key!="lightning bolt")player.health-=50;
                else player.zapped=1;
            }
            blast.kill();
        }factory(){
            this.game.world.resize(1600, 600);
            this.player.x=40;
            this.factoryBg.visible=true;
            this.map.destroy();
            this.shipLayer.destroy();
            this.aliens.removeAll(true);
            this.Obots.removeAll(true);
            this.tbots.removeAll(true);
            this.sensors.removeAll(true);
            this.cannons.removeAll(true);
            
        }finalRoom(){
        }
        diamologue(){
            switch (this.talky2.finish)
                {
                case 1 :
                    this.talky2.talk("Do you know where I can find the Captain?","ehead","Ethan",2);
                    break;
                case 2:                 
                    this.talky2.talk("You should be able to just go straight \nfor a while.","whead","Will",3);
                    break;
                case 3 :
                    this.talky2.talk("Ok. ","ehead","Ethan",0);
                    break;
                case 4 :
                    this.talky2.talk("It is something about Earth and the \nhuman anatomy. They need it for some kind \nof big plan. I dont know anything else.","whead","Will",0);
                    break;
                case 5 :
                    this.talky2.talk("That’s good. Do you know what plan even \nis though?","ehead","Ethan",6);
                    break;
                case 6 :
                    this.talky2.talk("No not yet.","whead","Will",0);
                    break;
                case 7 :
                    this.talky2.talk("Those must be those sad but funny-looking\nrobots that I found when I woke up.","ehead","Ethan",71);
                    break;
                case 71 :
                    this.talky2.talk("Have you found anything about William or \nCaptain James yet?","ehead","Ethan",8);
                    break;
                case 8:
                    this.talky2.talk("Not yet. You should keep exploring.","jhead","Janet",0);
                    break;
                case 9:
                    this.talky2.talk("Actually, yes, a couple aliens found our \ncryopods after searching for a while.","jhead","Janet",0);
                    break;
                case 10:
                    this.talky2.talk("Yeah I saw how they used it for lighting.","ehead","Ethan",11);
                    break;
                case 11:
                    this.talky2.talk("Well it can do a lot more than that. It \nis used for energy, healing, weapons, \nlighting as you saw, and curing diseases.","whead","Will",12);
                    break;
                case 12:
                    this.talky2.talk("And on top of all that, they use it for \nteleportation devices, which I think I’m \nstarting to figure out how they work. ","whead","Will",0);
                    break;   
                case 13:
                    this.talky2.talk("What is it? ","ehead","Ethan",14);
                    break; 
                case 14:
                    this.talky2.talk("You will have to go through their factory \nto get to him. It is very important to \ntheir big plan so security will be heavy. ","whead","Will",15);
                    break; 
                case 15:
                    this.talky2.talk("Well that’s not good. Should I just go up \nthis elevator? ","ehead","Ethan",16);
                    break; 
                case 16:
                    this.talky2.talk("Yep. That will take you straight to it. ","whead","Will",17);
                    break; 
                case 17:
                    this.talky2.talk("Good luck Ethan. ","jhead","Janet",0);
                    break; 
                case 404:
                    if(this.order!=6){
                        this.talky2.talk("Well, I don't know any passwords. I guess \nI should move on.","ehead","Ethan",0);
                    }else{
                        this.talky2.talk("Any idea on how I can obtain the password?","ehead","Ethan",0);
                    }
                    this.player.x-=10;
                 default: break;
                }
                this.talky2.finish=0;
        }
    }
        

}