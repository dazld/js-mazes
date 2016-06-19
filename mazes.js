const Grid = require('./grid');

class BinaryTreeMaze extends Grid {
    constructor() {
        super(...arguments);
        this.setupMaze();
    }
    setupMaze() {
        const self = this;
        this.eachCell(function(cell, row, col) {
            const nbrs = 'north east'.split(' ').reduce(function(acc,name){
                if (cell[name]) {
                    acc.push(cell[name]);
                }
                return acc;
            }, []);
            const numNbrs = nbrs.length;
            if (!numNbrs) {
                return;
            }
            const randIdx = Math.floor(Math.random() * numNbrs);
            const neighbor = nbrs[randIdx];
            neighbor.link(cell);
        });
    }
}

const btm = new BinaryTreeMaze(5,5);
btm.print();
