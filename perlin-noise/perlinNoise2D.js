let increment = 0.1
let start = 0

function setup() {
    createCanvas(400, 400)
    pixelDensity(1)
}

function draw() {
    start += increment
    let yoff = start

    loadPixels()
    for (let y = 0; y < height; y++) {
        let xoff = 0
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4
            let r = noise(xoff, yoff) * 255
            pixels[index + 0] = r
            pixels[index + 1] = r
            pixels[index + 2] = r
            pixels[index + 3] = 255

            xoff += increment
        }
        yoff += increment
    }
    updatePixels()
}
