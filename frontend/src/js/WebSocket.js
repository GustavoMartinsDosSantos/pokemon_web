let activePlayers = []

const socket = io("http://127.0.0.1:3000")


socket.on('player_id', data => {
    player.id = data
    socket.emit("player_init", player)
});

socket.on("update_player_position", data => {
    for (let i = 0; i < activePlayers.length; i++) {
        if (activePlayers[i].id === data.id)
            activePlayers[i] = data
    }
})

socket.on("active_players", data => {
    activePlayers = data
    const drawPlayersCheckInterval = setInterval(() => {
        if (resourceStatus.mapSprites === "ok" && resourceStatus.playerSprites === "ok"
            && resourceStatus.animationSprites === "ok" && player.name !== "") {
            clearInterval(drawPlayersCheckInterval)
            for (const otherPlayer of activePlayers) {
                if (otherPlayer.id !== player.id)
                    context.drawImage(copSprites["S"][0], otherPlayer.position.x, otherPlayer.position.y, 45, 60)
            }
        }
    }, 100);
})