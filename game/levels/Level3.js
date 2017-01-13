var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSAGame;
(function (TSAGame) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            return _super.apply(this, arguments) || this;
        }
        Level3.prototype.create = function () {
            setUp(this, "lvl3");
            // console.log("hi");
            this.player = new Player(this.game, 128, 0);
            this.game.camera.follow(this.player);
            this.level3End = this.game.add.sprite(3000, 300, "bigAlienElevator");
            this.game.physics.arcade.enable(this.level3End);
            this.level3End.body.collideWorldBounds = true;
            this.level3End.body.gravity.y = 60;
            console.log("hiv");
            this.map = this.add.tilemap("map3");
            this.map.addTilesetImage("Level 3 tileset");
            this.shipLayer = this.map.createLayer("Tile Layer 1");
            this.map.setCollision([1, 2, 3]);
            this.healthBar = new HealthBar(this.game);
            this.elevators = this.game.add.group();
            this.Obots = this.game.add.group();
            var obot = new Obot(this.game, 736, 192, 928, this.Obots, this.shipLayer, this.player);
            this.playerLine = new Phaser.Line(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            this.aliens = this.game.add.group();
            var alien = new Alien(this.game, 10, 128, 320, this.shipLayer, this.aliens);
            var alien2 = new Alien(this.game, 1330, 128, 1380, this.shipLayer, this.aliens);
            var alien3 = new Alien(this.game, 1280, 400, 1330, this.shipLayer, this.aliens);
            this.tbots = this.game.add.group();
            var tbot = new TBot(this.game, 872, 384, 1024, this.shipLayer, this.tbots, this.player);
            var tbot2 = new TBot(this.game, 1430, 160, 1504, this.shipLayer, this.tbots, this.player);
            this.sensors = this.game.add.group();
            var sensor = new Sensor(this.game, 1408, 264, 448, "", 0, this.shipLayer, this.sensors);
            var sensor2 = new Sensor(this.game, 1280, 264, 448, "", 2, this.shipLayer, this.sensors);
            var sensor3 = new Sensor(this.game, 1408, 328, 512, "", 0, this.shipLayer, this.sensors);
            var sensor4 = new Sensor(this.game, 1280, 328, 512, "", 2, this.shipLayer, this.sensors);
            this.blasts = this.game.add.group();
            for (var i = 0; i < 32; i++) {
                this.blasts.add(new Blast(this.game, 0, 0, this.shipLayer), true);
            }
            this.button1 = new Invis(this.game);
            this.button2 = new Shield(this.game);
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
            this.resume.fixedToCamera = true; //
            this.resume.alpha = 0;
            this.reset = this.game.add.image(400, 500, "reset");
            this.reset.fixedToCamera = true;
            this.reset.alpha = 0;
            this.reset.scale.x = 2;
            this.reset.scale.y = 2;
            this.retry = this.game.add.button(750, 12, "retry");
            this.retry.fixedToCamera = true;
            this.retry.onInputDown.add(this.restart, this);
            console.log("wtf");
        };
        Level3.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.shipLayer);
            this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.game.physics.arcade.collide(this.Obots, this.shipLayer);
            this.game.physics.arcade.collide(this.aliens, this.shipLayer);
            if (this.player.alpha == 1) {
                this.playerLine.setTo(this.player.left + 11 * this.player.scale.x, this.player.top, this.player.right - 11 * this.player.scale.x, this.player.bottom);
            }
            else {
                this.playerLine.setTo(0.0, 0, 0, 0);
            }
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
                this.timer.add(5000, function pancake() { this.tintI.alpha = 0; }, this);
                this.timer.start();
            }
            //    this.game.physics.arcade.collide(this.tbots, this.shipLayer);
            this.resume.alpha = 0;
            this.reset.alpha = 0;
            this.instructions.alpha = 0;
            var moveOn = this.game.physics.arcade.collide(this.player, this.level3End);
            if (moveOn) {
                console.log("congratulations, you have made it to the final boss!");
                this.game.state.start("finalBoss");
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
            this.game.state.start("level3");
        };
        return Level3;
    }(Phaser.State));
    TSAGame.Level3 = Level3;
})(TSAGame || (TSAGame = {}));
