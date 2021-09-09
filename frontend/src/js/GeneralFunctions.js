function loadImage(imageUrl){
    return new Promise(resolve => {
        const image = new Image()
        image.src = imageUrl
        image.onload = function () {
        resolve(image);
        }
    });
}

async function loadSprites(imagesUrl){
    return (await Promise.all(imagesUrl.map(loadImage)))
}

function getMapIndexByCoordinates(x, y){
    return {
        "x": Math.floor(x/configs.tileSize), 
        "y": Math.floor(y/configs.tileSize),
        "mapIndex": Math.floor(y/configs.tileSize) * configs.tilesPerRow + Math.floor(x/configs.tileSize)
        }
}