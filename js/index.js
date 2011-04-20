(function() {
  $(document).ready(function() {
    return $(document).keydown(function(e) {
      var val;
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
        val = $('#paddle1').attr('y').baseVal.value;
        if (e.keyCode === 38 && val > 0) {
          $('#paddle1').attr('y').baseVal.value -= 8;
        }
        if (e.keyCode === 40 && val < 425) {
          return $('#paddle1').attr('y').baseVal.value += 8;
        }
      }
    });
  });
}).call(this);
