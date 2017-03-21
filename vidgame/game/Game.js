//git add <every file/directory that changed>ie: game/ or site/assets/
//git commit -m "message"
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSAGame;
(function (TSAGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 800, 600, Phaser.AUTO, "") || this;
            _this.antialias = false;
            _this.state.add("Boot", Boot, false);
            _this.state.add("Preloader", Preloader, false);
            _this.state.add("Credits", Credits, false);
            _this.state.add("level1", Level1, false);
            _this.state.add("level2", Level2, false);
            _this.state.add("level3", Level3, false);
            _this.state.add("titleScreen", titleScreen, false);
            _this.state.add("levelSelect", LevelSelect, false);
            _this.state.add("finalBoss", FinalBoss, false);
            _this.state.add("WIN", Win, false);
            _this.state.add("playerDeath", PlayerDeath, false);
            _this.state.start("Boot");
            console.log(_this.time);
            return _this;
        }
        return Game;
    }(Phaser.Game));
    TSAGame.Game = Game;
})(TSAGame || (TSAGame = {}));
var lgame;
var pause = function () {
    if (window['lgame'].state.current.startsWith("level")) {
        window['lgame'].paused = true;
    }
};
window.onload = function () {
    window['lgame'] = new TSAGame.Game();
    document.getElementById("content").onblur = pause;
};
document.onblur = pause;
window.onblur = pause;
