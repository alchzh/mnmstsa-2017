var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSAGame;
(function (TSAGame) {
    /*export class Enemy extends Phaser.Sprite {
        
        constructor(game: Phaser.Game, x: number, y: number,name:string) {
            super(game, x,y,name,0);
            this.anchor.setTo(0.5,0);
            this.game.physics.arcade.enableBody(this);

            game.add.existing(this);

        }
        update()
        {
        }
    }*/
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
            this.originX = this.x; //hello
            this.scale.x = 2;
            this.scale.y = 2;
            this.x2 = x2;
            //	this.globalTime.start();
            //console.log(this.time);
            this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        }
        Obot.prototype.update = function () {
            this.animations.play('move');
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
                this.scale.x = 2;
                this.body.velocity.x = this.rate * -time;
                if (this.x >= this.x2) {
                    this.animations.play('turn');
                    this.direction = 1;
                }
            }
            else if (this.direction == 1) {
                this.scale.x = -2;
                this.body.velocity.x = this.rate * time;
                if (this.x <= this.originX) {
                    this.animations.play('turn');
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
            //	this.globalTime.start();
            //console.log(this.time);
            this.animations.add('turn', [1, 2, 3, 4, 5, 6, 7, 0], 7.5, false);
            this.laser = new Phaser.Line(0, 275, 200, 275);
        }
        Drone.prototype.updateLine = function (player) {
        };
        Drone.prototype.update = function () {
            // this.globalTime.update();
            if (this.inCamera) {
                this.laser = new Phaser.Line(0, 275, 200, 275);
                this.laser.setTo(-1, -1, -1, -1);
                this.game.debug.geom(this.laser, "rgb(0,0,0)");
            }
            else {
                this.laser = new Phaser.Line(0, 0, 0, 0);
            }
            var time = this.previousTime - this.globalTime.seconds;
            this.body.velocity.x = 0;
            if (this.direction == -1) {
                this.scale.x = -2;
                if (this.animations.frame == 0) {
                    this.laser.setTo(this.left, this.y + 15, 3200, this.y + 15);
                    this.game.debug.geom(this.laser, "rgb(255,0,0)");
                    console.log("rigjt11");
                    this.body.velocity.x = this.rate * -time;
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
                    this.game.debug.geom(this.laser, "rgb(255,0,0)");
                    this.body.velocity.x = this.rate * time;
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
