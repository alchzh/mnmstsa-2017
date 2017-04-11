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
            this.load.image("preloadBar", "./assets/startbar.png");
            this.load.image("preloadBarBg", "./assets/prloadBar.png");
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            console.log(this.scale.width);
            this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
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
        function Alien(game, x, y, x2, layer, group, elevators) {
            if (elevators === void 0) { elevators = [-1]; }
            var _this = _super.call(this, game, x, y, 'alien', 0) || this;
            _this.anchor.setTo(0.5, 0);
            _this.game.physics.arcade.enableBody(_this);
            _this.body.gravity.y = 400;
            _this.originX = x;
            _this.x2 = x2;
            _this.stuckX = 0;
            game.add.existing(_this);
            _this.direction = -1;
            _this.suspicious = false;
            _this.blasts = _this.game.add.group();
            _this.laserEnd = 3200;
            _this.laserEnd0 = 3200;
            _this.disrupted = false;
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.laser2 = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.isTriggered = false;
            _this.glass = false;
            _this.layer = layer;
            _this.laserEnd1 = -1;
            _this.laserEnd2 = -1;
            _this.laserEnd3 = -1;
            _this.prevEtouch = false;
            _this.elevators = undefined;
            _this.prevGtouch = false;
            _this.prevX;
            _this.possibleElevators = elevators;
            _this.elevNum = -1;
            _this.laserEnd4 = -1;
            _this.laserEndY = _this.y;
            _this.notSeen = 0;
            _this.troubleShoot = 0;
            _this.failure = 0;
            group.add(_this);
            _this.playerS = _this.game.add.sprite(_this.playerX, _this.playerY, "laser");
            _this.playerS.alpha = 0;
            _this.animations.add('move', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10.5, true);
            _this.animations.add("stop", [0, 0, 0, 0, 1], 3);
            _this.animations.add('disrupt', [15, 16, 17, 18, 19, 20, 21, 22], 7);
            _this.animations.add('grab', [23, 24, 25, 26], 5);
            _this.animations.add('troubleShoot', [26, 26, 27, 26, 27, 26, 26, 27, 26, 27, 26], 4);
            _this.animations.add('triggered', [28, 29, 30, 31, 29, 30, 31, 29, 30, 31, 14], 7);
            _this.animations.add('suspicious', [14, 0], 2);
            _this.suspicion = _this.addChild((game.make.image(-5, -37, "suspicion")));
            _this.arm = _this.addChild((game.make.image(-11, 13, 'arm')));
            _this.arm.alpha = 0;
            console.log(_this.body);
            _this.playerY = 0;
            _this.playerX = 0;
            _this.animations.play("move");
            _this.blastSound = _this.game.add.audio("blast", 0.2, false);
            return _this;
        }
        Alien.prototype.updateLine = function (playerLine) {
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 15) {
                if (this.direction === -1) {
                    if (this.laserEnd1 == -1 || this.laserEndY != this.y) {
                        this.laser.setTo(this.left + 8, this.y + 5, this.game.world.width, this.y + 5);
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[i].index != -1 && realTile === -1) {
                                realTile = i;
                            }
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd = tilehits[realTile].worldX;
                        }
                        else {
                            this.laserEnd = this.game.world.width;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd1 = this.laserEnd;
                    }
                    else {
                        this.laserEnd = this.laserEnd1;
                    }
                    if (this.laserEnd3 == -1 || this.laserEndY != this.y) {
                        this.laser2.setTo(this.left + 8, this.y + 40, this.game.world.width, this.y + 40);
                        var tilehits = this.layer.getRayCastTiles(this.laser2, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[i].index != -1 && realTile === -1) {
                                realTile = i;
                            }
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd0 = tilehits[realTile].worldX;
                        }
                        else {
                            this.laserEnd0 = this.game.world.width;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd3 = this.laserEnd0;
                    }
                    else {
                        this.laserEnd0 = this.laserEnd3;
                    }
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                    this.laser2.setTo(this.left + 8, this.y + 40, this.laserEnd0, this.y + 40);
                }
                else if (this.direction === 1) {
                    if (this.laserEnd2 == -1 || this.laserEndY != this.y) {
                        this.laser.setTo(this.left, this.y + 5, 0, this.y + 5);
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile === -1)
                                realTile = tilehits.length - 1 - i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd = tilehits[realTile].worldX + 32;
                        }
                        else {
                            this.laserEnd = 0;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd2 = this.laserEnd;
                    }
                    else {
                        this.laserEnd = this.laserEnd2;
                    }
                    if (this.laserEnd4 == -1 || this.laserEndY != this.y) {
                        this.laser2.setTo(this.left, this.y + 40, 0, this.y + 40);
                        var tilehits = this.layer.getRayCastTiles(this.laser2, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile === -1)
                                realTile = tilehits.length - 1 - i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd0 = tilehits[realTile].worldX + 32;
                        }
                        else {
                            this.laserEnd0 = 0;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd4 = this.laserEnd0;
                    }
                    else {
                        this.laserEnd0 = this.laserEnd4;
                    }
                    this.laser.setTo(this.left, this.y + 5, this.laserEnd, this.y + 5);
                    this.laser2.setTo(this.left, this.y + 40, this.laserEnd0, this.y + 40);
                }
                var point = playerLine.intersects(this.laser, true);
                if (!point)
                    point = playerLine.intersects(this.laser2, true);
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
                this.laser2.setTo(0, 0, 0, 0);
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
            if (this.animations.frame < 14 && this.animations.frame > 0 && !this.glass) {
                if (!this.suspicious)
                    this.body.velocity.x = 65;
                else
                    this.body.velocity.x = 140;
            }
            if (this.direction === -1 && !this.prevGtouch) {
                if (this.animations.frame < 14 && this.animations.currentAnim.name != "stop") {
                    this.animations.play("move", 10.5);
                    this.scale.x = 1;
                }
                if ((this.x >= this.x2 || this.stuckX > 6) && this.frame < 14) {
                    this.animations.play('stop');
                    if (this.animations.frame == 1) {
                        this.direction = 1;
                        this.scale.x = -1;
                        this.animations.play("move", 10.5);
                    }
                }
            }
            else if (this.direction === 1 && !this.prevGtouch) {
                if (this.animations.frame < 14 && this.animations.currentAnim.name != "stop") {
                    this.animations.play("move", 10.5);
                    this.body.velocity.x *= -1;
                }
                if ((this.x <= this.originX || this.stuckX > 6) && this.frame < 14) {
                    this.animations.play('stop');
                    if (this.animations.frame == 1) {
                        this.direction = -1;
                        this.scale.x = 1;
                        this.animations.play("move", 10.5);
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
                this.animations.play("move", 17);
            else if (this.isTriggered && this.frame == 14) {
                this.suspicious = true;
                this.animations.play("move", 17);
            }
            if (this.suspicious) {
                this.prevSus += 1 * dTime;
                this.suspicion.alpha = 1;
            }
            else {
                this.suspicion.alpha = 0;
                this.prevSus = 0;
            }
            if (this.prevSus >= 600) {
                this.animations.play("move", 10.5);
                this.suspicious = false;
                this.prevSus = 0;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z) && this.playerY == this.bottom) {
                if (!this.disrupted && this.animations.frame < 15) {
                    if (this.direction == -1 && this.left - this.playerX <= 60 && this.left - this.playerX >= 0) {
                        this.disrupt();
                    }
                    if (this.direction == 1 && this.playerX - 40 - this.right <= 60 && this.playerX - 40 - this.right >= 0) {
                        this.disrupt();
                    }
                }
            }
            if (this.prevSpot >= 60 || (this.notSeen >= 50 && this.prevSpot > 0)) {
                this.triggered();
            }
            if (this.elevNum == -1) {
                this.body.gravity.y = 400;
                this.prevGtouch = false;
                this.prevEtouch = false;
                if (this.body.velocity.y < 0)
                    this.body.velocity.y = 0;
                if (this.possibleElevators[0] !== -1) {
                    for (var i = 0; i < this.possibleElevators.length; i++) {
                        this.game.physics.arcade.collide(this, this.elevators.children[this.possibleElevators[i]], this.elevT);
                    }
                }
            }
            else {
                var elemavators = this.elevators.children[this.elevNum];
                var glasses = this.elevators.children[this.elevNum + 1];
                var g = this.game.physics.arcade.collide(this, glasses);
                this.glass = g;
                this.bottom = elemavators.bottom - 9;
                this.body.gravity.y = 0;
                if (g) {
                    if (elemavators.frame === 0 && this.direction === -1) {
                        if (!elemavators.moving) {
                            if (!this.prevGtouch) {
                                elemavators.move();
                                this.prevGtouch = true;
                                this.x += 2;
                                this.animations.play("stop");
                                this.animations.frame = 0;
                            }
                            else {
                                this.frame = 0;
                                this.direction = 1;
                                this.prevGtouch = false;
                                this.scale.x = -1;
                                this.animations.play("move", 10.5);
                                this.body.velocity.y = 0;
                                this.x -= 10;
                            }
                        }
                        else {
                            this.prevGtouch = true;
                        }
                    }
                    if (elemavators.frame === 1 && this.direction === 1) {
                        console.log(this.prevGtouch);
                        if (!elemavators.moving) {
                            if (!this.prevGtouch) {
                                elemavators.move();
                                this.prevGtouch = true;
                                this.x -= 2;
                                this.animations.play("stop");
                                this.animations.frame = 0;
                            }
                            else {
                                this.frame = 0;
                                this.direction = -1;
                                this.prevGtouch = false;
                                this.scale.x = 1;
                                this.animations.play("move", 10.5);
                                this.body.velocity.y = 0;
                                this.x += 10;
                            }
                        }
                        else {
                            this.prevGtouch = true;
                        }
                    }
                }
                else if (!this.game.physics.arcade.collide(this, elemavators)) {
                    this.elevNum = -1;
                }
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
            this.prevX = this.x;
        };
        Alien.prototype.disrupt = function () {
            this.disrupted = true;
            this.animations.play("disrupt");
        };
        Alien.prototype.triggered = function () {
            if (this.frame < 15) {
                this.animations.play("triggered");
                this.blastSound.play();
                this.blasts.getFirstDead().addIn(this.x, this.y + 12, this.scale.x, 0, 0);
                this.arm.rotation = 0;
            }
        };
        Alien.prototype.elevT = function (me, elevators) {
            if (me.body.touching.up && elevators.moving) {
                console.log("hei");
                elevators.spriteStuck = true;
            }
            else if (me.y - elevators.y < -5) {
                if (elevators.key !== "Laser") {
                    me.elevNum = elevators.myNumber;
                }
                this.prevEtouch = true;
            }
        };
        return Alien;
    }(Phaser.Sprite));
    TSAGame.Alien = Alien;
    var Alien2 = (function (_super) {
        __extends(Alien2, _super);
        function Alien2(game, x, y, layer, group) {
            var _this = _super.call(this, game, x, y, 'alien2', 0) || this;
            game.add.existing(_this);
            _this.caught = false;
            _this.star = new TSAGame.ScienceStar(game, x, y, layer);
            game.add.existing(_this.star);
            _this.spawning = false;
            _this.game.physics.arcade.enableBody(_this);
            _this.game.physics.arcade.enableBody(_this.star);
            _this.body.gravity.y = 400;
            _this.animations.add('move', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10.5, true);
            _this.animations.add("spawn", [0, 1, 2, 3, 4], 6);
            _this.spawned = false;
            _this.body.immovable = true;
            if (group != null)
                group.add(_this);
            return _this;
        }
        Alien2.prototype.triggered = function () {
            this.caught = true;
        };
        Alien2.prototype.update = function () {
            this.caught = false;
            if (this.spawning && this.frame == 4) {
                this.star.attached = false;
                this.frame = 0;
                this.loadTexture("alien2", 0);
                this.spawning = false;
                this.star.launch(100, this.y + 20, 189);
            }
            if (this.star.attached) {
                this.star.x = this.x + 28;
                this.star.y = this.y + 14;
            }
            if (this.star.crash) {
                this.spawned = true;
                this.animations.play('move');
                this.body.velocity.x = 60;
            }
        };
        Alien2.prototype.leave1 = function () {
            this.loadTexture("alien2v2", 0);
            this.spawning = true;
            this.animations.play("spawn");
        };
        return Alien2;
    }(Phaser.Sprite));
    TSAGame.Alien2 = Alien2;
    var Drone = (function (_super) {
        __extends(Drone, _super);
        function Drone(game, x, y, x2, group, layer) {
            var _this = _super.call(this, game, x, y, 'drone2', 0) || this;
            _this.anchor.setTo(0.5, 0);
            _this.game.physics.arcade.enableBody(_this);
            _this.rate = 3000;
            game.add.existing(_this);
            _this.globalTime = game.time.create(false);
            _this.globalTime.add(Phaser.Timer.SECOND * 4, uselessfunction, _this);
            _this.globalTime.start(0);
            _this.myNumber = group.children.length;
            _this.originX = _this.x;
            group.add(_this);
            _this.beenTriggered = false;
            _this.x2 = x2;
            _this.seesing = false;
            _this.cooldown;
            _this.grabLeft = false;
            _this.grabRight = false;
            _this.trampoline = false;
            _this.angry = false;
            _this.laserEnd1 = -1;
            _this.laserEnd2 = -1;
            _this.laserEndY = y + 1;
            _this.laserEnd = 3200;
            if (x2 > x) {
                _this.reverse = false;
                _this.direction = -1;
            }
            else {
                _this.x2 = x;
                _this.originX = x2;
                _this.direction = 1;
            }
            _this.blasts = game.add.group();
            _this.animations.add('turn', [1, 2, 3, 4, 5, 6, 7, 0], 7.5, false);
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.myLaser.scale.y = 0.125;
            _this.layer = layer;
            _this.blastSound = _this.game.add.audio("blast", 0.2, false);
            return _this;
        }
        Drone.prototype.removedd = function () {
            this.myLaser.visible = false;
            this.kill();
        };
        Drone.prototype.updateLine = function (playerLine) {
            this.seesing = false;
            if (this.animations.frame === 0 || (this.animations.frame === 9 && !this.angry)) {
                if (this.direction === -1) {
                    if (this.laserEnd1 == -1 || this.laserEndY != this.y) {
                        this.laser.setTo(this.left, this.y + 19, this.game.camera.bounds.right, this.y + 19);
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[i].index != -1 && realTile === -1)
                                realTile = i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd = tilehits[realTile].worldX;
                        }
                        else {
                            this.laserEnd = this.game.camera.bounds.right;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd1 = this.laserEnd;
                    }
                    else {
                        this.laserEnd = this.laserEnd1;
                    }
                    this.laser.setTo(this.left, this.y + 19, this.laserEnd, this.y + 19);
                }
                else if (this.direction === 1) {
                    if (this.laserEnd2 == -1 || this.laserEndY != this.y) {
                        this.laser.setTo(this.left, this.y + 19, 0, this.y + 19);
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile === -1)
                                realTile = tilehits.length - 1 - i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd = tilehits[realTile].worldX + 32;
                        }
                        else {
                            this.laserEnd = 0;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd2 = this.laserEnd;
                    }
                    else {
                        this.laserEnd = this.laserEnd2;
                    }
                    this.laser.setTo(this.left, this.y + 19, this.laserEnd, this.y + 19);
                }
                if (this.animations.frame === 0 || (this.animations.frame === 9 && !this.angry)) {
                    var point = playerLine.intersects(this.laser, true);
                    if (point != null) {
                        this.seesing = true;
                        this.angry = true;
                        this.beenTriggered = true;
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
            if (this.angry) {
                this.nine += 1 * dTime;
            }
            else {
                this.nine = 0;
            }
            if (this.nine >= 1) {
                if (this.blasts != null) {
                    this.nine = -44;
                    this.blastSound.play();
                    this.blasts.getFirstDead().addIn(this.x - (24 * this.scale.x), 20 + this.y, -this.scale.x, 0, 0);
                    this.angry = false;
                }
            }
            if (this.beenTriggered && this.frame == 0)
                this.frame = 9;
            this.trampoline = this.body.touching.up;
            this.grabLeft = this.body.touching.left;
            this.grabRight = this.body.touching.right;
            if (this.grabLeft)
                console.log("yeeee");
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            var time = this.previousTime - this.globalTime.ms;
            this.body.velocity.x = 0;
            if (this.direction === -1) {
                this.scale.x = -1;
                if (this.animations.frame === 0 || (this.animations.frame === 9 && !this.angry)) {
                    this.body.velocity.x = 75 * dTime;
                }
                else {
                    this.laser = new Phaser.Line(0, 0, 0, 0);
                }
                if (this.x >= this.x2) {
                    this.direction = 1;
                    this.loadTexture("drone");
                    this.animations.play('turn');
                }
            }
            else if (this.direction === 1) {
                this.scale.x = 1;
                if (this.animations.frame === 0 || (this.animations.frame === 9 && !this.angry)) {
                    this.body.velocity.x = -75 * dTime;
                }
                else {
                    this.laser = new Phaser.Line(0, 0, 0, 0);
                }
                if (this.x <= this.originX) {
                    this.direction = -1;
                    this.loadTexture("drone2");
                    this.animations.play('turn');
                }
            }
            if (TSAGame.alarmsOn)
                this.body.velocity.x *= 1.75;
            this.previousTime = this.globalTime.ms;
        };
        return Drone;
    }(Phaser.Sprite));
    TSAGame.Drone = Drone;
    var TBot = (function (_super) {
        __extends(TBot, _super);
        function TBot(game, x, y, x2, layer, group, player) {
            var _this = _super.call(this, game, x, y, 'tbot2', 0) || this;
            game.add.existing(_this);
            game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            _this.body.gravity.y = 400;
            group.add(_this);
            _this.seesing = false;
            _this.angry = 0;
            _this.originX = x;
            _this.x2 = x2;
            _this.direction = -1;
            _this.shutDown = false;
            _this.playerX = player.x;
            _this.player = player;
            _this.within = true;
            _this.playerY = player.y;
            _this.laserEnd = 3200;
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.myLaser.scale.y = 0.125;
            _this.laserEnd1 = -1;
            _this.laserEnd2 = -1;
            _this.laserEndY = _this.y;
            _this.stuckX = 0;
            _this.prevX = x;
            _this.animations.add('crash', [23, 22, 21, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 0], 6, true);
            _this.animations.add('reboot', [20, 21, 22, 23, 0], 6, true);
            _this.animations.add('move', [0, 1, 2, 3, 4, 5], 12, true);
            _this.animations.add('angry', [14], 10, false);
            _this.animations.add('alerted', [15, 16, 17, 18, 19], 6, false);
            _this.animations.add('turn', [6, 7, 8, 9, 10, 11, 12, 13], 20, false);
            _this.animations.add('turnBack', [12, 11, 10, 9, 8, 7, 6, 5, 5], 20, false);
            _this.layer = layer;
            _this.blasts = _this.game.add.group();
            _this.deactivateS = _this.game.add.audio("deactivate", 0.2, false);
            _this.blastSound = _this.game.add.audio("blast", 0.2, false);
            return _this;
        }
        TBot.prototype.updateLine = function (playerLine) {
            this.seesing = false;
            if (this.frame == 0 && this.animations.currentAnim.name == "crash")
                this.animations.play("reboot");
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 6) {
                if (this.direction === -1) {
                    this.within = this.game.camera.x + 800 > this.x;
                    if (this.within) {
                        if (this.laserEnd1 == -1 || this.laserEndY != this.y) {
                            this.laser.setTo(this.left - 8, this.y + 5, this.game.world.width, this.y + 5);
                            var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                            var realTile = -1;
                            for (var i = 0; i < tilehits.length; i++) {
                                if (tilehits[i].index != -1 && realTile === -1) {
                                    realTile = i;
                                }
                            }
                            if (tilehits.length > 1 && realTile != -1) {
                                this.laserEnd = tilehits[realTile].worldX;
                            }
                            else {
                                this.laserEnd = this.game.world.width;
                            }
                            this.laserEndY = this.y;
                            this.laserEnd1 = this.laserEnd;
                        }
                        else {
                            this.laserEnd = this.laserEnd1;
                        }
                        this.laser.setTo(this.left - 8, this.y + 5, this.laserEnd, this.y + 5);
                    }
                }
                else if (this.direction === 1) {
                    this.within = this.game.camera.x < this.x;
                    if (this.within) {
                        if (this.laserEnd2 == -1 || this.laserEndY != this.y) {
                            this.laser.setTo(this.left + 8, this.y + 5, 0, this.y + 5);
                            var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                            var realTile = -1;
                            for (var i = 0; i < tilehits.length; i++) {
                                if (tilehits[tilehits.length - 1 - i].index != -1 && realTile === -1)
                                    realTile = tilehits.length - 1 - i;
                            }
                            if (tilehits.length > 1 && realTile != -1) {
                                this.laserEnd = tilehits[realTile].worldX + 32;
                            }
                            else {
                                this.laserEnd = 0;
                            }
                            this.laserEndY = this.y;
                            this.laserEnd2 = this.laserEnd;
                        }
                        else {
                            this.laserEnd = this.laserEnd2;
                        }
                        this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                    }
                }
                var point = playerLine.intersects(this.laser, true);
                if (point != null) {
                    this.seesing = true;
                    this.animations.play('angry');
                }
            }
            else {
                this.laser.setTo(0, 0, 0, 0);
            }
            if (this.animations.frame <= 2) {
                this.myLaser.top -= 100;
            }
            else if (this.animations.frame >= 3 && this.animations.frame <= 5) {
                this.myLaser.top += 100;
            }
        };
        TBot.prototype.update = function () {
            if (!this.within)
                this.laser.setTo(0, 0, 0, 0);
            this.myLaser.scale.x = this.laser.length * 0.125;
            this.myLaser.left = this.laser.x;
            this.myLaser.top = this.laser.y;
            if (this.animations.frame == 0 || this.animations.frame == 1 || this.animations.frame == 2) {
                this.myLaser.top -= 1;
            }
            if (this.animations.frame < 20) {
                this.game.physics.arcade.collide(this, this.player);
            }
            this.body.velocity.x = 0;
            if (this.frame == 19) {
                this.blastSound.play();
                this.blasts.getFirstDead().addIn(this.x + (24 * this.scale.x), this.y + 12, -this.scale.x, 0, 0);
                this.angry++;
                this.animations.stop();
                this.frame = 14;
                if (this.angry >= 2)
                    this.animations.play("move");
                else
                    this.animations.play("alerted");
            }
            else if (this.animations.currentAnim.name != "alerted") {
                this.angry = 0;
            }
            if (this.frame == 14)
                this.animations.play("alerted");
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z) && this.playerY == this.bottom) {
                if (!this.shutDown) {
                    if ((this.direction == -1 || this.animations.currentAnim.name == "turnBack" || this.animations.currentAnim.name == "turn") && this.x - this.playerX - 16 <= 40 && this.x - this.playerX - 16 >= 0) {
                        this["break"]();
                    }
                    if ((this.direction == -1 || this.animations.currentAnim.name == "turn" || this.animations.currentAnim.name == "turnBack") && this.playerX - 16 - this.x <= 40 && this.playerX - 16 - this.x >= 0) {
                        this["break"]();
                    }
                }
            }
            if (this.direction === -1 && this.animations.frame < 20) {
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
                    this.loadTexture("tbot");
                    this.animations.play('turnBack');
                    this.direction = 1;
                }
            }
            else if (this.direction === 1 && this.animations.frame < 20) {
                if (this.animations.frame < 6) {
                    this.animations.play("move");
                    this.scale.x = 1;
                    this.body.velocity.x = -50;
                }
                if (this.x < this.originX || this.stuckX > 150) {
                    this.loadTexture("tbot");
                    this.animations.play('turn');
                }
                if (this.animations.frame === 13) {
                    this.frame = 12;
                    this.scale.x = -1;
                    this.loadTexture("tbot2");
                    this.animations.play('turnBack');
                    this.direction = -1;
                }
            }
            if (TSAGame.alarmsOn)
                this.body.velocity.x *= 1.75;
            if (this.prevX == this.x && this.animations.frame < 6) {
                this.stuckX++;
            }
            else {
                this.stuckX = 0;
            }
            this.prevX = this.x;
            if (this.x <= this.originX)
                this.x = this.originX;
            else if (this.x >= this.x2)
                this.x = this.x2;
        };
        TBot.prototype["break"] = function () {
            if (TSAGame.canLose120) {
                TSAGame.lose120 = true;
                this.deactivateS.play();
                this.shutDown = true;
                this.animations.stop();
                this.animations.frame = 20;
                this.animations.play("crash");
            }
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
            _this.seesing = false;
            group.add(_this);
            console.log("2r");
            _this.laserEnd1 = -1;
            _this.laserEnd2 = -1;
            _this.laserEndY = _this.y;
            _this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
            _this.animations.add('moveBack', [13, 12, 11, 10, 9, 0], 7.5);
            _this.animations.add('moveForward', [13, 12, 11, 10, 9, 0], 7.5);
            _this.animations.add('alert', [14, 15, 16, 24], 11);
            _this.animations.add('sad', [24, 24, 24, 0], 5);
            _this.animations.add('crash', [23, 22, 21, 20, 19, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 24], 6);
            _this.animations.add('boot up', [18, 19, 20, 21, 22, 23, 0], 6.5);
            _this.laserEnd = 3200;
            _this.laser = new Phaser.Line(0, _this.y, 200, _this.y);
            _this.myLaser = _this.game.add.image(_this.x, _this.y, 'Laser');
            _this.myLaser.scale.x = _this.laser.length * 0.125;
            _this.myLaser.scale.y = 0.125;
            _this.body.offset = new Phaser.Point(12, 0);
            _this.body.width = 12;
            _this.layer = layer;
            _this.deactivateS = _this.game.add.audio("deactivate", 0.2, false);
            _this.blastSound = _this.game.add.audio("blast", 0.2, false);
            return _this;
        }
        Obot.prototype.updateLine = function (playerLine, map) {
            this.seesing = false;
            if ((this.body.blocked.down || this.body.touching.down) && this.animations.frame < 8) {
                if (this.direction === -1) {
                    if (this.laserEnd1 == -1 || this.laserEndY != this.y) {
                        this.laser.setTo(this.right - 10, this.y + 5, this.game.world.width, this.y + 5);
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[i].index != -1 && realTile === -1) {
                                realTile = i;
                            }
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd = tilehits[realTile].worldX;
                        }
                        else {
                            this.laserEnd = this.game.world.width;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd1 = this.laserEnd;
                    }
                    else {
                        this.laserEnd = this.laserEnd1;
                    }
                    this.laser.setTo(this.right - 10, this.y + 5, this.laserEnd, this.y + 5);
                }
                else if (this.direction === 1) {
                    if (this.laserEnd2 == -1 || this.laserEndY != this.y) {
                        this.laser.setTo(this.left - 26, this.y + 5, 0, this.y + 5);
                        var tilehits = this.layer.getRayCastTiles(this.laser, 4, false, false);
                        var realTile = -1;
                        for (var i = 0; i < tilehits.length; i++) {
                            if (tilehits[tilehits.length - 1 - i].index != -1 && realTile === -1)
                                realTile = tilehits.length - 1 - i;
                        }
                        if (tilehits.length > 1 && realTile != -1) {
                            this.laserEnd = tilehits[realTile].worldX + 32;
                        }
                        else {
                            this.laserEnd = 0;
                        }
                        this.laserEndY = this.y;
                        this.laserEnd2 = this.laserEnd;
                    }
                    else {
                        this.laserEnd = this.laserEnd2;
                    }
                    this.laser.setTo(this.left - 26, this.y + 5, this.laserEnd, this.y + 5);
                }
                var point = playerLine.intersects(this.laser, true);
                if (point != null) {
                    this.seesing = true;
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
            if (this.frame == 24 && this.animations.currentAnim.name == "alert") {
                this.blastSound.play();
                this.blasts.getFirstDead().addIn(this.x + (24 * this.scale.x), this.y + 18, this.direction * -1, 0, 0);
                this.animations.play("sad");
            }
            if (this.animations.frame < 14) {
                this.game.physics.arcade.collide(this, this.player);
            }
            if (this.frame == 24 && this.animations.currentAnim.name == "crash")
                this.animations.play("boot up");
            if (TSAGame.alarmsOn)
                this.body.velocity.x *= 1.75;
            if (this.animations.frame < 8)
                this.animations.play('move');
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction === -1) {
                this.scale.x = 1;
                if (this.animations.frame < 8) {
                    this.body.velocity.x = 85 * dTime;
                }
                else {
                    this.laser.setTo(0, 0, 0, 0);
                }
                if (this.x >= this.x2 || this.stuckX > 150) {
                    this.animations.stop();
                    this.loadTexture("obot23");
                    this.animations.play('moveForward');
                    this.direction = 1;
                }
            }
            else if (this.direction === 1) {
                this.scale.x = -1;
                if (this.animations.frame < 8) {
                    this.body.velocity.x = -85 * dTime;
                }
                else {
                    this.laser.setTo(0, 0, 0, 0);
                }
                if (this.x <= this.originX || this.stuckX > 150) {
                    this.animations.stop();
                    this.loadTexture("obot");
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
                    if ((this.direction == -1 || this.animations.currentAnim.name == "moveForward" || this.animations.currentAnim.name == "moveBack") && this.x - this.playerX - 16 <= 30 && this.x - this.playerX - 16 >= -5) {
                        this["break"]();
                    }
                    if ((this.direction == 1 || this.animations.currentAnim.name == "moveBack" || this.animations.currentAnim.name == "moveForward") && this.playerX - 16 - this.x <= 30 && this.playerX - 16 - this.x >= -5) {
                        this["break"]();
                    }
                }
            }
            this.previousTime = this.globalTime.seconds;
        };
        Obot.prototype["break"] = function () {
            if (TSAGame.canLose120) {
                TSAGame.lose120 = true;
                this.shutDown = true;
                this.deactivateS.play();
                this.animations.play("crash");
            }
        };
        return Obot;
    }(Phaser.Sprite));
    TSAGame.Obot = Obot;
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
            _this.state.add("intro", TSAGame.cutScenes, false);
            _this.state.add("Credits", TSAGame.Credits, false);
            _this.state.add("level1", TSAGame.Level1, false);
            _this.state.add("level2", TSAGame.Level2, false);
            _this.state.add("level3", TSAGame.Level3, false);
            _this.state.add("titleScreen", TSAGame.titleScreen, false);
            _this.state.add("levelSelect", TSAGame.LevelSelect, false);
            _this.state.add("WIN", TSAGame.Win, false);
            _this.state.add("playerDeath", TSAGame.PlayerDeath, false);
            _this.state.start("Boot");
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
window.onblur = function () {
    if (window['lgame'].state.current.startsWith("level")) {
        window['lgame'].paused = true;
    }
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
            _this.myNumber = group.children.length;
            _this.glass.scale.y = 6.4444;
            game.add.existing(_this);
            _this.moving = false;
            _this.spriteStuck = false;
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
            if (scale == 1) {
                if (_this.reverse)
                    _this.callBack = new Phaser.Sprite(game, x + 40, y + 14, type + "CallBack");
                else
                    _this.callBack = new Phaser.Sprite(game, x + 40, y2 + 16, type + "CallBack");
            }
            else {
                if (_this.reverse)
                    _this.callBack = new Phaser.Sprite(game, x + 26, y + 14, type + "CallBack");
                else
                    _this.callBack = new Phaser.Sprite(game, x + 26, y2 + 16, type + "CallBack");
                _this.callBack.scale.x *= -1;
            }
            _this.callBack.maxHealth = 500;
            _this.callBack.health = 420;
            group.add(_this);
            group.add(_this.glass);
            group.add(_this.callBack);
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
            if (!x && this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
                var cBack = this.callBack;
                if (this.playerX - cBack.x < 15 && this.playerX - cBack.x > -5 && this.playerY - cBack.y > 5 && this.playerY - cBack.y < 60) {
                    x = true;
                }
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
            if (this.spriteStuck)
                this.pauseMovement = true;
            if (this.frame == 0)
                this.glass.x = this.x + 46;
            if (this.frame == 1)
                this.glass.x = this.x;
            this.glass.y = this.y;
            if (this.pauseMovement == true) {
                this.body.velocity.y = 0;
            }
            else if (this.moving && this.body.velocity.y == 0) {
                if (this.direction == -1) {
                    this.body.velocity.y = 120;
                }
                if (this.direction == 1) {
                    console.log("[][][]");
                    this.body.velocity.y = -120;
                }
            }
            if (!this.reverse) {
                if (this.body.velocity.y == 120 && !(this.y <= this.y2)) {
                    this.body.velocity.y = 0;
                    this.y = this.y2;
                    this.moving = false;
                }
                else if (this.body.velocity.y == -120 && this.y <= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    this.callBack.y = this.y2 + 18;
                    this.moving = false;
                }
            }
            else {
                if (this.body.velocity.y == -120 && !(this.y >= this.y2)) {
                    console.log(this.y2);
                    console.log(this.y);
                    console.log(this.body.velocity.y);
                    console.log("WHY");
                    this.body.velocity.y = 0;
                    this.direction = 0;
                    this.y = this.y2 + 1;
                    this.moving = false;
                }
                else if (this.body.velocity.y == 120 && this.y >= this.y1) {
                    this.body.velocity.y = 0;
                    this.y = this.y1;
                    this.moving = false;
                    console.log("f u 2");
                }
            }
            if (x && this.game.input.keyboard.isDown(Phaser.Keyboard.Z) && (!this.moving || this.prevPM > 50)) {
                this.move();
            }
            if (this.pauseMovement) {
                this.prevPM += 1;
            }
            else {
                this.prevPM = 0;
            }
            this.spriteStuck = false;
        };
        Elevator.prototype.move = function () {
            this.moving = true;
            console.log(this.left);
            console.log(this.game.camera.x);
            if (this.left < this.game.camera.x + 800 && this.right > this.game.camera.x) {
                this.sound.play();
            }
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
                if (this.y != this.y2 + 1) {
                    console.log("it is: " + this.y);
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
            _this.lasting = new Phaser.Image(game, 80, 70, "lasting");
            game.add.existing(_this.lasting);
            _this.lasting.scale.y = .2;
            _this.lasting.scale.x = .1;
            _this.lasting.fixedToCamera = true;
            _this.cooldown = new Phaser.Image(game, 80, 20, "cooldown");
            _this.cooldown.visible = false;
            game.add.existing(_this.cooldown);
            _this.cooldown.fixedToCamera = true;
            _this.cooldown.animations.add('cooldown', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 4 / 3);
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
            this.cooldown.visible = true;
            this.cooldown.animations.play("cooldown", 4 / 3, true);
            this.cooldown.animations.frame = 0;
            this.invis = true;
            this.visible = false;
            this.exists = false;
            this.time.add(Phaser.Timer.SECOND * 4, this.finish, this);
            this.time.start(0);
            this.avail.add(Phaser.Timer.MINUTE * 0.5, function () {
                _this.visible = true;
                _this.exists = true;
                _this.cooldown.visible = false;
                if (_this.animations.frame)
                    _this.animations.frame = 0;
            });
            this.avail.start(0);
        };
        Invis.prototype.update = function () {
            if (this.invis) {
                this.lasting.scale.x = (this.time.duration * .000025);
                this.lasting.visible = true;
            }
            else
                this.lasting.visible = false;
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
            _this.lasting = new Phaser.Image(game, 20, 70, "lasting");
            game.add.existing(_this.lasting);
            _this.lasting.scale.y = .2;
            _this.lasting.scale.x = .1;
            _this.lasting.fixedToCamera = true;
            _this.cooldown = new Phaser.Image(game, 20, 20, "cooldown");
            _this.cooldown.visible = false;
            game.add.existing(_this.cooldown);
            _this.cooldown.fixedToCamera = true;
            _this.cooldown.animations.add('cooldown', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 4 / 3);
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
            this.cooldown.visible = true;
            this.cooldown.animations.play("cooldown", 4 / 3, true);
            this.cooldown.animations.frame = 0;
            this.exists = false;
            this.shield = true;
            this.time.add(Phaser.Timer.SECOND * 4.5, this.finish, this);
            this.time.start(0);
            this.avail.add(Phaser.Timer.MINUTE * .5, function () {
                _this.cooldown.visible = false;
                _this.exists = true;
                if (_this.animations.frame)
                    _this.animations.frame = 0;
            });
            this.avail.start(0);
        };
        Shield.prototype.update = function () {
            if (this.shield) {
                this.lasting.scale.x = (this.time.duration * .000025);
                this.lasting.visible = true;
            }
            else
                this.lasting.visible = false;
        };
        return Shield;
    }(Phaser.Button));
    TSAGame.Shield = Shield;
    var HealthBar = (function (_super) {
        __extends(HealthBar, _super);
        function HealthBar(game) {
            var _this = _super.call(this, game, 175, 15, "Laser") || this;
            _this.fixedToCamera = true;
            _this.scale.y = 1.5;
            _this.maxhp = game.add.sprite(175, 15, 'Laser');
            _this.maxhp.fixedToCamera = true;
            _this.maxhp.scale.y = 1.5;
            _this.maxhp.scale.x = 25;
            _this.maxhp.tint = 0xaaaaaa;
            game.add.existing(_this);
            _this.heart = game.add.sprite(150, 4, 'heart');
            _this.heart.fixedToCamera = true;
            return _this;
        }
        return HealthBar;
    }(Phaser.Image));
    TSAGame.HealthBar = HealthBar;
    var EnergyBar = (function (_super) {
        __extends(EnergyBar, _super);
        function EnergyBar(game) {
            var _this = _super.call(this, game, 175, 45, "xxx") || this;
            _this.fixedToCamera = true;
            _this.scale.y = 1.5;
            _this.far = game.add.sprite(175, 45, 'xxx');
            _this.far.fixedToCamera = true;
            _this.far.scale.y = 1.5;
            _this.far.scale.x = 25;
            _this.far.tint = 0xaaaaaa;
            game.add.existing(_this);
            _this.bolt = game.add.sprite(157, 39, 'energy');
            _this.bolt.fixedToCamera = true;
            _this.bolt.scale.x = 2;
            _this.bolt.scale.y = 2;
            return _this;
        }
        return EnergyBar;
    }(Phaser.Image));
    TSAGame.EnergyBar = EnergyBar;
    var DialogueBoxCasual = (function (_super) {
        __extends(DialogueBoxCasual, _super);
        function DialogueBoxCasual(game) {
            var _this = _super.call(this, game, 100, 480, "talky box") || this;
            game.add.existing(_this);
            _this.person = _this.game.add.image(120, 490, "ehead");
            _this.vis = false;
            game.add.existing(_this.person);
            _this.scale.y = 4;
            _this.scale.x = 4;
            _this.person.scale.y = 3;
            _this.person.scale.x = 3;
            _this.time = game.time.create(false);
            _this.pName = new Phaser.Text(game, 115, 545, "Ethan");
            game.add.existing(_this.pName);
            _this.pName.fixedToCamera = true;
            _this.text = new Phaser.Text(game, 190, 490, " ");
            game.add.existing(_this.text);
            _this.text.fixedToCamera = true;
            _this.visible = false;
            _this.pName.visible = false;
            _this.text.visible = false;
            _this.person.visible = false;
            _this.person.fixedToCamera = true;
            _this.fixedToCamera = true;
            _this.text.fontSize = 20;
            _this.pName.font = "courier new";
            _this.pName.fontSize = 20;
            _this.text.addColor('#ff0000', 0);
            _this.pName.addColor('#ff0000', 0);
            _this.text.font = "courier new";
            _this.person.alpha = .75;
            _this.alpha = .75;
            _this.text.alpha = .75;
            _this.pName.alpha = .75;
            _this.text.stroke = '#000000';
            _this.text.strokeThickness = 1;
            _this.pName.stroke = '#000000';
            _this.pName.strokeThickness = 1;
            return _this;
        }
        DialogueBoxCasual.prototype.update = function () {
            if (TSAGame.urgent) {
                this.visible = false;
            }
            else {
                if (this.vis) {
                    this.visible = true;
                }
            }
            this.pName.visible = this.visible;
            this.text.visible = this.visible;
            this.person.visible = this.visible;
        };
        DialogueBoxCasual.prototype.talk = function (text, talker, talkerName, time) {
            this.text.text = text;
            this.visible = true;
            this.vis = true;
            this.pName.text = talkerName;
            this.person.loadTexture(talker, 0);
            this.time.add(Phaser.Timer.SECOND * time, this.expire, this);
            this.time.start(0);
        };
        DialogueBoxCasual.prototype.expire = function () {
            this.visible = false;
            this.vis = false;
        };
        return DialogueBoxCasual;
    }(Phaser.Image));
    TSAGame.DialogueBoxCasual = DialogueBoxCasual;
    var DialogueBoxUrgent = (function (_super) {
        __extends(DialogueBoxUrgent, _super);
        function DialogueBoxUrgent(game) {
            var _this = _super.call(this, game, 100, 480, "talky box") || this;
            game.add.existing(_this);
            _this.person = _this.game.add.image(120, 490, "ehead");
            game.add.existing(_this.person);
            _this.scale.y = 4;
            _this.timer = 0;
            _this.scale.x = 4;
            _this.person.scale.y = 3;
            _this.person.scale.x = 3;
            _this.blip = _this.game.add.audio("blip", 0.2, false);
            _this.prevZ = false;
            _this.Z = _this.game.add.image(668, 548, "zee");
            _this.Z.fixedToCamera = true;
            _this.time = game.time.create(false);
            _this.pName = new Phaser.Text(game, 115, 545, "HIHIHIHIHIHIH");
            game.add.existing(_this.pName);
            _this.pName.fixedToCamera = true;
            _this.text = new Phaser.Text(game, 190, 490, " ");
            game.add.existing(_this.text);
            _this.text.fixedToCamera = true;
            _this.visible = false;
            _this.Z.visible = false;
            _this.pName.visible = false;
            _this.text.visible = false;
            _this.finish = 0;
            _this.person.visible = false;
            _this.realText = "blank";
            _this.person.fixedToCamera = true;
            _this.fixedToCamera = true;
            _this.text.fontSize = 20;
            _this.pName.font = "courier new";
            _this.pName.fontSize = 20;
            _this.text.addColor('#ff0000', 0);
            _this.pName.addColor('#ff0000', 0);
            _this.text.font = "courier new";
            _this.selects = _this.game.add.audio("talknext", 0.5, false);
            _this.text.stroke = '#000000';
            _this.text.strokeThickness = 1;
            _this.pName.stroke = '#000000';
            _this.pName.strokeThickness = 1;
            return _this;
        }
        DialogueBoxUrgent.prototype.update = function () {
            if (this.visible && this.text.text !== this.realText) {
                this.timer++;
                if (this.timer > 3) {
                    this.text.text += this.realText[this.text.text.length];
                    this.timer = 0;
                    this.blip.play();
                }
                this.Z.visible = false;
                if (!this.prevZ && this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
                    this.text.text = this.realText;
                }
            }
            else {
                this.Z.visible = this.visible;
                if (!this.prevZ && this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
                    this.finish = this.finished;
                    if (this.visible)
                        this.selects.play();
                    this.text.text = this.realText;
                    this.visible = false;
                    TSAGame.urgent = false;
                }
            }
            this.pName.visible = this.visible;
            this.text.visible = this.visible;
            this.person.visible = this.visible;
            this.prevZ = this.game.input.keyboard.isDown(Phaser.Keyboard.Z);
        };
        DialogueBoxUrgent.prototype.talk = function (text, talker, talkerName, finished) {
            if (finished === void 0) { finished = 0; }
            this.realText = text;
            this.text.text = text[0];
            this.visible = true;
            this.finished = finished;
            this.pName.text = talkerName;
            this.pName.visible = true;
            this.person.loadTexture(talker, 0);
            if (talker == "no")
                this.person.alpha = 0;
            else
                this.person.alpha = 1;
            TSAGame.urgent = true;
        };
        return DialogueBoxUrgent;
    }(Phaser.Image));
    TSAGame.DialogueBoxUrgent = DialogueBoxUrgent;
    var Alarm = (function (_super) {
        __extends(Alarm, _super);
        function Alarm(game, x, y, type, group, angle) {
            var _this = _super.call(this, game, x, y, type) || this;
            game.add.existing(_this);
            group.add(_this);
            _this.prevAlarms = false;
            _this.animations.add("strobe", [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9,], 15, true);
            _this.lights = game.add.image(x + 16, y, "lights");
            _this.lights.alpha = .3;
            _this.lights.visible = false;
            _this.angle = angle;
            _this.lights.anchor.setTo(0.5, 0.5);
            return _this;
        }
        Alarm.prototype.update = function () {
            if (!TSAGame.alarmsOn && this.prevAlarms) {
                console.log("hello");
                this.animations.stop();
                this.frame = 0;
                this.lights.visible = false;
            }
            this.prevAlarms = TSAGame.alarmsOn;
        };
        Alarm.prototype.setOff = function () {
            console.log("f");
            this.animations.play("strobe");
            this.lights.visible = true;
        };
        Alarm.prototype.stop = function () {
            this.animations.stop();
            this.frame = 0;
            this.lights.visible = false;
        };
        return Alarm;
    }(Phaser.Image));
    TSAGame.Alarm = Alarm;
    var Chain = (function (_super) {
        __extends(Chain, _super);
        function Chain(game, x, y) {
            var _this = _super.call(this, game, x, y, "chain") || this;
            game.add.existing(_this);
            _this.glow = game.add.image(x - 60, y + 40, "lights");
            _this.glow.alpha = .4;
            _this.glow.scale.x = .5;
            _this.glow.scale.y = .5;
            return _this;
        }
        return Chain;
    }(Phaser.Image));
    TSAGame.Chain = Chain;
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
            _this.cantMove = x == pos2;
            _this.seesing = false;
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
            _this.blastSound = _this.game.add.audio("blast", 0.2, false);
            _this.blasts = game.add.group();
            return _this;
        }
        Sensor.prototype.update = function () {
            this.seesing = false;
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
                if (this.canUse) {
                    if (this.direction == 3) {
                        this.laser.setTo(this.x, this.y, this.x + 1, 600);
                        var done = false;
                        if (this.drones != undefined) {
                            var droneL = new Phaser.Line(0, 0, 0, 0);
                            for (var i = 0; i < this.drones.children.length && !done; i++) {
                                var drone = this.drones.children[i];
                                droneL.setTo(drone.left, drone.top, drone.right, drone.top);
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
                        this.laser.setTo(this.x, this.y - 6, this.x + 1, laserEnd);
                        this.myLaser.scale.x = .125;
                        this.myLaser.scale.y = this.laser.length * 0.125;
                        this.myLaser.left = this.laser.x;
                        this.myLaser.top = this.laser.y;
                    }
                    else {
                        this.laser.setTo(this.x, this.y, this.x + 1, 0);
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
                        this.laser.setTo(this.x, this.y + 10, this.x + 1, laserEnd);
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
                                droneL.setTo(drone.x + 24, drone.top, drone.x + 24, drone.bottom);
                                if (droneL.intersects(this.laser, true)) {
                                    laserEnd = drone.x + 24;
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
                        this.blasts.getFirstDead().addIn(this.x, this.y, 0, 1.6, this.direction * 90, "lightning bolt");
                    else if (this.direction == 1)
                        this.blasts.getFirstDead().addIn(this.x, this.y, 0, -1.5, this.direction * 90, "lightning bolt");
                    else if (this.direction == 0)
                        this.blasts.getFirstDead().addIn(this.x, this.y, -1, 0, this.direction * 90, "lightning bolt");
                    else
                        this.blasts.getFirstDead().addIn(this.x, this.y, 1, 0, this.direction * 90, "lightning bolt");
                    this.frame = 0;
                    this.lTimer.add(Phaser.Timer.SECOND * 3, this.finish, this);
                    this.lTimer.start(0);
                    this.canUse = false;
                }
            }
            if (this.pl.intersects(this.laser, true)) {
                this.seesing = true;
                this.triggered = true;
                this.animations.play("shoot");
            }
            if (this.triggered) {
            }
            if (this.cantMove)
                this.body.velocity.x = 0;
        };
        Sensor.prototype.finish = function () {
            this.canUse = true;
        };
        return Sensor;
    }(Phaser.Sprite));
    TSAGame.Sensor = Sensor;
    var Sensor2 = (function (_super) {
        __extends(Sensor2, _super);
        function Sensor2(game, x, y, pos2, type, direction, layer, group) {
            var _this = _super.call(this, game, x - 16, y + 16, "hidden sensor") || this;
            game.add.existing(_this);
            game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0.5);
            _this.seesing = false;
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
            _this.cantMove = x == pos2;
            _this.direction2 = 1;
            _this.lTimer = game.time.create(false);
            _this.layer = layer;
            _this.drones = undefined;
            _this.pl = new Phaser.Line(0, 0, 0, 0);
            _this.triggered = false;
            _this.detected = false;
            _this.prevAlarms = false;
            _this.animations.add("shoot", [3, 4, 5, 6, 7, 8], 10);
            _this.animations.add("open", [0, 1, 2, 3], 8);
            _this.animations.add("close", [3, 2, 1, 0], 8);
            _this.blastSound = _this.game.add.audio("blast", 0.2, false);
            _this.blasts = game.add.group();
            return _this;
        }
        Sensor2.prototype.update = function () {
            this.seesing = false;
            if (TSAGame.alarmsOn) {
                if (!this.prevAlarms)
                    this.animations.play("open");
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
                            this.laser.setTo(this.x, this.y, this.x, 600);
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
                            this.laser.setTo(this.x, this.y - 6, this.x, laserEnd);
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
                            this.laser.setTo(this.x, this.y + 10, this.x, laserEnd);
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
                if (this.frame > 3) {
                    this.body.velocity.x = 0;
                    if (this.frame == 8) {
                        this.blastSound.play();
                        if (this.direction == 3)
                            this.blasts.getFirstDead().addIn(this.x, this.y, 0, 1.6, this.direction * 90, "arrow");
                        else if (this.direction == 1)
                            this.blasts.getFirstDead().addIn(this.x, this.y, 0, -1.6, this.direction * 90, "arrow");
                        else if (this.direction == 0)
                            this.blasts.getFirstDead().addIn(this.x, this.y, -1.6, 0, this.direction * 90, "arrow");
                        else
                            this.blasts.getFirstDead().addIn(this.x, this.y, 1.6, 0, this.direction * 90, "arrow");
                        this.frame = 3;
                        this.lTimer.add(Phaser.Timer.SECOND * 3, this.finish, this);
                        this.lTimer.start(0);
                        this.canUse = false;
                    }
                }
                if (this.pl.intersects(this.laser, true)) {
                    this.triggered = true;
                    this.seesing = true;
                    this.animations.play("shoot");
                }
                if (this.triggered) {
                }
            }
            else {
                if (this.prevAlarms)
                    this.animations.play("close");
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.laser.setTo(0, 0, 0, 0);
                this.myLaser.scale.x = .125;
                this.myLaser.scale.y = this.laser.length * 0.125;
                this.myLaser.left = this.laser.x;
                this.myLaser.top = this.laser.y;
            }
            if (this.cantMove)
                this.body.velocity.x = 0;
            this.prevAlarms = TSAGame.alarmsOn;
        };
        Sensor2.prototype.finish = function () {
            this.canUse = true;
        };
        return Sensor2;
    }(Phaser.Sprite));
    TSAGame.Sensor2 = Sensor2;
    var Cannon = (function (_super) {
        __extends(Cannon, _super);
        function Cannon(game, x, y, direction, layer, group) {
            var _this = _super.call(this, game, x, y, "cannonBase") || this;
            _this.barrel = game.add.image(x, y, "cannonBase");
            _this.player = null;
            group.add(_this);
            _this.barrel.alpha = 0;
            _this.anchor.setTo(0.5, 0.8);
            _this.barrel.anchor.setTo(0.5, 0.8);
            _this.barrel.frame = 4;
            _this.Awaken = false;
            _this.angel = 0;
            _this.rotatoin = direction * 1.57;
            _this.rotation = direction * 1.57;
            _this.barrel.rotation = direction * 1.57;
            _this.blasts = game.add.group();
            _this.animations.add("awaken", [0, 1, 2, 3, 4, 5, 6, 7], 10);
            _this.animations.add("chill", [7, 7, 7, 6, 5, 4, 3, 2, 1, 0], 10);
            _this.animations.add("fire", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 15);
            _this.boom = _this.game.add.audio("cannon", 0.25, false);
            return _this;
        }
        Cannon.prototype.update = function () {
            if (this.Awaken && this.left < this.game.camera.x + 800 && this.right > this.game.camera.x) {
                this.angle = 1.57 + this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
                if (this.angel < 3.14 && this.angel > -3.14) {
                    this.animations.play("awaken");
                }
            }
            if (this.frame == 7 && this.Awaken) {
                this.animations.stop();
                this.Awaken = false;
                this.frame = 8;
                this.barrel.alpha = 1;
                this.animations.play("fire");
            }
            if (this.barrel.alpha == 1) {
                this.angel = 1.57 + this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
                if (this.angel > 1.57 + this.rotatoin) {
                    this.rotation = 1.57 + this.rotatoin;
                }
                else if (this.angel < -1.57 + this.rotatoin) {
                    this.rotation = -1.57 + this.rotatoin;
                }
                else {
                    this.rotation = this.angel;
                }
            }
            if (this.frame == 0)
                this.rotation = this.rotatoin;
            if (this.frame == 10)
                this.boom.play();
            if (this.frame == 17)
                this.Fire();
        };
        Cannon.prototype.ChillBruh = function () {
            this.rotation = this.rotatoin;
            this.barrel.alpha = 0;
            this.animations.play("chill");
        };
        Cannon.prototype.Fire = function () {
            this.frame = 8;
            var vel = this.game.physics.arcade.velocityFromAngle(this.angle - 90, 1);
            this.blasts.getFirstDead().addIn(this.x, this.y, vel.x * 2, vel.y * 2.36, this.angle);
            this.ChillBruh();
        };
        return Cannon;
    }(Phaser.Sprite));
    TSAGame.Cannon = Cannon;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    TSAGame.lose120 = false;
    TSAGame.canLose120 = true;
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, "ethan", 0) || this;
            game.add.existing(_this);
            game.physics.arcade.enable(_this);
            _this.health = 200;
            _this.wait = 0;
            _this.anchor.setTo(0.5, 0);
            _this.gravity = 7.5;
            _this.globalTime = game.time.create(false);
            _this.globalTime.add(Phaser.Timer.SECOND * 4, _this.uselessfunction, _this);
            _this.globalTime.start(0);
            _this.shock = _this.game.add.audio("shock", 0.6);
            _this.body.collideWorldBounds = true;
            _this.body.mass = 2;
            _this.playerScale = 1;
            _this.flinch = false;
            _this.scale.x = _this.playerScale;
            _this.scale.y = _this.playerScale;
            _this.hitPlatform = true;
            _this.drone = null;
            _this.dGrab = false;
            _this.lGrab = false;
            _this.zapped = 0;
            _this.prevLgrab = 0;
            _this.crouch = false;
            _this.prevCrouch = false;
            _this.energy = 400;
            _this.jumpV = 250;
            _this.droneNumber = -1;
            _this.animations.add("walk", [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15], 14);
            _this.body.offset = new Phaser.Point(8.75, 0);
            _this.body.width = 14;
            _this.shield = false;
            _this.invis = false;
            _this.prevShield = false;
            return _this;
        }
        Player.prototype.uselessfunction = function () {
        };
        Player.prototype.update = function () {
            if (TSAGame.lose120) {
                this.energy -= 100;
                TSAGame.lose120 = false;
            }
            if (this.energy > 100)
                TSAGame.canLose120 = true;
            else
                TSAGame.canLose120 = false;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                this.game.sound.stopAll();
                this.game.state.start("levelSelect", true, false);
            }
            if (this.health <= 0) {
                this.game.sound.stopAll();
                this.game.state.start("playerDeath");
            }
            var dTime = 0.0;
            if (this.game.time.fps > 5) {
                dTime = (this.previousTime - this.globalTime.ms) / -16.666;
                if (dTime < 1 || isNaN(dTime))
                    dTime = 1;
            }
            else {
                dTime = 1;
            }
            this.body.velocity.x = 0;
            if (this.lGrab == false && this.crouch == false && !TSAGame.urgent) {
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
                if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down || this.body.touching.down)) {
                    this.body.velocity.y = -this.jumpV;
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && (this.body.blocked.down)) {
                this.crouch = true;
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.gravity = 0;
                this.x = this.previousX;
                if (!this.prevCrouch) {
                    this.loadTexture("ethanCrouching", 0);
                    this.y += 29;
                }
            }
            else if (!this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.crouch) {
                this.crouch = false;
                if (this.prevCrouch) {
                    this.y -= 29;
                    this.loadTexture("ethan", 0);
                    this.gravity = 7.5;
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.height = 62;
                }
            }
            this.body.velocity.y += this.gravity;
            if (this.drone != null) {
                this.droneNumber = this.drone.myNumber;
                this.dGrab = true;
                this.lGrab = true;
                if (this.drone.direction == -1) {
                    console.log("yeems");
                    this.gX = this.drone.right + 1;
                    this.gY = this.drone.top + 5;
                }
                else {
                    this.gX = this.drone.right - 6;
                    this.gY = this.drone.top + 5;
                }
            }
            else {
                this.droneNumber = -1;
                this.dGrab = false;
            }
            if (this.zapped > 0) {
                this.body.velocity.x = 0;
                if (this.body.velocity.y < 0)
                    this.body.velocity.y = 0;
                this.animations.stop();
                this.animations.frame = 0;
                if (this.zapped === 1) {
                    this.shock.play();
                    this.energy -= 160;
                }
                else if (this.zapped === 60)
                    this.zapped = -1;
                this.zapped++;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !(this.lGrab) && this.energy > 25 && !TSAGame.urgent && this.body.velocity.y > 10) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    var num1 = Math.floor(this.right / 32) * 32;
                    var num2 = Math.floor(this.top / 32) * 32;
                    var omer = this.layer.getTiles(num1, num2, 32, 32);
                    var johnDun = this.layer.getTiles(num1, num2 - 32, 32, 32);
                    var hunter = this.layer.getTiles(num1 - 32, num2 - 32, 32, 32);
                    if (omer[0].index != -1 && johnDun[0].index == -1 && hunter[0].index == -1) {
                        this.lGrab = true;
                        this.gX = omer[0].worldX;
                        this.gY = omer[0].worldY - 2;
                    }
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    var num1 = Math.floor(this.right / 32) * 32;
                    var num2 = Math.floor(this.top / 32) * 32;
                    var omer = this.layer.getTiles(num1, num2, 32, 32);
                    var johnDun = this.layer.getTiles(num1, num2 - 32, 32, 32);
                    var hunter = this.layer.getTiles(num1 + 32, num2 - 32, 32, 32);
                    if (omer[0].index != -1 && johnDun[0].index == -1 && hunter[0].index == -1) {
                        this.lGrab = true;
                        this.gX = omer[0].worldX + 28;
                        this.gY = omer[0].worldY - 2;
                    }
                }
            }
            if (this.flinch) {
                if (!this.shield) {
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W))
                        this.health -= 50;
                    else
                        this.health -= 25;
                }
                this.body.velocity.y = -this.jumpV * .6;
            }
            if ((!(this.body.blocked.down || this.body.touching.down) || (this.body.blocked.up || this.body.touching.up)) && !this.lGrab) {
                this.animations.stop(null, true);
                if (this.body.velocity.x != 0) {
                    this.animations.frame = 3;
                }
                else {
                    this.animations.frame = 0;
                }
            }
            var debug = true;
            if (this.energy < 0)
                this.energy = 0;
            if (debug) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                    this.gravity += .08;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
                    this.gravity -= 0.08;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.T)) {
                    this.jumpV += 5;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.G)) {
                    this.jumpV -= 5;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
                    console.log(this.jumpV);
                    console.log(this.gravity);
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
                this.tint = 0x888888;
                this.alpha = 0.4;
            }
            else {
                this.alpha = 1;
                this.tint = 0xFFFFFF;
            }
            if (this.crouch) {
            }
            else if (this.lGrab) {
                this.wait = 50;
                this.loadTexture("grab", 0);
                this.body.offset = new Phaser.Point(1, 3);
                console.log();
                this.body.width = 22;
                this.body.height = 56;
                this.prevLgrab += 1 * dTime;
                if (this.prevLgrab > 30) {
                    this.energy -= .75;
                }
                this.right = this.gX + 2;
                this.y = this.gY + 1;
                this.gravity = 0;
                this.body.velocity.y = 0;
                this.body.velocity.x = 0;
                var fall = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.prevLgrab > 30;
                if (!fall && this.dGrab && this.drone.frame != 0 && this.drone.frame != 9)
                    fall = true;
                if (fall || this.energy < 10) {
                    this.lGrab = false;
                    this.gravity = 7.5;
                    this.body.velocity.y = 60;
                    this.prevLgrab = 0;
                    if (this.dGrab) {
                        this.dGrab = false;
                        this.droneNumber = -1;
                        this.drone = null;
                    }
                    if (this.shield) {
                        this.loadTexture("shield", 0);
                    }
                    else {
                        this.loadTexture("ethan", 0);
                    }
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height = 62;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.prevLgrab > 45) {
                    this.lGrab = false;
                    this.prevLgrab = 0;
                    this.gravity = 7.5;
                    this.body.velocity.y = -this.jumpV;
                    if (this.shield) {
                        this.loadTexture("shield", 0);
                    }
                    else {
                        this.loadTexture("ethan", 0);
                    }
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height = 62;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.scale.x == 1 && this.prevLgrab > 37) {
                    this.lGrab = false;
                    this.gravity = 7.5;
                    console.log("wfe");
                    this.body.velocity.x = -500;
                    this.scale.x = -1;
                    this.prevLgrab = 0;
                    this.body.velocity.y = -this.jumpV * .5;
                    if (this.shield) {
                        this.loadTexture("shield", 0);
                    }
                    else {
                        this.loadTexture("ethan", 0);
                    }
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height = 62;
                }
                if (this.dGrab && this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.drone.body.velocity.x > 0)
                    this.scale.x = 1;
                if (this.dGrab && this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.drone.body.velocity.x < 0)
                    this.scale.x = -1;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.scale.x == -1 && this.prevLgrab > 37) {
                    this.lGrab = false;
                    this.gravity = 7.5;
                    this.body.velocity.x = 500;
                    this.scale.x = 1;
                    this.prevLgrab = 0;
                    this.body.velocity.y = -this.jumpV * .5;
                    if (this.shield) {
                        this.loadTexture("shield", 0);
                    }
                    else {
                        this.loadTexture("ethan", 0);
                    }
                    this.body.offset = new Phaser.Point(8.75, 0);
                    this.body.width = 14;
                    this.body.height = 62;
                }
            }
            if (TSAGame.urgent)
                this.animations.frame = 0;
            --this.wait;
            if (this.wait < 0) {
                this.wait = 0;
            }
            if (!this.lGrab && this.energy < 400 && this.wait == 0)
                this.energy += 0.25 * (this.health / 400);
            this.previousX = this.x;
            this.previousTime = this.globalTime.ms;
            this.prevCrouch = this.crouch;
            this.prevShield = this.shield;
        };
        return Player;
    }(Phaser.Sprite));
    TSAGame.Player = Player;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    TSAGame.levelOn = 0;
    TSAGame.firstselect = false;
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            var bgg = this.game.add.sprite(148, 250, "preloadBarBg");
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            this.preloadBar = this.game.add.sprite(148, 250, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);
            this.load.spritesheet("ethan", "./assets/Ethan.png", 35, 62);
            this.load.spritesheet("shield", "./assets/EthanShield.png", 40, 62);
            this.load.spritesheet("grab", "./assets/The Meliks Ledge Grab.png", 27, 60);
            this.load.spritesheet("tbot", "./assets/NTbot.png", 40, 61);
            this.load.spritesheet("tbot2", "./assets/RTbot.png", 40, 61);
            this.load.spritesheet("alien", "./assets/Real Alien8.png", 37, 64);
            this.load.spritesheet("alien2", "./assets/Scientist dude.png", 37, 64);
            this.load.spritesheet("alien2v2", "./assets/Scientist Alien Teleport.png", 45, 64);
            this.load.spritesheet("obot", "./assets/Obot Right1.png", 36, 48);
            this.load.spritesheet("obot23", "./assets/Obot Left (1).png", 36, 48);
            this.load.spritesheet("alienElevator", "./assets/alivator.png", 66, 58);
            this.load.spritesheet("elevator", "./assets/HumanElevator.png", 66, 58);
            this.load.spritesheet("button1", "./assets/InvisibleGUI.png", 40, 40);
            this.load.spritesheet("button2", "./assets/ShieldGUI2.png", 40, 40);
            this.load.spritesheet("cooldown", "./assets/cooldown bar.png", 40, 40);
            this.load.spritesheet("blast", "./assets/State Blast (2).png", 46, 44);
            this.load.spritesheet("cannonBase", "./assets/cannonn for states.png", 32, 62);
            this.load.spritesheet("elevatorCallBack", "./assets/elevamatorButton.png", 16, 16);
            this.load.spritesheet("alienElevatorCallBack", "./assets/alienCallBack.png", 16, 16);
            this.load.image("fire", "./assets/blastf.png");
            this.load.image("lightning bolt", "./assets/Lightning attack 8.png");
            this.load.image("arrow", "./assets/Arrow-.png");
            this.load.image("blast2", "./assets/blast34.png");
            this.load.image("sciStar", "./assets/ScienceStar.png");
            this.load.image("cutscene-a", "./assets/cutcece (1).png");
            this.load.image("cutscenez", "./assets/Cutscene Icon-1.png");
            this.load.image("cutscene-b", "./assets/Cutscene2.png");
            this.load.image("cutscene-c", "./assets/Cutscene3.png");
            this.load.image("cutscene-d", "./assets/Cutscene4 (1).png");
            this.load.image("cutscene-e", "./assets/cutscene5.png");
            this.load.image("cutscene-f", "./assets/cutscene6 (1).png");
            this.load.image("bigAlienElevator", "./assets/LargeElevator.png");
            this.load.image("sky", "./assets/lev1bg.png");
            this.load.image("lvl2", "./assets/levl2bg.png");
            this.load.image("lvl3", "./assets/the final background for level3.png");
            this.load.image("factoryBG", "./assets/hello-1.png");
            this.load.image("lasting", "./assets/last.png");
            this.load.image("title", "./assets/titleScreen.png");
            this.load.image("wull", "./assets/will saved.png");
            this.load.image("jayant", "./assets/Jeanette Saved.png");
            this.load.image("jaems", "./assets/James.png");
            this.load.image("talky box", "./assets/the talky box.png");
            this.load.image("ehead", "./assets/EthanHead.png");
            this.load.image("sciHead", "./assets/sciHead.png");
            this.load.image("whead", "./assets/Wills Head.png");
            this.load.image("?hed", "./assets/unknownHead.png");
            this.load.image("jhead", "./assets/Jhead.png");
            this.load.image("suspicion", "./assets/alerted-1.png");
            this.load.spritesheet("siren", "./assets/alarm.png", 32, 32);
            this.load.spritesheet("siren2", "./assets/alien alarm0.png", 32, 32);
            this.load.image("ground", "./assets/ground.png");
            this.load.image("fbpt", "./assets/Final boss.png");
            this.load.image("heart", "./assets/Heart.png");
            this.load.image("energy", "./assets/energy.png");
            this.load.image("?button", "./assets/mystery button.png");
            this.load.image("Ship Tileset", "./assets/Tile Sets/coolest most bestest tileset.png");
            this.load.image("Ship2 Tileset", "./assets/Tile Sets/State level2.png");
            this.load.image("Level 3 tileset", "./assets/Tile Sets/worst tileset.png");
            this.load.image("pauseButton", "./assets/pause.png");
            this.load.image("resume", "./assets/resume.png");
            this.load.image("reset", "./assets/main menu button.png");
            this.load.image("skip", "./assets/s kip.png");
            this.load.image("retry", "./assets/Retry.png");
            this.load.image("retry2", "./assets/retryNum2.png");
            this.load.image("arm", "./assets/alienArm.png");
            this.load.image("lights", "./assets/Glowy2.png");
            this.load.image("Laser", "./assets/Laser.png");
            this.load.image("xxx", "./assets/xxx.png");
            this.load.spritesheet("level1", "./assets/level1 states.png", 80, 100);
            this.load.spritesheet("level2", "./assets/level2 states.png", 80, 100);
            this.load.spritesheet("level3", "./assets/Lvl3Butt.png", 80, 100);
            this.load.image("lvlLock", "./assets/levelLocked1.png");
            this.load.image("lvlSelect", "./assets/Level Select Screen.png");
            this.load.image("gameover", "./assets/gamover (1).png");
            this.load.spritesheet("sensor", "./assets/Security Laser2.png", 32, 32);
            this.load.spritesheet("hidden sensor", "./assets/hidden sensor3.png", 32, 32);
            this.load.spritesheet("door", "./assets/door.png", 32, 64);
            this.load.image("done", "./assets/yayay.png");
            this.load.image("ethanCrouching", "./assets/ethancrouch.png");
            this.load.image("chain", "./assets/Chain.png");
            this.load.image("instruct", "./assets/instruct.png");
            this.load.image("instructions", "./assets/Instructions (4).png");
            this.load.image("instructions_paused", "./assets/Instructions (5).png");
            this.load.image("play", "./assets/play button.png");
            this.load.image("zee", "./assets/Z (1).png");
            this.load.spritesheet("cryopod", "./assets/cryopod.png", 25, 80);
            this.load.spritesheet("duckbot", "./assets/Duckbot.png", 62, 56);
            this.load.spritesheet("drone", "./assets/drone.png", 48, 36);
            this.load.spritesheet("drone2", "./assets/drone clone.png", 48, 36);
            this.load.spritesheet("levelEnd", "./assets/AlienTeleporter.png", 34, 66);
            this.load.audio("first", "./assets/sound/first.mp3");
            this.load.audio("second", "./assets/sound/OLIVER's song.mp3");
            this.load.audio("1", "./assets/sound/Level 1 music (5) (1).wav");
            this.load.audio("third", "./assets/sound/fvlev3.mp3");
            this.load.audio("alarm", "./assets/sound/alarm1.mp3");
            this.load.audio("blip", "./assets/sound/Blip_Select.wav");
            this.load.audio("blast", "./assets/sound/blast.mp3");
            this.load.audio("deactivate", "./assets/sound/deactivate.mp3");
            this.load.audio("shock", "./assets/sound/zpa.wav");
            this.load.audio("cannon", "./assets/sound/cannon.mp3");
            this.load.audio("talknext", "./assets/sound/next.mp3");
            this.load.audio("elSound", "./assets/sound/elevator sound.mp3");
            this.load.tilemap('map', 'assets/Tile maps/Nova90.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map2', 'assets/Tile maps/4-6-17 Level2.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map3', 'assets/Tile maps/ActualAlienBase.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('facility', 'assets/Tile maps/Facility.json', null, Phaser.Tilemap.TILED_JSON);
        };
        Preloader.prototype.create = function () {
            var _this = this;
            this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function () { return _this.game.state.start("titleScreen", true, false); });
        };
        return Preloader;
    }(Phaser.State));
    TSAGame.Preloader = Preloader;
    var titleScreen = (function (_super) {
        __extends(titleScreen, _super);
        function titleScreen() {
            return _super.apply(this, arguments) || this;
        }
        titleScreen.prototype.create = function () {
            var bg = this.game.add.sprite(0, 0, "title");
            if (!parseInt(localStorage.getItem("cutscene"))) {
                localStorage.setItem("cutscene", "0");
            }
            var cutscenez = this.game.add.button(690, 500, "cutscenez");
            cutscenez.scale.x = 2;
            cutscenez.scale.y = 2;
            cutscenez.onInputDown.add(this.watch, this);
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
            this.game.sound.stopAll();
            if (parseInt(localStorage.getItem("cutscene")) > 0) {
                this.game.state.start("levelSelect", true, false);
            }
            else {
                localStorage.setItem("cutscene", "1");
                this.game.state.start("intro", true, false);
            }
        };
        titleScreen.prototype.instruct = function () {
            var _this = this;
            this.image = this.game.add.image(0, 0, "instructions");
            this.image.inputEnabled = true;
            this.image.events.onInputDown.add(function () { return _this.image.destroy(); }, this);
        };
        titleScreen.prototype.watch = function () {
            this.game.sound.stopAll();
            this.game.state.start("intro", true, false);
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
            this.reset = this.game.add.button(bg.width / 2, 445, "reset");
            this.reset.x = bg.width / 2 - this.reset.width;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.reset.onInputDown.add(this.rset, this);
            this.lvl1 = this.game.add.button(bg.width / 2 - 210, 175, "level1");
            this.lvl1.x = bg.width / 2 - 210 - this.lvl1.width;
            this.lvl1.scale.x = 2;
            this.lvl1.scale.y = 2;
            this.lvl1.onInputDown.add(this.levl1, this);
            this.lvl1.animations.add("anim", [0, 1, 2, 3, 4, 5], 12, true);
            this.lvl1.animations.play("anim");
            this.lvl2 = this.game.add.button(bg.width / 2, 175, "level2");
            this.lvl2.x = bg.width / 2 - this.lvl2.width;
            this.lvl2.scale.x = 2;
            this.lvl2.scale.y = 2;
            this.lvl2.animations.add("anim", [0, 1, 2, 3, 4, 5], 12, true);
            this.lvl3 = this.game.add.button(bg.width / 2 + 210, 175, "level3");
            this.lvl3.x = bg.width / 2 + 210 - this.lvl3.width;
            this.lvl3.scale.x = 2;
            this.lvl3.scale.y = 2;
            this.lvl3.animations.add("anim", [0, 1, 2, 3, 4, 5], 12, true);
            var tint = 0x777777;
            if (parseInt(localStorage.getItem("clearedLevel")) > 0) {
                this.lvl2.onInputDown.add(this.levl2, this);
                this.lvl2.animations.play("anim");
                if (parseInt(localStorage.getItem("clearedLevel")) > 1) {
                    this.lvl3.onInputDown.add(this.levl3, this);
                    this.lvl3.animations.play("anim");
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
            this.game.state.start("titleScreen", true, false);
        };
        LevelSelect.prototype.levl1 = function () {
            this.game.sound.stopAll();
            if (parseInt(localStorage.getItem("clearedLevel")) == 0) {
                this.game.state.start("intro", true, false);
            }
            else {
                this.game.state.start("level1", true, false);
            }
            TSAGame.levelOn = 1;
        };
        LevelSelect.prototype.levl2 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level2", true, false);
            TSAGame.levelOn = 2;
        };
        LevelSelect.prototype.levl3 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level3", true, false);
            TSAGame.levelOn = 3;
        };
        LevelSelect.prototype.levlLocked = function () {
        };
        LevelSelect.prototype.pauseUpdate = function () {
            this.game.paused = false;
        };
        return LevelSelect;
    }(Phaser.State));
    TSAGame.LevelSelect = LevelSelect;
    var cutScenes = (function (_super) {
        __extends(cutScenes, _super);
        function cutScenes() {
            return _super.apply(this, arguments) || this;
        }
        cutScenes.prototype.create = function () {
            this.img1 = this.game.add.sprite(0, 0, "cutscene-a");
            this.img2 = this.game.add.sprite(0, 0, "cutscene-b");
            this.img2.alpha = 0;
            this.img3 = this.game.add.sprite(0, 0, "cutscene-c");
            this.img3.alpha = 0;
            this.img4 = this.game.add.sprite(0, 0, "cutscene-d");
            this.img4.alpha = 0;
            this.img5 = this.game.add.sprite(0, 0, "cutscene-e");
            this.img5.alpha = 0;
            this.img6 = this.game.add.sprite(0, 0, "cutscene-f");
            this.img6.alpha = 0;
            this.reset = this.game.add.button(800, 600, "skip");
            this.reset.x -= this.reset.width + this.reset.height / 2;
            this.reset.y -= this.reset.height * 1.5;
            this.reset.onInputDown.add(this.finish, this);
            this.timer = this.game.time.create(true);
            this.timer.add(Phaser.Timer.SECOND * 11, function addInput() {
                this.game.add.tween(this.img2).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                this.timer = this.game.time.create(true);
                this.timer.add(Phaser.Timer.SECOND * 11.5, function addInput() {
                    this.game.add.tween(this.img3).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                    this.timer = this.game.time.create(true);
                    this.timer.add(Phaser.Timer.SECOND * 6, function addInput() {
                        this.game.add.tween(this.img4).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                        this.timer = this.game.time.create(true);
                        this.timer.add(Phaser.Timer.SECOND * 11, function addInput() {
                            this.game.add.tween(this.img5).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                            this.timer = this.game.time.create(true);
                            this.timer.add(Phaser.Timer.SECOND * 14, function addInput() {
                                this.game.add.tween(this.img6).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                                this.timer = this.game.time.create(true);
                                this.timer.add(Phaser.Timer.SECOND * 15, function addInput() {
                                    this.img1.visible = false;
                                    this.img2.visible = false;
                                    this.img3.visible = false;
                                    this.img4.visible = false;
                                    this.img5.visible = false;
                                    this.game.add.tween(this.img6).to({ alpha: 0 }, Phaser.Timer.SECOND, "Linear", true, 0);
                                    this.game.sound.stopAll();
                                    this.finish();
                                }, this);
                                this.timer.start();
                            }, this);
                            this.timer.start();
                        }, this);
                        this.timer.start();
                    }, this);
                    this.timer.start();
                }, this);
                this.timer.start();
            }, this);
            this.timer.start();
        };
        cutScenes.prototype.finish = function () {
            this.game.state.start("level1", true, false);
        };
        return cutScenes;
    }(Phaser.State));
    TSAGame.cutScenes = cutScenes;
    var Win = (function (_super) {
        __extends(Win, _super);
        function Win() {
            return _super.apply(this, arguments) || this;
        }
        Win.prototype.create = function () {
            this.img1 = this.game.add.sprite(0, 0, "gameover");
            this.img2 = this.game.add.sprite(0, 0, "sky");
            this.img2.alpha = 0;
            this.img3 = this.game.add.sprite(0, 0, "lvl2");
            this.img3.alpha = 0;
            this.img4 = this.game.add.sprite(0, 0, "lvl3");
            this.img4.alpha = 0;
            this.img5 = this.game.add.sprite(0, 0, "title");
            this.img5.alpha = 0;
            this.timer = this.game.time.create(true);
            this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                this.game.add.tween(this.img2).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                this.timer = this.game.time.create(true);
                this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                    this.game.add.tween(this.img3).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                    this.timer = this.game.time.create(true);
                    this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                        this.game.add.tween(this.img4).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                        this.timer = this.game.time.create(true);
                        this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                            this.game.add.tween(this.img5).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
                            this.timer = this.game.time.create(true);
                            this.timer.add(Phaser.Timer.SECOND * 3, function addInput() {
                                var f = this.game.add.image(0, 0, "done");
                                f.scale.x = 2;
                                f.scale.y = 2;
                                this.reset = this.game.add.button(0, 480, "reset");
                                this.reset.x = f.width / 2 - this.reset.width;
                                this.reset.scale.x = 2;
                                this.reset.scale.y = 2;
                                this.reset.tint = 0xCCCCCC;
                                this.reset.onInputDown.add(this.rset, this);
                            }, this);
                            this.timer.start();
                        }, this);
                        this.timer.start();
                    }, this);
                    this.timer.start();
                }, this);
                this.timer.start();
            }, this);
            this.timer.start();
        };
        Win.prototype.rset = function () {
            this.game.sound.stopAll();
            this.game.state.start("titleScreen", true, false);
        };
        return Win;
    }(Phaser.State));
    TSAGame.Win = Win;
    var PlayerDeath = (function (_super) {
        __extends(PlayerDeath, _super);
        function PlayerDeath() {
            return _super.apply(this, arguments) || this;
        }
        PlayerDeath.prototype.create = function () {
            var bg = this.game.add.sprite(0, 0, "gameover");
            bg.alpha = 0;
            bg.scale.x = 2;
            bg.scale.y = 2;
            this.reset = this.game.add.image(bg.width / 2, 485, "reset");
            this.reset.x = bg.width / 2 - this.reset.width;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.reset.alpha = 0;
            this.reset.tint = 0xCCCCCC;
            this.game.add.tween(bg).to({ alpha: 1 }, 750, "Linear", true, 0);
            this.game.add.tween(this.reset).to({ alpha: 0.5 }, Phaser.Timer.SECOND, "Linear", true, 1000);
            this.retry = this.game.add.image(bg.width / 2, 388, "retry2");
            this.retry.x = bg.width / 2 - this.retry.width;
            this.retry.scale.x = 2;
            this.retry.scale.y = 2;
            this.retry.alpha = 0;
            this.retry.tint = 0xCCCCCC;
            this.game.add.tween(this.retry).to({ alpha: 0.5 }, Phaser.Timer.SECOND, "Linear", true, 1000);
            this.timer = this.game.time.create(true);
            this.timer.add(Phaser.Timer.SECOND, function addInput() {
                this.reset.alpha = 0;
                this.reset = this.game.add.button(bg.width / 2, 485, "reset");
                this.reset.x = bg.width / 2 - this.reset.width;
                this.reset.scale.x = 2;
                this.reset.scale.y = 2;
                this.reset.alpha = 0.5;
                this.reset.tint = 0xCCCCCC;
                this.reset.onInputDown.add(this.rset, this);
                this.game.add.tween(this.reset).to({ alpha: 1 }, Phaser.Timer.SECOND, "Linear", true, 0);
            }, this);
            this.timer.start();
            this.timer = this.game.time.create(true);
            this.timer.add(Phaser.Timer.SECOND, function addInput() {
                this.retry.alpha = 0;
                this.retry = this.game.add.button(bg.width / 2, 388, "retry2");
                this.retry.x = bg.width / 2 - this.retry.width;
                this.retry.scale.x = 2;
                this.retry.scale.y = 2;
                this.retry.alpha = 0.5;
                this.retry.tint = 0xCCCCCC;
                this.retry.onInputDown.add(this.resett, this);
                this.game.add.tween(this.retry).to({ alpha: 0.8 }, Phaser.Timer.SECOND, "Linear", true, 0);
            }, this);
            this.timer.start();
            this.timer = this.game.time.create(true);
            this.timer.add(4000, function addInput() { this.game.add.tween(bg).to({ alpha: 0 }, 3000, "Linear", true, 0); }, this);
            this.timer.start();
        };
        PlayerDeath.prototype.resett = function () {
            if (TSAGame.levelOn == 1) {
                this.levl1();
            }
            else if (TSAGame.levelOn == 2) {
                this.levl2();
            }
            else if (TSAGame.levelOn == 3) {
                this.levl3();
            }
        };
        PlayerDeath.prototype.rset = function () {
            this.game.sound.stopAll();
            this.game.state.start("titleScreen", true, false);
        };
        PlayerDeath.prototype.levl1 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level1", true, false);
        };
        PlayerDeath.prototype.levl2 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level2", true, false);
        };
        PlayerDeath.prototype.levl3 = function () {
            this.game.sound.stopAll();
            this.game.state.start("level3", true, false);
        };
        return PlayerDeath;
    }(Phaser.State));
    TSAGame.PlayerDeath = PlayerDeath;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
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
            _this.animations.add("p", [0, 1, 2, 3], 8);
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
        Blast.prototype.addIn = function (x, y, xVelMultiplier, yVelMultiplier, rotation, type) {
            if (type === void 0) { type = "blast"; }
            this.reset(x, y);
            if (this.key !== type)
                this.loadTexture(type);
            this.game.physics.arcade.enable(this);
            this.autoCull = true;
            this.angle = rotation + 90;
            this.body.velocity.y = 650 * yVelMultiplier;
            this.body.velocity.x = 550 * xVelMultiplier;
        };
        return Blast;
    }(Phaser.Sprite));
    TSAGame.Blast = Blast;
    var ScienceStar = (function (_super) {
        __extends(ScienceStar, _super);
        function ScienceStar(game, x, y, layer) {
            var _this = _super.call(this, game, x, y, "sciStar") || this;
            _this.attached = true;
            _this.layer = layer;
            _this.crash = false;
            return _this;
        }
        ScienceStar.prototype.update = function () {
            this.crash = this.game.physics.arcade.collide(this, this.layer);
            this.alpha = 1;
            if (this.crash) {
                this.attached = true;
            }
            if (this.attached) {
                this.alpha = 0;
                this.body.gravity.y = 0;
                this.body.velocity.y = 0;
            }
        };
        ScienceStar.prototype.launch = function (yvel, y, gravity) {
            this.body.velocity.x = yvel;
            this.body.velocity.y -= 20;
            this.body.gravity.y = gravity;
            this.y = y;
        };
        return ScienceStar;
    }(Phaser.Sprite));
    TSAGame.ScienceStar = ScienceStar;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    TSAGame.alarmsOn = false;
    TSAGame.urgent = false;
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            TSAGame.levelOn = 1;
            TSAGame.setUp(this, "sky");
            this.elevators = this.game.add.group();
            this.shake = false;
            var elevator = new TSAGame.Elevator(this.game, 768, 512, 352, this.elevators, 1, "elevator");
            var elevator2 = new TSAGame.Elevator(this.game, 2688, 384, 224, this.elevators, 1, "elevator");
            var elevator3 = new TSAGame.Elevator(this.game, 1920, 417, 224, this.elevators, 1, "elevator");
            var elevator4 = new TSAGame.Elevator(this.game, 2976, 384, 267, this.elevators, 1, "elevator");
            var elevator5 = new TSAGame.Elevator(this.game, 1888, 238, 96, this.elevators, 1, "elevator");
            this.elevators.setAll("Obots", this.Obots);
            this.order = 0;
            this.setoff1 = true;
            this.game.camera.bounds.bottom = 600;
            this.player = new TSAGame.Player(this.game, 60, 98);
            this.game.camera.follow(this.player);
            this.game.world.resize(3200, 600);
            this.sfdestrt = true;
            this.alarm = this.game.add.group();
            var alarm = new TSAGame.Alarm(this.game, 512, 64, "siren", this.alarm, 90);
            var alarm2 = new TSAGame.Alarm(this.game, 800, 96, "siren", this.alarm, -90);
            var alarm3 = new TSAGame.Alarm(this.game, 1376, 64, "siren", this.alarm, 0);
            var alarm4 = new TSAGame.Alarm(this.game, 1888, 64, "siren", this.alarm, -90);
            this.game.time.advancedTiming = true;
            this.invisifore = false;
            this.sheildbefore = false;
            this.map = this.add.tilemap("map");
            this.map.addTilesetImage("Ship Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.drones = this.game.add.group();
            var drone = new TSAGame.Drone(this.game, 300, 434, 416, this.drones, this.shipLayer);
            var drone2 = new TSAGame.Drone(this.game, 2144, 416, 2400, this.drones, this.shipLayer);
            var drone5 = new TSAGame.Drone(this.game, 960, 66, 1232, this.drones, this.shipLayer);
            this.drones.setAll("body.immovable", true);
            this.alien2 = new TSAGame.Alien2(this.game, 3040, 300, this.shipLayer, null);
            this.Obots = this.game.add.group();
            var obot = new TSAGame.Obot(this.game, 160, 288, 385, this.Obots, this.shipLayer, this.player);
            var obot2 = new TSAGame.Obot(this.game, 1546, 224, 1664, this.Obots, this.shipLayer, this.player);
            var obot4 = new TSAGame.Obot(this.game, 2160, 224, 2272, this.Obots, this.shipLayer, this.player);
            var obot5 = new TSAGame.Obot(this.game, 2287, 224, 2400, this.Obots, this.shipLayer, this.player);
            var obot6 = new TSAGame.Obot(this.game, 2696, 472, 2847, this.Obots, this.shipLayer, this.player);
            this.healthBar = new TSAGame.HealthBar(this.game);
            this.energyBar = new TSAGame.EnergyBar(this.game);
            this.button1 = new TSAGame.Invis(this.game);
            this.button2 = new TSAGame.Shield(this.game);
            this.tintI = this.game.add.image(0, 0, "Laser");
            this.tintI.alpha = 0;
            this.cannons = this.game.add.group();
            var c0 = new TSAGame.Cannon(this.game, 192, 384, 0, this.shipLayer, this.cannons);
            var c1 = new TSAGame.Cannon(this.game, 496, 492, 2, this.shipLayer, this.cannons);
            var c2 = new TSAGame.Cannon(this.game, 1548, 207, 1, this.shipLayer, this.cannons);
            var c3 = new TSAGame.Cannon(this.game, 1620, 428, 3, this.shipLayer, this.cannons);
            var c4 = new TSAGame.Cannon(this.game, 2512, 396, 2, this.shipLayer, this.cannons);
            var c5 = new TSAGame.Cannon(this.game, 2240, 204, 2, this.shipLayer, this.cannons);
            var c6 = new TSAGame.Cannon(this.game, 2860, 271, 1, this.shipLayer, this.cannons);
            var c7 = new TSAGame.Cannon(this.game, 3156, 300, 3, this.shipLayer, this.cannons);
            this.eCryo = this.game.add.sprite(57, 80, "cryopod");
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
            var sensor2 = new TSAGame.Sensor(this.game, 2177, 368, 2336, "", 3, this.shipLayer, this.sensors);
            var sensor3 = new TSAGame.Sensor(this.game, 1568, 384, 1625, "", 3, this.shipLayer, this.sensors);
            this.sensors2 = this.game.add.group();
            var hiddenSensor = new TSAGame.Sensor2(this.game, 356, 368, 356, "", 3, this.shipLayer, this.sensors2);
            var hiddenSensor2 = new TSAGame.Sensor2(this.game, 2150, 368, 2150, "", 3, this.shipLayer, this.sensors2);
            var hiddenSensor3 = new TSAGame.Sensor2(this.game, 2370, 368, 2370, "", 3, this.shipLayer, this.sensors2);
            this.blasts = this.game.add.group();
            for (var i = 0; i < 32; i++) {
                this.blasts.add(new TSAGame.Blast(this.game, 0, 0, this.shipLayer), true);
            }
            this.retry = this.game.add.button(750, 12, "retry");
            this.retry.fixedToCamera = true;
            this.retry.onInputDown.add(this.restart, this);
            this.setOff = false;
            this.prevSetoff = false;
            this.selfDstr = this.game.add.sprite(2816, 56, "?button");
            this.game.physics.arcade.enable(this.selfDstr);
            this.selfDstr.body.immovable = true;
            this.level1end = this.game.add.sprite(3136, 300, "levelEnd");
            this.game.physics.arcade.enable(this.level1end);
            this.level1end.body.collideWorldBounds = true;
            this.level1end.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level1end.animations.play("turn");
            this.level1end.body.gravity.y = 60;
            this.map.setCollision([1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
            this.playerLine = new Phaser.Line(this.player.left + 11 * this.player.scale.x, this.player.body.top, this.player.right - 11 * this.player.scale.x, this.player.body.bottom);
            this.bgMusic = this.game.add.audio("1", 1, true);
            this.bgMusic.play();
            this.siren = this.game.add.audio("alarm", .5, false);
            this.cryopod = this.game.add.sprite(3144, 160, "cryopod");
            this.game.physics.arcade.enable(this.cryopod);
            this.cryopod.body.collideWorldBounds = true;
            this.cryopod.body.gravity.y = 60;
            this.cryopod.body.immovable = true;
            this.cryopod.animations.add("jayant", [1, 2, 3, 4, 5, 6, 7], 12);
            this.talky1 = new TSAGame.DialogueBoxCasual(this.game);
            this.talky2 = new TSAGame.DialogueBoxUrgent(this.game);
            this.talky2.talk("That's odd... The other crew members are \nmissing, and so are their cryopods.\n[Dont Press [z] to continue]lle ", "ehead", "Ethan", 1);
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
            this.player.layer = this.shipLayer;
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
            this.game.physics.arcade.collide(this.alien2, this.shipLayer);
            this.game.physics.arcade.collide(this.level1end, this.shipLayer);
            this.game.physics.arcade.collide(this.player, this.alien2, this.alerted);
            this.game.physics.arcade.collide(this.player, this.elevators, this.stopit);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            this.game.physics.arcade.overlap(this.blasts, this.player, this.harm);
            this.resume.alpha = 0;
            this.reset.alpha = 0;
            this.instructions.alpha = 0;
            var droneCaught = this.drones.getAll("seesing", true).length > 0;
            var alienCaught = this.alien2.caught;
            var sensor2Caught = this.sensors2.getAll("seesing", true).length > 0;
            if (this.Obots.getAll("seesing", true).length > 0 || droneCaught || this.sensors.getAll("seesing", true).length > 0 || alienCaught || sensor2Caught) {
                this.setOff = true;
                console.log("alarms were set off right now");
                this.cannons.setAll("Awaken", true);
                TSAGame.alarmsOn = true;
            }
            if (this.setOff && this.setoff1) {
                this.talky1.talk("I should definitely avoid those lasers!", "ehead", "Ethan", 2);
                this.setoff1 = false;
            }
            if (this.alien2.spawned || !this.alien2.alive) {
                this.level1end.alpha = 1;
                if (this.game.physics.arcade.collide(this.alien2, this.level1end)) {
                    this.talky2.talk("Well, that was easy. ", "ehead", "Ethan", 0);
                    this.alien2.kill();
                }
                if (this.game.physics.arcade.collide(this.player, this.level1end)) {
                    if (this.cryopod.frame == 7 && !this.shake) {
                        console.log("congratulations, you beat level1");
                        this.bgMusic.stop();
                        if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                            localStorage.setItem("clearedLevel", "1");
                        }
                        this.game.state.start("level2");
                    }
                    else if (this.shake) {
                        this.talky2.talk("It would be a good idea to press the \nself destruct button to cancel the self \ndestruct sequence. ", "ehead", "Ethan", 666);
                        this.player.x -= 5;
                    }
                    else {
                        this.talky2.talk("I should find out who is in the cryopod \nbefore going through the teleporter.", "ehead", "Ethan", 0);
                        this.player.x -= 5;
                    }
                }
            }
            else {
                this.level1end.alpha = 0;
            }
            if (this.order == 0) {
                if (this.player.x < 432 && this.player.y > 224) {
                    this.order = 1;
                    this.talky2.talk("That's a strange looking robot. Who \nwould design it that way?", "ehead", "Ethan", 2);
                }
            }
            else if (this.order == 1) {
                if (this.player.x < 164 && this.player.y > 384) {
                    this.order += 1;
                    this.talky2.talk("Hey, that’s one of our drones! It is \nclearly behaving strangely, so I should \nprobably avoid that laser as well.", "ehead", "Ethan", 69);
                }
            }
            else if (this.order == 2) {
                if (this.player.x >= 841) {
                    if (this.player.y > 290 && !this.talk1) {
                        this.talk1 = true;
                        this.talky2.talk("I definitely can't get across the gap \nthis way. I should use the elevator to \nget up to that ledge.", "ehead", "Ethan", 0);
                    }
                    else if (this.player.y <= 290) {
                        this.talky2.talk("I can't jump that high, so I'll have to \ngrab onto that ledge by jumping and \nholding [SHIFT].", "ehead", "Ethan", 0);
                        this.order += 1;
                    }
                }
            }
            else if (this.order == 3) {
                if (this.player.x > 900 && this.player.y < 320) {
                    this.order += 1;
                    this.talky2.talk("Hmmm… I definitely cannot make that jump.", "ehead", "Ethan", 3);
                }
            }
            else if (this.order == 4) {
                if (this.player.x > 2772) {
                    this.order += 1;
                    this.talky2.talk("Hey, I think I see another cryopod!", "ehead", "Ethan", 4);
                }
            }
            else if (this.order == 5) {
                this.order += 1;
            }
            else if (this.order == 6) {
                if (this.player.x > 2954) {
                    this.order += 1;
                    this.talky2.talk("I need to get this alien out of the ship \nbefore doing anything else. I don't know \nwhat could happen if I don't", "ehead", "Ethan", 0);
                }
            }
            else if (this.order == 7) {
                if (this.player.x > 3120 && this.player.y <= 194) {
                    if (this.alien2.alive) {
                        this.talky2.talk("I should probably find a way to get rid \nof the alien before opening the cryopod.", "ehead", "Ethan", 7);
                        this.player.x -= 8;
                    }
                    else if (this.shake) {
                        this.talky2.talk("I should turn off the self-destruct \nsequence first.", "ehead", "Ethan", 0);
                        this.player.x -= 8;
                    }
                    else {
                        this.order += 1;
                        this.talky2.talk("I wonder who is in this cryopod. It must \nbe either Janet, William, or Capt. James", "ehead", "Ethan", 0);
                    }
                }
            }
            else if (this.order == 8) {
                if (this.cryopod.frame == 7) {
                    this.order += 1;
                    this.talky2.talk("Whoah, we finally woke up. Wait... this \nisn't where we were―and Ethan, why are \nyou already awake?", "jhead", "Janet", 8);
                }
            }
            if (this.shake && this.alien2.x == 3040) {
                this.alien2.x += 1;
                this.talky2.talk("HELP! This is Agent Boril Reporting to \nbase. The self-destruct sequence in the \nship has been activated! What do I do?!", "sciHead", "Boril", 9);
            }
            if (this.talky2.finish > 0) {
                this.diamologue();
            }
            if (this.drones.getAll("trampoline", true).length > 0)
                this.player.flinch = true;
            else
                this.player.flinch = false;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !this.player.lGrab && this.player.energy > 25 && !TSAGame.urgent && this.player.body.velocity.y > 10) {
                if (this.player.scale.x == 1) {
                    var Dronze = this.drones.getAll("grabLeft", true);
                    if (Dronze.length > 0 && Dronze[0].body.velocity.x > 0)
                        this.player.drone = Dronze[0];
                }
                else {
                    var Dronze = this.drones.getAll("grabRight", true);
                    if (Dronze.length > 0 && Dronze[0].body.velocity.x < 0) {
                        console.log("right");
                        this.player.drone = Dronze[0];
                    }
                }
            }
            if (this.prevSetoff == false && this.setOff == true) {
                this.siren.play();
                console.log("78945614");
                this.alarm.callAllExists("setOff", true);
                this.tintI.alpha = 0.1;
                this.timer = this.game.time.create(true);
                TSAGame.alarmsOn = true;
                this.timer.add(16000, function pancake() {
                    this.tintI.alpha = 0;
                    this.setOff = false;
                    this.prevSetoff = false;
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
            this.energyBar.scale.x = this.player.energy * .0625;
            if (!this.sheildbefore && this.player.shield) {
                this.sheildbefore = true;
                this.talky1.talk("My shield still works! Thats good to know!", "ehead", "Ethan", 2);
            }
            if (!this.invisifore && this.player.invis) {
                this.invisifore = true;
                this.talky1.talk("My invisbility still works! That should \nhelp!.", "ehead", "Ethan", 2);
            }
            if (this.game.physics.arcade.collide(this.player, this.selfDstr)) {
                if (this.sfdestrt) {
                    this.talky2.talk("I'm not sure I should mess with the self \ndestruct button. I know I can cancel it, \nbut it's scary when the ship shakes.", "ehead", "Ethan", 0);
                    this.sfdestrt = false;
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
                    if (!this.lastZdown) {
                        this.game.time.events.add(Phaser.Timer.SECOND * 60, function () { if (this.shake) {
                            this.player.health = this.player.health;
                        } }, this);
                        this.shake = !this.shake;
                    }
                }
            }
            if (this.shake) {
                this.setOff = true;
                this.game.camera.shake(0.0025, 50);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.J)) {
                this.game.camera.shake(0.002, 5000);
            }
            this.sensors.setAll("drones", this.drones);
            this.sensors.setAll("pl", this.playerLine);
            this.sensors.setAll("blasts", this.blasts);
            this.sensors2.setAll("drones", this.drones);
            this.sensors2.setAll("pl", this.playerLine);
            this.sensors2.setAll("blasts", this.blasts);
            this.cannons.setAll("player", this.player);
            this.cannons.setAll("blasts", this.blasts);
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
                if (!this.player.crouch)
                    this.playerLine.setTo(this.player.left + 11 * this.player.scale.x, this.player.body.top, this.player.right - 11 * this.player.scale.x, this.player.body.bottom);
                else
                    this.playerLine.setTo(this.player.left + 11 * this.player.scale.x, this.player.body.top, this.player.right - 11 * this.player.scale.x, this.player.body.top + 31);
            }
            else {
                this.playerLine.setTo(0.0, 0, 0, 0);
            }
            this.prevSetoff = this.setOff;
            this.drones.callAllExists("updateLine", true, this.playerLine);
            this.Obots.callAllExists("updateLine", true, this.playerLine);
            this.lastZdown = this.game.input.keyboard.isDown(Phaser.Keyboard.Z);
        };
        Level1.prototype.pauseUpdate = function () {
            this.instructions.alpha = 1;
            TSAGame.pauseU(this, this.resume, this.reset);
        };
        Level1.prototype.pauseGame = function () {
            this.reset.alpha = 0;
            this.game.paused = true;
        };
        Level1.prototype.alerted = function (player, Alien) {
            Alien.triggered();
        };
        Level1.prototype.stopit = function (player, elevator) {
            if (player.body.touching.up && elevator.moving)
                elevator.spriteStuck = true;
        };
        Level1.prototype.restart = function () {
            this.game.sound.stopAll();
            this.game.state.start("level1");
        };
        Level1.prototype.callBack = function (ethan, button) {
            button.health = 69;
        };
        Level1.prototype.harm = function (player, blast) {
            if (!player.shield) {
                if (blast.key != "lightning bolt") {
                    player.health -= 50;
                }
                else
                    player.zapped = 1;
            }
            blast.kill();
        };
        Level1.prototype.diamologue = function () {
            switch (this.talky2.finish) {
                case 69:
                    this.talky2.talk("I know I won't be able to disable this \none with [z].", "ehead", "Ethan", 0);
                    break;
                case 1:
                    this.talky2.talk("Perhaps I should go farther and \ninvestigate.", "ehead", "Ethan", 0);
                    break;
                case 2:
                    this.talky2.talk("I think it's wise to avoid its laser. \nMaybe I can get behind and disable the \nrobot with [z] to avoid it.", "ehead", "Ethan", 0);
                    break;
                case 3:
                    this.talky2.talk("Perhaps I can try grabbing the drone \nwith [SHIFT] to ride it to where I need \nto go.", "ehead", "Ethan", 0);
                    break;
                case 4:
                    this.talky2.talk("It looks like some sort of alien \ncreature is guarding it.", "ehead", "Ethan", 5);
                    break;
                case 5:
                    this.talky2.talk("Could that thing be responsible for \nall of this?", "ehead", "Ethan", 0);
                    break;
                case 6:
                    this.talky2.talk("SHUT UP!!! 凸(`д´)凸 IT'S ARROGANT PEOPLE \nLIKE YOU THAT ARE THE REASON I NEED \nCOUNSELING!!!", "sciHead", "Boril", 0);
                    break;
                case 7:
                    this.talky2.talk("He doesn't look like he's ever been in\ncombat. I bet he is easily scared.", "ehead", "Ethan", 0);
                    break;
                case 8:
                    this.talky2.talk("Well, it's a strange story. I woke up by\nmyself only to find a security system \nthat was set up in by a bunch of aliens.", "ehead", "Ethan", 13);
                    break;
                case 9:
                    this.talky2.talk("Ugh. You're so incompetent, Boril! I \nspecifically told you not to press any\nbuttons if you dont know what they do!", "?hed", " ??? ", 10);
                    break;
                case 10:
                    this.talky2.talk("General Zelek, I swear, it was that last\nhuman that we left. I told you we \nshould've taken it like the others.", "sciHead", "Boril", 11);
                    break;
                case 11:
                    this.talky2.talk("Just use your teleporter and leave. I \nmade sure we didn't put anything \nimportant on that ship, anyway.", "?hed", "Zelek", 12);
                    break;
                case 12:
                    this.alien2.leave1();
                    break;
                case 13:
                    this.talky2.talk("So I kept exploring the ship and found \nyour cryopod here. There was an alien\nthat I managed to scare off.", "ehead", "Ethan", 14);
                    break;
                case 14:
                    this.talky2.talk("Hmm. Strange.", "jhead", "Janet", 144);
                    break;
                case 144:
                    this.talky2.talk("What do we do now?", "jhead", "Janet", 15);
                    break;
                case 15:
                    this.talky2.talk("The alien brought a teleporter, which is \nhow it left. I think I'll go through it \nand possibly find the others.", "ehead", "Ethan", 16);
                    break;
                case 16:
                    this.talky2.talk("You can stay and try to find out more \nabout what is going on.", "ehead", "Ethan", 0);
                    break;
                case 666:
                    this.talky2.talk("I need to turn off the self destruct \nsequence. This might be our only way \nback.", "ehead", "Ethan", 0);
                    break;
                default: break;
            }
            this.talky2.finish = 0;
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
            TSAGame.levelOn = 2;
            if (parseInt(localStorage.getItem("clearedLevel")) < 1) {
                localStorage.setItem("clearedLevel", "1");
            }
            TSAGame.setUp(this, "lvl2");
            this.factoryBg = this.game.add.image(0, 0, "factoryBG");
            this.factoryBg.visible = false;
            this.player = new TSAGame.Player(this.game, 69, 160);
            this.game.camera.follow(this.player);
            this.setOff = false;
            this.prevSetoff = false;
            this.alarm = this.game.add.group();
            this.order = 0;
            var alarm = new TSAGame.Alarm(this.game, 384, 160, "siren2", this.alarm, 0);
            var alarm2 = new TSAGame.Alarm(this.game, 448, 160, "siren2", this.alarm, 0);
            this.warntalk = true;
            this.almostDone = false;
            var chain1 = new TSAGame.Chain(this.game, 3051, 32);
            var chain2 = new TSAGame.Chain(this.game, 2922, 32);
            var chain3 = new TSAGame.Chain(this.game, 3179, 32);
            this.inFacility = false;
            this.map = this.add.tilemap("map2");
            this.map.addTilesetImage("Ship2 Tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 3");
            this.map.setCollision([1, 2, 3, 4, 7, 8, 9, 10, 13, 14, 15, 16, 19, 20, 21, 22, 25, 26, 27, 28]);
            this.player.layer = this.shipLayer;
            this.map2 = this.add.tilemap("facility");
            this.map2.addTilesetImage("Ship2 Tileset");
            this.otherLayer = this.map2.createLayer("Tile Layer 1");
            this.map2.setCollision([1, 2, 3, 4, 7, 8, 9, 10, 13, 14, 15, 16, 19, 20, 21, 22, 25, 26, 27, 28]);
            this.door = this.game.add.sprite(3680, 480, "door");
            this.game.physics.arcade.enable(this.door);
            this.door.animations.add("open", [0, 1, 2, 3, 4, 5, 6, 7], 10);
            this.door.body.immovable = true;
            this.door1 = this.game.add.sprite(3936, 288, "door");
            this.game.physics.arcade.enable(this.door1);
            this.door1.animations.add("open", [0, 1, 2, 3, 4, 5, 6, 7], 10);
            this.door1.body.immovable = true;
            this.playerLine = new Phaser.Line(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            this.level2End = this.game.add.sprite(3624, 480, "levelEnd");
            this.game.physics.arcade.enable(this.level2End);
            this.level2End.body.collideWorldBounds = true;
            this.level2End.animations.add("turn", [0, 1, 2, 3, 4], 13, true);
            this.level2End.animations.play("turn");
            this.level2End.body.immovable = true;
            this.level2End.body.gravity.y = 60;
            this.cryopod = this.game.add.sprite(3911, 128, "cryopod");
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
            this.elevators = this.game.add.group();
            var elevator = new TSAGame.Elevator(this.game, 160, 256, 480, this.elevators, 1, "alienElevator");
            var elevator2 = new TSAGame.Elevator(this.game, 1312, 480, 320, this.elevators, 1, "alienElevator");
            var elevator3 = new TSAGame.Elevator(this.game, 1952, 234, 110, this.elevators, 1, "alienElevator");
            var elevator4 = new TSAGame.Elevator(this.game, 2624, 493, 224, this.elevators, 1, "alienElevator");
            var elevator5 = new TSAGame.Elevator(this.game, 2816, 366, 492, this.elevators, -1, "alienElevator");
            var elevator6 = new TSAGame.Elevator(this.game, 2016, 480, 288, this.elevators, 1, "alienElevator");
            var elevator7 = new TSAGame.Elevator(this.game, 3685, 288, 160, this.elevators, -1, "alienElevator");
            this.scientists = this.game.add.group();
            this.boril = new TSAGame.Alien2(this.game, 3808, 100, this.shipLayer, this.scientists);
            this.Aldis = new TSAGame.Alien2(this.game, 3856, 100, this.shipLayer, this.scientists);
            this.drones = this.game.add.group();
            var drone2 = new TSAGame.Drone(this.game, 1056, 143, 1248, this.drones, this.shipLayer);
            var drone3 = new TSAGame.Drone(this.game, 832, 288, 928, this.drones, this.shipLayer);
            var drone4 = new TSAGame.Drone(this.game, 1120, 288, 1024, this.drones, this.shipLayer);
            var drone5 = new TSAGame.Drone(this.game, 1120, 440, 992, this.drones, this.shipLayer);
            var drone6 = new TSAGame.Drone(this.game, 800, 440, 928, this.drones, this.shipLayer);
            var drone7 = new TSAGame.Drone(this.game, 2270, 69, 2660, this.drones, this.shipLayer);
            var drone8 = new TSAGame.Drone(this.game, 3398, 256, 3710, this.drones, this.shipLayer);
            this.drones.setAll("body.immovable", true);
            this.tbots = this.game.add.group();
            var tbot = new TSAGame.TBot(this.game, 352, 384, 512, this.shipLayer, this.tbots, this.player);
            var tbot2 = new TSAGame.TBot(this.game, 2944, 160, 3136, this.shipLayer, this.tbots, this.player);
            this.energyBar = new TSAGame.EnergyBar(this.game);
            this.healthBar = new TSAGame.HealthBar(this.game);
            this.Obots = this.game.add.group();
            this.retry = this.game.add.button(750, 12, "retry");
            this.retry.fixedToCamera = true;
            this.retry.onInputDown.add(this.restart, this);
            this.sensors = this.game.add.group();
            var sensor = new TSAGame.Sensor(this.game, 1852, 384, 1910, "", 3, this.shipLayer, this.sensors);
            var sensor2 = new TSAGame.Sensor(this.game, 1376, 128, 160, "", 0, this.shipLayer, this.sensors);
            var sensor3 = new TSAGame.Sensor(this.game, 2592, 352, 448, "", 0, this.shipLayer, this.sensors);
            var sensor4 = new TSAGame.Sensor(this.game, 2144, 352, 448, "", 2, this.shipLayer, this.sensors);
            var sensor5 = new TSAGame.Sensor(this.game, 3264, 32, 157, "", 0, this.shipLayer, this.sensors);
            this.sensors2 = this.game.add.group();
            var hSensor = new TSAGame.Sensor2(this.game, 1824, 448, 1824, "", 3, this.shipLayer, this.sensors2);
            var hSensor2 = new TSAGame.Sensor2(this.game, 1984, 448, 1984, "", 3, this.shipLayer, this.sensors2);
            this.cannons = this.game.add.group();
            var c1 = new TSAGame.Cannon(this.game, 496, 172, 2, this.shipLayer, this.cannons);
            var c2 = new TSAGame.Cannon(this.game, 173, 396, 1, this.shipLayer, this.cannons);
            var c3 = new TSAGame.Cannon(this.game, 781, 416, 1, this.shipLayer, this.cannons);
            var c4 = new TSAGame.Cannon(this.game, 1328, 140, 2, this.shipLayer, this.cannons);
            var c5 = new TSAGame.Cannon(this.game, 1644, 460, 1, this.shipLayer, this.cannons);
            var c6 = new TSAGame.Cannon(this.game, 1740, 108, 1, this.shipLayer, this.cannons);
            var c7 = new TSAGame.Cannon(this.game, 2224, 268, 2, this.shipLayer, this.cannons);
            var c8 = new TSAGame.Cannon(this.game, 2580, 384, 3, this.shipLayer, this.cannons);
            var c9 = new TSAGame.Cannon(this.game, 2580, 288, 3, this.shipLayer, this.cannons);
            var c10 = new TSAGame.Cannon(this.game, 2764, 352, 1, this.shipLayer, this.cannons);
            var c11 = new TSAGame.Cannon(this.game, 3308, 160, 1, this.shipLayer, this.cannons);
            var c12 = new TSAGame.Cannon(this.game, 3840, 76, 2, this.shipLayer, this.cannons);
            this.blasts = this.game.add.group();
            for (var i = 0; i < 32; i++) {
                this.blasts.add(new TSAGame.Blast(this.game, 0, 0, this.shipLayer), true);
            }
            this.aliens = this.game.add.group();
            var alien = new TSAGame.Alien(this.game, 410, 256, 512, this.shipLayer, this.aliens);
            var alien2 = new TSAGame.Alien(this.game, 1799, 224, 2000, this.shipLayer, this.aliens, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            var alien3 = new TSAGame.Alien(this.game, 2846, 320, 3136, this.shipLayer, this.aliens, [12]);
            this.talky1 = new TSAGame.DialogueBoxCasual(this.game);
            this.talky2 = new TSAGame.DialogueBoxUrgent(this.game);
            this.talky2.talk("Wow. This is quite different.jk it ", "ehead", "Ethan", 1);
            this.button1 = new TSAGame.Invis(this.game);
            this.button2 = new TSAGame.Shield(this.game);
            this.bgMusic = this.game.add.audio("second", 0.6, true);
            this.bgMusic.play();
            this.siren = this.game.add.audio("alarm", .5, false);
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
            this.game.physics.arcade.collide(this.player, this.elevators, this.stopit);
            this.game.physics.arcade.collide(this.player, this.drones);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.elevators);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            this.game.physics.arcade.collide(this.scientists, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.player, this.alerted);
            this.game.physics.arcade.collide(this.shipLayer, this.level2End);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            var awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.overlap(this.blasts, this.player, this.harm);
            this.game.physics.arcade.collide(this.player, this.otherLayer);
            if (this.inFacility) {
                this.game.physics.arcade.collide(this.player, this.otherLayer);
                this.game.physics.arcade.collide(this.aliens, this.otherLayer);
                this.game.physics.arcade.collide(this.scientists, this.otherLayer);
                if (this.boril.alive) {
                    if (this.Aldis.x > 4352 && this.Aldis.body.velocity.x != 0) {
                        this.Aldis.body.velocity.x = 0;
                        this.Aldis.animations.stop();
                        this.Aldis.frame = 0;
                        this.boril.x = 4220;
                        this.boril.y = 448;
                        this.boril.animations.play("move");
                        this.boril.body.velocity.x = 135;
                    }
                    if (this.boril.x > 4320 && this.boril.body.velocity.x > 0) {
                        this.boril.body.velocity.x = 0;
                        this.boril.animations.stop();
                        this.boril.frame = 0;
                        this.talky2.talk("Thats weird. The whole thing got shut off.", "sciHead", "Aldis", 22);
                    }
                    if (this.boril.body.velocity.x < -10 && this.boril.x <= 4270) {
                        this.boril.kill();
                        this.order = 69;
                    }
                }
                else {
                    if (this.order == 69) {
                        this.order += 1;
                        this.talky2.talk("Well that didn't do much. I got the \naliens to come in here but one already \nwent back.", "ehead", "Ethan", 26);
                    }
                    if (this.game.physics.arcade.collide(this.player, this.comp2) && this.Aldis.x < 4200) {
                        this.talky2.talk("All right I'm entering the username \nand password you gave me.", "ehead", "Ethan", 30);
                    }
                }
                if (this.game.physics.arcade.collide(this.player, this.comp1) && this.Aldis.x < 4200) {
                    this.talky2.talk("Well there is the off switch. I just \nhave to press it...", "ehead", "Ethan", 9000);
                }
                if (this.player.bottom < 64) {
                    this.goodbye();
                }
            }
            if (this.almostDone) {
                this.door1.frame = 7;
                this.level2End.alpha = 1;
                if (awake && this.cryopod.frame == 0)
                    this.cryopod.animations.play("will");
                console.log("frame: " + this.cryopod.frame + " order: " + this.order);
                if (this.cryopod.frame == 12) {
                    if (this.order == 70) {
                        this.talky2.talk("What the- this looks nothing like our \nship, or where we put our cryopods.", "whead", "Will", 40);
                        this.order += 1;
                    }
                }
                if (this.game.physics.arcade.collide(this.player, this.level2End)) {
                    if (this.order == 71) {
                        this.bgMusic.stop();
                        if (parseInt(localStorage.getItem("clearedLevel")) < 2) {
                            localStorage.setItem("clearedLevel", "2");
                        }
                        this.game.state.start("level3");
                    }
                    else {
                        this.talky1.talk("I should rescue Will first.", "ehead", "Ethan", 3);
                    }
                }
            }
            else {
                this.level2End.alpha = 0;
            }
            this.reset.alpha = 1;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
                this.player.x += 10;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.facility();
            }
            this.resume.alpha = 0;
            if (this.cryopod.frame == 12) {
                this.game.add.sprite(200, 30, "wull");
            }
            else {
            }
            if (this.order == 0) {
                if (this.player.x > 690) {
                    this.order += 1;
                    this.talky2.talk("Hey, I found something interesting.", "jhead", "Janet", 4);
                }
            }
            else if (this.order == 1) {
                if (this.player.x > 1472) {
                    this.order += 1;
                    this.talky2.talk("Got anything else on our other crew \nmembers yet?", "ehead", "Ethan", 9);
                }
            }
            else if (this.order == 2) {
                if (this.player.x >= 2208) {
                    this.order += 1;
                    this.talky2.talk("Wow thats a big gap. I can see a way over \nthis is but falling through looks \nincredibly dangerous...", "ehead", "Ethan", 0);
                }
            }
            else if (this.order == 3) {
                if (this.player.x >= 2688) {
                    this.order += 1;
                    this.talky2.talk("Wow, it looks like they are using the \ntoraxite crystals for lamps. Thats pretty \nfancy.", "ehead", "Ethan", 17);
                }
            }
            else if (this.order == 4) {
                if (this.player.x >= 3296) {
                    this.order += 1;
                    this.talky1.talk("I'm near the end of the ship, I should see will soon.", "ehead", "Ethan", 2);
                }
            }
            else if (this.order == 5) {
                if (this.player.x >= 3744 && this.player.y < 224) {
                    this.order += 1;
                    this.talky2.talk("Well Janet, I see Will’s cryopod. \nUnfortunately it is being guarded by two\n Toraxians. ", "ehead", "Ethan", 18);
                }
            }
            this.diamologue();
            this.reset.alpha = 0;
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
            if (this.drones.getAll("trampoline", true).length > 0)
                this.player.flinch = true;
            else
                this.player.flinch = false;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !this.player.lGrab && this.player.energy > 25 && !TSAGame.urgent && this.player.body.velocity.y > 10) {
                if (this.player.scale.x == 1) {
                    console.log("whyya");
                    var Dronze = this.drones.getAll("grabLeft", true);
                    if (Dronze.length > 0 && Dronze[0].body.velocity.x > 0)
                        this.player.drone = Dronze[0];
                }
                else {
                    var Dronze = this.drones.getAll("grabRight", true);
                    if (Dronze.length > 0 && Dronze[0].body.velocity.x < 0) {
                        this.player.drone = Dronze[0];
                    }
                }
            }
            if (this.game.physics.arcade.collide(this.player, this.door)) {
                if (this.door.frame == 7) {
                    this.facility();
                }
                else {
                    this.talky2.talk("Please enter password.", "no", "-----", 404);
                }
            }
            var alAlert = this.aliens.getAll("isTriggered", true).length > 0;
            var alDrone = this.drones.getAll("seesing", true).length > 0;
            var alObot = this.Obots.getAll("seesing", true).length > 0;
            var alSense = this.sensors.getAll("seesing", true).length > 0;
            if (this.tbots.getAll("seesing", true).length > 0 || alAlert || alDrone || alObot || alSense) {
                this.setOff = true;
                TSAGame.alarmsOn = true;
                this.cannons.setAll("Awaken", true);
            }
            if (this.prevSetoff == false && this.setOff == true) {
                this.siren.play();
                this.alarm.callAllExists("setOff", true);
                this.tintI.alpha = 0.1;
                if (this.warntalk) {
                    this.talky1.talk("I've been detected!", "ehead", "Ethan", 2);
                    this.game.time.events.add(Phaser.Timer.SECOND * 2.25, function () { this.talky1.talk("Be careful!", "jhead", "Janet", 2); }, this);
                    this.warntalk = false;
                }
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
            this.cannons.setAll("player", this.player);
            this.cannons.setAll("blasts", this.blasts);
            this.Obots.setAll("blasts", this.blasts);
            this.tbots.setAll("blasts", this.blasts);
            this.aliens.setAll("blasts", this.blasts);
            this.aliens.setAll("elevators", this.elevators);
            this.prevSetoff = this.setOff;
            this.instructions.alpha = 0;
            this.player.shield = this.button2.shield;
            this.player.invis = this.button1.invis;
            this.healthBar.scale.x = this.player.health * .125;
            this.energyBar.scale.x = this.player.energy * .0625;
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
                if (blast.key != "lightning bolt")
                    player.health -= 50;
                else
                    player.zapped = 1;
            }
            blast.kill();
        };
        Level2.prototype.stopit = function (player, elevator) {
            if (player.body.touching.up && elevator.moving)
                elevator.spriteStuck = true;
        };
        Level2.prototype.restart = function () {
            this.game.sound.stopAll();
            this.game.state.start("level2");
        };
        Level2.prototype.facility = function () {
            this.game.world.resize(4992, 600);
            this.game.camera.unfollow();
            this.game.camera.x = 4992;
            this.player.x = 4280;
            this.player.y = 420;
            this.inFacility = true;
            this.player.layer = this.otherLayer;
            TSAGame.alarmsOn = false;
            this.factoryBg.visible = true;
            this.factoryBg.x = 4200;
            this.aliens.removeAll(true);
            this.cannons.removeAll(true);
            var alien01 = new TSAGame.Alien(this.game, 4822, 320, 4932, this.otherLayer, this.aliens);
            this.comp1 = this.game.add.sprite(4224, 88, "?button");
            this.game.physics.arcade.enable(this.comp1);
            this.comp1.body.immovable = true;
            this.comp2 = this.game.add.sprite(4928, 534, "?button");
            this.game.physics.arcade.enable(this.comp2);
            this.comp2.body.immovable = true;
            this.comp2.scale.x = -1;
            this.duckBot = this.game.add.group();
            var duck1 = this.game.add.sprite(4448, 328, "duckbot");
            var elevator = new TSAGame.Elevator(this.game, 4896, 64, 0, this.elevators, 1, "alienElevator");
            this.talky2.talk("So I guess I should just turn it all off. \nHopefully that will work without harming \nme.", "ehead", "Ethan", 0);
        };
        Level2.prototype.shutDown = function () {
            this.Aldis.x = 4220;
            this.Aldis.y = 448;
            this.Aldis.animations.play("move");
            this.Aldis.body.velocity.x = 135;
        };
        Level2.prototype.goodbye = function () {
            this.game.world.resize(4000, 600);
            this.scientists.removeAll(true);
            this.drones.callAllExists("removedd", true, this.playerLine);
            this.almostDone = true;
            this.player.x = 3932;
            this.player.y = 300;
            this.player.layer = this.shipLayer;
        };
        Level2.prototype.diamologue = function () {
            switch (this.talky2.finish) {
                case 1:
                    this.talky2.talk("Ooh, what does it look like? Are there a \nlot of aliens?", "jhead", "Janet", 2);
                    break;
                case 2:
                    this.talky2.talk("Well, the entire thing is pretty much red \nand black, even the glass! It certainly \nis an interesting choice of decoration.", "ehead", "Ethan", 21);
                    break;
                case 21:
                    this.talky2.talk("Fortunately, I don't see too many aliens.", "ehead", "Ethan", 3);
                    break;
                case 3:
                    this.talky2.talk("Well, I found a computer that was left \nbehind. I'm going to look at it and see \nwhat I can find out. ", "jhead", "Janet", 0);
                    break;
                case 4:
                    this.talky2.talk("Cool, what is it? ", "ehead", "Ethan", 5);
                    break;
                case 5:
                    this.talky2.talk("From what I can gather, they spotted the \nNova 90 near one of their own ships. ", "jhead", "Janet", 6);
                    break;
                case 6:
                    this.talky2.talk("They wanted to find out what it was doing\nthere, so they sent out their cheapest \nrobots, nicknamed the \"obots\".", "jhead", "Janet", 7);
                    break;
                case 7:
                    this.talky2.talk("Those must be those funny-looking robots \nthat I found when I woke up.", "ehead", "Ethan", 71);
                    break;
                case 71:
                    this.talky2.talk("Have you found anything about William or \nCaptain James yet?", "ehead", "Ethan", 8);
                    break;
                case 8:
                    this.talky2.talk("Not yet. You should keep exploring.", "jhead", "Janet", 0);
                    break;
                case 9:
                    this.talky2.talk("Actually, yes, a couple aliens found our \ncryopods after searching for a while.", "jhead", "Janet", 10);
                    break;
                case 10:
                    this.talky2.talk("They used these devices to scan our minds\nand see if we knew anything useful to \nthem.", "jhead", "Janet", 11);
                    break;
                case 11:
                    this.talky2.talk("This says “Human 1, who appears to be \ntheir leader, has highly critical intel. \nWe should take it to the base.”", "jhead", "Janet", 12);
                    break;
                case 12:
                    this.talky2.talk("Then it says, “Human 2 has some info we \nneed. Let's send it to our closest ship \nfor experimentation.” ", "jhead", "Janet", 13);
                    break;
                case 13:
                    this.talky2.talk("And “Human 3 could be useful to our goal. \nBoril, why dont you take it somewhere \nelse on the ship to experiment.”", "jhead", "Janet", 14);
                    break;
                case 14:
                    this.talky2.talk("And finally, “Human 4 does not seem to \nhave anything useful for us. We might as \nwell just leave it here.”", "jhead", "Janet", 15);
                    break;
                case 15:
                    this.talky2.talk("So William should be somewhere in this \nship, right?", "ehead", "Ethan", 16);
                    break;
                case 16:
                    this.talky2.talk("Hopefully.", "jhead", "Janet", 0);
                    break;
                case 17:
                    this.talky2.talk("It seems like they use those crystals a lot.", "jhead", "Janet", 0);
                    break;
                case 18:
                    this.talky2.talk("Ugh, this is so boring. All we are doing \nis just standing here waiting for the \nmachine to find new info from this human", "sciHead", " ??? ", 19);
                    break;
                case 19:
                    this.talky2.talk("You know Aldis, it is better than being \nall alone on a ship, stuck with an alien \nwho hates you.", "sciHead", "Boril ", 20);
                    break;
                case 20:
                    this.talky2.talk("Honestly I would be happier if human \nruined the drone facility we have below. \nAt least then I could do something.", "sciHead", "Aldis", 420);
                    break;
                case 420:
                    this.talky2.talk("Hey I think I know how I can get rid of \nthese guys. I just need to find a drone \nfacility below.", "ehead", "Ethan", 0);
                    break;
                case 22:
                    this.talky2.talk("I'm telling you that 4th human did it! I \nkept saying we should have taken it.", "sciHead", "Boril", 23);
                    break;
                case 23:
                    this.talky2.talk("Well if it was that human then I will \nfind it.", "sciHead", "Aldis", 24);
                    break;
                case 24:
                    this.talky2.talk("Do whatever you want but I'm leaving.", "sciHead", "Aldis", 25);
                    break;
                case 25:
                    this.boril.body.velocity.x = -80;
                    this.boril.scale.x = -1;
                    this.boril.animations.play("move");
                    break;
                case 26:
                    this.talky2.talk("Are there any other computers? There is \nanother password I can see on this \ncomputer.", "jhead", "Janet", 27);
                    break;
                case 27:
                    this.talky2.talk("The username is: Gen. Zelek and the \npassword is t89u3ogivlk", "jhead", "Janet", 28);
                    break;
                case 28:
                    this.talky2.talk("I think that is the leaders name! I bet I \ncan do a lot if I access that account!!\nJust need to find that computer...", "ehead", "Ethan", 0);
                    break;
                case 30:
                    this.talky2.talk("Oh my I can do so much! This is \nincredible. Now I can definitely get rid \nof that Toraxian!", "ehead", "Ethan", 0);
                    break;
                case 40:
                    this.talky2.talk("Well our cryopods got kidnapped by the \nnative Toraxians here. I just finally \nmanaged to rescue you.", "ehead", "Ethan", 41);
                    break;
                case 41:
                    this.talky2.talk("Where are these Toraxians? Do I need to \nwatch out for them?!", "whead", "Will", 42);
                    break;
                case 42:
                    this.talky2.talk("Actually I just scared them all off this \nship. I am going to go to there base \nto rescue James.", "ehead", "Ethan", 43);
                    break;
                case 43:
                    this.talky2.talk("You basically have this whole ship for \nyourself to explore and find out \nmore on this situation.", "ehead", "Ethan", 44);
                    break;
                case 44:
                    this.talky2.talk("Umm, ok. Are you sure you want to go to \nthe alien base by yourself?", "whead", "Will", 45);
                    break;
                case 45:
                    this.talky2.talk("Well I pretty much have to. But hopefully \nyou can help me from in here.", "ehead", "Ethan", 46);
                    break;
                case 46:
                    this.talky2.talk("If thats what you want, I will stay here. \nGoodluck rescuing James.", "whead", "Will", 0);
                    break;
                case 404:
                    if (this.order != 6) {
                        this.talky2.talk("Well, I don't know any passwords. I guess \nI should move on.", "ehead", "Ethan", 0);
                    }
                    else {
                        this.order++;
                        this.talky2.talk("Any idea on how I can obtain the password?", "ehead", "Ethan", 405);
                    }
                    this.player.x -= 10;
                    break;
                case 405:
                    this.talky2.talk("Let me see if I can find it...             \nAhh here it is:9xWPXTF6gJU6Ftg9", "jhead", "Janet", 406);
                    break;
                case 406:
                    this.talky2.talk("Thanks. \nEntering 9xWPXTF6gJU6Ftg9", "ehead", "Ethan", 407);
                    break;
                case 407:
                    this.talky2.talk("Access granted. You may now enter the \nToraxian Reprogramming Facility.", "no", "-----", 0);
                    this.door.animations.play("open");
                    break;
                case 9000:
                    this.player.x += 10;
                    this.shutDown();
                    break;
                default: break;
            }
            this.talky2.finish = 0;
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
            TSAGame.levelOn = 3;
            TSAGame.setUp(this, "lvl3");
            this.factoryBg = this.game.add.image(0, 0, "factoryBG");
            this.factoryBg.visible = false;
            this.player = new TSAGame.Player(this.game, 128, 0);
            this.game.camera.follow(this.player);
            this.game.world.resize(4800, 600);
            this.playerLine = new Phaser.Line(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            this.map = this.add.tilemap("map3");
            this.map.addTilesetImage("Level 3 tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.map.setCollision([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
            this.healthBar = new TSAGame.HealthBar(this.game);
            this.player.layer = this.shipLayer;
            this.elevators = this.game.add.group();
            var elevator = new TSAGame.Elevator(this.game, 1632, 520, 32, this.elevators, -1, "alienElevator");
            var elevator2 = new TSAGame.Elevator(this.game, 2432, 360, 168, this.elevators, -1, "alienElevator");
            var elevator3 = new TSAGame.Elevator(this.game, 2784, 168, 360, this.elevators, 1, "alienElevator");
            var elevator4 = new TSAGame.Elevator(this.game, 4672, 160, 0, this.elevators, 1, "alienElevator");
            var elevator5 = new TSAGame.Elevator(this.game, 4064, 170, 364, this.elevators, 1, "alienElevator");
            var elevator6 = new TSAGame.Elevator(this.game, 3744, 170, 492, this.elevators, -1, "alienElevator");
            this.alarm = this.game.add.group();
            this.prevSetoff = false;
            this.setOff = false;
            this.Obots = this.game.add.group();
            var obot = new TSAGame.Obot(this.game, 736, 238, 910, this.Obots, this.shipLayer, this.player);
            var obot2 = new TSAGame.Obot(this.game, 1216, 224, 1344, this.Obots, this.shipLayer, this.player);
            var obot3 = new TSAGame.Obot(this.game, 2272, 256, 2316, this.Obots, this.shipLayer, this.player);
            var obot4 = new TSAGame.Obot(this.game, 3872, 448, 4128, this.Obots, this.shipLayer, this.player);
            var obot5 = new TSAGame.Obot(this.game, 3104, 224, 3200, this.Obots, this.shipLayer, this.player);
            var obot6 = new TSAGame.Obot(this.game, 4192, 160, 4352, this.Obots, this.shipLayer, this.player);
            this.aliens = this.game.add.group();
            var alien = new TSAGame.Alien(this.game, 65, 128, 320, this.shipLayer, this.aliens);
            var alien2 = new TSAGame.Alien(this.game, 640, 480, 768, this.shipLayer, this.aliens);
            var alien3 = new TSAGame.Alien(this.game, 800, 480, 864, this.shipLayer, this.aliens);
            var alien4 = new TSAGame.Alien(this.game, 438, 64, 524, this.shipLayer, this.aliens);
            var alien6 = new TSAGame.Alien(this.game, 3860, 320, 3934, this.shipLayer, this.aliens);
            var alien7 = new TSAGame.Alien(this.game, 2456, 128, 2815, this.shipLayer, this.aliens, [3, 6]);
            var alien8 = new TSAGame.Alien(this.game, 2456, 320, 2815, this.shipLayer, this.aliens, [3, 6]);
            var alien9 = new TSAGame.Alien(this.game, 2456, 128, 2815, this.shipLayer, this.aliens, [3, 6]);
            var alien10 = new TSAGame.Alien(this.game, 2456, 320, 2815, this.shipLayer, this.aliens, [3, 6]);
            this.tbots = this.game.add.group();
            var tbot1 = new TSAGame.TBot(this.game, 1332, 128, 1415, this.shipLayer, this.tbots, this.player);
            var tbot2 = new TSAGame.TBot(this.game, 2048, 210, 2144, this.shipLayer, this.tbots, this.player);
            var tbot8 = new TSAGame.TBot(this.game, 4192, 96, 4352, this.shipLayer, this.tbots, this.player);
            var tbot3 = new TSAGame.TBot(this.game, 3220, 400, 3424, this.shipLayer, this.tbots, this.player);
            var tbot4 = new TSAGame.TBot(this.game, 3136, 320, 3328, this.shipLayer, this.tbots, this.player);
            this.sensors = this.game.add.group();
            var sensor = new TSAGame.Sensor(this.game, 1088, 320, 512, "", 2, this.shipLayer, this.sensors);
            this.cannons = this.game.add.group();
            var c1 = new TSAGame.Cannon(this.game, 496, 492, 2, this.shipLayer, this.cannons);
            var c2 = new TSAGame.Cannon(this.game, 1548, 207, 1, this.shipLayer, this.cannons);
            var c3 = new TSAGame.Cannon(this.game, 1620, 428, 3, this.shipLayer, this.cannons);
            this.order = 0;
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
            this.cryopod.visible = false;
            this.blasts = this.game.add.group();
            for (var i = 0; i < 32; i++) {
                this.blasts.add(new TSAGame.Blast(this.game, 0, 0, this.shipLayer), true);
            }
            this.talky1 = new TSAGame.DialogueBoxCasual(this.game);
            this.talky2 = new TSAGame.DialogueBoxUrgent(this.game);
            this.talky2.talk("Wow this is going to be hard.  ))((", "ehead", "Ethan", 0);
            this.button1 = new TSAGame.Invis(this.game);
            this.button2 = new TSAGame.Shield(this.game);
            this.bgMusic = this.game.add.audio("third", 1, true);
            this.bgMusic.play();
            this.pause = this.game.add.button(700, 12, "pauseButton");
            this.pause.fixedToCamera = true;
            this.pause.onInputDown.add(this.pauseGame, this);
            this.pause.scale.x = .5;
            this.pause.scale.y = .5;
            this.retry = this.game.add.button(750, 12, "retry");
            this.retry.fixedToCamera = true;
            this.retry.onInputDown.add(this.restart, this);
            this.energyBar = new TSAGame.EnergyBar(this.game);
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
            this.siren = this.game.add.audio("alarm", .5, false);
            this.tintI = this.game.add.image(0, 0, "Laser");
            this.tintI.alpha = 0;
            this.tintI.scale.x = 100;
            this.tintI.scale.y = 300;
            this.tintI.fixedToCamera = true;
            this.reset.scale.y = 2;
        };
        Level3.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.overlap(this.blasts, this.player, this.harm);
            this.game.physics.arcade.collide(this.aliens, this.player, this.alerted);
            this.game.physics.arcade.collide(this.player, this.elevators, this.stopit);
            this.game.physics.arcade.collide(this.shipLayer, this.level3end);
            this.game.physics.arcade.collide(this.shipLayer, this.cryopod);
            var awake = this.game.physics.arcade.collide(this.player, this.cryopod);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
                this.player.x += 10;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.factory();
            }
            if (this.player.alpha == 1) {
                this.playerLine.setTo(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            }
            else {
                this.playerLine.setTo(0.0, 0, 0, 0);
            }
            if (awake && this.cryopod.frame == 0)
                this.cryopod.animations.play("james");
            var alAlert = this.aliens.getAll("isTriggered", true).length > 0;
            var alObot = this.Obots.getAll("seesing", true).length > 0;
            var alSense = this.sensors.getAll("seesing", true).length > 0;
            if (this.tbots.getAll("seesing", true).length > 0 || alAlert || alObot || alSense) {
                this.setOff = true;
                TSAGame.alarmsOn = true;
                this.cannons.setAll("Awaken", true);
            }
            if (this.prevSetoff == false && this.setOff == true) {
                console.log("QWEQE");
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
            if (this.order == 0) {
                if (this.player.x < 970 && this.player.x > 920 && this.player.y < 320) {
                    this.order += 1;
                    this.talky2.talk("OH YEAH! I just found a giant computer \nthat has a ton of data. I even have a map \nof the entire base that you are on.", "whead", "Will", 1);
                }
            }
            else if (this.order == 1) {
                if (this.player.x > 1376 && this.player.y > 448) {
                    this.order += 1;
                    this.talky2.talk("Hey Will, to me it sounded like the \nToraxians needed some specific info from \nus. Any idea what that is?", "jhead", "Janet", 4);
                }
            }
            else if (this.order == 2) {
                if (this.player.x >= 1888) {
                    this.order += 1;
                    this.talky2.talk("Ethan, it looks like whatever this big \nplan is, you made it a lot harder by \nremoving them from the drone facility.", "ehead", "Ethan", 5);
                }
            }
            else if (this.order == 3) {
                if (this.player.x >= 2880) {
                    this.order += 1;
                    this.talky2.talk("Man the Toraxite is really cool. They \nare using it for almost everything.", "whead", "Will", 10);
                }
            }
            else if (this.order == 4) {
                if (this.player.x >= 3680) {
                    this.order += 1;
                    this.talky2.talk("Your destination is very close Ethan! You can do it.", "whead", "Will", 0);
                }
            }
            else if (this.order == 5) {
                if (this.player.x >= 4544) {
                    this.order += 1;
                    this.talky2.talk("Alright Ethan, You are really close to \nJames. There is just one problem... ", "whead", "Will", 13);
                }
            }
            else if (this.order == 6) {
                if (this.player.x >= 4600 && this.player.y < 60) {
                    this.order += 1;
                    console.log("yeee");
                    this.factory();
                }
            }
            this.diamologue();
            this.resume.alpha = 0;
            this.reset.alpha = 0;
            this.instructions.alpha = 0;
            this.energyBar.scale.x = this.player.energy * .0625;
            if (this.cryopod.frame == 17) {
                this.level3end.alpha = 1;
                var moveOn = this.game.physics.arcade.collide(this.player, this.level3end);
                if (moveOn) {
                    this.bgMusic.stop();
                    console.log("Congratulations, you beat the game u loser. go do something better with ur life");
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
            this.cannons.setAll("player", this.player);
            this.aliens.setAll("elevators", this.elevators);
            this.cannons.setAll("blasts", this.blasts);
            this.tbots.setAll("blasts", this.blasts);
            this.aliens.setAll("blasts", this.blasts);
            this.prevSetoff = this.setOff;
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
        Level3.prototype.stopit = function (player, elevator) {
            if (player.body.touching.up && elevator.moving)
                elevator.spriteStuck = true;
        };
        Level3.prototype.harm = function (player, blast) {
            if (!player.shield) {
                if (blast.key != "lightning bolt")
                    player.health -= 50;
                else
                    player.zapped = 1;
            }
            blast.kill();
        };
        Level3.prototype.factory = function () {
            this.game.world.resize(1600, 600);
            this.player.x = 40;
            this.factoryBg.visible = true;
            this.map.destroy();
            this.shipLayer.destroy();
            this.aliens.removeAll(true);
            this.Obots.removeAll(true);
            this.tbots.removeAll(true);
            this.sensors.removeAll(true);
        };
        Level3.prototype.finalRoom = function () {
        };
        Level3.prototype.diamologue = function () {
            switch (this.talky2.finish) {
                case 1:
                    this.talky2.talk("Do you know where I can find the Captain?", "ehead", "Ethan", 2);
                    break;
                case 2:
                    this.talky2.talk("You should be able to just go straight \nfor a while.", "whead", "Will", 3);
                    break;
                case 3:
                    this.talky2.talk("Ok. ", "ehead", "Ethan", 0);
                    break;
                case 4:
                    this.talky2.talk("It is something about Earth and the \nhuman anatomy. They need it for some kind \nof big plan. I dont know anything else.", "whead", "Will", 0);
                    break;
                case 5:
                    this.talky2.talk("That’s good. Do you know what plan even \nis though?", "ehead", "Ethan", 6);
                    break;
                case 6:
                    this.talky2.talk("No not yet.", "whead", "Will", 0);
                    break;
                case 7:
                    this.talky2.talk("Those must be those sad but funny-looking\nrobots that I found when I woke up.", "ehead", "Ethan", 71);
                    break;
                case 71:
                    this.talky2.talk("Have you found anything about William or \nCaptain James yet?", "ehead", "Ethan", 8);
                    break;
                case 8:
                    this.talky2.talk("Not yet. You should keep exploring.", "jhead", "Janet", 0);
                    break;
                case 9:
                    this.talky2.talk("Actually, yes, a couple aliens found our \ncryopods after searching for a while.", "jhead", "Janet", 0);
                    break;
                case 10:
                    this.talky2.talk("Yeah I saw how they used it for lighting.", "ehead", "Ethan", 11);
                    break;
                case 11:
                    this.talky2.talk("Well it can do a lot more than that. It \nis used for energy, healing, weapons, \nlighting as you saw, and curing diseases.", "whead", "Will", 12);
                    break;
                case 12:
                    this.talky2.talk("And on top of all that, they use it for \nteleportation devices, which I think I’m \nstarting to figure out how they work. ", "whead", "Will", 0);
                    break;
                case 13:
                    this.talky2.talk("What is it? ", "ehead", "Ethan", 14);
                    break;
                case 14:
                    this.talky2.talk("You will have to go through their factory \nto get to him. It is very important to \ntheir big plan so security will be heavy. ", "whead", "Will", 15);
                    break;
                case 15:
                    this.talky2.talk("Well that’s not good. Should I just go up \nthis elevator? ", "ehead", "Ethan", 16);
                    break;
                case 16:
                    this.talky2.talk("Yep. That will take you straight to it. ", "whead", "Will", 17);
                    break;
                case 17:
                    this.talky2.talk("Good luck Ethan. ", "jhead", "Janet", 0);
                    break;
                case 404:
                    if (this.order != 6) {
                        this.talky2.talk("Well, I don't know any passwords. I guess \nI should move on.", "ehead", "Ethan", 0);
                    }
                    else {
                        this.talky2.talk("Any idea on how I can obtain the password?", "ehead", "Ethan", 0);
                    }
                    this.player.x -= 10;
                default: break;
            }
            this.talky2.finish = 0;
        };
        return Level3;
    }(Phaser.State));
    TSAGame.Level3 = Level3;
})(TSAGame || (TSAGame = {}));
var TSAGame;
(function (TSAGame) {
    function setUp(state, bg) {
        state.game.physics.startSystem(Phaser.Physics.ARCADE);
        state.game.world.resize(4000, 608);
        state.game.camera.bounds.bottom = 600;
        state.game.time.advancedTiming = true;
        state.game.time.advancedTiming = true;
        state.game.add.sprite(0, 0, bg);
        TSAGame.alarmsOn = false;
        TSAGame.urgent = false;
    }
    TSAGame.setUp = setUp;
    function pauseU(state, resume, reset, instr, obot, tbot, drone, sensor, alien) {
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