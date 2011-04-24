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
				embed id: 'canvas', height: '500', width: '1000', src: 'canvas.svg', type: 'image/svg+xml', pluginspage: 'http://www.adobe.com/svg/viewer/install/'
		footer ->
			@copyright
