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
    var Credits = (function (_super) {
        __extends(Credits, _super);
        function Credits() {
            _super.apply(this, arguments);
        }
        Credits.prototype.create = function () {
            var _this = this;
            this.logo = this.add.sprite(400, 300, "logo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(0.9);
            var cen = (this.logo.height + 800 - this.logo.width) / 2;
            this.add.tween(this.logo).to({ y: cen }, 1500, Phaser.Easing.Elastic.Out, true, 1000).onComplete.add(function () {
                _this.team = _this.add.text(400, cen / 2 + _this.logo.height / 4 + 300, "1043-901", { font: "bold 56px Arial", fill: "#fff" });
                _this.team.anchor.setTo(0.5);
                _this.time.events.add(3000, _this.fadeOut, _this);
            });
        };
        Credits.prototype.fadeOut = function () {
            var _this = this;
            this.add.tween(this.team).to({ y: 628 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.add.tween(this.logo).to({ y: this.logo.height / 2 + 600 }, 2000, Phaser.Easing.Bounce.Out, true).onComplete.add(function () {
                _this.game.state.start("Level1", true, false);
                _this.game.state.start("PlayerState", true, false);
            });
        };
        return Credits;
    }(Phaser.State));
    TSAGame.Credits = Credits;
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
            this.load.image("Ethan", "./assets/Ethan.png");
        };
        Preloader.prototype.create = function () {
            var _this = this;
            this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function () { return _this.game.state.start("Credits", true, false); });
        };
        Preloader.prototype.update = function () {
        };
        return Preloader;
    }(Phaser.State));
    TSAGame.Preloader = Preloader;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'Ethan', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.playerScale = 1.5;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
        }
        Player.prototype.update = function () {
            console.log("updating player");
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -170;
                this.animations.play('walk');
                if (this.scale.x == this.playerScale) {
                    this.scale.x = -this.playerScale;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 170;
                this.animations.play('walk');
                if (this.scale.x == -this.playerScale) {
                    this.scale.x = this.playerScale;
                }
            }
            else {
                this.animations.frame = 0;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.body.touching.down && this.hitPlatform) {
                this.body.velocity.y = -350;
            }
        };
        return Player;
    }(Phaser.Sprite));
    TSAGame.Player = Player;
    var PlayerState = (function (_super) {
        __extends(PlayerState, _super);
        function PlayerState() {
            _super.apply(this, arguments);
        }
        PlayerState.prototype.preload = function () {
        };
        PlayerState.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.player = new Player(this.game, 130, 284);
        };
        PlayerState.prototype.update = function () {
        };
        return PlayerState;
    }(Phaser.State));
    TSAGame.PlayerState = PlayerState;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, "");
            this.state.add("Boot", TSAGame.Boot, false);
            this.state.add("Preloader", TSAGame.Preloader, false);
            this.state.add("Credits", TSAGame.Credits, false);
            this.state.add("Level1", TSAGame.Level1, false);
            this.state.add("PlayerState", TSAGame.PlayerState, false);
            this.state.start("Boot");
        }
        return Game;
    }(Phaser.Game));
    TSAGame.Game = Game;
})(TSAGame || (TSAGame = {}));
window.onload = function () {
    new TSAGame.Game();
};
var TSAGame;
(function (TSAGame) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.preload = function () {
        };
        Level1.prototype.create = function () {
        };
        Level1.prototype.update = function () {
        };
        return Level1;
    }(Phaser.State));
    TSAGame.Level1 = Level1;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, x, y) {
            _super.call(this, game, x, y, 'ethan', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            this.game.physics.arcade.enableBody(this);
            game.add.existing(this);
        }
        Enemy.prototype.update = function () {
        };
        return Enemy;
    }(Phaser.Sprite));
    TSAGame.Enemy = Enemy;
    var Drone = (function (_super) {
        __extends(Drone, _super);
        function Drone(game, x, y) {
            _super.call(this, game, x, y);
        }
        return Drone;
    }(Enemy));
    TSAGame.Drone = Drone;
})(TSAGame || (TSAGame = {}));
//# sourceMappingURL=app.js.map