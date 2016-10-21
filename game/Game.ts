/// <reference path="./Boot.ts"/>
/// <reference path="./Preloader.ts"/>
/// <reference path="./Credits.ts" />
/// <reference path="./Player.ts"/>
/// <reference path="./enemies.ts"/>

namespace TSAGame {
    export class Game extends Phaser.Game {
    
        globalTime:Phaser.Time;
        constructor() {
            super(800, 600, Phaser.AUTO, "");
            this.antialias = false;
            this.state.add("Boot", Boot, false);
            this.state.add("Preloader", Preloader, false);
            this.state.add("Credits", Credits, false);
            this.state.add("PlayerState",GameState,false);
            this.state.start("Boot");
            this.globalTime = new Phaser.Time(this);
        }
    }
}

window.onload = () => {
    new TSAGame.Game();
};