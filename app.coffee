require.paths.unshift('./node_modules')

class Game
    constructor: (@players = []) ->

    add_player: (client) ->
        if @players.length == 2
            return false
        if @players.length == 0
            client.player_number = 1
        else
            client.player_number = if @players[0].player_number is 1 then 2 else 1
        this.log_join(client)
        return true
    
    pop: ->
        @players.pop()

    push: (player) ->
        @players.push(player)

    log_join: (player) ->
        console.log('\033[92mPlayer ' + player.player_number + ' has joined the game\033[0m')
    
    log_leave: (player) ->
        console.log('\033[91mPlayer ' + player.player_number + ' has disconnected.\033[0m')

host = process.env.VCAP_APP_HOST or 'localhost'
port = process.env.VCAP_APP_PORT or 3000

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

game = new Game()

socket.on 'connection', (client) ->
	if game.add_player(client)
        game.push(client)
        client.send 'Player:' + client.player_number
    else
        client._onDisconnect()

	client.on 'message', (message) ->
		client.broadcast message

	client.on 'disconnect', ->
        game.log_leave(client)
		if client.player_number == game.players[0].player_number and game.players.length == 2
			game.players[0] = game.players[1]
		game.pop()
