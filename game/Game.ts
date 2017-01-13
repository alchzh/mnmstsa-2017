//git add <every file/directory that changed>ie: game/ or site/assets/
//git commit -m "message"

namespace TSAGame {
    export class Game extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, "");
            this.antialias = false;
            this.state.add("Boot", Boot, false);
            this.state.add("Preloader", Preloader, false);
            this.state.add("Credits", Credits, false);
            this.state.add("level1", Level1, false);
            this.state.add("level2", Level2, false);
            this.state.add("level3", Level3, false);
            this.state.add("titleScreen", titleScreen, false);
            this.state.add("levelSelect", LevelSelect, false);
            this.state.add("finalBoss", FinalBoss, false);
            this.state.add("WIN", Win, false);
            this.state.add("playerDeath", PlayerDeath, false);
            this.state.start("Boot");
            console.log(this.time);
        }
    }
}

let lgame;

let pause = () => {
    if (window['lgame'].state.current.startsWith("level")) {
        window['lgame'].paused = true;
    }
};

window.onload = () => {
    window['lgame'] = new TSAGame.Game();
    
    document.getElementById("content").onblur = pause;
};

document.onblur = pause;

window.onblur = pause;
