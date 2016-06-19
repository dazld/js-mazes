
class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.links = {};
        this.hash = Cell.makehash(this);
    }
    link(cell, bidi = true) {
        this.links[cell.hash] = true;
        if (bidi) {
            cell.link(this, false);
        }
    }
    unlink(cell, bidi = true) {
        delete this.links[cell.hash];
        if (bidi) {
            cell.unlink(this, false);
        }
    }
    linksTo(cell) {
        return this.links[cell.hash];
    }
    neighbors() {
        const names = 'north south east west'.split(' ');
        return names.reduce((nbrs, name) => {
            if (this[name]) {
                nbrs.push(this[name]);
            }
            return nbrs;
        }, []);
    }
    static makehash(cell) {
        return `${cell.row},${cell.col}`;
    }
}

module.exports = Cell;
