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
        elevators:any;
        tbots:any;
        
        create(){
            setUp(this,"lvl3");
            // console.log("hi");
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);

            this.level3End = this.game.add.sprite(3000,300,"bigAlienElevator");
            this.game.physics.arcade.enable(this.level3End);
            this.level3End.body.collideWorldBounds = true;
            this.level3End.body.gravity.y=60;
            console.log("hai");
            this.map = this.add.tilemap("map3");
            this.map.addTilesetImage("Level 3 tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.map.setCollision(1);
            this.elevators=this.game.add.group();
            this.Obots=this.game.add.group();
            this.button1=new Invis(this.game);
            this.button2=new Shield(this.game);
            this.healthBar=new HealthBar(this.game);
            this.bgMusic=this.game.add.audio("third", 0.6, true);
            this.bgMusic.play();


        }
        update(){
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);

        //    this.game.physics.arcade.collide(this.tbots, this.shipLayer);

            let moveOn = this.game.physics.arcade.collide(this.player, this.level3End);
            if(moveOn){
                console.log("congratulations, you have made it to the final boss!");
                this.game.state.start("finalBoss");
            }this.elevators.setAll("playerX",this.player.x);
            this.elevators.setAll("playerY",this.player.bottom);
            this.Obots.setAll("playerX",this.player.x);
            this.Obots.setAll("playerY",this.player.bottom);
            this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;

        }
    }
}