var io = require('socket.io').listen(9000);

io.sockets.on('connection', function (socket) {
    
  socket.on('sendImage', function (data) {
    // console.log(data);
    socket.broadcast.emit('getImage',data);
  });

});