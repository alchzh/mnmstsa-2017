var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            //     this.suspicion.alpha=0;
            //this.animations.add('alerted',[14, 15, 16, 17, 18, 19], 10, true);
            //		this.animations.add('turn',[6, 7, 8, 9, 10, 11, 12, 13], 20);
            //			this.animations.add('turnBack',[13,12,11,10,9,8,7,6,0], 20);
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
                    //                    console.log(realTile);
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                //                this.laserEnd = tilehits[0].worldX;
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
            if (alarmsOn && !this.suspicious) {
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
                    //                    this.body.velocity.x = this.rate * time;
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
            //  console.log(this.animations.currentAnim ); 
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
            //    this.body.immovable=true;
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
                    //                    console.log(realTile);
                    this.laser.setTo(this.left + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                //                this.laserEnd = tilehits[0].worldX;
                //               this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
                var point = playerLine.intersects(this.laser, true);
                if (point != null) {
                    //           if (this.animations.frame >= 6 && this.animations.frame <= 14) this.scale.x = -this.scale.x;
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
            if (alarmsOn)
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
            // this.immovable=true;
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
            //			this.globalTime.start();
            //			console.log(this.time);
            _this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
            _this.animations.add('moveBack', [8, 9, 10, 11, 12, 0], 5);
            _this.animations.add('moveForward', [14, 15, 16, 17, 18, 0], 5);
            _this.animations.add('alert', [20, 21, 22, 24], 5);
            _this.animations.add('crash', [23, 23, 23, 23, 23, 23, 0], 1);
            //     this.body.immovable=true;
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
            //          console.log(this.game.time.fps);
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
                    //                    console.log(realTile);
                    this.laser.setTo(this.right + 8, this.y + 5, this.laserEnd, this.y + 5);
                }
                //                this.laserEnd = tilehits[0].worldX;
                //                this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
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
            if (alarmsOn)
                this.body.velocity.x *= 1.75;
            //      if (this.inCamera) this.body.gravity.y=0;
            //    else this.body.gravity.y=200;
            if (this.animations.frame < 8)
                this.animations.play('move');
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
                if (this.animations.frame < 8) {
                    this.scale.x = 1;
                    //            	        this.body.velocity.x = this.rate * -time;
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
                    //                        this.body.velocity.x = this.rate * time;
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
            //		this.scale.x = -0.6;
            //		this.scale.y = 0.6;
            _this.x2 = x2;
            _this.cooldown;
            _this.laserEnd = 3200;
            //			this.globalTime.start();
            //			console.log(this.time)
            _this.blasts = game.add.group();
            _this.animations.add('turn', [1, 2, 3, 4, 5, 6, 7, 0], 7.5, false);
            //			this.animations.add('turn', [9, 10, 11, 12, 13, 14, 15, 16, 17])
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
                    //                    console.log(tilehits[realTile].index);
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
                    //                    this.game.debug.geom(this.laser, "rgb(255, 0, 0)");
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
                    //                    this.body.velocity.x = this.rate * -time;
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
                    //                    this.laser.setTo(this.left, this.y + 15, 0, this.y + 15);
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
            if (alarmsOn)
                this.body.velocity.x *= 1.75;
            this.previousTime = this.globalTime.seconds;
        };
        return Drone;
    }(Phaser.Sprite));
    TSAGame.Drone = Drone;
    function uselessfunction() { }
})(TSAGame || (TSAGame = {}));
