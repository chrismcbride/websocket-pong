(function() {
  var add_to_game, app, host, io, players, port, socket;
  require.paths.unshift('./node_modules');
  port = process.env.VCAP_APP_PORT || 3000;
  host = process.env.VCAP_APP_HOST || 'localhost';
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
  players = [];
  socket.on('connection', function(client) {
    if (add_to_game(client, players)) {
      players.push(client);
      client.send('Player:' + client.player_number);
    } else {
      client._onDisconnect();
    }
    client.on('message', function(message) {
      return client.broadcast(message);
    });
    return client.on('disconnect', function() {
      console.log('\033[91mPlayer ' + client.player_number + ' has disconnected.\033[0m');
      if (client.player_number === players[0].player_number) {
        if (players.length === 2) {
          players[0] = players[1];
        }
        players.pop();
      } else if (client.player_number === players[1].player_number) {
        players.pop();
      }
      return true;
    });
  });
  add_to_game = function(client, players) {
    if (players.length === 2) {
      return false;
    }
    if (players.length === 0) {
      client.player_number = 1;
    } else {
      client.player_number = players[0] ? players[0].player_number + 1 : void 0;
    }
    console.log('\033[92mPlayer ' + client.player_number + ' has joined the game\033[0m');
    return true;
  };
}).call(this);
