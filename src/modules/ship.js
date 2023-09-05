const ship = (length) => {
    return {
        length: length,
        hits: 0,
        sunk: false,

        hit() {
            this.hits++;
            this.isSunk();
        },
        isSunk() {
            if (this.hits >= this.length) {
                this.sunk = true;
            }
        }
    };
};

export { ship };