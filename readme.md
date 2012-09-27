# HTML5 based motion detection

Sends images from a device (index.html) to a viewer (viewer.html) over websockets when motion is detected.

Uses WebRTC getUserMedia(), `<video>`, `<canvas>`, Node.js and Socket.io

Hacked together quickly for a demo at #screens12. Two things to note at the moment:

1. The node server does serve up `index.html` or `viewer.html`
1. There are three absolute URLS in `index.html`, `viewer.html` and `index.js` that you will need to change.


This will all be cleaned up into a tidy node process very soon. thanks :) 
