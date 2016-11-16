var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSAGame;
(function (TSAGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'Ethan', 0);
            this.anchor.setTo(0.5, 0);
            //      this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(this);
            game.physics.arcade.enable(this);
            this.body.bounce.y = 0.1;
            this.body.gravity.y = 275;
            this.body.collideWorldBounds = true;
            this.playerScale = 1;
            this.scale.x = this.playerScale;
            this.scale.y = this.playerScale;
            this.hitPlatform = true;
            this.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17], 10);
            // this.width = 48;
            //this.height = 96;
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
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.body.blocked.down || this.body.touching.down)) {
                this.body.velocity.y = -250;
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
            // this.platforms = this.game.add.group();
            //this.platforms.enableBody = true;
            this.drone = new Drone(this.game, 200, 275, 300, 185);
            console.log("drone x:" + this.drone.body.x);
            this.drone.body.immovable = true;
            this.Obots = new Obot(this.game, 550, 404, 660, 468);
            //      var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
            //     ground.scale.setTo(8, 2);
            //   ground.body.immovable = true;
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('Ship Tileset');
            this.shipLayer = this.map.createLayer('Tile Layer 1');
            this.map.setCollision(1);
        };
        GameState.prototype.update = function () {
            //this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.player, this.drone);
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            //this.player.update();
        };
        return GameState;
    }(Phaser.State));
    TSAGame.GameState = GameState;
})(TSAGame || (TSAGame = {}));
