async function loadAllSprites(){

    //Loading map static default tiles
    const environmentTilesUrls = [
        'src/sprites/environment/tile_0.png',
        'src/sprites/environment/tile_1.png',
        'src/sprites/environment/tile_2.png',
        'src/sprites/environment/tile_3.png',
        'src/sprites/environment/tile_4.png',
        'src/sprites/environment/tile_5.png',
        'src/sprites/environment/tile_6.png',
        'src/sprites/environment/tile_7.png',
        'src/sprites/environment/tile_8.png',
        'src/sprites/environment/tile_9.png',
        'src/sprites/environment/tile_10.png',
        'src/sprites/environment/tile_11.png',
        'src/sprites/environment/tile_12.png',
        'src/sprites/environment/tile_13.png',
        'src/sprites/environment/tile_14.png',
        'src/sprites/environment/tile_15.png',
        'src/sprites/environment/tile_16.png',
        'src/sprites/environment/tile_17.png',
        'src/sprites/environment/tile_18.png',
        'src/sprites/environment/tile_19.png',
        'src/sprites/environment/tile_20.png',
        'src/sprites/environment/tile_21.png',
    ]

    environmentTiles = []
    await loadSprites(environmentTilesUrls)
        .then(async response =>{
            for (let i = 0; i < response.length; i++) {
                environmentTiles[i] = [response[i]]
            }
            resourceStatus.mapSprites = "ok"
        })

    //Loading map static animations tiles
    const environmentAnimationTilesUrls = [
        'src/sprites/environment/tile_2.0.png',
        'src/sprites/environment/tile_2.1.png',
        'src/sprites/environment/tile_2.2.png',
        'src/sprites/environment/tile_1.0.png'
    ]
    await loadSprites(environmentAnimationTilesUrls)
        .then(async response =>{
            for (let i = 0; i < response.length; i++) {
                const animationSpriteIndex = environmentAnimationTilesUrls[i].split("_")[1].split(".")[0]
                environmentTiles[animationSpriteIndex].push([response[i]][0])
            }
            resourceStatus.animationSprites = "ok"
        })


    //Loading player static default tiles
    playerSpritesUrls = [
        'src/sprites/player/emerald_S_0.0.png',
        'src/sprites/player/emerald_S_0.1.png',
        'src/sprites/player/emerald_S_0.2.png',
        'src/sprites/player/emerald_S_0.3.png',
        'src/sprites/player/emerald_W_0.0.png',
        'src/sprites/player/emerald_W_0.1.png',
        'src/sprites/player/emerald_W_0.2.png',
        'src/sprites/player/emerald_W_0.3.png',
        'src/sprites/player/emerald_A_0.0.png',
        'src/sprites/player/emerald_A_0.1.png',
        'src/sprites/player/emerald_A_0.2.png',
        'src/sprites/player/emerald_A_0.3.png',
        'src/sprites/player/emerald_D_0.0.png',
        'src/sprites/player/emerald_D_0.1.png',
        'src/sprites/player/emerald_D_0.2.png',
        'src/sprites/player/emerald_D_0.3.png'
    ]
    playerSprites = {"W":[], "S":[], "A":[], "D":[]}
    await loadSprites(playerSpritesUrls)
        .then(response => {
           for (let i = 0; i < playerSpritesUrls.length; i++) {    
               const playerDirectionIndex = playerSpritesUrls[i].split("_")[1]
               playerSprites[playerDirectionIndex].push(response[i])
            }
            resourceStatus.playerSprites = "ok"
        })
}   

loadAllSprites()


function drawMap(mapArray, overrideAnimationTiles = true){
    const mapSize = Math.sqrt(mapArray.length)
    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < mapSize; j++) {
            const tileIndex = mapArray[i * mapSize + j]
            const environmentIndexTileSet = environmentTiles[tileIndex]
            if(overrideAnimationTiles){
                context.drawImage(environmentIndexTileSet[0], j * 45, i * 45, 45, 45)
            }else{
                if(environmentIndexTileSet.length === 1){
                    context.drawImage(environmentIndexTileSet[0], j * 45, i * 45, 45, 45)
                }else{
                    if(animatedTilesIndex.includes(tileIndex)){
                        context.drawImage(environmentTiles[tileIndex][mapTilesAnimationState % environmentIndexTileSet.length], j * 45, i * 45, 45, 45)
                    }else if(animatedTilesOnEnterIndex.includes(tileIndex) && getMapIndexByCoordinates(player.position.x + 22.5, player.position.y + 45).mapIndex === i * mapSize + j){
                        context.drawImage(environmentTiles[tileIndex][1], j * 45, i * 45, 45, 45)
                    }else{    
                        context.drawImage(environmentTiles[tileIndex][0], j * 45, i * 45, 45, 45)
                    }
                }
            }
        }
    }
}