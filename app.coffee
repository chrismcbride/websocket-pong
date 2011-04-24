app = require('express').createServer()

app.register '.coffee', require './lib/coffeekup/0.2.2/package'
app.set 'view engine', 'coffee'
app.set 'view options', layout: false

app.get '/css/:path', (req, res) ->
	res.sendfile "css/#{req.params.path}"

app.get '/js/:path', (req, res) ->
	res.sendfile "js/#{req.params.path}"

app.get '/', (req, res) ->
	res.render 'index', context:
				title: 'Node Pong'
				copyright: '&copy Chris McBride'

app.listen 8080

io = require 'socket.io'
socket = io.listen app

socket.on 'connection', (client) ->
	count = 0
	for own clientId, client of socket.clients
		count++

	client._onDisconnect() if count > 2

	client.send 'Player:' + count

	client.on 'message', (message) ->
		client.broadcast message
