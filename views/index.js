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
      section({
        id: 'content'
      }, function() {
        return div({
          id: 'game'
        }, function() {
          return embed({
            id: 'canvas',
            height: '500',
            width: '1000',
            src: 'canvas.svg',
            type: 'image/svg+xml',
            pluginspage: 'http://www.adobe.com/svg/viewer/install/'
          });
        });
      });
      return footer(function() {
        return this.copyright;
      });
    });
  });
}).call(this);
