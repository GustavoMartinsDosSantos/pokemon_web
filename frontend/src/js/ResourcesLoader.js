let resourceStatus = {
    mapSprites: "loading",
    playerSprites: "loading",
    animationSprites: "loading"
}

let mapArray = 
[
    1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 0, 0, 0, 12, 0, 12, 0, 0,
    1, 2, 1, 0, 0, 0, 12, 0, 12, 0, 0,
    0, 0, 0, 0, 0, 0, 13, 15, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 16, 18, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 16, 18, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 16, 18, 0, 0, 0,
    5, 1, 1, 0, 0, 0, 16, 18, 0, 0, 0,
    7, 5, 1, 1, 0, 0, 16, 18, 0, 0, 0,
    7, 7, 5, 1, 1, 0, 16, 18, 0, 0, 0,
    7, 7, 7, 5, 1, 1, 19, 21, 0, 0, 0,
]

let canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
context.imageSmoothingEnabled = false

let resourcesCheckInterval = setInterval(() => {
    if(resourceStatus.mapSprites === "ok" && resourceStatus.playerSprites === "ok"
        &&resourceStatus.animationSprites === "ok"){
            drawMap(mapArray)
            startMapAnimations()
            context.drawImage(playerSprites["S"][0], player.position.x, player.position.y, 45, 60)
            clearInterval(resourcesCheckInterval)
    }
}, 0);
let animatedTilesIndex = [2]
let animatedTilesOnEnterIndex = [1]
mapTilesAnimationState = 0

function startMapAnimations(){
    const animationsClock = setInterval(() => {
        mapTilesAnimationState++
        const mapSize = Math.sqrt(mapArray.length)
        for (let i = 0; i < mapSize; i++) {
            for (let j = 0; j < mapSize; j++) {
                //Default Flowers animation (2 - 2.9)
                mapArray[i * mapSize + j] >= 2 && mapArray[i * mapSize + j] < 3
                ? context.drawImage(environmentTiles[2][mapTilesAnimationState%4], j * 45, i * 45, 45, 45)
                : null

                player.walking
                ? context.drawImage(playerSprites[player.direction][playerAnimationState%4], player.position.x, player.position.y, 45, 60)
                : context.drawImage(playerSprites[player.direction][0], player.position.x, player.position.y, 45, 60)
            }
        }
    }, 300)
}