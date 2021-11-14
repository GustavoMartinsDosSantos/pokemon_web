let player = {
    name:"",
    direction: "S",
    walking: false,
    position: {
        x: 180,
        y: 300
    },
    id: null,
    animationState: null
}

if (localStorage.position) {
    player.position = JSON.parse(localStorage.getItem("position"))
}

let pressedMovementButtons = []

function onWalkCommand(charStr) {
    if (["W", "A", "S", "D"].includes(charStr) && (player.direction !== charStr || player.walking === false)) {
        moveChar(charStr)
        player.direction = charStr
        player.walking = true

        !pressedMovementButtons.includes(charStr)
            ? pressedMovementButtons.push(charStr)
            : null
    }
}
document.onkeydown = function (event) {
    event = event || window.event
    let charCode = event.keyCode || event.which
    let charStr = String.fromCharCode(charCode)
    onWalkCommand(charStr)
}

function onLeftWalkCommand(charStr) {
    pressedMovementButtons.splice(pressedMovementButtons.indexOf(charStr), 1)
    if (charStr === player.direction) {
        stopChar()
        player.walking = false
    }
}

document.onkeyup = function (event) {
    localStorage.setItem("position", `{"x": ${player.position.x}, "y": ${player.position.y}}`)
    event = event || window.event
    let charCode = event.keyCode || event.which
    let charStr = String.fromCharCode(charCode)
    onLeftWalkCommand(charStr)
    pressedCommandsQty = pressedMovementButtons.length
    if (pressedCommandsQty > 0)
        onWalkCommand(pressedMovementButtons[pressedCommandsQty - 1])
}

playerAnimationState = 1
playerAnimationInterval = setInterval(() => {
    playerAnimationState++
}, 150)
function moveChar(direction) {
    if (player.walking)
        stopChar(false)

    player.direction = direction

    requestFrame()

}

lastFrame = undefined
deltaTime = 1
function requestFrame() {
    requestFrameId = requestAnimationFrame(updatePlayerPosition)
}

function cancelFrameRequest() {
    cancelAnimationFrame(requestFrameId)
}

function updatePlayerPosition() {
    requestFrameId = undefined
    incrementedPosition = { x: 0, y: 0 }
    if (player.direction === "W")
        incrementedPosition.y = -deltaTime / (7.5)
    if (player.direction === "A")
        incrementedPosition.x = -deltaTime / (7.5)
    if (player.direction === "S")
        incrementedPosition.y = deltaTime / (7.5)
    if (player.direction === "D")
        incrementedPosition.x = deltaTime / (7.5)

    let newX = player.position.x + incrementedPosition.x
    let newY = player.position.y + incrementedPosition.y

    if ((!tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 35, newY + 30).mapIndex]) && !tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 35, newY + 60).mapIndex]))
        && (!tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 10, newY + 30).mapIndex]) && (!tilesWithCollision.includes(mapArray[getMapIndexByCoordinates(newX + 10, newY + 60).mapIndex])))
    ) {
        player.position.x = newX
        player.position.y = newY
    }
    socket.emit("player_movement", {
        ...player,
        animationState: playerAnimationState
    })
    requestFrame()
}

function stopChar() {
    cancelFrameRequest(requestFrameId)
}

function setPlayerName(name){
    player.name = name
    socket.emit("player_movement", {
        ...player,
        animationState: playerAnimationState
    })
}