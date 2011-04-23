(function() {
  $(document).ready(function() {
    var moveDistance, moveOpponent, opponentNum, playerNum, socket;
    playerNum = 0;
    opponentNum = 0;
    moveDistance = 8;
    socket = new io.Socket();
    socket.connect();
    socket.on('message', function(data) {
      var prefix, rest, _ref;
      _ref = data.split(':'), prefix = _ref[0], rest = _ref[1];
      switch (prefix) {
        case 'Player':
          playerNum = rest;
          return opponentNum = playerNum === 2 ? 1 : 2;
        case 'M':
          return moveOpponent(rest);
      }
    });
    $(document).keydown(function(e) {
      var val;
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
        val = $('#paddle' + playerNum).attr('y').baseVal.value;
        if (e.keyCode === 38 && val > 0) {
          $('#paddle' + playerNum).attr('y').baseVal.value -= moveDistance;
          socket.send('M:up');
        }
        if (e.keyCode === 40 && val < 425) {
          $('#paddle' + playerNum).attr('y').baseVal.value += moveDistance;
          return socket.send('M:dn');
        }
      }
    });
    return moveOpponent = function(direction) {
      if (direction === 'up') {
        $('#paddle' + opponentNum).attr('y').baseVal.value += moveDistance;
      }
      if (direction === 'dn') {
        return $('#paddle' + opponentNum).attr('y').baseVal.value -= moveDistance;
      }
    };
  });
}).call(this);
