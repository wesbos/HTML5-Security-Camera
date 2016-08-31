// Including libraries

var http = require('http');
const static = require('node-static'); // for serving files

var fileServer = new static.Server('./client');

const app = http.createServer((req, res) => {
  req.addListener('end', function () {
    fileServer.serve(req, res); // this will return the correct file
  }).resume();
}).listen(8080);;

const io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {

  socket.on('sendImage', function (data) {
    // console.log(data);
    socket.broadcast.emit('getImage',data);
  });

});
