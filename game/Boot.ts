namespace TSAGame {
    export class Boot extends Phaser.State {
        
        preload() {
            this.load.image("preloadBar", "./assets/loader.png");
        }
        
        create() {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
//                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
//              Mobile Settings
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 480;
                this.scale.minHeight = 260;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 768;
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
                this.scale.refresh();
            }
            
            console.log(this.game);
            this.game.state.start("Preloader", true, false);
        }
    }
}