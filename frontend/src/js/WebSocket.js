let activePlayers = []

const socket = io("http://localhost:3000")


socket.on('player_id', data => {
    player.id = data
    console.log(data)
});

socket.on("update_player_position", data => {
    context.drawImage(playerSprites["S"][0], data.x, data.y, 45, 60)
})

socket.on("active_players", data => {
    activePlayers = data
    socket.emit("player_init", {...player.position})

    const drawPlayersCheckInterval = setInterval(() => {
        if(resourceStatus.mapSprites === "ok" && resourceStatus.playerSprites === "ok"
            &&resourceStatus.animationSprites === "ok"){
            clearInterval(drawPlayersCheckInterval)
            for (const player of activePlayers) {
                context.drawImage(playerSprites["S"][0], player.x, player.y, 45, 60)
            }
        }
    }, 100);
})