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
    var game;
    return game = embed({
      id: 'canvas',
      height: '500',
      width: '1000',
      src: 'canvas.svg',
      type: 'image/svg+xml',
      pluginspage: 'http://www.adobe.com/svg/viewer/install/'
    });
  });
  res.render('index', {
    context: {
      game: game,
      title: 'Node Pong',
      copyright: '&copy Chris McBride'
    }
  });
  app.get('/not-embed/', function(req, res) {
    var game;
    game = svg({
      id: 'canvas',
      height: '500px',
      xmlns: 'http://www.w3.org/2000/svg'
    }, function() {
      rect({
        id: 'background',
        width: '1000px',
        height: '500px',
        fill: 'black'
      });
      rect({
        id: 'paddle1',
        width: '25px',
        height: '75px',
        x: '20',
        y: '20',
        stroke: 'blue',
        'stroke-width': '4',
        fill: 'white'
      });
      return rect({
        id: 'paddle2',
        width: '25px',
        height: '75px',
        x: '960',
        y: '20',
        stroke: 'red',
        'stroke-width': '4',
        fill: 'white'
      });
    });
    return res.render('index', {
      context: {
        game: game,
        title: 'Node Pong',
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
      return count--;
    }
  });
  client.send('Player:' + count);
  client.on('message', function(message) {
    return client.broadcast(message);
  });
}).call(this);
