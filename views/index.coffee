doctype 5
html ->
	head ->
		meta charset: 'utf-8'
		title "#{@title}"
		link rel: 'stylesheet', href: '/css/index.css'
		script src: '/js/jquery-1.5.2.min.js'
		script src: "/socket.io/socket.io.js"
		script src: '/js/index.js'
	body ->
		header ->
			h1 @title
		section id: 'content', ->
			div id: 'game', ->
				if @embed
					embed id: 'canvas', height: '500', width: '1000', src: 'canvas.svg', type: 'image/svg+xml', pluginspage: 'http://www.adobe.com/svg/viewer/install/'
				else
					svg id: 'canvas', height: '500px', xmlns: 'http://www.w3.org/2000/svg', ->
						rect id: 'background', width: '1000px', height: '500px', fill: 'black'
						rect id: 'paddle1', width: '25px', height: '75px', x: '20', y: '20', stroke: 'blue', 'stroke-width': '4', fill: 'white'
						rect id: 'paddle2', width: '25px', height: '75px', x: '960', y: '20', stroke: 'red', 'stroke-width': '4', fill: 'white'
		footer ->
			@copyright
