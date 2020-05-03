function setup() {
    createCanvas(1280, 720);
}

class elementaryCA {
    constructor(ruleN, gridWidth, maxGenerations) {
        this.init(ruleN, gridWidth, maxGenerations)
    }

    init(ruleN, gridWidth, maxGenerations) {
        this.cellSize = 8
        this.nGeneration = 0

        this.gridWidth = gridWidth
        this.maxGenerations = maxGenerations
        this.ruleset = this.createRuleset(ruleN)

        // Create initial cell row, set middle cell to 1
        this.cells = new Array(this.gridWidth).fill(0)
        this.cells[Math.floor(this.gridWidth/2)] = 1
        this.newcells = []
    }

    createRuleset(ruleN) {
        // Ruleset determines how cells will update based on their neighbors
        // Each configuration of cell neighborhood states (e.g. '101')
        // maps to either 0 or 1
        let pad = "00000000"
        let binaryRepr = (ruleN).toString(2)
        let rulesetString = (pad+binaryRepr).slice(-pad.length)
        let rulesetListStr = rulesetString.split('').reverse()
        let rulesetList = rulesetListStr.map(numStr => parseInt(numStr))
        return rulesetList
    }

    updateCellState(left, middle, right) {
        let neighborhoodBinRepr = str(left) + str(middle) + str(right)
        let neighborhoodDecRepr = int(neighborhoodBinRepr, 2)

        return this.ruleset[neighborhoodDecRepr]
    }

    updateRow() {
        // Copy by value
        this.newcells = [...this.cells]

        // Update cell state
        // Don't update edges
        for (let i = 1; i < this.cells.length-1; i++) {
            let left   = this.cells[i-1]
            let middle = this.cells[i]
            let right  = this.cells[i+1]
            let newstate = this.updateCellState(left, middle, right)
            this.newcells[i] = newstate
        }
    }

    // Display cell state
    displayRow() {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i] == 0) fill(255);
            else fill(0);
            stroke(0)
            rect(i*this.cellSize, this.nGeneration*this.cellSize, this.cellSize, this.cellSize)
        }
        this.cells = [...this.newcells]
    }
}

ruleN = 1
gridWidth = 101
maxGenerations = 50

let CA = new elementaryCA(ruleN, gridWidth, maxGenerations) 

function draw() {
    CA.nGeneration += 1

    CA.updateRow()
    CA.displayRow()

    if (CA.nGeneration >= CA.maxGenerations) {
        ruleN = (ruleN + 1) % 2**8
        CA.init(ruleN, gridWidth, maxGenerations) 
    }
}
