(function() {
  doctype(5);
  html(function() {
    head(function() {
      meta({
        charset: 'utf-8'
      });
      title("" + this.title);
      link({
        rel: 'stylesheet',
        href: '/css/index.css'
      });
      script({
        src: '/js/jquery-1.5.2.min.js'
      });
      script({
        src: "/socket.io/socket.io.js"
      });
      return script({
        src: '/js/index.js'
      });
    });
    return body(function() {
      header(function() {
        return h1(this.title);
      });
      return section({
        id: 'content'
      }, function() {
        div({
          id: 'game'
        }, function() {
          return svg({
            id: 'canvas',
            height: '500px',
            xmlns: 'http://www.w3.org/2000/svg'
          }, function() {
            rect({
              id: 'background',
              width: '1000px',
              height: '500px',
              fill: 'black'
            });
            rect({
              id: 'paddle1',
              width: '25px',
              height: '75px',
              x: '20',
              y: '20',
              stroke: 'blue',
              'stroke-width': '4',
              fill: 'white'
            }, function() {
              return animate({
                attributeName: 'y',
                from: '20',
                to: '50',
                begin: 'accessKey(&#38)',
                dur: '1s'
              });
            });
            return rect({
              id: 'paddle2',
              width: '25px',
              height: '75px',
              x: '960',
              y: '20',
              stroke: 'red',
              'stroke-width': '4',
              fill: 'white'
            });
          });
        });
        return footer(function() {
          return this.copyright;
        });
      });
    });
  });
}).call(this);
