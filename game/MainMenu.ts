namespace TSAGame {

    export class MainMenu extends Phaser.State {

        logo: Phaser.Sprite;
        team: Phaser.Sprite;

        create() {
            this.logo = this.add.sprite(400, 300, "logo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(0.9);
            let cen = (this.logo.height + 800 - this.logo.width) / 2;
            this.add.tween(this.logo).to({ y: cen}, 1500, Phaser.Easing.Elastic.Out, true, 1000).onComplete.add(() => {
                this.team = this.add.text(400, cen / 2 + this.logo.height / 4 + 300, "1043-901", {font: "bold 56px Arial", fill: "#fff"});
                this.team.anchor.setTo(0.5);
                console.log('hi');
                this.time.events.add(3000, this.fadeOut, this);
            });
        }

        fadeOut() {
            this.add.tween(this.team).to({ y: 628 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.add.tween(this.logo).to({ y: this.logo.height / 2 }, 2000, Phaser.Easing.Bounce.Out, true).onComplete.add(() => {
                this.game.state.start("Level1", true, false);
            });
        }
    }
}