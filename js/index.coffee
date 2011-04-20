$(document).ready ->

	$(document).keydown (e) ->
		if(e.keyCode is 38 or e.keyCode is 40)
			e.preventDefault()
			val = $('#paddle1').attr('y').baseVal.value
			$('#paddle1').attr('y').baseVal.value -= 8 if e.keyCode is 38 and val > 0 #up key
			$('#paddle1').attr('y').baseVal.value += 8 if e.keyCode is 40 and val < 425 #down key


