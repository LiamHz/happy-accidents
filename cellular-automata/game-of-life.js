class gameOfLife {
    constructor(gridSize, cellSize) {
        this.newGrid = []
        this.gridSize = gridSize
        this.cellSize = cellSize

        // Create 10x10 grid filled with zeros
        this.grid = Array(this.gridSize).fill(0).map(x => Array(this.gridSize).fill(0))

        // Initialize each cell of grid with a random state - 1 or 0
        // Don't update edges
        for (let y = 1; y < this.gridSize-1; y++) {
            for (let x = 1; x < this.gridSize-1; x++) {
                this.grid[y][x] = Math.floor(Math.random() * 2)
            }
        }
    }

    updateGrid() {
        // Create new 10x10 grid filled with zeros
        this.newGrid = Array(this.gridSize).fill(0).map(x => Array(this.gridSize).fill(0))

        // Initialize each cell of grid with a random state - 1 or 0
        // Don't update edges
        for (let y = 1; y < this.gridSize-1; y++) {
            for (let x = 1; x < this.gridSize-1; x++) {
                this.newGrid[y][x] = this.updateCellState(x, y)
            }
        }
        this.grid = Array.from(this.newGrid)
    }
    
    // Get number of living neighbors
    getNumberOfNeighbors(x, y) {
        let nNeighbors = 0
        // Iterate through 3x3 neighborhood
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                nNeighbors += this.grid[y+i][x+j]
            }
        }
        
        // Subtract current cell state from number of neighbors
        nNeighbors -= this.grid[y][x]
        return nNeighbors
    }

    updateCellState(x, y) {
        let nextState = 0
        let currentState = this.grid[y][x]
        let nNeighbors = this.getNumberOfNeighbors(x, y)

        if (currentState == 1 && nNeighbors < 2) {
            nextState = 0
        } else if (currentState == 1 && nNeighbors > 3) {
            nextState = 0
        } else if (currentState == 0 && nNeighbors == 3) {
            nextState = 1
        } else {
            nextState = currentState
        }

        return nextState
    }

    drawGrid() {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x] == 0) fill(255)
                else fill(0)
                stroke(0)
                rect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize)
            }
        }
    }
}

game = new gameOfLife(40, 12)

function setup() {
    createCanvas(1280, 720);
}

function draw() {
    game.drawGrid()
    game.updateGrid()
}
