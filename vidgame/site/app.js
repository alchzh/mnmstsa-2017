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
            return _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.load.image("preloadBar", "./assets/finalBar.png");
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
            console.log(this.game);
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
            return _super.apply(this, arguments) || this;
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
    var Alien = (function (_super) {
        __extends(Alien, _super);
        function Alien(game, x, y, x2, layer, group) {
            var _this = _super.call(this, game, x, y, 'alien', 0) || this;
            _this.anchor.setTo(0.5, 0);
            _this.game.physics.arcade.enableBody(_this);
            _this.body.gravity.y = 400;
            _this.originX = x;
            _this.x2 = x2;
            game.add.existing(_this);
            _this.direction = -1;
            _this.suspicious = false;
            _this.blasts = _this.game.add.group();
            _this.laserEnd = 3200;
            _this.disrupted = false;
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.isTriggered = false;
            _this.myLaser.scale.y = 0.125;
            _this.myLaser.alpha = 0;
            _this.layer = layer;
            _this.notSeen = 0;
            _this.troubleShoot = 0;
            _this.failure = 0;
            group.add(_this);
            _this.playerS = _this.game.add.sprite(_this.playerX, _this.playerY, "laser");
            _this.playerS.alpha = 0;
            _this.body.immovable = true;
            _this.animations.add('move', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
            _this.animations.add("stop", [0, 0, 0, 0, 1], 3);
            _this.animations.add('disrupt', [15, 16, 17, 18, 19, 20, 21, 22], 7);
            _this.animations.add('grab', [23, 24, 25, 26], 5);
            _this.animations.add('troubleShoot', [26, 26, 27, 26, 27, 26, 26, 27, 26, 27, 26], 4);
            _this.animations.add('triggered', [28, 29, 30, 31, 29, 30, 31, 29, 30, 31, 14], 7);
            _this.animations.add('suspicious', [14, 0], 2);
            _this.suspicion = game.add.image(_this.x, _this.y + 5, "suspicion");
            _this.arm = _this.addChild((game.make.image(-11, 13, 'arm')));
            _this.arm.alpha = 0;
            _this.playerY = 0;
            _this.playerX = 0;
            _this.animations.play("move");
            return _this;
        }
        Alien.prototype.updateLine = function (playerLine) {
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 15) {
                if (this.direction == -1) {
                    this.laser.setTo(this.left + 8, this.y + 5, this.game.world.width, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile == -1) {
                            realTile = i;
                        }
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = this.game.world.width;
                    }
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction == 1) {
                    this.laser.setTo(this.left + 8, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1)
                            realTile = tilehits.length - 1 - i;
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                var point = playerLine.intersects(this.laser, true);
                if (point != null) {
                    var dTime = 0.0;
                    if (this.game.time.fps > 2) {
                        dTime = 60 / this.game.time.fps;
                    }
                    else {
                        dTime = 1;
                    }
                    this.suspicious = true;
                    this.prevSpot += 1 * dTime;
                    if (this.notSeen < 50)
                        this.notSeen = 0;
                    this.animations.play('suspicious');
                }
                else {
                    this.prevSpot = 0;
                    if (this.suspicious) {
                        var dTime = 0.0;
                        if (this.game.time.fps > 2) {
                            dTime = 60 / this.game.time.fps;
                        }
                        else {
                            dTime = 1;
                        }
                        this.notSeen += dTime;
                    }
                    else {
                        this.notSeen = 0;
                    }
                }
            }
            else {
                this.laser.setTo(0, 0, 0, 0);
            }
        };
        Alien.prototype.update = function () {
            var dTime = 0.0;
            if (this.game.time.fps > 2) {
                dTime = 60 / this.game.time.fps;
            }
            else {
                dTime = 1;
            }
            if (TSAGame.alarmsOn && !this.suspicious) {
                this.suspicious = true;
                this.animations.play('suspicious');
            }
            this.body.velocity.x = 0;
            if (this.animations.frame < 14 && this.animations.frame > 0) {
                if (!this.suspicious)
                    this.body.velocity.x = 65;
                else
                    this.body.velocity.x = 140;
            }
            if (this.direction == -1) {
                if (this.animations.frame < 14 && this.animations.currentAnim.name != "stop") {
                    this.animations.play("move", 12);
                    this.scale.x = 1;
                }
                if (this.x >= this.x2 && this.frame < 15) {
                    this.animations.play('stop');
                    if (this.animations.frame == 1) {
                        this.direction = 1;
                        this.scale.x = -1;
                        this.animations.play("move", 12);
                    }
                }
            }
            else if (this.direction == 1) {
                if (this.animations.frame < 14 && this.animations.currentAnim.name != "stop") {
                    this.animations.play("move", 12);
                    this.body.velocity.x *= -1;
                }
                if (this.x <= this.originX && this.frame < 15) {
                    this.animations.play('stop');
                    if (this.animations.frame == 1) {
                        this.direction = -1;
                        this.scale.x = 1;
                        this.animations.play("move", 12);
                    }
                }
            }
            if (this.animations.currentAnim.name == "triggered")
                this.isTriggered = true;
            else
                this.isTriggered = false;
            if (this.frame == 22)
                this.animations.play("grab");
            else if (this.frame == 26)
                this.animations.play("troubleShoot");
            else if (this.animations.currentAnim.name == "move" && this.suspicious)
                this.animations.play("move", 16);
            else if (this.isTriggered && this.frame == 14) {
                this.suspicious = true;
                this.animations.play("move", 16);
            }
            if (this.suspicious) {
                this.prevSus += 1 * dTime;
                this.suspicion.alpha = 1;
                this.suspicion.x = this.x - 5;
                this.suspicion.y = this.top - 35;
            }
            else {
                this.suspicion.alpha = 0;
                this.prevSus = 0;
            }
            if (this.prevSus >= 600) {
                this.animations.play("move", 12);
                this.suspicious = false;
                this.prevSus = 0;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z) && this.playerY == this.bottom) {
                if (!this.disrupted && this.animations.frame < 15) {
                    if (this.direction == -1 && this.left - this.playerX <= 60) {
                        this.disrupt();
                    }
                    if (this.direction == 1 && this.playerX - 40 - this.right <= 60) {
                        this.disrupt();
                    }
                }
            }
            if (this.prevSpot >= 60 || (this.notSeen >= 50 && this.prevSpot > 0)) {
                this.triggered();
            }
            if (this.animations.frame > 27) {
                this.arm.alpha = 1;
            }
            else {
                this.arm.alpha = 0;
            }
            if (this.animations.currentAnim.name == "troubleShoot")
                this.troubleShoot += 1 * dTime;
            else
                this.troubleShoot = 0;
            if (this.troubleShoot >= 300)
                this.animations.play("move");
        };
        Alien.prototype.disrupt = function () {
            this.disrupted = true;
            this.animations.play("disrupt");
        };
        Alien.prototype.triggered = function () {
            if (this.frame < 15) {
                this.animations.play("triggered");
                this.blasts.getFirstDead().addIn(this.x, this.y + 12, this.scale.x, 0, 0);
                this.arm.rotation = 0;
            }
        };
        return Alien;
    }(Phaser.Sprite));
    TSAGame.Alien = Alien;
    var TBot = (function (_super) {
        __extends(TBot, _super);
        function TBot(game, x, y, x2, layer, group, player) {
            var _this = _super.call(this, game, x, y, 'tbot', 0) || this;
            game.add.existing(_this);
            game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            _this.body.gravity.y = 400;
            group.add(_this);
            _this.angry = 0;
            _this.originX = x;
            _this.x2 = x2;
            _this.direction = -1;
            _this.shutDown = false;
            _this.playerX = player.x;
            _this.player = player;
            _this.playerY = player.y;
            _this.laserEnd = 3200;
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.myLaser.scale.y = 0.125;
            _this.stuckX = 0;
            _this.prevX = x;
            _this.animations.add('crash', [20, 20, 20, 20, 20, 0], 1, true);
            _this.animations.add('move', [0, 1, 2, 3, 4, 5], 12, true);
            _this.animations.add('alerted', [14, 15, 16, 17, 18, 19], 10, false);
            _this.animations.add('turn', [6, 7, 8, 9, 10, 11, 12, 13], 20, false);
            _this.animations.add('turnBack', [12, 11, 10, 9, 8, 7, 6, 5, 5], 20, false);
            _this.layer = layer;
            _this.blasts = _this.game.add.group();
            _this.deactivateS = _this.game.add.audio("deactivate", 0.3, false);
            return _this;
        }
        TBot.prototype.updateLine = function (playerLine) {
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 6) {
                if (this.direction == -1) {
                    this.laser.setTo(this.left - 8, this.y + 5, this.game.world.width, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile == -1) {
                            realTile = i;
                        }
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = this.game.world.width;
                    }
                    this.laser.setTo(this.left - 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction == 1) {
                    this.laser.setTo(this.left + 8, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1)
                            realTile = tilehits.length - 1 - i;
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                var point = playerLine.intersects(this.laser, true);
                if (point != null) {
                    this.animations.play('alerted');
                }
            }
            else {
                this.laser.setTo(0, 0, 0, 0);
            }
        };
        TBot.prototype.update = function () {
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            this.body.velocity.x = 0;
            if (this.animations.frame < 20) {
                this.game.physics.arcade.collide(this, this.player);
            }
            if (this.frame == 19) {
                this.blasts.getFirstDead().addIn(this.x + (24 * this.scale.x), this.y + 12, -this.scale.x, 0, 0);
                this.angry++;
                this.animations.stop();
                this.frame = 14;
                if (this.angry == 2)
                    this.animations.play("move");
                else
                    this.animations.play("alerted");
            }
            else if (this.animations.currentAnim.name != "alerted") {
                this.angry = 0;
            }
            if (this.direction == -1) {
                if (this.animations.frame < 6) {
                    this.animations.play("move");
                    this.scale.x = -1;
                    this.body.velocity.x = 50;
                }
                if (this.x >= this.x2 || this.stuckX > 150) {
                    this.animations.play('turn');
                }
                if (this.animations.frame === 13) {
                    this.frame = 12;
                    this.scale.x = 1;
                    this.animations.play('turnBack');
                    this.direction = 1;
                }
            }
            else if (this.direction == 1) {
                if (this.animations.frame < 6) {
                    this.animations.play("move");
                    this.scale.x = 1;
                    this.body.velocity.x = -50;
                }
                if (this.x < this.originX || this.stuckX > 150) {
                    this.animations.play('turn');
                }
                if (this.animations.frame === 13) {
                    this.frame = 12;
                    this.scale.x = -1;
                    this.animations.play('turnBack');
                    this.direction = -1;
                }
            }
            if (TSAGame.alarmsOn)
                this.body.velocity.x *= 1.75;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z) && this.playerY == this.bottom) {
                if (!this.shutDown) {
                    if ((this.direction == -1 || this.animations.currentAnim.name == "turnBack") && this.x - this.playerX - 16 <= 40 && this.x - this.playerX - 16 >= 0) {
                        this["break"]();
                    }
                    if ((this.direction == -1 || this.animations.currentAnim.name == "turn") && this.playerX - 16 - this.x <= 40 && this.playerX - 16 - this.x >= 0) {
                        this["break"]();
                    }
                }
            }
            if (this.prevX == this.x && this.animations.frame < 6) {
                this.stuckX++;
            }
            else {
                this.stuckX = 0;
            }
            this.prevX = this.x;
        };
        TBot.prototype["break"] = function () {
            this.deactivateS.play();
            this.shutDown = true;
            this.animations.play("crash");
        };
        return TBot;
    }(Phaser.Sprite));
    TSAGame.TBot = TBot;
    var Obot = (function (_super) {
        __extends(Obot, _super);
        function Obot(game, x, y, x2, group, layer, player) {
            var _this = _super.call(this, game, x, y, 'obot', 0) || this;
            _this.anchor.setTo(0.5, 0);
            _this.game.physics.arcade.enableBody(_this);
            _this.body.gravity.y = 200;
            _this.rate = 6000;
            game.add.existing(_this);
            _this.globalTime = game.time.create(false);
            _this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, _this);
            _this.globalTime.start(0);
            _this.direction = -1;
            _this.originX = _this.x;
            _this.x2 = x2;
            _this.shutDown = false;
            _this.blasts = game.add.group();
            _this.player = player;
            _this.playerX = player.x;
            _this.playerY = player.bottom;
            _this.prevX = x;
            _this.stuckX = 0;
            group.add(_this);
            _this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
            _this.animations.add('moveBack', [8, 9, 10, 11, 12, 0], 5);
            _this.animations.add('moveForward', [14, 15, 16, 17, 18, 0], 5);
            _this.animations.add('alert', [20, 21, 22, 24], 5);
            _this.animations.add('crash', [23, 23, 23, 23, 23, 23, 0], 1);
            _this.laserEnd = 3200;
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.myLaser.scale.y = 0.125;
            _this.body.offset = new Phaser.Point(12, 0);
            _this.body.width = 12;
            _this.layer = layer;
            _this.deactivateS = _this.game.add.audio("deactivate", 0.3, false);
            return _this;
        }
        Obot.prototype.updateLine = function (playerLine, map) {
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 8) {
                if (this.direction == -1) {
                    this.laser.setTo(this.right - 8, this.y + 5, this.game.world.width, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile == -1) {
                            realTile = i;
                        }
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = this.game.world.width;
                    }
                    this.laser.setTo(this.right - 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction == 1) {
                    this.laser.setTo(this.right + 8, this.y + 5, 0, this.y + 5);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1)
                            realTile = tilehits.length - 1 - i;
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    this.laser.setTo(this.right + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                var point = playerLine.intersects(this.laser, true);
                if (point != null) {
                    this.animations.play("alert");
                }
            }
            else {
                this.laser.setTo(0, 0, 0, 0);
            }
        };
        Obot.prototype.update = function () {
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            var dTime = 0.0;
            if (this.game.time.fps > 2) {
                dTime = 60 / this.game.time.fps;
            }
            else {
                dTime = 1;
            }
            if (this.frame == 22) {
                this.blasts.getFirstDead().addIn(this.x + (24 * this.scale.x), this.y, this.scale.x, 0, 0);
                this.frame = 24;
            }
            if (this.animations.frame < 20) {
                this.game.physics.arcade.collide(this, this.player);
            }
            if (TSAGame.alarmsOn)
                this.body.velocity.x *= 1.75;
            if (this.animations.frame < 8)
                this.animations.play('move');
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
                if (this.animations.frame < 8) {
                    this.scale.x = 1;
                    this.body.velocity.x = 85 * dTime;
                }
                else {
                    this.laser.setTo(0, 0, 0, 0);
                }
                if (this.x >= this.x2 || this.stuckX > 150) {
                    this.animations.stop();
                    this.animations.play('moveForward');
                    this.direction = 1;
                }
            }
            else if (this.direction == 1) {
                if (this.animations.frame < 8) {
                    this.scale.x = -1;
                    this.body.velocity.x = -85 * dTime;
                }
                else {
                    this.laser.setTo(0, 0, 0, 0);
                }
                if (this.x <= this.originX || this.stuckX > 150) {
                    this.animations.stop();
                    this.animations.play('moveBack');
                    this.direction = -1;
                }
            }
            if (this.prevX == this.x && this.animations.frame < 8) {
                this.stuckX++;
            }
            else {
                this.stuckX = 0;
            }
            this.prevX = this.x;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z) && this.playerY == this.bottom) {
                if (!this.shutDown) {
                    if ((this.direction == -1 || this.animations.currentAnim.name == "moveForward" || this.animations.currentAnim.name == "moveBack") && this.x - this.playerX - 16 <= 30 && this.x - this.playerX - 16 >= 0) {
                        this["break"]();
                    }
                    console.log(this.x - this.playerX - 16);
                    if ((this.direction == 1 || this.animations.currentAnim.name == "moveBack" || this.animations.currentAnim.name == "moveForward") && this.playerX - 16 - this.x <= 30 && this.playerX - 16 - this.x >= 0) {
                        this["break"]();
                    }
                }
            }
            if (this.frame == 12)
                this.scale.x = 1;
            else if (this.frame == 18)
                this.scale.x = -1;
            this.previousTime = this.globalTime.seconds;
        };
        Obot.prototype["break"] = function () {
            this.shutDown = true;
            this.deactivateS.play();
            this.animations.play("crash");
        };
        return Obot;
    }(Phaser.Sprite));
    TSAGame.Obot = Obot;
    var Drone = (function (_super) {
        __extends(Drone, _super);
        function Drone(game, x, y, x2, group, layer) {
            var _this = _super.call(this, game, x, y, 'drone', 0) || this;
            _this.anchor.setTo(0.5, 0);
            _this.game.physics.arcade.enableBody(_this);
            _this.rate = 3000;
            game.add.existing(_this);
            _this.globalTime = game.time.create(false);
            _this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, _this);
            _this.globalTime.start(0);
            _this.direction = -1;
            _this.originX = _this.x;
            group.add(_this);
            _this.x2 = x2;
            _this.cooldown;
            _this.laserEnd = 3200;
            _this.blasts = game.add.group();
            _this.animations.add('turn', [1, 2, 3, 4, 5, 6, 7, 0], 7.5, false);
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.myLaser.scale.y = 0.125;
            _this.layer = layer;
            return _this;
        }
        Drone.prototype.updateLine = function (playerLine) {
            if (this.animations.frame == 0) {
                if (this.direction == -1) {
                    this.laser.setTo(this.left, this.y + 15, 3200, this.y + 15);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[i].index != -1 && realTile == -1)
                            realTile = i;
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX;
                    }
                    else {
                        this.laserEnd = 3200;
                    }
                    this.laser.setTo(this.left, this.y + 15, this.laserEnd, this.y + 15);
                }
                else if (this.direction == 1) {
                    this.laser.setTo(this.left, this.y + 15, 0, this.y + 15);
                    var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                    var realTile = -1;
                    for (var i = 0; i < tilehits.length; i++) {
                        if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1)
                            realTile = tilehits.length - 1 - i;
                    }
                    if (tilehits.length > 1 && realTile != -1) {
                        this.laserEnd = tilehits[realTile].worldX + 32;
                    }
                    else {
                        this.laserEnd = 0;
                    }
                    this.laser.setTo(this.left, this.y + 15, this.laserEnd, this.y + 15);
                }
                if (this.animations.frame == 0) {
                    var point = playerLine.intersects(this.laser, true);
                    if (point != null) {
                        this.animations.frame = 9;
                    }
                }
            }
            else {
                this.laser.setTo(0, 0, 0, 0);
            }
        };
        Drone.prototype.update = function () {
            var dTime = 0.0;
            if (this.game.time.fps > 2) {
                dTime = 60 / this.game.time.fps;
            }
            else {
                dTime = 1;
            }
            if (this.frame == 9) {
                this.nine += 1 * dTime;
            }
            else {
                this.nine = 0;
            }
            if (this.nine >= 45) {
                if (this.blasts != null) {
                    this.nine = 0;
                    this.blasts.getFirstDead().addIn(this.x + (24 * this.scale.x), this.y, -this.scale.x, 0, 0);
                    this.frame = 0;
                }
            }
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
                this.scale.x = -1;
                if (this.animations.frame == 0) {
                    this.body.velocity.x = 75 * dTime;
                }
                else {
                    this.laser = new Phaser.Line(0, 0, 0, 0);
                }
                if (this.x >= this.x2) {
                    this.direction = 1;
                    this.animations.play('turn');
                }
            }
            else if (this.direction == 1) {
                this.scale.x = 1;
                if (this.animations.frame == 0) {
                    this.body.velocity.x = -75 * dTime;
                }
                else {
                    this.laser = new Phaser.Line(0, 0, 0, 0);
                }
                if (this.x <= this.originX) {
                    this.direction = -1;
                    this.animations.play('turn');
                }
            }
            if (TSAGame.alarmsOn)
                this.body.velocity.x *= 1.75;
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
            var _this = _super.call(this, 800, 600, Phaser.AUTO, "") || this;
            _this.antialias = false;
            _this.state.add("Boot", TSAGame.Boot, false);
            _this.state.add("Preloader", TSAGame.Preloader, false);
            _this.state.add("Credits", TSAGame.Credits, false);
            _this.state.add("level1", TSAGame.Level1, false);
            _this.state.add("level2", TSAGame.Level2, false);
            _this.state.add("level3", TSAGame.Level3, false);
            _this.state.add("titleScreen", TSAGame.titleScreen, false);
            _this.state.add("levelSelect", TSAGame.LevelSelect, false);
            _this.state.add("finalBoss", TSAGame.FinalBoss, false);
            _this.state.add("WIN", TSAGame.Win, false);
            _this.state.add("playerDeath", TSAGame.PlayerDeath, false);
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
var TSAGame;
(function (TSAGame) {
    var Elevator = (function (_super) {
        __extends(Elevator, _super);
        function Elevator(game, x, y, y2, group, scale, type) {
            var _this = _super.call(this, game, x, y, type) || this;
            _this.y2 = y2;
            _this.y1 = y;
            _this.glass = _this.addChild((game.make.sprite(46, 0, 'Laser')));
            _this.glass.scale.x = 2.75;
            _this.glass.scale.y = 6.4444;
            game.add.existing(_this);
            _this.moving = false;
            _this.pauseMovement = false;
            _this.reverse = (y - y2 > 0);
            game.physics.arcade.enableBody(_this);
            game.physics.arcade.enableBody(_this.glass);
            if (scale === -1)
                _this.animations.frame = 1;
            _this.body.offset = new Phaser.Point(0, 49);
            _this.body.height = 10.8;
            _this.body.immovable = true;
            _this.glass.body.immovable = true;
            _this.playerX = 0;
            _this.playerY = 0;
            group.add(_this);
            group.add(_this.glass);
            _this.Obots = game.add.group();
            _this.glass.alpha = 0;
            _this.direction = 0;
            _this.sound = _this.game.add.audio('elSound', 1, false);
            return _this;
        }
        Elevator.prototype.update = function () {
            var x = false;
            if (this.frame == 0) {
                if ((this.right - 25) - (this.playerX) >= -5 && (this.right - 25) - (this.playerX) <= 5 && ((this.y + 9) - (this.playerY - 40) >= -2 && (this.y + 9) - (this.playerY - 40) <= 2)) {
                    x = true;
                }
            }
            else {
                if ((this.left + 25) - (this.playerX) >= -5 && (this.left + 25) - (this.playerX) <= 5 && ((this.y + 9) - (this.playerY - 40) >= -2 && (this.y + 9) - (this.playerY - 40) <= 2)) {
                    x = true;
                }
            }
            if (x && this.game.input.keyboard.isDown(Phaser.Keyboard.Z) && (!this.moving || this.prevPM > 50)) {
                this.move();
            }
            var obotA = this.Obots.children;
            for (var i = 0; i < obotA.length; i++) {
                var obot = obotA[i];
                if (this.moving == true && this.direction == -1) {
                    if (this.left - obot.left <= 0 && this.right - obot.right >= 0 && obot.direction == 1) {
                        if (this.bottom - obot.top <= 1 && this.bottom - obot.top >= -3) {
                            this.pauseMovement = true;
                        }
                    }
                    else if (this.left - obot.right <= 0 && this.right - obot.left >= 0 && obot.direction == -1) {
                        if (this.bottom - obot.top <= 1 && this.bottom - obot.top >= -3) {
                            this.pauseMovement = true;
                        }
                    }
                    else {
                        if (i == 0) {
                            this.pauseMovement = false;
                        }
                    }
                }
            }
            if (this.frame == 0)
                this.glass.x = this.x + 46;
            if (this.frame == 1)
                this.glass.x = this.x;
            this.glass.y = this.y;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.V)) {
                this.pauseMovement = true;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.J)) {
                this.pauseMovement = false;
            }
            if (this.pauseMovement == true) {
                this.body.velocity.y = 0;
            }
            else if (this.moving && this.body.velocity.y == 0) {
                if (this.direction == -1) {
                    this.body.velocity.y = 120;
                }
                if (this.direction == 1) {
                    this.body.velocity.y = -120;
                }
            }
            if (!this.reverse) {
                if (this.body.velocity.y == 120 && !(this.y < this.y2)) {
                    this.body.velocity.y = 0;
                    this.y = this.y2;
                    this.moving = false;
                }
                else if (this.body.velocity.y == -120 && this.y <= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    this.moving = false;
                }
            }
            else {
                if (this.body.velocity.y == -120 && !(this.y > this.y2)) {
                    this.body.velocity.y = 0;
                    this.y = this.y2;
                    console.log("f");
                    this.moving = false;
                }
                else if (this.body.velocity.y == 120 && this.y >= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    console.log("u");
                    this.moving = false;
                }
            }
            if (this.pauseMovement) {
                this.prevPM += 1;
            }
            else {
                this.prevPM = 0;
            }
        };
        Elevator.prototype.move = function () {
            this.moving = true;
            this.sound.play();
            if (!this.reverse) {
                if (this.y == this.y2 || this.prevPM > 50) {
                    this.prevPM = 0;
                    this.pauseMovement = false;
                    this.direction = 1;
                    this.body.velocity.y = -120;
                }
                else {
                    this.direction = -1;
                    this.body.velocity.y = 120;
                }
            }
            else {
                if (this.y != this.y2) {
                    this.pauseMovement = false;
                    this.direction = 1;
                    this.body.velocity.y = -120;
                }
                else {
                    this.prevPM = 0;
                    this.direction = -1;
                    this.body.velocity.y = 120;
                }
            }
        };
        return Elevator;
    }(Phaser.Sprite));
    TSAGame.Elevator = Elevator;
    var Invis = (function (_super) {
        __extends(Invis, _super);
        function Invis(game) {
            var _this = _super.call(this, game, 80, 20, "button1") || this;
            game.add.existing(_this);
            _this.fixedToCamera = true;
            _this.invis = false;
            _this.animations.add('over', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 16);
            _this.onInputOver.add(_this.over, _this);
            _this.onInputUp.add(_this.up, _this);
            _this.time = game.time.create(false);
            _this.avail = game.time.create(false);
            return _this;
        }
        Invis.prototype.finish = function () {
            this.invis = false;
        };
        Invis.prototype.out = function () {
            this.animations.frame = 0;
        };
        Invis.prototype.over = function () {
            this.animations.play("over");
        };
        Invis.prototype.up = function () {
            var _this = this;
            this.invis = true;
            this.visible = false;
            this.exists = false;
            this.time.add(Phaser.Timer.SECOND * 2.5, this.finish, this);
            this.time.start(0);
            this.avail.add(Phaser.Timer.MINUTE * 0.5, function () {
                _this.visible = true;
                _this.exists = true;
                if (_this.animations.frame)
                    _this.animations.frame = 0;
            });
            this.avail.start(0);
        };
        return Invis;
    }(Phaser.Button));
    TSAGame.Invis = Invis;
    var Shield = (function (_super) {
        __extends(Shield, _super);
        function Shield(game) {
            var _this = _super.call(this, game, 20, 20, "button2") || this;
            _this.shield = false;
            game.add.existing(_this);
            _this.fixedToCamera = true;
            _this.onInputOver.add(_this.over, _this);
            _this.onInputUp.add(_this.up, _this);
            _this.animations.add('over', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 16);
            _this.time = game.time.create(false);
            _this.avail = game.time.create(false);
            return _this;
        }
        Shield.prototype.finish = function () {
            this.shield = false;
        };
        Shield.prototype.over = function () {
            this.animations.play("over");
        };
        Shield.prototype.out = function () {
            this.animations.frame = 0;
        };
        Shield.prototype.up = function () {
            var _this = this;
            this.visible = false;
            this.exists = false;
            this.shield = true;
            this.time.add(Phaser.Timer.SECOND * 3, this.finish, this);
            this.time.start(0);
            this.avail.add(Phaser.Timer.MINUTE * .5, function () {
                _this.visible = true;
                _this.exists = true;
                if (_this.animations.frame)
                    _this.animations.frame = 0;
            });
            this.avail.start(0);
        };
        return Shield;
    }(Phaser.Button));
    TSAGame.Shield = Shield;
    var HealthBar = (function (_super) {
        __extends(HealthBar, _super);
        function HealthBar(game) {
            var _this = _super.call(this, game, 175, 30, "Laser") || this;
            _this.fixedToCamera = true;
            _this.scale.y = 1.5;
            game.add.existing(_this);
            _this.heart = game.add.sprite(150, 19, 'heart');
            _this.heart.fixedToCamera = true;
            return _this;
        }
        return HealthBar;
    }(Phaser.Image));
    TSAGame.HealthBar = HealthBar;
    var Alarm = (function (_super) {
        __extends(Alarm, _super);
        function Alarm(game, x, y, type, group) {
            var _this = _super.call(this, game, x, y, type) || this;
            game.add.existing(_this);
            _this.tintI = game.add.image(0, 0, "Laser");
            _this.tintI.alpha = 0;
            group.add(_this);
            _this.tintI.scale.x = 100;
            _this.tintI.scale.y = 300;
            _this.tintI.fixedToCamera = true;
            _this.animations.add("strobe", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 15);
            return _this;
        }
        Alarm.prototype.setOff = function () {
            this.animations.play("strobe");
        };
        return Alarm;
    }(Phaser.Image));
    TSAGame.Alarm = Alarm;
    var Sensor = (function (_super) {
        __extends(Sensor, _super);
        function Sensor(game, x, y, pos2, type, direction, layer, group) {
            var _this = _super.call(this, game, x - 16, y + 16, "sensor") || this;
            game.add.existing(_this);
            game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0.5);
            _this.angle += direction * 90;
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.myLaser.scale.y = 0.125;
            _this.pos2 = pos2;
            if (direction == 1 || direction == 3)
                _this.originPos = x - 16;
            else
                _this.originPos = y;
            group.add(_this);
            _this.canUse = true;
            _this.direction = direction;
            _this.direction2 = 1;
            _this.lTimer = game.time.create(false);
            _this.layer = layer;
            _this.drones = undefined;
            _this.pl = new Phaser.Line(0, 0, 0, 0);
            _this.triggered = false;
            _this.detected = false;
            _this.animations.add("shoot", [0, 1, 2, 3, 4, 5, 6, 7], 15);
            _this.blastSound = _this.game.add.audio("blast", 0.6, false);
            _this.blasts = game.add.group();
            return _this;
        }
        Sensor.prototype.update = function () {
            if (this.direction === 1 || this.direction === 3) {
                this.body.velocity.y = 0;
                if (this.direction2 == 1) {
                    if (this.x < this.pos2) {
                        this.body.velocity.x = 30;
                    }
                    else {
                        this.x = this.pos2;
                        this.body.velocity.x = 0;
                        this.direction2 = -1;
                    }
                }
                else if (this.direction2 == -1) {
                    if (this.x > this.originPos) {
                        this.body.velocity.x = -30;
                    }
                    else {
                        this.x = this.originPos;
                        this.body.velocity.x = 0;
                        this.direction2 = 1;
                    }
                }
                if (this.originPos == this.pos2)
                    this.body.velocity.x = 0;
                if (this.canUse) {
                    if (this.direction == 3) {
                        this.laser.setTo(this.x + 16, this.y, this.x, 600);
                        var done = false;
                        if (this.drones != undefined) {
                            var droneL = new Phaser.Line(0, 0, 0, 0);
                            for (var i = 0; i < this.drones.children.length && !done; i++) {
                                var drone = this.drones.children[i];
                                droneL.setTo(drone.left + 10, drone.top, drone.right + 10, drone.top);
                                if (droneL.intersects(this.laser, true)) {
                                    done = true;
                                    laserEnd = drone.top;
                                }
                            }
                        }
                        if (!done) {
                            var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                            var realTile = -1;
                            for (var i = 0; i < tilehits.length; i++) {
                                if (tilehits[i].index != -1 && realTile == -1)
                                    realTile = i;
                            }
                            var laserEnd = 600.0;
                            if (tilehits.length > 1 && realTile != -1) {
                                laserEnd = tilehits[realTile].worldY;
                            }
                            else {
                                laserEnd = 600.0;
                            }
                        }
                        this.laser.setTo(this.x + 16, this.y - 6, this.x, laserEnd);
                        this.myLaser.scale.x = .125;
                        this.myLaser.scale.y = this.laser.length * 0.125;
                        this.myLaser.left = this.laser.x;
                        this.myLaser.top = this.laser.y;
                    }
                    else {
                        this.laser.setTo(this.x + 16, this.y, this.x, 0);
                        var done = false;
                        if (this.drones != undefined) {
                            var droneL = new Phaser.Line(0, 0, 0, 0);
                            for (var i = 0; i < this.drones.children.length && !done; i++) {
                                var drone = this.drones.children[i];
                                droneL.setTo(drone.left + 10, drone.bottom, drone.right + 10, drone.bottom);
                                if (droneL.intersects(this.laser, true)) {
                                    done = true;
                                    laserEnd = drone.bottom;
                                }
                            }
                        }
                        if (!done) {
                            var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                            var realTile = -1;
                            for (var i = 0; i < tilehits.length; i++) {
                                if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1)
                                    realTile = tilehits.length - 1 - i;
                            }
                            var laserEnd = 0.0;
                            if (tilehits.length > 1 && realTile != -1) {
                                laserEnd = tilehits[realTile].worldY + 32;
                            }
                            else {
                                laserEnd = 0.0;
                            }
                        }
                        this.laser.setTo(this.x + 16, this.y + 10, this.x, laserEnd);
                        this.myLaser.scale.x = .125;
                        this.myLaser.scale.y = this.laser.length * 0.125;
                        this.myLaser.left = this.laser.x;
                        this.myLaser.top = this.laser.y;
                    }
                    this.myLaser.alpha = 1;
                }
                else {
                    this.laser.setTo(0, 0, 0, 0);
                    this.myLaser.alpha = 0;
                }
            }
            else {
                this.body.velocity.x = 0;
                if (this.direction2 == 1) {
                    if (this.y < this.pos2) {
                        this.body.velocity.y = 30;
                    }
                    else {
                        this.y = this.pos2;
                        this.direction2 = -1;
                    }
                }
                else if (this.direction2 == -1) {
                    if (this.y > this.originPos) {
                        this.body.velocity.y = -30;
                    }
                    else {
                        this.y = this.originPos;
                        this.direction2 = 1;
                    }
                }
                if (this.canUse) {
                    if (this.direction == 0) {
                        this.laser.setTo(this.x + 4, this.y + 2, 0, this.y - 2);
                        var laserEnd = 0;
                        if (this.drones != undefined) {
                            var droneL = new Phaser.Line(0, 0, 0, 0);
                            for (var i = 0; i < this.drones.children.length; i++) {
                                var drone = this.drones.children[i];
                                droneL.setTo(drone.right, drone.top, drone.right, drone.bottom);
                                if (droneL.intersects(this.laser, true)) {
                                    laserEnd = drone.right;
                                }
                            }
                        }
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length && realTile === -1; i++) {
                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile == -1)
                                realTile = tilehits.length - 1 - i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            if (tilehits[realTile].worldX + 32 > laserEnd)
                                laserEnd = tilehits[realTile].worldX + 32;
                        }
                        else {
                            laserEnd = 0;
                        }
                        this.laser.setTo(this.x + 4, this.y, laserEnd, this.y);
                        this.myLaser.scale.x = this.laser.length * 0.125;
                        this.myLaser.scale.y = .125;
                        this.myLaser.left = this.laser.x;
                        this.myLaser.top = this.laser.y;
                    }
                    else {
                        this.laser.setTo(this.x - 4, this.y - 1, 4800, this.y + 1);
                        var done = false;
                        var laserEnd = 4800;
                        if (this.drones != undefined) {
                            var droneL = new Phaser.Line(0, 0, 0, 0);
                            for (var i = 0; i < this.drones.children.length && !done; i++) {
                                var drone = this.drones.children[i];
                                droneL.setTo(drone.left, drone.top, drone.left, drone.bottom);
                                if (droneL.intersects(this.laser, true)) {
                                    done = true;
                                    laserEnd = drone.left;
                                }
                            }
                        }
                        if (!done) {
                            var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                            var realTile = -1;
                            for (var i = 0; i < tilehits.length; i++) {
                                if (tilehits[i].index != -1 && realTile == -1) {
                                    realTile = i;
                                }
                            }
                            if (tilehits.length > 1 && realTile != -1) {
                                laserEnd = tilehits[realTile].worldX;
                            }
                            else {
                                laserEnd = 4800;
                            }
                        }
                        this.laser.setTo(this.x - 4, this.y, laserEnd, this.y);
                        this.myLaser.scale.x = this.laser.length * 0.125;
                        this.myLaser.scale.y = .125;
                        this.myLaser.left = this.laser.x;
                        this.myLaser.top = this.laser.y;
                    }
                    this.myLaser.alpha = 1;
                }
                else {
                    this.laser.setTo(0, 0, 0, 0);
                    this.myLaser.alpha = 0;
                }
            }
            if (this.frame > 0) {
                this.body.velocity.x = 0;
                if (this.frame == 7) {
                    this.blastSound.play();
                    if (this.direction == 3)
                        this.blasts.getFirstDead().addIn(this.x, this.y, 0, 1, this.direction);
                    else if (this.direction == 1)
                        this.blasts.getFirstDead().addIn(this.x, this.y, 0, -1, this.direction);
                    else if (this.direction == 0)
                        this.blasts.getFirstDead().addIn(this.x, this.y, -1, 0, this.direction);
                    else
                        this.blasts.getFirstDead().addIn(this.x, this.y, 1, 0, this.direction);
                    this.frame = 0;
                    this.lTimer.add(Phaser.Timer.SECOND * 3, this.finish, this);
                    this.lTimer.start(0);
                    this.canUse = false;
                }
            }
            if (this.pl.intersects(this.laser, true)) {
                this.triggered = true;
                this.animations.play("shoot");
            }
            if (this.triggered) {
            }
        };
        Sensor.prototype.finish = function () {
            this.canUse = true;
        };
        return Sensor;
    }(Phaser.Sprite));
    TSAGame.Sensor = Sensor;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, "ethan", 0) || this;
            game.add.existing(_this);
            game.physics.arcade.enable(_this);
            _this.health = 200;
            _this.anchor.setTo(0.5, 0);
            _this.body.gravity.y = 450;
            _this.body.collideWorldBounds = true;
            _this.body.mass = 2;
            _this.playerScale = 1;
            _this.scale.x = _this.playerScale;
            _this.scale.y = _this.playerScale;
            _this.hitPlatform = true;
            _this.jumpV = 250;
            _this.animations.add("walk", [4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17], 14);
            _this.body.offset = new Phaser.Point(8.75, 0);
            _this.body.width *= 0.4;
            _this.shield = false;
            _this.invis = false;
            _this.prevShield = false;
            return _this;
        }
        Player.prototype.update = function () {
            if (this.health < 0) {
                this.health = 0;
            }
            else if (this.health <= 0) {
                this.game.sound.stopAll();
                this.game.state.start("playerDeath");
            }
            var dTime = 0.0;
            if (this.game.time.fps > 2) {
                dTime = 60 / this.game.time.fps;
            }
            else {
                dTime = 1;
            }
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = -165 * dTime;
                this.animations.play("walk");
                if (this.scale.x == this.playerScale) {
                    this.scale.x = -this.playerScale;
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.body.velocity.x += 165 * dTime;
                this.animations.play("walk");
                if (this.scale.x == -this.playerScale) {
                    this.scale.x = this.playerScale;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                    this.animations.frame = 0;
                }
            }
            else if (!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
                this.animations.frame = 0;
            }
            else if (!(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
                this.animations.frame = 0;
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down || this.body.touching.down)) {
                this.body.velocity.y = -this.jumpV;
            }
            if (this.body.velocity.y >= .9 || this.body.velocity.y <= -.9) {
                this.animations.stop(null, true);
                if (this.body.velocity.x != 0) {
                    this.animations.frame = 3;
                }
                else {
                    this.animations.frame = 0;
                }
            }
            var debug = true;
            if (debug) {
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
            }
            if (this.shield != this.prevShield) {
                if (this.shield) {
                    this.loadTexture("shield", 0);
                }
                else {
                    this.loadTexture("ethan", 0);
                }
            }
            if (this.invis) {
                this.tint = 0x666666;
                this.alpha = 0.2;
            }
            else {
                this.alpha = 1;
                this.tint = 0xFFFFFF;
            }
            this.prevShield = this.shield;
        };
        return Player;
    }(Phaser.Sprite));
    TSAGame.Player = Player;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var levelOn;
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            levelOn = 1;
            this.preloadBar = this.game.add.sprite(200, 250, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);
            this.load.spritesheet("ethan", "./assets/Ethan.png", 35, 62);
            this.load.spritesheet("shield", "./assets/EthanShield.png", 40, 62);
            this.load.spritesheet("tbot", "./assets/last Tbot.png", 40, 61);
            this.load.spritesheet("alien", "./assets/Real Alien8.png", 37, 64);
            this.load.spritesheet("obot", "./assets/obot last version.png", 36, 48);
            this.load.spritesheet("alienElevator", "./assets/alivator.png", 66, 58);
            this.load.spritesheet("elevator", "./assets/HumanElevator.png", 66, 58);
            this.load.spritesheet("button1", "./assets/InvisibleGUI.png", 40, 40);
            this.load.spritesheet("button2", "./assets/ShieldGUI2.png", 40, 40);
            this.load.spritesheet("blast", "./assets/blastf.png", 47, 47);
            this.load.image("fire", "./assets/blastf.png");
            this.load.image("blast2", "./assets/blast34.png");
            this.load.image("bigAlienElevator", "./assets/LargeElevator.png");
            this.load.image("sky", "./assets/lev1bg.png");
            this.load.image("lvl2", "./assets/levl2bg.png");
            this.load.image("lvl3", "./assets/bg33.png");
            this.load.image("title", "./assets/title screen.png");
            this.load.image("wull", "./assets/will saved.png");
            this.load.image("jayant", "./assets/Jeanette Saved.png");
            this.load.image("jaems", "./assets/James.png");
            this.load.image("suspicion", "./assets/suspicious.png");
            this.load.spritesheet("siren", "./assets/alarm.png", 32, 32);
            this.load.spritesheet("siren2", "./assets/alien alarm0.png", 32, 32);
            this.load.image("ground", "./assets/ground.png");
            this.load.image("fbpt", "./assets/Final boss.png");
            this.load.image("heart", "./assets/Heart.png");
            this.load.image("Ship Tileset", "./assets/Tile Sets/best Tileset.png");
            this.load.image("Ship2 Tileset", "./assets/Tile Sets/ship2 tileset.png");
            this.load.image("Level 3 tileset", "./assets/Tile Sets/Level 3.png");
            this.load.image("pauseButton", "./assets/pause.png");
            this.load.image("resume", "./assets/resume.png");
            this.load.image("reset", "./assets/main menu button.png");
            this.load.image("retry", "./assets/Retry.png");
            this.load.image("arm", "./assets/alienArm.png");
            this.load.image("Laser", "./assets/Laser.png");
            this.load.image("level1", "./assets/level1 button.png");
            this.load.image("level2", "./assets/level2 button.png");
            this.load.image("level3", "./assets/lvl3 button.png");
            this.load.image("lvlLock", "./assets/levelLocked.png");
            this.load.image("lvlSelect", "./assets/Level Select Screen.png");
            this.load.image("gameover", "./assets/gamover.png");
            this.load.spritesheet("sensor", "./assets/Security Laser2.png", 32, 32);
            this.load.image("done", "./assets/yayay.png");
            this.load.image("instruct", "./assets/instruct.png");
            this.load.image("instructions", "./assets/instruct1.png");
            this.load.image("instructions_paused", "./assets/pauseinstructions.png");
            this.load.image("play", "./assets/play button.png");
            this.load.spritesheet("cryopod", "./assets/cryopod.png", 25, 80);
            this.load.spritesheet("drone", "./assets/drone.png", 47.875, 36);
            this.load.spritesheet("levelEnd", "./assets/AlienTeleporter.png", 34, 66);
            this.load.audio("first", "./assets/sound/first.mp3");
            this.load.audio("second", "./assets/sound/OLIVER's song.mp3");
            this.load.audio("game_over", "./assets/sound/deathScreen.mp3");
            this.load.audio("1", "./assets/sound/TheLevel1.mp3");
            this.load.audio("third", "./assets/sound/lel3.mp3");
            this.load.audio("alarm", "./assets/sound/alarm1.mp3");
            this.load.audio("blast", "./assets/sound/blast.mp3");
            this.load.audio("deactivate", "./assets/sound/deactivate.mp3");
            this.load.audio("elSound", "./assets/sound/elevator sound.mp3");
            this.load.tilemap('map', 'assets/Tile maps/TheHumanShip.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map2', 'assets/Tile maps/alienShip.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map3', 'assets/Tile maps/TheToraxiaBase.json', null, Phaser.Tilemap.TILED_JSON);
        };
        Preloader.prototype.create = function () {
            var _this = this;
            this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function () { return _this.game.state.start("titleScreen", true, false); });
        };
        return Preloader;
    }(Phaser.State));
    TSAGame.Preloader = Preloader;
    var Win = (function (_super) {
        __extends(Win, _super);
        function Win() {
            return _super.apply(this, arguments) || this;
        }
        Win.prototype.create = function () {
            var f = this.game.add.image(0, 0, "done");
            f.scale.x = 2;
            f.scale.y = 2;
        };
        return Win;
    }(Phaser.State));
    TSAGame.Win = Win;
    var titleScreen = (function (_super) {
        __extends(titleScreen, _super);
        function titleScreen() {
            return _super.apply(this, arguments) || this;
        }
        titleScreen.prototype.create = function () {
            var bg = this.game.add.sprite(0, 0, "title");
            this.play = this.game.add.button(bg.width / 2, 225, "play");
            this.play.x = bg.width / 2 - this.play.width / 2;
            this.play.onInputDown.add(this.playPress, this);
            this.instructions = this.game.add.button(bg.width / 2, 350, "instruct");
            this.instructions.x = bg.width / 2 - this.instructions.width / 2;
            this.instructions.onInputDown.add(this.instruct, this);
            this.bgMusic = this.game.add.audio("first", 0.6, true);
            this.bgMusic.play();
        };
        titleScreen.prototype.playPress = function () {
            this.game.state.start("levelSelect", true, false);
        };
        titleScreen.prototype.instruct = function () {
            var _this = this;
            this.image = this.game.add.image(0, 0, "instructions");
            this.image.inputEnabled = true;
            this.image.events.onInputDown.add(function () { return _this.image.destroy(); }, this);
        };
        return titleScreen;
    }(Phaser.State));
    TSAGame.titleScreen = titleScreen;
    var LevelSelect = (function (_super) {
        __extends(LevelSelect, _super);
        function LevelSelect() {
            return _super.apply(this, arguments) || this;
        }
        LevelSelect.prototype.create = function () {
            var bg = this.game.add.sprite(0, 0, "lvlSelect");
            if (!parseInt(localStorage.getItem("clearedLevel"))) {
                localStorage.setItem("clearedLevel", "0");
            }
            localStorage.setItem("clearedLevel", "2");
            this.reset = this.game.add.button(bg.width / 2, 445, "reset");
            this.reset.x = bg.width / 2 - this.reset.width;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.reset.onInputDown.add(this.rset, this);
            console.log(this.reset.x);
            console.log(this.reset.y);
            this.lvl1 = this.game.add.button(bg.width / 2 - 210, 175, "level1");
            this.lvl1.x = bg.width / 2 - 210 - this.lvl1.width;
            this.lvl1.scale.x = 2;
            this.lvl1.scale.y = 2;
            this.lvl1.onInputDown.add(this.levl1, this);
            console.log(this.lvl1.x);
            console.log(this.lvl1.y);
            this.lvl2 = this.game.add.button(bg.width / 2, 175, "level2");
            this.lvl2.x = bg.width / 2 - this.lvl2.width;
            this.lvl2.scale.x = 2;
            this.lvl2.scale.y = 2;
            console.log(this.lvl2.x);
            console.log(this.lvl2.y);
            this.lvl3 = this.game.add.button(bg.width / 2 + 210, 175, "level3");
            this.lvl3.x = bg.width / 2 + 210 - this.lvl3.width;
            this.lvl3.scale.x = 2;
            this.lvl3.scale.y = 2;
            console.log(this.lvl3.x);
            console.log(this.lvl3.y);
            var tint = 0x777777;
            if (parseInt(localStorage.getItem("clearedLevel")) > 0) {
                this.lvl2.onInputDown.add(this.levl2, this);
                if (parseInt(localStorage.getItem("clearedLevel")) > 1) {
                    this.lvl3.onInputDown.add(this.levl3, this);
                }
                else {
                    this.lvl3.onInputDown.add(this.levlLocked, this);
                    this.lvl3.tint = tint;
                    this.levelLock3 = this.game.add.image(this.lvl3.x, this.lvl3.y, "lvlLock");
                    this.levelLock3.scale.x = 2;
                    this.levelLock3.scale.y = 2;
                }
            }
            else {
                this.lvl2.onInputDown.add(this.levlLocked, this);
                this.lvl2.tint = tint;
                this.levelLock2 = this.game.add.image(this.lvl2.x, this.lvl2.y, "lvlLock");
                this.levelLock2.scale.x = 2;
                this.levelLock2.scale.y = 2;
                this.lvl3.onInputDown.add(this.levlLocked, this);
                this.lvl3.tint = tint;
                this.levelLock3 = this.game.add.image(this.lvl3.x, this.lvl3.y, "lvlLock");
                this.levelLock3.scale.x = 2;
                this.levelLock3.scale.y = 2;
            }
        };
        LevelSelect.prototype.rset = function () {
            this.game.sound.stopAll();
            this.game.state.start("Preloader", true, false);
        };
        LevelSelect.prototype.levl1 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level1", true, false);
        };
        LevelSelect.prototype.levl2 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level2", true, false);
        };
        LevelSelect.prototype.levl3 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level3", true, false);
        };
        LevelSelect.prototype.levlLocked = function () {
        };
        return LevelSelect;
    }(Phaser.State));
    TSAGame.LevelSelect = LevelSelect;
    var PlayerDeath = (function (_super) {
        __extends(PlayerDeath, _super);
        function PlayerDeath() {
            return _super.apply(this, arguments) || this;
        }
        PlayerDeath.prototype.create = function () {
            this.bgMusic = this.game.add.audio("game_over", 0.25, false);
            this.bgMusic.play();
            var bg = this.game.add.sprite(0, 0, "gameover");
            bg.alpha = 0;
            this.reset = this.game.add.image(bg.width / 2, 445, "reset");
            this.reset.x = bg.width / 2 - this.reset.width;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            console.log(this.reset.x);
            this.reset.alpha = 0;
            this.game.add.tween(bg).to({ alpha: 1 }, 1000, "Linear", true, 0);
            this.game.add.tween(this.reset).to({ alpha: 0.5 }, 1100, "Linear", true, 1000);
            this.timer = this.game.time.create(true);
            this.timer.add(2100, function addInput() {
                this.reset.alpha = 0;
                this.reset = this.game.add.button(bg.width / 2, 445, "reset");
                this.reset.x = bg.width / 2 - this.reset.width;
                this.reset.scale.x = 2;
                this.reset.scale.y = 2;
                this.reset.alpha = 0.5;
                this.reset.onInputDown.add(this.rset, this);
                this.game.add.tween(this.reset).to({ alpha: 0.85 }, 1100, "Linear", true, 0);
            }, this);
            this.timer.start();
            this.timer = this.game.time.create(true);
            this.timer.add(4000, function addInput() { this.game.add.tween(bg).to({ alpha: 0 }, 3000, "Linear", true, 0); }, this);
            this.timer.start();
        };
        PlayerDeath.prototype.rset = function () {
            this.game.sound.stopAll();
            this.game.state.start("titleScreen", true, false);
        };
        PlayerDeath.prototype.levl1 = function () {
            this.game.state.start("level1", true, false);
        };
        PlayerDeath.prototype.levl2 = function () {
            this.game.state.start("level2", true, false);
        };
        PlayerDeath.prototype.levl3 = function () {
            this.game.state.start("level3", true, false);
        };
        PlayerDeath.prototype.levlLocked = function () {
        };
        return PlayerDeath;
    }(Phaser.State));
    TSAGame.PlayerDeath = PlayerDeath;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var bullet = (function (_super) {
        __extends(bullet, _super);
        function bullet() {
            return _super.apply(this, arguments) || this;
        }
        return bullet;
    }(Phaser.Sprite));
    TSAGame.bullet = bullet;
    var Blast = (function (_super) {
        __extends(Blast, _super);
        function Blast(game, type, rotation, layer) {
            var _this = _super.call(this, game, 0, 0, "blast") || this;
            _this.anchor.setTo(0.5, 0);
            _this.frame = type;
            _this.rotation = rotation;
            _this.checkWorldBounds = true;
            _this.outOfBoundsKill = true;
            _this.exists = false;
            _this.layer = layer;
            _this.alive = false;
            _this.animations.add("p", [0, 1, 2, 3, 4, 5, 6, 7], 30);
            _this.animations.play("p");
            _this.scale.x = 0.5;
            _this.scale.y = 0.5;
            return _this;
        }
        Blast.prototype.update = function () {
            if (this.game.physics.arcade.collide(this.layer, this)) {
                console.log("was?");
                this.kill();
            }
        };
        Blast.prototype.update2 = function (player) {
        };
        Blast.prototype.addIn = function (x, y, xVelMultiplier, yVelMultiplier, rotation) {
            this.reset(x, y);
            this.game.physics.arcade.enable(this);
            this.autoCull = true;
            console.log(x, y);
            this.rotation = rotation * Math.PI / 2 + 1.57;
            this.body.velocity.y = 650 * yVelMultiplier;
            this.body.velocity.x = 550 * xVelMultiplier;
        };
        return Blast;
    }(Phaser.Sprite));
    TSAGame.Blast = Blast;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var FinalBoss = (function (_super) {
        __extends(FinalBoss, _super);
        function FinalBoss() {
            return _super.apply(this, arguments) || this;
        }
        FinalBoss.prototype.create = function () {
            this.player = new TSAGame.Player(this.game, 130, 284);
            this.game.camera.follow(this.player);
            this.game.world.resize(1600, 600);
            this.gameEnd = this.game.add.sprite(1400, 300, "levelEnd");
            this.gameEnd.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.gameEnd.animations.play("turn");
            this.game.physics.arcade.enable(this.gameEnd);
            this.gameEnd.body.collideWorldBounds = true;
            this.gameEnd.body.gravity.y = 60;
            this.game.world.resize(1600, 600);
            this.button1 = new TSAGame.Invis(this.game);
            this.button2 = new TSAGame.Shield(this.game);
            this.healthBar = new TSAGame.HealthBar(this.game);
        };
        FinalBoss.prototype.update = function () {
            var moveOn = this.game.physics.arcade.collide(this.player, this.gameEnd);
            if (moveOn) {
                this.game.sound.mute = true;
                console.log("congratulations, you beat the game");
                this.game.state.start("select");
            }
            this.player.shield = this.button2.shield;
            this.player.invis = this.button1.invis;
            this.healthBar.scale.x = this.player.health * .125;
        };
        return FinalBoss;
    }(Phaser.State));
    TSAGame.FinalBoss = FinalBoss;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    TSAGame.alarmsOn = false;
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            TSAGame.setUp(this, "sky");
            this.player = new TSAGame.Player(this.game, 30, 284);
            this.game.camera.follow(this.player);
            this.game.world.resize(3200, 600);
            this.map = this.add.tilemap("map");
            this.map.addTilesetImage("Ship Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.drones = this.game.add.group();
            var drone = new TSAGame.Drone(this.game, 320, 384, 416, this.drones, this.shipLayer);
            var drone2 = new TSAGame.Drone(this.game, 2464, 280, 2784, this.drones, this.shipLayer);
            var drone3 = new TSAGame.Drone(this.game, 1600, 416, 1888, this.drones, this.shipLayer);
            var drone4 = new TSAGame.Drone(this.game, 1216, 432, 1280, this.drones, this.shipLayer);
            var drone5 = new TSAGame.Drone(this.game, 576, 192, 832, this.drones, this.shipLayer);
            this.drones.setAll("body.immovable", true);
            this.Obots = this.game.add.group();
            var obot = new TSAGame.Obot(this.game, 350, 500, 460, this.Obots, this.shipLayer, this.player);
            var obot2 = new TSAGame.Obot(this.game, 1600, 224, 1664, this.Obots, this.shipLayer, this.player);
            var obot3 = new TSAGame.Obot(this.game, 1824, 320, 1952, this.Obots, this.shipLayer, this.player);
            var obot4 = new TSAGame.Obot(this.game, 2160, 480, 2272, this.Obots, this.shipLayer, this.player);
            var obot5 = new TSAGame.Obot(this.game, 2415, 416, 2560, this.Obots, this.shipLayer, this.player);
            this.healthBar = new TSAGame.HealthBar(this.game);
            this.elevators = this.game.add.group();
            var elevator = new TSAGame.Elevator(this.game, 864, 352, 485, this.elevators, 1, "elevator");
            var elevator2 = new TSAGame.Elevator(this.game, 2592, 352, 182, this.elevators, 1, "elevator");
            this.elevators.setAll("Obots", this.Obots);
            this.button1 = new TSAGame.Invis(this.game);
            this.button2 = new TSAGame.Shield(this.game);
            this.alarm = this.game.add.group();
            var alarm = new TSAGame.Alarm(this.game, 384, 128, "siren", this.alarm);
            var alarm2 = new TSAGame.Alarm(this.game, 288, 128, "siren", this.alarm);
            this.tintI = this.game.add.image(0, 0, "Laser");
            this.tintI.alpha = 0;
            this.eCryo = this.game.add.sprite(0, 270, "cryopod");
            this.game.physics.arcade.enable(this.eCryo);
            this.eCryo.body.collideWorldBounds = true;
            this.eCryo.body.gravity.y = 60;
            this.eCryo.body.immovable = true;
            this.eCryo.scale.x = -1;
            this.eCryo.frame = 1;
            this.tintI.scale.x = 100;
            this.tintI.scale.y = 300;
            this.tintI.fixedToCamera = true;
            this.sensors = this.game.add.group();
            var sensor = new TSAGame.Sensor(this.game, 736, 64, 736, "", 3, this.shipLayer, this.sensors);
            var sensor2 = new TSAGame.Sensor(this.game, 768, 64, 768, "", 3, this.shipLayer, this.sensors);
            var sensor3 = new TSAGame.Sensor(this.game, 1504, 128, 320, "", 0, this.shipLayer, this.sensors);
            var sensor4 = new TSAGame.Sensor(this.game, 1504, 160, 352, "", 0, this.shipLayer, this.sensors);
            this.game.paused = false;
            this.blasts = this.game.add.group();
            for (var i = 0; i < 32; i++) {
                this.blasts.add(new TSAGame.Blast(this.game, 0, 0, this.shipLayer), true);
            }
            this.retry = this.game.add.button(750, 12, "retry");
            this.retry.fixedToCamera = true;
            this.retry.onInputDown.add(this.restart, this);
            this.setOff = false;
            this.prevSetoff = false;
            this.level1end = this.game.add.sprite(2900, 300, "levelEnd");
            this.game.physics.arcade.enable(this.level1end);
            this.level1end.body.collideWorldBounds = true;
            this.level1end.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level1end.animations.play("turn");
            this.level1end.body.gravity.y = 60;
            this.map.setCollision([1, 2, 4, 5, 6]);
            this.playerLine = new Phaser.Line(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            this.bgMusic = this.game.add.audio("1", 0.6, true);
            this.bgMusic.play();
            this.siren = this.game.add.audio("alarm", 1, false);
            this.cryopod = this.game.add.sprite(2920, 64, "cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable = true;
            this.cryopod.animations.add("jayant", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 5, 6, 7], 12);
            this.pause = this.game.add.button(700, 12, "pauseButton");
            this.pause.fixedToCamera = true;
            this.pause.onInputDown.add(this.pauseGame, this);
            this.pause.scale.x = .5;
            this.pause.scale.y = .5;
            this.instructions = this.game.add.sprite(0, 0, "instructions_paused");
            this.instructions.alpha = 0;
            this.instructions.fixedToCamera = true;
            this.resume = this.game.add.image(50, 500, "resume");
            this.resume.fixedToCamera = true;
            this.resume.alpha = 0;
            this.reset = this.game.add.image(400, 500, "reset");
            this.reset.fixedToCamera = true;
            this.reset.alpha = 0;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.timer = 0;
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.eCryo);
            this.game.physics.arcade.collide(this.eCryo, this.shipLayer);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            var awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.alien, this.shipLayer);
            this.game.physics.arcade.collide(this.level1end, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            this.game.physics.arcade.overlap(this.blasts, this.player, this.harm);
            this.resume.alpha = 0;
            this.reset.alpha = 0;
            this.instructions.alpha = 0;
            if (this.Obots.getAll("frame", 20).length > 0 || this.drones.getAll("frame", 9).length > 0 || this.sensors.getAll("triggered", true).length > 0) {
                this.setOff = true;
            }
            if (this.prevSetoff == false && this.setOff == true) {
                this.siren.play();
                this.alarm.callAllExists("setOff", true);
                this.tintI.alpha = 0.1;
                this.timer = this.game.time.create(true);
                this.timer.add(16000, function pancake() {
                    this.tintI.alpha = 0;
                    this.setOff = false;
                    TSAGame.alarmsOn = false;
                }, this);
                this.timer.start();
            }
            this.blasts.callAll("update2", null, this.player);
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                this.pauseGame();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.X) && this.button2.visible) {
                this.button2.up();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.C) && this.button1.visible) {
                this.button1.up();
            }
            if (awake && this.cryopod.frame == 0 && true)
                this.cryopod.animations.play("jayant");
            this.player.shield = this.button2.shield;
            this.player.invis = this.button1.invis;
            this.healthBar.scale.x = this.player.health * .125;
            if (this.cryopod.frame == 7) {
                this.level1end.alpha = 1;
                if (this.game.physics.arcade.collide(this.player, this.level1end)) {
                    console.log("congratulations, you beat level1");
                    this.bgMusic.stop();
                    if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                        localStorage.setItem("clearedLevel", "1");
                    }
                    this.game.state.start("level2");
                }
            }
            else {
                this.level1end.alpha = 0;
            }
            this.sensors.setAll("drones", this.drones);
            this.sensors.setAll("pl", this.playerLine);
            this.sensors.setAll("blasts", this.blasts);
            this.elevators.setAll("playerX", this.player.x);
            this.elevators.setAll("playerY", this.player.bottom);
            this.Obots.setAll("playerX", this.player.x);
            this.Obots.setAll("playerY", this.player.bottom);
            this.Obots.setAll("player", this.player);
            this.drones.setAll("blasts", this.blasts);
            this.Obots.setAll("blasts", this.blasts);
            this.elevators.setAll("Obots", this.Obots);
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                this.game.paused = true;
            }
            if (this.player.alpha == 1) {
                this.playerLine.setTo(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            }
            else {
                this.playerLine.setTo(0.0, 0, 0, 0);
            }
            this.prevSetoff = this.setOff;
            this.drones.callAllExists("updateLine", true, this.playerLine);
            this.Obots.callAllExists("updateLine", true, this.playerLine);
        };
        Level1.prototype.pauseUpdate = function () {
            this.instructions.alpha = 1;
            TSAGame.pauseU(this, this.resume, this.reset);
        };
        Level1.prototype.pauseGame = function () {
            this.reset.alpha = 0;
            this.game.paused = true;
        };
        Level1.prototype.harm = function (player, blast) {
            if (!player.shield) {
                player.health -= 50;
            }
            blast.kill();
        };
        Level1.prototype.restart = function () {
            var preloadBar;
            preloadBar = this.game.add.sprite(200, 250, "preloadBar");
            this.pauseGame();
            if (window.confirm("Are you sure you want to restart this level?")) {
                this.game.sound.stopAll();
                this.game.state.start("level1");
            }
            var timer2 = this.game.time.create(true);
            timer2.add(1, function pancake2() { this.game.paused = false; }, this);
            timer2.start();
        };
        return Level1;
    }(Phaser.State));
    TSAGame.Level1 = Level1;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            return _super.apply(this, arguments) || this;
        }
        Level2.prototype.create = function () {
            if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                localStorage.setItem("clearedLevel", "1");
            }
            TSAGame.setUp(this, "lvl2");
            this.player = new TSAGame.Player(this.game, 30, 284);
            this.game.camera.follow(this.player);
            this.setOff = false;
            this.prevSetoff = false;
            this.map = this.add.tilemap("map2");
            this.map.addTilesetImage("Ship2 Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 3");
            this.map.setCollision([1, 2, 4, 5, 6]);
            this.playerLine = new Phaser.Line(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            this.level2End = this.game.add.sprite(3488, 260, "levelEnd");
            this.game.physics.arcade.enable(this.level2End);
            this.level2End.body.collideWorldBounds = true;
            this.level2End.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level2End.animations.play("turn");
            this.level2End.body.gravity.y = 60;
            this.alarm = this.game.add.group();
            this.cryopod = this.game.add.sprite(3142, 128, "cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable = true;
            this.cryopod.animations.add("will", [1, 1, , 1, 8, 9, 10, 11, 12], 7);
            this.tintI = this.game.add.image(0, 0, "Laser");
            this.tintI.alpha = 0;
            this.tintI.scale.x = 100;
            this.tintI.scale.y = 300;
            this.tintI.fixedToCamera = true;
            var alarm = new TSAGame.Alarm(this.game, 384, 224, "siren2", this.alarm);
            var alarm2 = new TSAGame.Alarm(this.game, 448, 224, "siren2", this.alarm);
            this.elevators = this.game.add.group();
            var elevator = new TSAGame.Elevator(this.game, 672, 480, 228, this.elevators, 1, "alienElevator");
            var elevator2 = new TSAGame.Elevator(this.game, 736, 188, 92, this.elevators, -1, "alienElevator");
            var elevator3 = new TSAGame.Elevator(this.game, 1696, 480, 160, this.elevators, 1, "alienElevator");
            this.drones = this.game.add.group();
            var drone = new TSAGame.Drone(this.game, 256, 320, 448, this.drones, this.shipLayer);
            var drone2 = new TSAGame.Drone(this.game, 820, 176, 940, this.drones, this.shipLayer);
            var drone3 = new TSAGame.Drone(this.game, 1224, 320, 1344, this.drones, this.shipLayer);
            var drone4 = new TSAGame.Drone(this.game, 2600, 448, 2848, this.drones, this.shipLayer);
            this.drones.setAll("body.immovable", true);
            this.tbots = this.game.add.group();
            var tbot = new TSAGame.TBot(this.game, 150, 404, 290, this.shipLayer, this.tbots, this.player);
            var tbot2 = new TSAGame.TBot(this.game, 1810, 350, 1900, this.shipLayer, this.tbots, this.player);
            var tbot3 = new TSAGame.TBot(this.game, 2656, 352, 2816, this.shipLayer, this.tbots, this.player);
            this.healthBar = new TSAGame.HealthBar(this.game);
            this.Obots = this.game.add.group();
            var obot = new TSAGame.Obot(this.game, 850, 64, 950, this.Obots, this.shipLayer, this.player);
            this.retry = this.game.add.button(750, 12, "retry");
            this.retry.fixedToCamera = true;
            this.retry.onInputDown.add(this.restart, this);
            this.sensors = this.game.add.group();
            var sensor = new TSAGame.Sensor(this.game, 1152, 192, 1376, "", 3, this.shipLayer, this.sensors);
            var sensor2 = new TSAGame.Sensor(this.game, 2304, 256, 416, "", 0, this.shipLayer, this.sensors);
            this.blasts = this.game.add.group();
            for (var i = 0; i < 32; i++) {
                this.blasts.add(new TSAGame.Blast(this.game, 0, 0, this.shipLayer), true);
            }
            this.aliens = this.game.add.group();
            var alien = new TSAGame.Alien(this.game, 410, 400, 524, this.shipLayer, this.aliens);
            var alien2 = new TSAGame.Alien(this.game, 2710, 256, 2784, this.shipLayer, this.aliens);
            this.button1 = new TSAGame.Invis(this.game);
            this.button2 = new TSAGame.Shield(this.game);
            this.bgMusic = this.game.add.audio("second", 0.6, true);
            this.bgMusic.play();
            this.siren = this.game.add.audio("alarm", 1, false);
            this.pause = this.game.add.button(700, 12, "pauseButton");
            this.pause.fixedToCamera = true;
            this.pause.onInputDown.add(this.pauseGame, this);
            this.pause.scale.x = .5;
            this.pause.scale.y = .5;
            this.instructions = this.game.add.sprite(0, 0, "instructions_paused");
            this.instructions.alpha = 0;
            this.instructions.fixedToCamera = true;
            this.resume = this.game.add.image(50, 500, "resume");
            this.resume.fixedToCamera = true;
            this.resume.alpha = 0;
            this.reset = this.game.add.image(400, 500, "reset");
            this.reset.fixedToCamera = true;
            this.reset.alpha = 0;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
        };
        Level2.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.player, this.alerted);
            this.game.physics.arcade.collide(this.shipLayer, this.level2End);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            var awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.overlap(this.blasts, this.player, this.harm);
            this.reset.alpha = 1;
            this.resume.alpha = 0;
            if (this.cryopod.frame == 12) {
                this.level2End.alpha = 1;
                this.game.add.sprite(200, 30, "wull");
                var moveOn = this.game.physics.arcade.collide(this.player, this.level2End);
                if (moveOn) {
                    this.bgMusic.stop();
                    console.log("Congratulations, you beat level2");
                    if (parseInt(localStorage.getItem("clearedLevel")) < 2) {
                        localStorage.setItem("clearedLevel", "2");
                    }
                    this.game.state.start("level3");
                }
            }
            else {
                this.level2End.alpha = 0;
            }
            this.reset.alpha = 0;
            if (awake && this.cryopod.frame == 0)
                this.cryopod.animations.play("will");
            if (this.player.alpha == 1) {
                this.playerLine.setTo(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            }
            else {
                this.playerLine.setTo(0.0, 0, 0, 0);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                this.pauseGame();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.X) && this.button2.visible) {
                this.button2.up();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.C) && this.button1.visible) {
                this.button1.up();
            }
            var alAlert = this.aliens.getAll("isTriggered", true).length > 0;
            var alDrone = this.drones.getAll("frame", 9).length > 0;
            var alObot = this.Obots.getAll("frame", 20).length > 0;
            var alSense = this.sensors.getAll("triggered", true).length > 0;
            if (this.tbots.getAll("frame", 19).length > 0 || alAlert || alDrone || alObot || alSense) {
                this.setOff = true;
                TSAGame.alarmsOn = true;
            }
            if (this.prevSetoff == false && this.setOff == true) {
                this.siren.play();
                this.alarm.callAllExists("setOff", true);
                this.tintI.alpha = 0.1;
                this.timer = this.game.time.create(true);
                this.timer.add(16000, function pancake() {
                    this.tintI.alpha = 0;
                    this.setOff = false;
                    TSAGame.alarmsOn = false;
                }, this);
                this.timer.start();
            }
            this.aliens.setAll("playerX", this.player.right);
            this.aliens.setAll("playerY", this.player.bottom);
            this.tbots.setAll("playerX", this.player.x);
            this.tbots.setAll("playerY", this.player.bottom);
            this.tbots.setAll("player", this.player);
            this.Obots.setAll("playerX", this.player.x);
            this.Obots.setAll("playerY", this.player.bottom);
            this.Obots.setAll("player", this.player);
            this.elevators.setAll("playerX", this.player.x);
            this.elevators.setAll("playerY", this.player.bottom);
            this.elevators.setAll("Obots", this.Obots);
            this.sensors.setAll("drones", this.drones);
            this.sensors.setAll("pl", this.playerLine);
            this.sensors.setAll("blasts", this.blasts);
            this.sensors.setAll("blasts", this.blasts);
            this.drones.setAll("blasts", this.blasts);
            this.Obots.setAll("blasts", this.blasts);
            this.tbots.setAll("blasts", this.blasts);
            this.aliens.setAll("blasts", this.blasts);
            this.prevSetoff = this.setOff;
            this.instructions.alpha = 0;
            this.player.shield = this.button2.shield;
            this.player.invis = this.button1.invis;
            this.healthBar.scale.x = this.player.health * .125;
            this.tbots.callAllExists("updateLine", true, this.playerLine);
            this.aliens.callAllExists("updateLine", true, this.playerLine);
            this.drones.callAllExists("updateLine", true, this.playerLine);
            this.Obots.callAllExists("updateLine", true, this.playerLine);
        };
        Level2.prototype.pauseUpdate = function () {
            this.instructions.alpha = 1;
            TSAGame.pauseU(this, this.resume, this.reset);
        };
        Level2.prototype.pauseGame = function () {
            this.game.paused = true;
        };
        Level2.prototype.alerted = function (player, Alien) {
            Alien.triggered();
        };
        Level2.prototype.harm = function (player, blast) {
            if (!player.shield) {
                player.health -= 50;
            }
            console.log(player.shield);
            blast.kill();
        };
        Level2.prototype.restart = function () {
            this.pauseGame();
            if (window.confirm("Are you sure you want to restart this level?")) {
                this.game.sound.stopAll();
                this.game.state.start("level2");
            }
            var timer2 = this.game.time.create(true);
            timer2.add(1, function pancake2() { this.game.paused = false; }, this);
            timer2.start();
        };
        return Level2;
    }(Phaser.State));
    TSAGame.Level2 = Level2;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            return _super.apply(this, arguments) || this;
        }
        Level3.prototype.create = function () {
            TSAGame.setUp(this, "lvl3");
            this.player = new TSAGame.Player(this.game, 128, 0);
            this.game.camera.follow(this.player);
            this.game.world.resize(4800, 600);
            console.log("hopefully this is the last");
            this.playerLine = new Phaser.Line(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            this.map = this.add.tilemap("map3");
            this.map.addTilesetImage("Level 3 tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.map.setCollision([1, 2, 3]);
            this.healthBar = new TSAGame.HealthBar(this.game);
            this.elevators = this.game.add.group();
            var elevator = new TSAGame.Elevator(this.game, 4352, 528, 400, this.elevators, 1, "alienElevator");
            this.Obots = this.game.add.group();
            var obot = new TSAGame.Obot(this.game, 736, 192, 928, this.Obots, this.shipLayer, this.player);
            var obot2 = new TSAGame.Obot(this.game, 1952, 480, 2112, this.Obots, this.shipLayer, this.player);
            var obot3 = new TSAGame.Obot(this.game, 2624, 416, 2816, this.Obots, this.shipLayer, this.player);
            var obot4 = new TSAGame.Obot(this.game, 3872, 448, 4128, this.Obots, this.shipLayer, this.player);
            this.aliens = this.game.add.group();
            var alien = new TSAGame.Alien(this.game, 10, 128, 320, this.shipLayer, this.aliens);
            var alien2 = new TSAGame.Alien(this.game, 1330, 128, 1380, this.shipLayer, this.aliens);
            var alien3 = new TSAGame.Alien(this.game, 1280, 400, 1330, this.shipLayer, this.aliens);
            var alien4 = new TSAGame.Alien(this.game, 3600, 256, 3680, this.shipLayer, this.aliens);
            var alien5 = new TSAGame.Alien(this.game, 4192, 160, 4288, this.shipLayer, this.aliens);
            var alien5 = new TSAGame.Alien(this.game, 3860, 320, 3934, this.shipLayer, this.aliens);
            this.tbots = this.game.add.group();
            var tbot = new TSAGame.TBot(this.game, 872, 384, 1024, this.shipLayer, this.tbots, this.player);
            var tbot2 = new TSAGame.TBot(this.game, 1430, 160, 1504, this.shipLayer, this.tbots, this.player);
            var tbot3 = new TSAGame.TBot(this.game, 1920, 320, 2176, this.shipLayer, this.tbots, this.player);
            var tbot4 = new TSAGame.TBot(this.game, 2528, 320, 2688, this.shipLayer, this.tbots, this.player);
            var tbot5 = new TSAGame.TBot(this.game, 3220, 400, 3424, this.shipLayer, this.tbots, this.player);
            this.sensors = this.game.add.group();
            var sensor = new TSAGame.Sensor(this.game, 1408, 264, 448, "", 0, this.shipLayer, this.sensors);
            var sensor2 = new TSAGame.Sensor(this.game, 1280, 264, 448, "", 2, this.shipLayer, this.sensors);
            var sensor3 = new TSAGame.Sensor(this.game, 1408, 328, 512, "", 0, this.shipLayer, this.sensors);
            var sensor4 = new TSAGame.Sensor(this.game, 1280, 328, 512, "", 2, this.shipLayer, this.sensors);
            var sensor5 = new TSAGame.Sensor(this.game, 2496, 128, 2816, "", 3, this.shipLayer, this.sensors);
            var sensor6 = new TSAGame.Sensor(this.game, 4000, 64, 4288, "", 3, this.shipLayer, this.sensors);
            this.level3end = this.game.add.sprite(4640, 300, "levelEnd");
            this.game.physics.arcade.enable(this.level3end);
            this.level3end.body.collideWorldBounds = true;
            this.level3end.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level3end.animations.play("turn");
            this.level3end.body.gravity.y = 60;
            this.cryopod = this.game.add.sprite(4704, 416, "cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable = true;
            this.cryopod.animations.add("james", [1, 1, 1, 13, 14, 15, 16, 17], 7);
            this.blasts = this.game.add.group();
            for (var i = 0; i < 32; i++) {
                this.blasts.add(new TSAGame.Blast(this.game, 0, 0, this.shipLayer), true);
            }
            this.button1 = new TSAGame.Invis(this.game);
            this.button2 = new TSAGame.Shield(this.game);
            this.bgMusic = this.game.add.audio("third", 0.6, true);
            this.bgMusic.play();
            this.pause = this.game.add.button(700, 12, "pauseButton");
            this.pause.fixedToCamera = true;
            this.pause.onInputDown.add(this.pauseGame, this);
            this.pause.scale.x = .5;
            this.pause.scale.y = .5;
            this.instructions = this.game.add.sprite(0, 0, "instructions_paused");
            this.instructions.alpha = 0;
            this.instructions.fixedToCamera = true;
            this.resume = this.game.add.image(50, 500, "resume");
            this.resume.fixedToCamera = true;
            this.resume.alpha = 0;
            this.reset = this.game.add.image(400, 500, "reset");
            this.reset.fixedToCamera = true;
            this.reset.alpha = 0;
            this.reset.scale.x = 2;
            this.siren = this.game.add.audio("alarm", 1, false);
            this.tintI = this.game.add.image(0, 0, "Laser");
            this.tintI.alpha = 0;
            this.reset.scale.y = 2;
            this.retry = this.game.add.button(750, 12, "retry");
            this.retry.fixedToCamera = true;
            this.retry.onInputDown.add(this.restart, this);
        };
        Level3.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.overlap(this.blasts, this.player, this.harm);
            this.game.physics.arcade.collide(this.aliens, this.player, this.alerted);
            this.game.physics.arcade.collide(this.player, this.elevators);
            this.game.physics.arcade.collide(this.shipLayer, this.level3end);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            var awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            if (this.player.alpha == 1) {
                this.playerLine.setTo(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            }
            else {
                this.playerLine.setTo(0.0, 0, 0, 0);
            }
            if (awake && this.cryopod.frame == 0)
                this.cryopod.animations.play("james");
            var alAlert = this.aliens.getAll("isTriggered", true).length > 0;
            var alObot = this.Obots.getAll("frame", 20).length > 0;
            var alSense = this.sensors.getAll("triggered", true).length > 0;
            if (this.tbots.getAll("frame", 19).length > 0 || alAlert || alObot || alSense) {
                this.setOff = true;
                TSAGame.alarmsOn = true;
            }
            if (this.prevSetoff == false && this.setOff == true) {
                this.siren.play();
                this.alarm.callAllExists("setOff", true);
                this.tintI.alpha = 0.1;
                this.timer = this.game.time.create(true);
                this.timer.add(16000, function pancake() {
                    this.tintI.alpha = 0;
                    this.setOff = false;
                    TSAGame.alarmsOn = false;
                }, this);
                this.timer.start();
            }
            this.resume.alpha = 0;
            this.reset.alpha = 0;
            this.instructions.alpha = 0;
            if (this.cryopod.frame == 17) {
                this.level3end.alpha = 1;
                var moveOn = this.game.physics.arcade.collide(this.player, this.level3end);
                if (moveOn) {
                    this.bgMusic.stop();
                    console.log("Congratulations, you beat the game");
                    if (parseInt(localStorage.getItem("clearedLevel")) < 3) {
                        localStorage.setItem("clearedLevel", "3");
                    }
                    this.game.state.start("WIN");
                }
            }
            else {
                this.level3end.alpha = 0;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                this.pauseGame();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.X) && this.button2.visible) {
                this.button2.up();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.C) && this.button1.visible) {
                this.button1.up();
            }
            this.aliens.setAll("playerX", this.player.right);
            this.aliens.setAll("playerY", this.player.bottom);
            this.tbots.setAll("playerX", this.player.x);
            this.tbots.setAll("playerY", this.player.bottom);
            this.tbots.setAll("player", this.player);
            this.Obots.setAll("playerX", this.player.x);
            this.Obots.setAll("playerY", this.player.bottom);
            this.Obots.setAll("player", this.player);
            this.elevators.setAll("playerX", this.player.x);
            this.elevators.setAll("playerY", this.player.bottom);
            this.elevators.setAll("Obots", this.Obots);
            this.sensors.setAll("pl", this.playerLine);
            this.sensors.setAll("blasts", this.blasts);
            this.Obots.setAll("blasts", this.blasts);
            this.tbots.setAll("blasts", this.blasts);
            this.aliens.setAll("blasts", this.blasts);
            this.player.shield = this.button2.shield;
            this.player.invis = this.button1.invis;
            this.healthBar.scale.x = this.player.health * .125;
            this.tbots.callAllExists("updateLine", true, this.playerLine);
            this.aliens.callAllExists("updateLine", true, this.playerLine);
            this.Obots.callAllExists("updateLine", true, this.playerLine);
        };
        Level3.prototype.pauseUpdate = function () {
            TSAGame.pauseU(this, this.resume, this.reset);
            this.instructions.alpha = 1;
        };
        Level3.prototype.pauseGame = function () {
            this.game.paused = true;
        };
        Level3.prototype.restart = function () {
            this.game.sound.stopAll();
            this.game.state.start("level3");
        };
        Level3.prototype.alerted = function (player, Alien) {
            Alien.triggered();
        };
        Level3.prototype.harm = function (player, blast) {
            if (!player.shield) {
                player.health -= 40;
            }
            blast.kill();
        };
        return Level3;
    }(Phaser.State));
    TSAGame.Level3 = Level3;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    function setUp(state, bg) {
        state.game.physics.startSystem(Phaser.Physics.ARCADE);
        state.game.world.resize(4000, 600);
        state.game.time.advancedTiming = true;
        state.game.add.sprite(0, 0, bg);
        TSAGame.alarmsOn = false;
    }
    TSAGame.setUp = setUp;
    function pauseU(state, resume, reset) {
        resume.alpha = 1;
        reset.alpha = 1;
        var mx = state.game.input.mousePointer.worldX;
        var my = state.game.input.mousePointer.worldY;
        if (mx >= resume.left && mx <= resume.right && my >= resume.top && my <= resume.bottom && state.game.input.activePointer.leftButton.isDown) {
            state.game.paused = false;
        }
        if (mx >= reset.left && mx <= reset.right && my >= reset.top && my <= reset.bottom && state.game.input.activePointer.leftButton.isDown) {
            state.game.sound.stopAll();
            state.game.state.start("titleScreen", true, false);
            state.game.paused = false;
        }
    }
    TSAGame.pauseU = pauseU;
})(TSAGame || (TSAGame = {}));
//# sourceMappingURL=app.js.map