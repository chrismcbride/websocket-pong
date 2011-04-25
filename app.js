(function() {
  var app, count, host, io, port, socket;
  var __hasProp = Object.prototype.hasOwnProperty;
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
  count = 0;
  socket.on('connection', function(client) {
    var clientId, _ref;
    _ref = socket.clients;
    for (clientId in _ref) {
      if (!__hasProp.call(_ref, clientId)) continue;
      client = _ref[clientId];
      count++;
    }
    if (count > 2) {
      client._onDisconnect();
      count--;
    }
    client.send('Player:' + count);
    return client.on('message', function(message) {
      return client.broadcast(message);
    });
  });
}).call(this);
