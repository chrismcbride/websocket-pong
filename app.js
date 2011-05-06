(function() {
  var Game, app, game, host, io, port, socket;
  require.paths.unshift('./node_modules');
  Game = (function() {
    function Game(players) {
      this.players = players != null ? players : [];
    }
    Game.prototype.add_player = function(client) {
      if (this.players.length === 2) {
        return false;
      }
      if (this.players.length === 0) {
        client.player_number = 1;
      } else {
        client.player_number = this.players[0].player_number === 1 ? 2 : 1;
      }
      this.log_join(client);
      return true;
    };
    Game.prototype.pop = function() {
      return this.players.pop();
    };
    Game.prototype.push = function(player) {
      return this.players.push(player);
    };
    Game.prototype.log_join = function(player) {
      return console.log('\033[92mPlayer ' + player.player_number + ' has joined the game\033[0m');
    };
    Game.prototype.log_leave = function(player) {
      return console.log('\033[91mPlayer ' + player.player_number + ' has disconnected.\033[0m');
    };
    return Game;
  })();
  host = process.env.VCAP_APP_HOST || 'localhost';
  port = process.env.VCAP_APP_PORT || 3000;
  app = require('express').createServer();
  app.register('.coffee', require('coffeekup-svg'));
  app.set('view engine', 'coffee');
  app.set('view options', {
    layout: false
  });
  app.get('/css/:path', function(req, res) {
    return res.sendfile("css/" + req.params.path);
  });
  app.get('/js/:path', function(req, res) {
    return res.sendfile("js/" + req.params.path);
  });
  app.get('/canvas.svg', function(req, res) {
    return res.sendfile("canvas.svg");
  });
  app.get('/', function(req, res) {
    return res.render('index', {
      context: {
        title: 'Node Pong',
        embed: true,
        copyright: '&copy Chris McBride'
      }
    });
  });
  app.get('/not-embed/', function(req, res) {
    return res.render('index', {
      context: {
        title: 'Node Pong',
        embed: false,
        copyright: '&copy Chris McBride'
      }
    });
  });
  app.listen(port, host);
  io = require('socket.io');
  socket = io.listen(app);
  game = new Game();
  socket.on('connection', function(client) {
    if (game.add_player(client)) {
      game.push(client);
      client.send('Player:' + client.player_number);
    } else {
      client._onDisconnect();
    }
    client.on('message', function(message) {
      return client.broadcast(message);
    });
    client.on('disconnect', function() {
      return game.log_leave(client);
    });
    if (client.player_number === game.players[0].player_number && game.players.length === 2) {
      game.players[0] = game.players[1];
    }
    return game.pop();
  });
}).call(this);
