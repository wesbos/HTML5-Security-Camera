// Including libraries

var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  static = require('node-static'); // for serving files

var fileServer = new static.Server('./');

app.listen(8080);

// If the URL of the socket server is opened in a browser
function handler (request, response) {

  request.addListener('end', function () {
        fileServer.serve(request, response); // this will return the correct file
    });
}


io.sockets.on('connection', function (socket) {
    
  socket.on('sendImage', function (data) {
    // console.log(data);
    socket.broadcast.emit('getImage',data);
  });

});
