require.paths.unshift('./node_modules')

port = process.env.VCAP_APP_PORT or 3000
host = process.env.VCAP_APP_HOST or 'localhost'

app = require('express').createServer()

app.register '.coffee', require 'coffeekup-svg'
app.set 'view engine', 'coffee'
app.set 'view options', layout: false

app.get '/css/:path', (req, res) ->
	res.sendfile "css/#{req.params.path}"

app.get '/js/:path', (req, res) ->
	res.sendfile "js/#{req.params.path}"

app.get '/canvas.svg', (req, res) ->
	res.sendfile "canvas.svg"

app.get '/', (req, res) ->
	res.render 'index', context:
		title: 'Node Pong'
		embed: true
		copyright: '&copy Chris McBride'

app.get '/not-embed/', (req, res) ->
	res.render 'index', context:
		title: 'Node Pong'
		embed: false
		copyright: '&copy Chris McBride'

app.listen port, host

io = require 'socket.io'
socket = io.listen app
count = 0
socket.on 'connection', (client) ->
	for own clientId, client of socket.clients
		count++
	if count > 2
		client._onDisconnect()
		count--
	client.send 'Player:' + count
	client.on 'message', (message) ->
		client.broadcast message
