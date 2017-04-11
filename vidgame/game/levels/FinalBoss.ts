/*namespace TSAGame {
    export class FinalBoss extends Phaser.State{
        player: TSAGame.Player;
        gameEnd:Phaser.Sprite;
        button1:Invis;
        button2:Shield;
        healthBar:HealthBar;
        create(){   
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.game.world.resize(1600,600);
            this.gameEnd = this.game.add.sprite(1400,300,"levelEnd");
            this.gameEnd.animations.add("turn",[0,1,2,3,4],13,true);
            this.gameEnd.animations.play("turn");
            this.game.physics.arcade.enable(this.gameEnd);
            this.gameEnd.body.collideWorldBounds = true;
            this.gameEnd.body.gravity.y=60;
            this.game.world.resize(1600, 600);
            this.button1=new Invis(this.game);
            this.button2=new Shield(this.game);
            this.healthBar=new HealthBar(this.game);

        }
        update(){
            let moveOn = this.game.physics.arcade.collide(this.player, this.gameEnd);
            if(moveOn){
                this.game.sound.mute = true;
                console.log("congratulations, you beat the game");
             //   this.game.paused=true;
                this.game.state.start("select");

            }
             this.player.shield=this.button2.shield;
             this.player.invis=this.button1.invis;
             this.healthBar.scale.x=this.player.health*.125;

        }
    }
}*/