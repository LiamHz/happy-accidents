let start = 0
let xoff = 0
let increment = 0.01

function setup() {
    createCanvas(400, 400)
}

function draw() {
    background(51)

    noFill()
    beginShape()
    xoff = start
    for (let x = 0; x < width; x++) {
        stroke(255)
        let y = noise(xoff) * height
        xoff += increment
        vertex(x, y)
    }
    endShape()

    start += increment
}
