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
            this.load.spritesheet("Ethan", "./assets/EthanWak.png", 40, 62);
            this.load.spritesheet("Shield", "./assets/EthanShield.png", 40, 62);
            this.load.spritesheet("TankDroneThing2", "./assets/TankDroneThing2.png", 40, 61);
            this.load.image("sky", "./assets/space.png");
            this.load.image("ground", "./assets/ground.png");
            this.load.image("fbpt", "./assets/Final boss.png");
            this.load.image("Ship Tileset", "./assets/Tile Sets/Ship Tileset.png");
            this.load.spritesheet("drone", "./assets/DroneFinal.png", 24, 18);
            this.load.spritesheet("obot", "./assets/Obot3.png", 12, 24);
            this.load.audio("first", "./assets/Music/OLIVER's song.mp3");
            this.load.tilemap('map', 'assets/Tile maps/ship.json', null, Phaser.Tilemap.TILED_JSON);
        };
        Preloader.prototype.create = function () {
            var _this = this;
            var fx = this.game.add.audio('first', 0.6, true);
            fx.play();
            this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function () { return _this.game.state.start("PlayerState", true, false); });
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
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.1;
            this.body.gravity.y = 450;
            this.body.collideWorldBounds = true;
            this.playerScale = 1;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
            this.hitPlatform = true;
            this.jumpV = 275;
            this.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17], 14);
            this.body.offset = new Phaser.Point(8.75, 0);
            console.log("player " + this.left + " body " + this.body.x);
            this.body.width *= 0.4;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = -165;
                this.animations.play('walk');
                if (this.scale.x == this.playerScale) {
                    this.scale.x = -this.playerScale;
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.body.velocity.x += 165;
                this.animations.play('walk');
                if (this.scale.x == -this.playerScale) {
                    this.scale.x = this.playerScale;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))
                    this.animations.frame = 0;
            }
            else if (!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
                this.animations.frame = 0;
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down || this.body.touching.down)) {
                this.body.velocity.y = -this.jumpV;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                this.body.gravity.y += 5;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
                this.body.gravity.y -= 5;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.T)) {
                this.jumpV += 5;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.G)) {
                this.jumpV -= 5;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
                console.log(this.jumpV);
                console.log(this.body.gravity.y);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.loadTexture("Shield", 0);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
                this.loadTexture("Ethan", 0);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
                this.alpha = 0.2;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
                this.alpha = 1;
            }
            if (this.body.velocity.y < 0) {
            }
        };
        return Player;
    }(Phaser.Sprite));
    TSAGame.Player = Player;
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
        }
        GameState.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.world.resize(3200, 600);
            this.game.add.sprite(0, 0, 'sky');
            this.player = new Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.boss = new TSAGame.FBoss(this.game);
            this.drone = new TSAGame.Drone(this.game, 200, 275, 300, 185);
            this.drone.body.immovable = true;
            this.Obots = new TSAGame.Obot(this.game, 550, 404, 660, 468);
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('Ship Tileset');
            this.shipLayer = this.map.createLayer('Tile Layer 1');
            this.map.setCollision(1);
            this.playerLine = new Phaser.Line(this.player.left, this.player.top, this.player.right, this.player.bottom);
        };
        GameState.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.drone);
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.playerLine.setTo(this.player.left, this.player.top, this.player.right, this.player.bottom);
            this.drone.updateLine(this.playerLine, this.map, this.shipLayer);
        };
        return GameState;
    }(Phaser.State));
    TSAGame.GameState = GameState;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var FBoss = (function (_super) {
        __extends(FBoss, _super);
        function FBoss(game) {
            _super.call(this, game, 50, 500, 'fbpt', 0);
        }
        return FBoss;
    }(Phaser.Sprite));
    TSAGame.FBoss = FBoss;
    var Obot = (function (_super) {
        __extends(Obot, _super);
        function Obot(game, x, y, x2, y2) {
            _super.call(this, game, x, y, 'obot', 0);
            this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            this.body.gravity.y = 200;
            this.rate = 6000;
            game.add.existing(this);
            this.globalTime = game.time.create(false);
            this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
            this.globalTime.start(0);
            this.direction = -1;
            this.originX = this.x;
            this.scale.x = 2;
            this.scale.y = 2;
            this.x2 = x2;
            this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
            this.animations.add('moveBack', [8, 9, 10, 8, 9, 10, 0], 5);
            this.animations.add('moveForward', [11, 12, 13, 11, 12, 13, 0], 5);
        }
        Obot.prototype.update = function () {
            if (this.animations.frame < 8)
                this.animations.play('move');
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
                if (this.animations.frame < 8) {
                    this.scale.x = 2;
                    this.body.velocity.x = this.rate * -time;
                }
                if (this.x >= this.x2) {
                    this.animations.stop();
                    this.animations.play('moveForward');
                    this.direction = 1;
                }
            }
            else if (this.direction == 1) {
                if (this.animations.frame < 8) {
                    this.scale.x = -2;
                    this.body.velocity.x = this.rate * time;
                }
                if (this.x <= this.originX) {
                    this.animations.stop();
                    this.animations.play('moveBack');
                    this.direction = -1;
                }
            }
            this.previousTime = this.globalTime.seconds;
        };
        return Obot;
    }(Phaser.Sprite));
    TSAGame.Obot = Obot;
    var Drone = (function (_super) {
        __extends(Drone, _super);
        function Drone(game, x, y, x2, y2) {
            _super.call(this, game, x, y, 'drone', 0);
            this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            this.rate = 3000;
            game.add.existing(this);
            this.globalTime = game.time.create(false);
            this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, this);
            this.globalTime.start(0);
            this.direction = -1;
            this.originX = this.x;
            this.scale.x = -2;
            this.scale.y = 2;
            this.x2 = x2;
            this.laserEnd = 3200;
            this.animations.add('turn', [1, 2, 3, 4, 5, 6, 7, 0], 7.5, false);
            this.laser = new Phaser.Line(0, 275, 200, 275);
        }
        Drone.prototype.updateLine = function (playerLine, map, layer) {
            if (this.direction == -1) {
                this.laser.setTo(this.left, this.y + 15, 3200, this.y + 15);
                var tilehits = layer.getRayCastTiles(this.laser, 4, false, false);
                var realTile = -1;
                for (var i = 0; i < tilehits.length; i++) {
                    if (tilehits[i].index != -1 && realTile == -1)
                        realTile = i;
                }
                if (tilehits.length > 1)
                    this.laserEnd = tilehits[realTile].worldX;
                console.log(tilehits[realTile].index);
                this.laser.setTo(this.left, this.y + 15, this.laserEnd, this.y + 15);
            }
            else if (this.direction == 1) {
                this.laser.setTo(this.left, this.y + 15, 0, this.y + 15);
                var tilehits = layer.getRayCastTiles(this.laser, 4, false, false);
                var realTile = -1;
                for (var i = 0; i < tilehits.length; i++) {
                    if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1)
                        realTile = tilehits.length - 1 - i;
                }
                if (tilehits.length > 1)
                    this.laserEnd = tilehits[realTile].worldX + 32;
                console.log(realTile);
                this.laser.setTo(this.left, this.y + 15, this.laserEnd, this.y + 15);
            }
            if (this.animations.frame == 0) {
                this.game.debug.geom(this.laser, "rgb(255,0,0)");
                var point = playerLine.intersects(this.laser, true);
                if (point != null) {
                    this.animations.frame = 9;
                }
            }
        };
        Drone.prototype.update = function () {
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
                this.scale.x = -2;
                if (this.animations.frame == 0) {
                    this.body.velocity.x = this.rate * -time;
                }
                else {
                    this.laser = new Phaser.Line(0, 0, 0, 0);
                    this.game.debug.geom(this.laser, "rgb(255,0,0)");
                }
                if (this.x >= this.x2) {
                    this.animations.play('turn');
                    this.direction = 1;
                }
            }
            else if (this.direction == 1) {
                this.scale.x = 2;
                if (this.animations.frame == 0) {
                    this.laser.setTo(this.left, this.y + 15, 0, this.y + 15);
                    this.body.velocity.x = this.rate * time;
                }
                else {
                    this.laser = new Phaser.Line(0, 0, 0, 0);
                    this.game.debug.geom(this.laser, "rgb(255,0,0)");
                }
                if (this.x <= this.originX) {
                    this.animations.play('turn');
                    this.direction = -1;
                }
            }
            this.previousTime = this.globalTime.seconds;
        };
        return Drone;
    }(Phaser.Sprite));
    TSAGame.Drone = Drone;
    function uselessfunction() { }
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, "");
            this.antialias = false;
            this.state.add("Boot", TSAGame.Boot, false);
            this.state.add("Preloader", TSAGame.Preloader, false);
            this.state.add("Credits", TSAGame.Credits, false);
            this.state.add("PlayerState", TSAGame.GameState, false);
            this.state.start("Boot");
            this.globalTime = new Phaser.Time(this);
        }
        return Game;
    }(Phaser.Game));
    TSAGame.Game = Game;
})(TSAGame || (TSAGame = {}));
window.onload = function () {
    new TSAGame.Game();
};
//# sourceMappingURL=app.js.map