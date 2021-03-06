const express = require("express");
const reqWatcher = require("../middlewares/request_watcher");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:180'
}));


app.use(reqWatcher);

app.get("/", (request, response) => {
    response.end("The request was sucessfully answered")
})

const server = app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
})


const io = require('socket.io')(server,  {
  cors: {
    origin: '*',
  }
});

let activePlayers = []
io.on('connection', function(socket){
  io.emit("active_players", activePlayers)
  
  socket.emit("player_id", socket.id)
  
  socket.on("player_init", data => {
    activePlayers.push(data)
    console.log(activePlayers)
    io.emit("active_players", activePlayers)
  })

  console.log(`User connected. His ID is ${socket.id}`);
  
  socket.on("player_movement", (data) => {
    socket.broadcast.emit("update_player_position", data)
  }) 

  socket.on('disconnect', function(){
    activePlayers = activePlayers.filter(element => {
      if(element.id === socket.id)
        return false
      return true
    })
    io.emit("active_players", activePlayers)
    console.log(`The user with ID ${socket.id} has disconnected`);
  });
  console.log(`Players: ${activePlayers}`)
});