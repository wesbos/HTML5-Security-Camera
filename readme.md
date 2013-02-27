# HTML5 based motion detection

Sends images from a device (index.html) to a viewer (viewer.html) over websockets when motion is detected.

Uses WebRTC getUserMedia(), `<video>`, `<canvas>`, Node.js and Socket.io

Hacked together quickly for a demo at #screens12.


# To Run

Start the server:

```
node server.js
```

Point your browser to _http://localhost:8080_ or _http://localhost:8080/viewer.html_