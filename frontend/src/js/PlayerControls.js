let player = {
    direction: "S",
    walking: false,
    position: {
        x: 180,
        y: 300
    },
    id: null,
    animationState: playerAnimationState
}

if(localStorage.position){
    player.position = JSON.parse(localStorage.getItem("position"))
}

let pressedMovementButtons = []

// setInterval(() => {
//     console.clear()
//     console.log(player.position)
// }, 250)


function onWalkCommand(charStr){
    if(["W", "A", "S", "D"].includes(charStr) && (player.direction !== charStr || player.walking === false)){
        moveChar(charStr)  
        player.direction = charStr
        player.walking = true
        
        !pressedMovementButtons.includes(charStr)
        ? pressedMovementButtons.push(charStr)
        : null
    }
}
document.onkeydown = function(event) {
    event = event || window.event
    let charCode = event.keyCode || event.which
    let charStr = String.fromCharCode(charCode)
    onWalkCommand(charStr)
}

function onLeftWalkCommand(charStr){
    pressedMovementButtons.splice(pressedMovementButtons.indexOf(charStr), 1) 
    if(charStr === player.direction){
        stopChar()
        player.walking = false
    }
}

document.onkeyup = function(event){
    localStorage.setItem("position", `{"x": ${player.position.x}, "y": ${player.position.y}}`)
    event = event || window.event
    let charCode = event.keyCode || event.which
    let charStr = String.fromCharCode(charCode)
    onLeftWalkCommand(charStr)
    pressedCommandsQty = pressedMovementButtons.length
    if(pressedCommandsQty > 0)
        onWalkCommand(pressedMovementButtons[pressedCommandsQty - 1])
}

playerAnimationState = 1
playerAnimationInterval = setInterval(() => {
      playerAnimationState++
}, 150)
function moveChar(direction){
    if(player.walking)
        stopChar(false)

    let incrementedPosition = {x:0, y:0}
    if(direction === "W")
        incrementedPosition.y = -0.7
    if(direction === "A")
        incrementedPosition.x = -0.7
    if(direction === "S")
        incrementedPosition.y = 0.7
    if(direction === "D")
        incrementedPosition.x = 0.7

    playerUpdateImageInterval = setInterval(() => {
        drawMap(mapArray, false)
        let newX = player.position.x + incrementedPosition.x
        let newY = player.position.y + incrementedPosition.y
        
        if((!tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 35, newY + 30).mapIndex]) && !tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 35, newY + 60).mapIndex]))
        && (!tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 10, newY + 30).mapIndex]) && (!tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 10, newY + 60).mapIndex])))
        ){
            player.position.x = newX
            player.position.y = newY
        }
        socket.emit("player_movement", player)
        context.drawImage(playerSprites[player.direction][playerAnimationState%4], newX, newY, 45, 60)
    }, 5)
}

function stopChar(drawFirstAnimation = true){
    clearInterval(playerUpdateImageInterval)
    if(drawFirstAnimation){
        drawMap(mapArray, false)
        context.drawImage(playerSprites[player.direction][0], player.position.x, player.position.y, 45, 60)
    }
}