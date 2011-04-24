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
        game = embed id: 'canvas', height: '500', width: '1000', src: 'canvas.svg', type: 'image/svg+xml', pluginspage: 'http://www.adobe.com/svg/viewer/install/'
	res.render 'index', context:
                game: game
                title: 'Node Pong'
                copyright: '&copy Chris McBride'

app.get '/not-embed/', (req, res) ->
        game = svg id: 'canvas', height: '500px', xmlns: 'http://www.w3.org/2000/svg', ->
                rect id: 'background', width: '1000px', height: '500px', fill: 'black'
                rect id: 'paddle1', width: '25px', height: '75px', x: '20', y: '20', stroke: 'blue', 'stroke-width': '4', fill: 'white'
                rect id: 'paddle2', width: '25px', height: '75px', x: '960', y: '20', stroke: 'red', 'stroke-width': '4', fill: 'white'

        res.render 'index', context:
                game: game
                title: 'Node Pong'
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
