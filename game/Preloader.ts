namespace TSAGame {
    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {
            this.preloadBar = this.game.add.sprite(200, 250, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);

            // this.load.image('titlepage', './assets/titlepage.jpg');
            this.load.image("logo", "./assets/logo.gif");
            // this.load.audio('music', './assets/title.mp3', true);
            // this.load.spritesheet('simon', './assets/simon.png', 58, 96, 5);
            // this.load.image('level1', './assets/level1.png');
        }

        create() {
            this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000,
                Phaser.Easing.Linear.None, true).onComplete.add(
                    () => this.game.state.start("MainMenu", true, false)
                );
        }
    }
}
