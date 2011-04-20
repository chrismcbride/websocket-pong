(function() {
  var app, io, socket;
  app = require('express').createServer();
  app.register('.coffee', require('coffeekup'));
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
  app.get('/', function(req, res) {
    return res.render('index', {
      context: {
        title: 'Node Pong',
        copyright: '&copy Chris McBride'
      }
    });
  });
  app.listen(80);
  io = require('socket.io');
  socket = io.listen(app);
  socket.on('connection', function(client) {
    return client.on('message', function(message) {
      return client.broadcast(message);
    });
  });
}).call(this);
