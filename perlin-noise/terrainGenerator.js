let increment = 0.04
let camSpeed = 0.04
let start = 0
let biomes = [
    [ 60, 120, 190], // Water
    [210, 215, 130], // Sand
    [ 95, 165,  30], // Grass 1
    [ 65, 115,  20], // Grass 2
    [ 90,  65,  60], // Rock 1
    [ 75,  60,  55], // Rock 2
    [255, 255, 255]  // Snow
]

function setup() {
    createCanvas(480, 360)
    pixelDensity(1)
}

function draw() {
    start += camSpeed
    let yoff = start

    loadPixels()
    for (let y = 0; y < height; y++) {
        let xoff = 0
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4
            let noiseVal = noise(xoff, yoff)

            // Apply cubic easing to the noise
            noiseVal = Math.pow(noiseVal * 1.3, 3);

            noiseVal = min(0.999, noiseVal)
            noiseVal *= biomes.length
            let biomeIndex = Math.floor(noiseVal)

            pixels[index + 0] = biomes[biomeIndex][0]
            pixels[index + 1] = biomes[biomeIndex][1]
            pixels[index + 2] = biomes[biomeIndex][2]
            pixels[index + 3] = 255

            xoff += increment
        }
        yoff += increment
    }
    updatePixels()
}
