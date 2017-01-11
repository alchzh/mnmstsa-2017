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
        pause:Phaser.Button;
        resume:Phaser.Image;
        reset:Phaser.Image;
        elevators:any;
        instructions:any;
        retry:any;
        tbots:any;
        
        create(){
            setUp(this,"lvl3");
            // console.log("hi");
            this.player = new Player(this.game, 128, 0);
            this.game.camera.follow(this.player);

            this.level3End = this.game.add.sprite(3000,300,"bigAlienElevator");
            this.game.physics.arcade.enable(this.level3End);
            this.level3End.body.collideWorldBounds = true;
            this.level3End.body.gravity.y=60;
            console.log("hai");
            this.map = this.add.tilemap("map3");
            this.map.addTilesetImage("Level 3 tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.map.setCollision([1,2,3]);
            this.healthBar = new HealthBar(this.game);
            this.elevators=this.game.add.group();
            this.Obots=this.game.add.group();
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
            this.resume.fixedToCamera=true;
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
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);

        //    this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.resume.alpha=0;
            this.reset.alpha=0;
            let moveOn = this.game.physics.arcade.collide(this.player, this.level3End);
            if(moveOn){
                console.log("congratulations, you have made it to the final boss!");
                this.game.state.start("finalBoss");
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
                this.pauseGame();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.X)&&this.button2.visible){
                this.button2.up();
            }if(this.game.input.keyboard.isDown(Phaser.Keyboard.C)&&this.button1.visible){
                this.button1.up();
            }
            
            this.elevators.setAll("playerX",this.player.x);
            this.elevators.setAll("playerY",this.player.bottom);
            this.Obots.setAll("playerX",this.player.x);
            this.Obots.setAll("playerY",this.player.bottom);
            this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;

        }pauseUpdate(){
            TSAGame.pauseU(this,this.resume,this.reset);

        }pauseGame(){
            this.game.paused=true;
        }
                restart(){
            if (window.confirm("Are you sure you want to restart this level?")){
                this.game.state.start("level3");
            }
    }
}}