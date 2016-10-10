/// <reference path="./Boot.ts"/>
/// <reference path="./Preloader.ts"/>
/// <reference path="./Credits.ts" />

namespace TSAGame {
    export class Game extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, "");
            this.state.add("Boot", Boot, false);
            this.state.add("Preloader", Preloader, false);
            this.state.add("Credits", Credits, false);
            this.state.start("Boot");
        }
    }
}

window.onload = () => {
    new TSAGame.Game();
};