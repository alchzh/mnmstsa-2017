var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSAGame;
(function (TSAGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image("preloadBar", "./assets/loader.png");
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 480;
                this.scale.minHeight = 260;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 768;
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
                this.scale.refresh();
            }
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    }(Phaser.State));
    TSAGame.Boot = Boot;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.game.add.sprite(200, 250, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image("logo", "./assets/logo.gif");
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start("MainMenu", true, false);
        };
        return Preloader;
    }(Phaser.State));
    TSAGame.Preloader = Preloader;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            var _this = this;
            this.logo = this.add.sprite(400, 300, "logo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(0.9);
            var bot = (this.logo.height + 800 - this.logo.width) / 2;
            this.add.tween(this.logo).to({ y: bot }, 1500, Phaser.Easing.Elastic.Out, true, 1000).onComplete.add(function () {
                _this.team = _this.add.text(400, bot / 2 + _this.logo.height / 4 + 300, "1043-901", { font: "bold 56px Arial", fill: "#fff" });
                _this.team.anchor.setTo(0.5);
            });
            this.input.onDown.addOnce(this.fadeOut, this);
            var line1 = new Phaser.Line(400, 0, 400, 600);
            this.game.debug.geom(line1);
        };
        MainMenu.prototype.fadeOut = function () {
            var _this = this;
            this.add.tween(this.team).to({ y: 628 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Bounce.Out, true).onComplete.add(function () {
                _this.game.state.start("Level1", true, false);
            });
        };
        return MainMenu;
    }(Phaser.State));
    TSAGame.MainMenu = MainMenu;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, "");
            this.state.add("Boot", TSAGame.Boot, false);
            this.state.add("Preloader", TSAGame.Preloader, false);
            this.state.add("MainMenu", TSAGame.MainMenu, false);
            this.state.start("Boot");
        }
        return Game;
    }(Phaser.Game));
    TSAGame.Game = Game;
})(TSAGame || (TSAGame = {}));
window.onload = function () {
    new TSAGame.Game();
};
//# sourceMappingURL=app.js.map