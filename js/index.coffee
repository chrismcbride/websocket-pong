$(document).ready ->
	
	playerNum = 0
	opponentNum = 0
	moveDistance = 8
	socket = new io.Socket()

	socket.connect()

	socket.on 'message', (data) ->
		[prefix, rest] = data.split ':'
		switch prefix
			when 'Player'
				playerNum = rest
				opponentNum = if parseInt(playerNum) is 2 then 1 else 2
			when 'M' then moveOpponent(rest)

	$(document).keydown (e) ->
		if(e.keyCode is 38 or e.keyCode is 40)
			e.preventDefault()
			val = $('#paddle' + playerNum).attr('y').baseVal.value
			if e.keyCode is 38 and val > 0
				$('#paddle' + playerNum).attr('y').baseVal.value -= moveDistance
				socket.send 'M:up'
			if e.keyCode is 40 and val < 425 #down key
				$('#paddle' + playerNum).attr('y').baseVal.value += moveDistance
				socket.send 'M:dn'
	
	moveOpponent = (direction) ->
		$('#paddle' + opponentNum).attr('y').baseVal.value -= moveDistance if direction is 'up'
		$('#paddle' + opponentNum).attr('y').baseVal.value += moveDistance if direction is 'dn'


