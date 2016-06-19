const Cell = require('./cell');

function makeEmptyArray(size) {
    return new Array(size).fill('');
}

function make2dArrayOf(Ctor, size) {
    return makeEmptyArray(size).map(function(el, row) {
        return makeEmptyArray(size).fill('').map(function(c, col) {
            return new Ctor(row, col);
        });
    });
}


class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cells = this.prepareGrid(rows);
        this.assignNeighbors();
    }
    prepareGrid(size) {
        const grid = make2dArrayOf(Cell, size);
        return grid;
    }
    assignNeighbors() {
        this.eachCell((cell, row, col) => {
            const thisCell = cell;
            thisCell.north = this.getAt(row - 1, col);
            thisCell.south = this.getAt(row + 1, col);
            thisCell.east = this.getAt(row, col + 1);
            thisCell.west = this.getAt(row, col - 1);
        });
    }
    getAt(row, col) {
        return (this.cells[row] && this.cells[row][col]) || null;
    }
    eachCell(fn) {
        this.cells.forEach(function(rows, rowIdx) {
            rows.forEach(function(cell, colIdx) {
                fn(cell, rowIdx, colIdx);
            });
        });
    }
    eachRow(fn) {
        return this.cells.map(function(rows) {
            return fn(rows);
        });
    }
    print() {
        let output = `+${'---+'.repeat(this.cols)}\n`;

        const rows = this.eachRow(function(row){
            let top = '|';
            let bottom = '+';
            const corner = '+';

            const c = '   '; // 3 spaces
            row.forEach(function(cell){
                const east = cell.east && cell.linksTo(cell.east) ? ' ': '|';
                const south = cell.south && cell.linksTo(cell.south) ? c : '---';
                top = `${top}${c}${east}`;
                bottom = `${bottom}${south}${corner}`;
            });

            output += `${top}\n`
            output += `${bottom}\n`

        });


        console.log(output);
    }
}

module.exports = Grid;
