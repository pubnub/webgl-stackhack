PubNub StackHack Voxel Painting Game
=======================================
A voxel-based collaborative painting application. You can place and remove blocks on the screen and collaborate with everyone else online to create unique images.

[Live Demo](http://pubnub.github.io/webgl-stackhack)

![Screenshot](http://pubnub.github.io/webgl-stackhack/assets/screenshot.png)

This demo uses PubNub Data Streaming technology to synchronize add and remove actions between all instances of the application. There is a server component that also keeps a running tally of the set of active blocks on the screen. It then combines all this with the power of three.js and geometry merging to create a performant, persistant, collaborative 3d environment.

Interested in learning more? Visit [PubNub](http://pubnub.com) to find out!