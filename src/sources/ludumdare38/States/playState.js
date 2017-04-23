// The play state contains the game
var playState = function () { };

var globalGravity = 750

playState.prototype =
    {
        // Setup functions
        preload: function () {
            // Function called first to load all the assets
            game.load.tilemap('level 1', 'src/tilemaps/newnew.json', null, Phaser.Tilemap.TILED_JSON);
            
            game.load.image('player', 'src/graphics/player.png');
            game.load.image('box', 'src/graphics/tile.png')
        },
        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            map = game.add.tilemap('level 1');

            map.addTilesetImage('tile', 'box');

            layer = map.createLayer('Tile Layer 1');
            layer.resizeWorld();
            
            // game.add.tileSprite(0, 0, 800, 480, 'background')
            map.setCollisionBetween(1,12);


            game.physics.arcade.gravity.y = globalGravity;

            //  Music
            music = game.add.audio('main_audio');
            music.loop = true;
            music.play();
            // Music controls
            mute_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
            mute_key.onDown.add(mute, this);

            // Group definitions
            players = game.add.group();
            powerup = game.add.group();

            player = PlayerFactory(players, 50, 50, 'player');

            

        },
        bulletCollitionCallback: function (player, bullet) {
            callback = function () {
                player.invulnerable = false
                player.alpha = 1
            };
            if (!player.invulnerable) {
                player.alpha = 0.5
                player.health -= Math.abs(bullet.body.velocity.x) + Math.abs(bullet.body.velocity.y)
                if (0 > player.health) {
                    player.kill()
                };
                player.invulnerable = true
                game.time.events.add(Phaser.Timer.SECOND * 2, callback, this)
            };
        },
        update: function () {
            game.physics.arcade.collide(players,layer)
        },
    };

function mute() {
    if (music.isPlaying) {
        music.pause()
    }
    else {
        music.resume();
    }
}