import express from "express";
const app = new express();

// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// var redis = require('redis');

app.listen('8010', () => {
    console.log("Success")
})

app.get('/', (request, response) => {
    response.send("success");
})
/*

io.on('connection', function (socket) {

    console.log("new client connected");
    var redisClient = redis.createClient();
    redisClient.subscribe('message');

    redisClient.on("message", function(channel, message) {
        console.log("mew message in queue "+ message + "channel");
        socket.emit(channel, message);
    });

    socket.on('disconnect', function() {
        redisClient.quit();
    });

});
*/
